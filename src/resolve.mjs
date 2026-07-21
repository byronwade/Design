import fs from 'node:fs/promises';
import path from 'node:path';
import { expandProfile, loadManifest } from './manifest.mjs';
import { loadProjectConfig, loadProjectLock, projectDocuments } from './project.mjs';
import {
  GENERATED_DIRECTORY, contractRoot, exists, hash, hashFile, readJson,
  resolveWithin, safeId, writeJson,
} from './utils.mjs';

function yaml(value) { return JSON.stringify(String(value)); }

function uniqueDocuments(documents) {
  const seen = new Set();
  return documents.filter((document) => {
    const key = `${document.source}:${document.file}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function describeDocument(target, document) {
  const base = document.source === 'engine' ? contractRoot : target;
  const file = resolveWithin(base, document.file, `Resolved ${document.source} document`);
  if (!await exists(file)) throw new Error(`Resolved document does not exist: ${document.source}:${document.file}`);
  return { ...document, absolute: file, hash: await hashFile(file) };
}

export async function buildResolutionPlan({ target, allowVersionMismatch = false }) {
  const manifest = await loadManifest();
  const config = await loadProjectConfig(target);
  const lock = await loadProjectLock(target);
  if (!allowVersionMismatch && lock.packageVersion !== manifest.packageVersion) {
    throw new Error(`Installed design engine is ${lock.packageVersion}, but this CLI is ${manifest.packageVersion}. Run design-contract sync before compiling context.`);
  }
  if (!await exists(path.join(target, 'DESIGN.md'))) throw new Error('Missing root DESIGN.md. Run init or restore the project design file.');

  const plans = [];
  for (const targetConfig of config.targets) {
    const profile = manifest.profiles[targetConfig.profile];
    if (!profile) throw new Error(`Unknown profile in .design/config.json: ${targetConfig.profile}`);
    const id = safeId(targetConfig.id);
    const layers = expandProfile(manifest, targetConfig.profile);
    const overrides = [...(config.overrides ?? []), ...(targetConfig.overrides ?? [])];
    const descriptors = uniqueDocuments([
      { id: 'agent.workflow', source: 'engine', file: 'AGENT.md', role: 'mandatory design and implementation workflow' },
      ...layers.map((layerId) => ({ id: layerId, source: 'engine', file: manifest.layers[layerId].file, role: manifest.layers[layerId].role })),
      { id: 'project.design', source: 'project', file: 'DESIGN.md', role: 'project-owned Google-compatible visual contract' },
      ...projectDocuments().map((item) => ({ ...item, source: 'project' })),
      ...overrides.map((file, index) => ({ id: `project.override.${index + 1}`, source: 'project', file, role: 'project override' })),
    ]);
    const documents = [];
    for (const descriptor of descriptors) documents.push(await describeDocument(target, descriptor));
    const fingerprint = hash(JSON.stringify({
      packageVersion: manifest.packageVersion,
      target: targetConfig,
      documents: documents.map(({ id: docId, source, file, hash: fileHash }) => ({ id: docId, source, file, hash: fileHash })),
    }));
    plans.push({
      id,
      profileId: targetConfig.profile,
      profile,
      root: targetConfig.root ?? '.',
      default: Boolean(targetConfig.default),
      description: targetConfig.description ?? profile.description,
      documents,
      fingerprint,
    });
  }

  const fingerprint = hash(JSON.stringify({
    packageVersion: manifest.packageVersion,
    config,
    targets: plans.map(({ id, profileId, root, default: isDefault, fingerprint: value }) => ({ id, profileId, root, default: isDefault, fingerprint: value })),
  }));
  return { target, manifest, lock, config, targets: plans, fingerprint };
}

function markdownForTarget(targetPlan, generatedAt) {
  const lines = [
    '---',
    'generated: true',
    `target: ${yaml(targetPlan.id)}`,
    `profile: ${yaml(targetPlan.profileId)}`,
    `root: ${yaml(targetPlan.root)}`,
    `fingerprint: ${yaml(targetPlan.fingerprint)}`,
    `generated_at: ${yaml(generatedAt)}`,
    'do_not_edit: true',
    '---', '',
    `# Compiled design contract: ${targetPlan.id}`, '',
    `Profile: **${targetPlan.profileId}** — ${targetPlan.description}`, '',
    `Product root: \`${targetPlan.root}\`${targetPlan.default ? ' · default target' : ''}`, '',
    '> This is generated context. Project-authored truth lives in DESIGN.md and design/. Engine rules come from the pinned Design package. Later project documents specialize engine defaults without weakening accessibility, safety, legal, privacy, security, or explicit product requirements.', '',
    '## Contract model', '',
    '`global engine + selected profile + project visual identity + project mappings and decisions = this target contract`', '',
    '## Source order', '',
    ...targetPlan.documents.map((document, index) => `${index + 1}. \`${document.source}:${document.file}\` — ${document.role} — \`${document.hash.slice(0, 12)}\``), '',
  ];
  for (const document of targetPlan.documents) lines.push('---', '', `## Source: ${document.source}:${document.file}`, '', document.content.trim(), '');
  return `${lines.join('\n')}\n`;
}

export async function resolveInstalledContract({ target, stdoutTarget = null }) {
  const plan = await buildResolutionPlan({ target });
  const generated = path.join(target, GENERATED_DIRECTORY);
  await fs.rm(generated, { recursive: true, force: true });
  await fs.mkdir(generated, { recursive: true });
  const generatedAt = new Date().toISOString();
  const context = { schemaVersion: 1, packageVersion: plan.manifest.packageVersion, generatedAt, fingerprint: plan.fingerprint, targets: [], outputHashes: {} };
  const index = ['# Compiled design targets', '', '> Generated. Do not edit.', '', 'Select the target named by the task, the single default target, or the target whose root contains the product being changed.', ''];
  let stdout = null;

  for (const targetPlan of plan.targets) {
    for (const document of targetPlan.documents) document.content = await fs.readFile(document.absolute, 'utf8');
    const markdown = markdownForTarget(targetPlan, generatedAt);
    const json = {
      schemaVersion: 1,
      packageVersion: plan.manifest.packageVersion,
      generatedAt,
      target: { id: targetPlan.id, profile: targetPlan.profileId, root: targetPlan.root, default: targetPlan.default, description: targetPlan.description },
      fingerprint: targetPlan.fingerprint,
      documents: targetPlan.documents.map(({ id, source, file, role, hash: fileHash, content }) => ({ id, source, file, role, hash: fileHash, content })),
    };
    const markdownRelative = `${targetPlan.id}.md`;
    const jsonRelative = `${targetPlan.id}.json`;
    await fs.writeFile(path.join(generated, markdownRelative), markdown, 'utf8');
    await writeJson(path.join(generated, jsonRelative), json);
    context.outputHashes[markdownRelative] = hash(markdown);
    context.outputHashes[jsonRelative] = await hashFile(path.join(generated, jsonRelative));
    context.targets.push({ id: targetPlan.id, profile: targetPlan.profileId, root: targetPlan.root, default: targetPlan.default, fingerprint: targetPlan.fingerprint, markdown: markdownRelative, json: jsonRelative });
    index.push(`- [${targetPlan.id}](${markdownRelative}) — \`${targetPlan.profileId}\`${targetPlan.default ? ' · default' : ''}: ${targetPlan.description}`);
    if (stdoutTarget === targetPlan.id) stdout = markdown;
  }
  const indexText = `${index.join('\n')}\n`;
  await fs.writeFile(path.join(generated, 'INDEX.md'), indexText, 'utf8');
  context.outputHashes['INDEX.md'] = hash(indexText);
  await writeJson(path.join(generated, 'CONTEXT.json'), context);
  return { action: 'context', target, fingerprint: plan.fingerprint, targets: context.targets.map((entry) => entry.id), stdout };
}

export async function getResolutionStatus({ target }) {
  const contextPath = path.join(target, GENERATED_DIRECTORY, 'CONTEXT.json');
  if (!await exists(path.join(target, '.design/config.json'))) return { state: 'not-installed', current: false };
  try {
    const [manifest, lock] = await Promise.all([loadManifest(), loadProjectLock(target)]);
    if (lock.packageVersion !== manifest.packageVersion) {
      return { state: 'engine-update-required', current: false, installedVersion: lock.packageVersion, availableVersion: manifest.packageVersion };
    }
  } catch (error) {
    return { state: 'invalid', current: false, message: error.message };
  }

  let plan;
  try { plan = await buildResolutionPlan({ target, allowVersionMismatch: true }); }
  catch (error) { return { state: 'invalid', current: false, message: error.message }; }
  if (!await exists(contextPath)) return { state: 'missing', current: false, expectedFingerprint: plan.fingerprint };
  try {
    const context = await readJson(contextPath);
    if (context.fingerprint !== plan.fingerprint) return { state: 'stale', current: false, expectedFingerprint: plan.fingerprint, actualFingerprint: context.fingerprint ?? null, generatedAt: context.generatedAt ?? null };
    for (const [relative, expected] of Object.entries(context.outputHashes ?? {})) {
      const file = path.join(target, GENERATED_DIRECTORY, relative);
      if (!await exists(file) || await hashFile(file) !== expected) return { state: 'tampered', current: false, expectedFingerprint: plan.fingerprint, actualFingerprint: context.fingerprint, file: relative };
    }
    return { state: 'current', current: true, expectedFingerprint: plan.fingerprint, actualFingerprint: context.fingerprint, generatedAt: context.generatedAt ?? null };
  } catch (error) {
    return { state: 'invalid-generated-context', current: false, expectedFingerprint: plan.fingerprint, message: error.message };
  }
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { expandProfile, loadManifest } from './manifest.mjs';
import { exists, hash, readJson, resolveWithin, safeId, writeJson } from './utils.mjs';

function yamlScalar(value) {
  return JSON.stringify(String(value));
}

function uniqueDocuments(documents) {
  const seen = new Set();
  const result = [];
  for (const document of documents) {
    if (seen.has(document.file)) continue;
    seen.add(document.file);
    result.push(document);
  }
  return result;
}

export async function buildResolutionPlan({ target }) {
  const designDir = path.join(target, '.design');
  const manifest = await loadManifest(designDir);
  const configPath = path.join(designDir, 'project.json');
  if (!await exists(configPath)) throw new Error('Missing .design/project.json. Run init or create a project config.');
  const config = await readJson(configPath);
  if (!Array.isArray(config.targets) || config.targets.length === 0) throw new Error('.design/project.json must define at least one target.');

  const targets = [];
  for (const targetConfig of config.targets) {
    const profile = manifest.profiles[targetConfig.profile];
    if (!profile) throw new Error(`Unknown profile in project.json: ${targetConfig.profile}`);
    const targetId = safeId(targetConfig.id || targetConfig.profile);
    if (!targetId || targetId !== targetConfig.id) throw new Error(`Target id must already be a safe lowercase identifier: ${targetConfig.id}`);
    const layerIds = expandProfile(manifest, targetConfig.profile);
    const overrides = [...(config.overrides ?? []), ...(targetConfig.overrides ?? [])];
    const documents = uniqueDocuments([
      { id: 'agent.workflow', file: 'AGENT.md', role: 'mandatory workflow' },
      { id: 'google.design-md', file: 'DESIGN.md', role: 'portable visual core' },
      ...layerIds.map((id) => ({ id, file: manifest.layers[id].file, role: manifest.layers[id].role })),
      ...(manifest.projectDocumentDefaults ?? []).map((file, index) => ({ id: `project.default.${index + 1}`, file, role: 'project-owned context' })),
      ...overrides.map((file, index) => ({ id: `project.override.${index + 1}`, file, role: 'project override' })),
    ]);

    const documentHashes = [];
    for (const document of documents) {
      const file = resolveWithin(designDir, document.file, 'Resolved document');
      if (!await exists(file)) throw new Error(`Resolved document does not exist: ${document.file}`);
      documentHashes.push({ file: document.file, hash: hash(await fs.readFile(file)) });
    }

    const targetFingerprint = hash(JSON.stringify({
      packageVersion: manifest.packageVersion,
      target: targetConfig,
      profile: targetConfig.profile,
      documents: documentHashes,
    }));
    targets.push({
      id: targetId,
      profileId: targetConfig.profile,
      profile,
      description: targetConfig.description ?? profile.description,
      root: targetConfig.root ?? '.',
      default: Boolean(targetConfig.default),
      documents,
      fingerprint: targetFingerprint,
    });
  }

  const fingerprint = hash(JSON.stringify({
    packageVersion: manifest.packageVersion,
    targets: targets.map(({ id, profileId, root, default: isDefault, fingerprint: value }) => ({ id, profileId, root, default: isDefault, fingerprint: value })),
  }));
  return { designDir, manifest, config, targets, fingerprint };
}

export async function getResolutionStatus({ target }) {
  const designDir = path.join(target, '.design');
  const contextPath = path.join(designDir, 'generated', 'CONTEXT.json');
  if (!await exists(path.join(designDir, 'project.json'))) return { state: 'not-installed', current: false };
  let plan;
  try { plan = await buildResolutionPlan({ target }); }
  catch (error) { return { state: 'invalid', current: false, message: error.message }; }
  if (!await exists(contextPath)) return { state: 'missing', current: false, expectedFingerprint: plan.fingerprint };
  try {
    const context = await readJson(contextPath);
    const current = context.fingerprint === plan.fingerprint;
    return {
      state: current ? 'current' : 'stale',
      current,
      expectedFingerprint: plan.fingerprint,
      actualFingerprint: context.fingerprint ?? null,
      generatedAt: context.generatedAt ?? null,
    };
  } catch (error) {
    return { state: 'invalid-generated-context', current: false, expectedFingerprint: plan.fingerprint, message: error.message };
  }
}

export async function resolveInstalledContract({ target }) {
  const plan = await buildResolutionPlan({ target });
  const generated = path.join(plan.designDir, plan.manifest.generatedDirectory ?? 'generated');
  await fs.rm(generated, { recursive: true, force: true });
  await fs.mkdir(generated, { recursive: true });

  const generatedAt = new Date().toISOString();
  const context = {
    schemaVersion: 1,
    packageVersion: plan.manifest.packageVersion,
    generatedAt,
    fingerprint: plan.fingerprint,
    targets: [],
  };
  const indexLines = [
    '# Resolved design targets', '', '> Generated. Do not edit.', '',
    'Select the target named by the task. When none is named, use the single default target or the target whose configured root contains the changed product.', '',
  ];

  for (const targetPlan of plan.targets) {
    const targetDir = path.join(generated, targetPlan.id);
    await fs.mkdir(targetDir, { recursive: true });
    const contract = [
      '---',
      'generated: true',
      `target: ${yamlScalar(targetPlan.id)}`,
      `profile: ${yamlScalar(targetPlan.profileId)}`,
      `root: ${yamlScalar(targetPlan.root)}`,
      `fingerprint: ${yamlScalar(targetPlan.fingerprint)}`,
      `generated_at: ${yamlScalar(generatedAt)}`,
      'do_not_edit: true',
      '---', '',
      `# Resolved design contract: ${targetPlan.id}`, '',
      `Profile: **${targetPlan.profileId}** — ${targetPlan.description}`, '',
      `Product root: \`${targetPlan.root}\`${targetPlan.default ? ' · default target' : ''}`, '',
      '> Later documents specialize earlier documents only for their declared scope. Project context, accepted decisions, active exceptions, accessibility, safety, legal, privacy, security, and explicit requirements remain higher authority.', '',
      '## Read order', '',
      ...targetPlan.documents.map((document, index) => `${index + 1}. \`.design/${document.file}\` — ${document.role ?? document.id}`), '',
    ];

    for (const document of targetPlan.documents) {
      const file = resolveWithin(plan.designDir, document.file, 'Resolved document');
      const content = await fs.readFile(file, 'utf8');
      contract.push('---', '', `## Source: .design/${document.file}`, '', content.trim(), '');
    }

    await fs.writeFile(path.join(targetDir, 'CONTRACT.md'), `${contract.join('\n')}\n`, 'utf8');
    await fs.writeFile(path.join(targetDir, 'INDEX.md'), [
      `# ${targetPlan.id}`, '',
      `- Profile: \`${targetPlan.profileId}\``,
      `- Product root: \`${targetPlan.root}\``,
      `- Default: ${targetPlan.default ? 'yes' : 'no'}`,
      `- Fingerprint: \`${targetPlan.fingerprint}\``,
      '- Resolved contract: [CONTRACT.md](CONTRACT.md)',
      `- Document count: ${targetPlan.documents.length}`, '',
      'Read the contract before UI work. Do not load sibling targets unless cross-platform comparison is required.', '',
    ].join('\n'), 'utf8');
    indexLines.push(`- [${targetPlan.id}](${targetPlan.id}/INDEX.md) — \`${targetPlan.profileId}\`${targetPlan.default ? ' · default' : ''}: ${targetPlan.description}`);
    context.targets.push({
      id: targetPlan.id,
      profile: targetPlan.profileId,
      root: targetPlan.root,
      default: targetPlan.default,
      fingerprint: targetPlan.fingerprint,
      documents: targetPlan.documents,
    });
  }

  await fs.writeFile(path.join(generated, 'INDEX.md'), `${indexLines.join('\n')}\n`, 'utf8');
  await writeJson(path.join(generated, 'CONTEXT.json'), context);
  return { action: 'resolved', target, fingerprint: plan.fingerprint, targets: context.targets.map((entry) => entry.id) };
}

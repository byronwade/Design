import fs from 'node:fs/promises';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { expandProfile, loadManifest } from './manifest.mjs';
import { inspectProjectReadiness, loadProjectConfig, loadProjectLock } from './project.mjs';
import { getResolutionStatus } from './resolve.mjs';
import {
  addFinding, contractRoot, exists, hash, packageRoot, parseFrontmatter, readJson,
  resolveWithin, schemaRoot, summarize, walk,
} from './utils.mjs';

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validators = new Map();

async function schemaValidator(schemaFile) {
  const key = path.resolve(schemaFile);
  if (!validators.has(key)) validators.set(key, ajv.compile(await readJson(key)));
  return validators.get(key);
}

async function validateJson(value, schemaFile, findings, pathValue) {
  try {
    const validate = await schemaValidator(schemaFile);
    if (!validate(value)) {
      for (const error of validate.errors ?? []) addFinding(findings, 'error', 'schema', pathValue, `${error.instancePath || '/'} ${error.message}`);
    }
  } catch (error) {
    addFinding(findings, 'error', 'schema-engine', pathValue, error.message);
  }
}

function localDesignChecks(markdown, findings, pathValue) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) { addFinding(findings, 'error', 'design-frontmatter', pathValue, 'Missing YAML front matter.'); return; }
  const allowed = new Set(['version', 'name', 'description', 'colors', 'typography', 'rounded', 'spacing', 'components']);
  for (const line of match[1].split(/\r?\n/)) {
    const key = line.match(/^([A-Za-z0-9_-]+):/);
    if (key && !allowed.has(key[1])) addFinding(findings, 'error', 'design-key', pathValue, `Unsupported top-level key: ${key[1]}`);
  }
  const canonical = ['Overview', 'Colors', 'Typography', 'Layout', 'Elevation & Depth', 'Shapes', 'Components', "Do's and Don'ts"];
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((item) => item[1].trim());
  const duplicates = headings.filter((item, index) => headings.indexOf(item) !== index);
  for (const heading of new Set(duplicates)) addFinding(findings, 'error', 'design-duplicate-section', pathValue, `Duplicate section: ${heading}`);
  const indexes = headings.filter((item) => canonical.includes(item)).map((item) => canonical.indexOf(item));
  if (indexes.some((value, index) => index > 0 && value < indexes[index - 1])) addFinding(findings, 'error', 'design-order', pathValue, 'Canonical DESIGN.md sections are out of order.');
}

async function googleChecks(markdown, findings, pathValue, requireGoogle) {
  try {
    const { lint } = await import('@google/design.md/linter');
    const report = lint(markdown);
    for (const item of report.findings ?? []) {
      const severity = item.severity === 'error' ? 'error' : item.severity === 'warning' ? 'warning' : 'info';
      addFinding(findings, severity, `google:${item.rule ?? 'lint'}`, item.path ?? pathValue, item.message);
    }
  } catch (error) {
    addFinding(findings, requireGoogle ? 'error' : 'warning', 'google-unavailable', pathValue, `Could not load @google/design.md/linter: ${error.message}`);
  }
}

async function markdownLinks(root, relativeFiles, findings) {
  for (const relative of relativeFiles) {
    const file = path.join(root, relative);
    const markdown = await fs.readFile(file, 'utf8');
    for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const link = match[1].trim().split('#')[0];
      if (!link || /^(https?:|mailto:|#)/.test(link)) continue;
      const resolved = path.resolve(path.dirname(file), decodeURIComponent(link));
      if (!resolved.startsWith(path.resolve(root))) continue;
      if (!await exists(resolved)) addFinding(findings, 'error', 'broken-link', relative, `Broken relative link: ${link}`);
    }
  }
}

function checkProfileCompatibility(manifest, profileId, expanded, findings) {
  const mobile = ['vertical.mobile.ios', 'vertical.mobile.ipados', 'vertical.mobile.android'].filter((id) => expanded.includes(id));
  const desktop = ['vertical.desktop.macos', 'vertical.desktop.windows', 'vertical.desktop.linux.gnome', 'vertical.desktop.linux.kde'].filter((id) => expanded.includes(id));
  const web = ['vertical.web.app', 'vertical.web.marketing'].filter((id) => expanded.includes(id));
  if (mobile.length > 1) addFinding(findings, 'error', 'profile-sibling-mobile', profileId, `Profile mixes sibling mobile platforms: ${mobile.join(', ')}`);
  if (desktop.length > 1) addFinding(findings, 'error', 'profile-sibling-desktop', profileId, `Profile mixes sibling desktop platforms: ${desktop.join(', ')}`);
  if (web.length > 1) addFinding(findings, 'error', 'profile-sibling-web', profileId, `Profile mixes application and marketing web surfaces: ${web.join(', ')}`);
  if (!manifest.profiles[profileId].composite && mobile.length + desktop.length > 1) addFinding(findings, 'error', 'profile-noncomposite-platforms', profileId, 'Non-composite profile mixes mobile and desktop platforms.');
}

async function sourceIntegrity(manifest, findings) {
  for (const source of manifest.sourceDocuments ?? []) {
    const file = resolveWithin(contractRoot, source.file, 'Protected source');
    if (!await exists(file)) { addFinding(findings, 'error', 'source-file', source.file, 'Protected source is missing.'); continue; }
    if (hash(await fs.readFile(file)) !== source.sha256) addFinding(findings, 'error', 'source-hash', source.file, 'Protected source hash does not match the manifest.');
  }
  for (const archive of manifest.sourceArchives ?? []) {
    const index = resolveWithin(contractRoot, archive.index, 'Source archive index');
    if (!await exists(index)) addFinding(findings, 'error', 'source-archive-index', archive.index, `Source archive ${archive.id} index is missing.`);
    const chunks = [];
    let missing = false;
    for (const relative of archive.parts) {
      const file = resolveWithin(contractRoot, relative, 'Source archive part');
      if (!await exists(file)) { addFinding(findings, 'error', 'source-archive-part', relative, `Source archive ${archive.id} is missing a part.`); missing = true; }
      else chunks.push(await fs.readFile(file));
    }
    if (!missing && hash(Buffer.concat(chunks)) !== archive.originalSha256) addFinding(findings, 'error', 'source-archive-hash', archive.id, 'Concatenated source archive does not match the original SHA-256.');
  }
}

export async function validatePackage({ google = true, requireGoogle = false } = {}) {
  const findings = [];
  const required = [
    'DESIGN.md', 'AGENTS.md', 'README.md', 'CONTRIBUTING.md', 'package.json',
    '.design/AGENT.md', '.design/DESIGN.md', '.design/INDEX.md', '.design/manifest.json',
    '.design/schema/manifest.schema.json', '.design/schema/rules.schema.json', '.design/quality/RULES.json',
    'templates/AGENTS.md', 'templates/design/PROJECT.md', 'templates/design/COMPONENTS.md', 'templates/design/DECISIONS.md',
    'schemas/config.schema.json', 'schemas/lock.schema.json', 'schemas/generated-context.schema.json',
  ];
  for (const relative of required) if (!await exists(path.join(packageRoot, relative))) addFinding(findings, 'error', 'required-file', relative, 'Required package file is missing.');
  if (findings.some((item) => item.severity === 'error')) return summarize(findings);

  const rawManifest = await readJson(path.join(contractRoot, 'manifest.json'));
  const packageJson = await readJson(path.join(packageRoot, 'package.json'));
  await validateJson(rawManifest, path.join(contractRoot, 'schema/manifest.schema.json'), findings, '.design/manifest.json');
  if (rawManifest.packageVersion !== packageJson.version) addFinding(findings, 'error', 'manifest-version', '.design/manifest.json', `Manifest ${rawManifest.packageVersion} does not match package ${packageJson.version}.`);
  const manifest = await loadManifest();

  const seenLayerFiles = new Map();
  for (const [id, layer] of Object.entries(manifest.layers ?? {})) {
    const file = resolveWithin(contractRoot, layer.file, `Layer ${id}`);
    if (!await exists(file)) { addFinding(findings, 'error', 'layer-file', layer.file, `Layer ${id} is missing.`); continue; }
    const frontmatter = parseFrontmatter(await fs.readFile(file, 'utf8'));
    if (!frontmatter) addFinding(findings, 'error', 'layer-frontmatter', layer.file, `Layer ${id} has no front matter.`);
    else {
      if (frontmatter.id !== id) addFinding(findings, 'error', 'layer-id', layer.file, `Front matter id ${frontmatter.id ?? '(missing)'} does not match ${id}.`);
      if (frontmatter.status !== 'normative') addFinding(findings, 'error', 'layer-status', layer.file, `Registered layer status must be normative, found ${frontmatter.status ?? '(missing)'}.`);
      if (!frontmatter.kind || !frontmatter.version) addFinding(findings, 'error', 'layer-metadata', layer.file, 'Registered layers require kind and version.');
      if (JSON.stringify(frontmatter.extends ?? []) !== JSON.stringify(layer.extends ?? [])) addFinding(findings, 'error', 'layer-extends', layer.file, 'Front matter inheritance does not match the manifest.');
    }
    if (seenLayerFiles.has(layer.file)) addFinding(findings, 'error', 'duplicate-layer-file', layer.file, `File is used by ${seenLayerFiles.get(layer.file)} and ${id}.`);
    seenLayerFiles.set(layer.file, id);
    for (const parent of layer.extends) if (!manifest.layers[parent]) addFinding(findings, 'error', 'unknown-parent', id, `Unknown parent layer: ${parent}`);
  }

  const normativeDirectories = ['global/', 'components/', 'patterns/', 'verticals/', 'quality/'];
  for (const relative of await walk(contractRoot)) {
    if (!relative.endsWith('.md') || !normativeDirectories.some((prefix) => relative.startsWith(prefix))) continue;
    const frontmatter = parseFrontmatter(await fs.readFile(path.join(contractRoot, relative), 'utf8'));
    if (frontmatter?.status === 'normative' && !seenLayerFiles.has(relative) && frontmatter.id !== 'quality.index') addFinding(findings, 'error', 'unregistered-normative-file', relative, `Normative contract ${frontmatter.id ?? '(missing id)'} is not registered in the manifest.`);
  }

  for (const [bundleId, layers] of Object.entries(manifest.bundles ?? {})) for (const layerId of layers) if (!manifest.layers[layerId]) addFinding(findings, 'error', 'bundle-layer', bundleId, `Unknown layer: ${layerId}`);
  for (const [profileId, profile] of Object.entries(manifest.profiles ?? {})) {
    for (const bundleId of profile.bundles) if (!manifest.bundles[bundleId]) addFinding(findings, 'error', 'profile-bundle', profileId, `Unknown bundle: ${bundleId}`);
    for (const root of profile.roots) if (!manifest.layers[root]) addFinding(findings, 'error', 'profile-root', profileId, `Unknown root: ${root}`);
    try {
      const expanded = expandProfile(manifest, profileId);
      for (const requiredLayer of manifest.requiredInEveryProfile) if (!expanded.includes(requiredLayer)) addFinding(findings, 'error', 'profile-required-layer', profileId, `Missing required layer: ${requiredLayer}`);
      checkProfileCompatibility(manifest, profileId, expanded, findings);
    } catch (error) { addFinding(findings, 'error', 'profile-resolution', profileId, error.message); }
  }

  const rules = await readJson(path.join(contractRoot, manifest.qualityRules));
  await validateJson(rules, path.join(contractRoot, 'schema/rules.schema.json'), findings, manifest.qualityRules);
  const ruleIds = new Set();
  for (const rule of rules.rules ?? []) {
    if (ruleIds.has(rule.id)) addFinding(findings, 'error', 'duplicate-quality-rule', manifest.qualityRules, `Duplicate rule id: ${rule.id}`);
    ruleIds.add(rule.id);
  }

  await sourceIntegrity(manifest, findings);
  if (await exists(path.join(contractRoot, 'project'))) addFinding(findings, 'error', 'legacy-engine-project', '.design/project/', 'The package engine must not contain copied project customization templates.');

  const rootDesign = await fs.readFile(path.join(packageRoot, 'DESIGN.md'), 'utf8');
  const engineDesign = await fs.readFile(path.join(contractRoot, 'DESIGN.md'), 'utf8');
  if (rootDesign !== engineDesign) addFinding(findings, 'error', 'design-mirror', 'DESIGN.md', 'Root DESIGN.md and engine DESIGN.md must match in the package repository.');
  localDesignChecks(rootDesign, findings, 'DESIGN.md');
  if (google) await googleChecks(rootDesign, findings, 'DESIGN.md', requireGoogle);

  const packageMarkdown = (await walk(packageRoot)).filter((relative) => relative.endsWith('.md') && !relative.startsWith('.design/sources/') && !relative.startsWith('node_modules/') && !relative.startsWith('dist/'));
  await markdownLinks(packageRoot, packageMarkdown, findings);
  return summarize(findings);
}

export async function validateProject({ target, google = true, requireGoogle = false, mode = 'development' }) {
  const findings = [];
  const required = ['DESIGN.md', 'AGENTS.md', 'design/PROJECT.md', 'design/COMPONENTS.md', 'design/DECISIONS.md', '.design/config.json', '.design/lock.json'];
  for (const relative of required) if (!await exists(path.join(target, relative))) addFinding(findings, 'error', 'required-file', relative, 'Required project façade file is missing.');
  if (findings.some((item) => item.severity === 'error')) return summarize(findings);

  let config;
  let lock;
  try { config = await loadProjectConfig(target); } catch (error) { addFinding(findings, 'error', 'config', '.design/config.json', error.message); }
  try { lock = await loadProjectLock(target); } catch (error) { addFinding(findings, 'error', 'lock', '.design/lock.json', error.message); }
  if (config) await validateJson(config, path.join(schemaRoot, 'config.schema.json'), findings, '.design/config.json');
  if (lock) await validateJson(lock, path.join(schemaRoot, 'lock.schema.json'), findings, '.design/lock.json');
  const manifest = await loadManifest();
  if (lock && lock.packageVersion !== manifest.packageVersion) addFinding(findings, 'error', 'engine-version', '.design/lock.json', `Installed engine ${lock.packageVersion} does not match running compiler ${manifest.packageVersion}. Run design-contract sync.`);
  for (const item of config?.targets ?? []) {
    if (!manifest.profiles[item.profile]) addFinding(findings, 'error', 'profile', '.design/config.json', `Unknown profile: ${item.profile}`);
    const root = resolveWithin(target, item.root ?? '.', `Target root ${item.id}`);
    if (!await exists(root)) addFinding(findings, mode === 'release' ? 'error' : 'warning', 'target-root', '.design/config.json', `Target root does not exist: ${item.root}`);
  }

  const design = await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8');
  localDesignChecks(design, findings, 'DESIGN.md');
  if (google) await googleChecks(design, findings, 'DESIGN.md', requireGoogle);

  const generated = await getResolutionStatus({ target });
  if (!generated.current) addFinding(findings, 'error', 'generated-context', '.design/generated/', `Compiled context is ${generated.state}. Run design-contract status, sync when required, and context.`);
  const contextPath = path.join(target, '.design/generated/CONTEXT.json');
  if (await exists(contextPath)) await validateJson(await readJson(contextPath), path.join(schemaRoot, 'generated-context.schema.json'), findings, '.design/generated/CONTEXT.json');

  const readiness = await inspectProjectReadiness(target);
  for (const check of readiness) {
    if (check.status === 'pass') continue;
    const severity = check.status === 'error' || mode === 'release' ? 'error' : 'warning';
    addFinding(findings, severity, `readiness:${check.id}`, check.path, check.message, check.remediation);
  }

  const legacy = (await walk(path.join(target, '.design'))).some((relative) => /^(global|components|patterns|verticals|quality|sources|schema|project)\//.test(relative));
  if (legacy) addFinding(findings, mode === 'release' ? 'error' : 'warning', 'legacy-engine-copy', '.design/', 'Legacy engine files remain in the consuming project. Run design-contract sync to migrate to the façade layout.');

  const authoredMarkdown = ['DESIGN.md', 'AGENTS.md', 'design/PROJECT.md', 'design/COMPONENTS.md', 'design/DECISIONS.md'].filter(async (relative) => exists(path.join(target, relative)));
  await markdownLinks(target, authoredMarkdown, findings);
  return summarize(findings);
}

export async function validateContract(options = {}) {
  if (options.packageMode || options.source) return validatePackage(options);
  return validateProject(options);
}

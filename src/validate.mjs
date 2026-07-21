import fs from 'node:fs/promises';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { expandProfile, loadManifest } from './manifest.mjs';
import { inspectProjectReadiness, loadProjectConfig, loadProjectLock } from './project.mjs';
import { getResolutionStatus } from './resolve.mjs';
import {
  addFinding, contractRoot, exists, packageRoot, parseFrontmatter, readJson,
  schemaRoot, summarize, walk,
} from './utils.mjs';

const ajv = new Ajv2020({ allErrors: true, strict: true });

async function validateJson(value, schemaFile, findings, pathValue) {
  try {
    const schema = await readJson(schemaFile);
    const validate = ajv.compile(schema);
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

export async function validatePackage({ google = true, requireGoogle = false } = {}) {
  const findings = [];
  const required = ['DESIGN.md', 'AGENTS.md', 'README.md', 'package.json', '.design/manifest.json', 'templates/AGENTS.md', 'templates/design/PROJECT.md', 'templates/design/COMPONENTS.md', 'templates/design/DECISIONS.md', 'schemas/config.schema.json', 'schemas/lock.schema.json', 'schemas/generated-context.schema.json'];
  for (const relative of required) if (!await exists(path.join(packageRoot, relative))) addFinding(findings, 'error', 'required-file', relative, 'Required package file is missing.');
  if (findings.some((item) => item.severity === 'error')) return summarize(findings);

  const rawManifest = await readJson(path.join(contractRoot, 'manifest.json'));
  const packageJson = await readJson(path.join(packageRoot, 'package.json'));
  await validateJson(rawManifest, path.join(contractRoot, 'schema/manifest.schema.json'), findings, '.design/manifest.json');
  if (rawManifest.packageVersion !== packageJson.version) addFinding(findings, 'info', 'manifest-version-legacy', '.design/manifest.json', `Legacy manifest version ${rawManifest.packageVersion}; runtime package version is ${packageJson.version}.`);
  const manifest = await loadManifest();
  for (const [id, layer] of Object.entries(manifest.layers ?? {})) {
    const file = path.join(contractRoot, layer.file);
    if (!await exists(file)) { addFinding(findings, 'error', 'layer-file', layer.file, `Layer ${id} is missing.`); continue; }
    const frontmatter = parseFrontmatter(await fs.readFile(file, 'utf8'));
    if (!frontmatter || frontmatter.id !== id || frontmatter.status !== 'normative') addFinding(findings, 'error', 'layer-metadata', layer.file, `Layer ${id} requires matching normative front matter.`);
  }
  for (const profileId of Object.keys(manifest.profiles ?? {})) {
    try { expandProfile(manifest, profileId); } catch (error) { addFinding(findings, 'error', 'profile', profileId, error.message); }
  }
  const rootDesign = await fs.readFile(path.join(packageRoot, 'DESIGN.md'), 'utf8');
  const engineDesign = await fs.readFile(path.join(contractRoot, 'DESIGN.md'), 'utf8');
  if (rootDesign !== engineDesign) addFinding(findings, 'error', 'design-mirror', 'DESIGN.md', 'Root DESIGN.md and engine DESIGN.md must match in the package repository.');
  localDesignChecks(rootDesign, findings, 'DESIGN.md');
  if (google) await googleChecks(rootDesign, findings, 'DESIGN.md', requireGoogle);
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
  for (const item of config?.targets ?? []) if (!manifest.profiles[item.profile]) addFinding(findings, 'error', 'profile', '.design/config.json', `Unknown profile: ${item.profile}`);

  const design = await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8');
  localDesignChecks(design, findings, 'DESIGN.md');
  if (google) await googleChecks(design, findings, 'DESIGN.md', requireGoogle);

  const generated = await getResolutionStatus({ target });
  if (!generated.current) addFinding(findings, 'error', 'generated-context', '.design/generated/', `Compiled context is ${generated.state}. Run design-contract context.`);
  const contextPath = path.join(target, '.design/generated/CONTEXT.json');
  if (await exists(contextPath)) await validateJson(await readJson(contextPath), path.join(schemaRoot, 'generated-context.schema.json'), findings, '.design/generated/CONTEXT.json');

  const readiness = await inspectProjectReadiness(target);
  for (const check of readiness) {
    if (check.status === 'pass') continue;
    const severity = check.status === 'error' || mode === 'release' ? 'error' : 'warning';
    addFinding(findings, severity, `readiness:${check.id}`, check.path, check.message, check.remediation);
  }

  const legacy = (await walk(path.join(target, '.design'))).some((relative) => /^(global|components|patterns|verticals|quality|sources|schema)\//.test(relative));
  if (legacy) addFinding(findings, 'warning', 'legacy-engine-copy', '.design/', 'Legacy engine files remain in the consuming project. Run design-contract sync to migrate to the façade layout.');
  return summarize(findings);
}

export async function validateContract(options = {}) {
  if (options.packageMode || options.source) return validatePackage(options);
  return validateProject(options);
}

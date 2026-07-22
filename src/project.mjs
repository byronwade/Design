import fs from 'node:fs/promises';
import path from 'node:path';
import {
  CONFIG_FILE, LOCK_FILE, PROJECT_FILES, exists, hashFile, readJson,
  resolveWithin, safeId,
} from './utils.mjs';

export function defaultTargets(profiles, { appType } = {}) {
  const counts = new Map();
  return profiles.map((profile, index) => {
    const base = safeId(profile);
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    return { id: count === 1 ? base : `${base}-${count}`, profile, root: '.', default: index === 0, ...(appType ? { appType } : {}), overrides: [] };
  });
}

export async function loadProjectConfig(target) {
  const configPath = path.join(target, CONFIG_FILE);
  if (!await exists(configPath)) throw new Error(`Missing ${CONFIG_FILE}. Run design-contract init.`);
  const config = await readJson(configPath);
  if (config.schemaVersion !== 1) throw new Error(`Unsupported config schemaVersion: ${config.schemaVersion}`);
  if (!Array.isArray(config.targets) || config.targets.length === 0) throw new Error(`${CONFIG_FILE} must define at least one target.`);
  const ids = new Set();
  let defaults = 0;
  for (const item of config.targets) {
    if (!item.id || safeId(item.id) !== item.id) throw new Error(`Target id must be a safe lowercase identifier: ${item.id ?? '(missing)'}`);
    if (ids.has(item.id)) throw new Error(`Duplicate target id: ${item.id}`);
    ids.add(item.id);
    resolveWithin(target, item.root ?? '.', `Target root ${item.id}`);
    if (item.appType && safeId(item.appType) !== item.appType) throw new Error(`Target appType must be a safe lowercase identifier: ${item.appType}`);
    for (const override of item.overrides ?? []) resolveWithin(target, override, `Target override ${item.id}`);
    if (item.default) defaults += 1;
  }
  if (config.targets.some((item) => item.appType)) {
    const composition = await readJson(path.join(target, 'design/COMPOSITION.json'));
    for (const item of config.targets) {
      if (!item.appType) continue;
      const recipe = composition.appTypes?.[item.appType];
      if (!recipe) throw new Error(`Target ${item.id} selects unknown appType ${item.appType}. Add that recipe to design/COMPOSITION.json.`);
      if (recipe.targetProfile && recipe.targetProfile !== item.profile) throw new Error(`Target ${item.id} profile ${item.profile} does not match appType ${item.appType} profile ${recipe.targetProfile}.`);
    }
  }
  for (const override of config.overrides ?? []) resolveWithin(target, override, 'Project override');
  if (defaults > 1) throw new Error('At most one target may be default.');
  return config;
}

export async function loadProjectLock(target) {
  const lockPath = path.join(target, LOCK_FILE);
  if (!await exists(lockPath)) throw new Error(`Missing ${LOCK_FILE}. Run design-contract init or sync.`);
  return readJson(lockPath);
}

export function projectDocuments() {
  return [
    { id: 'project.context', file: 'design/PROJECT.md', role: 'project context, surfaces, terminology, themes, and constraints' },
    { id: 'project.components', file: 'design/COMPONENTS.md', role: 'production component, pattern, story, test, and design mappings' },
    { id: 'project.decisions', file: 'design/DECISIONS.md', role: 'accepted decisions, exceptions, gaps, migrations, and baseline approvals' },
    { id: 'project.composition', file: 'design/COMPOSITION.json', role: 'component source adapter, app-type recipes, block composition, and AI reuse policies' },
  ];
}

export async function authoredInputHashes(target) {
  const result = [];
  for (const relative of ['DESIGN.md', ...PROJECT_FILES]) {
    const file = path.join(target, relative);
    if (!await exists(file)) throw new Error(`Required authored design file is missing: ${relative}`);
    result.push({ file: relative, hash: await hashFile(file) });
  }
  return result;
}

export async function inspectProjectReadiness(target) {
  const checks = [];
  const add = (id, status, pathValue, message, remediation) => checks.push({ id, status, path: pathValue, message, remediation });
  const required = ['DESIGN.md', 'AGENTS.md', ...PROJECT_FILES, CONFIG_FILE, LOCK_FILE];
  for (const relative of required) if (!await exists(path.join(target, relative))) add('required-file', 'error', relative, 'Required façade file is missing.', 'Run design-contract init or restore the file.');

  const projectPath = path.join(target, 'design/PROJECT.md');
  if (await exists(projectPath)) {
    const value = await fs.readFile(projectPath, 'utf8');
    const incomplete = /\*\*Name:\*\*\s*$/m.test(value) || /\|\s*\|\s*\|\s*\|\s*\|\s*\|\s*\|/m.test(value) || /\[replace|\[describe|TODO|TBD/i.test(value);
    add('project-context', incomplete ? 'warning' : 'pass', 'design/PROJECT.md', incomplete ? 'Product context still contains placeholders.' : 'Product context is populated.', incomplete ? 'Replace placeholders with verified product information.' : undefined);
  }

  const componentPath = path.join(target, 'design/COMPONENTS.md');
  if (await exists(componentPath)) {
    const value = await fs.readFile(componentPath, 'utf8');
    const gaps = [...value.matchAll(/\|\s*gap\s*\|/gi)].length;
    add('component-mappings', gaps > 0 ? 'warning' : 'pass', 'design/COMPONENTS.md', gaps > 0 ? `${gaps} production mapping gap${gaps === 1 ? '' : 's'} remain.` : 'No explicit component mapping gaps remain.', gaps > 0 ? 'Map each critical intent to production code, stories/tests, and an approved reference.' : undefined);
  }

  const decisionsPath = path.join(target, 'design/DECISIONS.md');
  if (await exists(decisionsPath)) {
    const value = await fs.readFile(decisionsPath, 'utf8');
    const expired = [...value.matchAll(/status:\s*expired/gi)].length;
    add('decisions', expired > 0 ? 'error' : 'pass', 'design/DECISIONS.md', expired > 0 ? `${expired} expired exception${expired === 1 ? '' : 's'} remain.` : 'No expired exceptions are declared.', expired > 0 ? 'Remove, renew, or migrate every expired exception.' : undefined);
  }
  const compositionPath = path.join(target, 'design/COMPOSITION.json');
  if (await exists(compositionPath)) {
    const value = await fs.readFile(compositionPath, 'utf8');
    const incomplete = /replace-me/i.test(value);
    add('composition', incomplete ? 'warning' : 'pass', 'design/COMPOSITION.json', incomplete ? 'Composition contract still contains its starter recipe.' : 'Composition adapter and app-type recipes are populated.', incomplete ? 'Choose the component source, define app-type recipes, and replace starter intent/block values.' : undefined);
  }
  return checks;
}

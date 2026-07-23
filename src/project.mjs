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
  if (!await exists(configPath)) throw new Error(`Missing ${CONFIG_FILE}. Run design init.`);
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
  if (config.targets.some((item) => item.appType) && await exists(path.join(target, 'design/COMPOSITION.json'))) {
    const composition = await readJson(path.join(target, 'design/COMPOSITION.json'));
    for (const item of config.targets) {
      if (!item.appType) continue;
      const recipe = composition.appTypes?.[item.appType];
      if (!recipe) throw new Error(`Target ${item.id} selects unknown appType ${item.appType}. Add that recipe to DESIGN.md or the legacy design/COMPOSITION.json before migration.`);
      if (recipe.targetProfile && recipe.targetProfile !== item.profile) throw new Error(`Target ${item.id} profile ${item.profile} does not match appType ${item.appType} profile ${recipe.targetProfile}.`);
    }
  }
  for (const override of config.overrides ?? []) resolveWithin(target, override, 'Project override');
  if (defaults > 1) throw new Error('At most one target may be default.');
  return config;
}

export async function loadProjectLock(target) {
  const lockPath = path.join(target, LOCK_FILE);
  if (!await exists(lockPath)) throw new Error(`Missing ${LOCK_FILE}. Run design init or sync.`);
  return readJson(lockPath);
}

export function projectDocuments() {
  return [];
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
  for (const relative of required) if (!await exists(path.join(target, relative))) add('required-file', 'error', relative, 'Required façade file is missing.', 'Run design init or restore the file.');

  const designPath = path.join(target, 'DESIGN.md');
  if (await exists(designPath)) {
    const value = await fs.readFile(designPath, 'utf8');
    for (const heading of ['Product Grammar', 'Invariant Guidance', 'Preferred Guidance', 'Open Guidance', 'Targets and Sources', 'Tokens and Component Sources', 'Layout and Navigation', 'States and Interaction', 'Accessibility', 'Content and Terminology', 'Trust and Acceptance', 'References']) {
      add(`design-grammar-${heading.toLowerCase().replaceAll(' ', '-')}`, value.includes(`## ${heading}`) ? 'pass' : 'warning', 'DESIGN.md', value.includes(`## ${heading}`) ? `${heading} is present.` : `Missing ${heading}.`, value.includes(`## ${heading}`) ? undefined : `Add a ## ${heading} section to DESIGN.md.`);
    }
    const expired = [...value.matchAll(/status:\s*expired|expires:\s*(?:expired|[0-9]{4}-[0-9]{2}-[0-9]{2})/gi)]
      .filter((match) => !/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(match[0]) || match[0].slice(-10) < new Date().toISOString().slice(0, 10)).length;
    add('decisions', expired > 0 ? 'error' : 'pass', 'DESIGN.md', expired > 0 ? `${expired} expired exception${expired === 1 ? '' : 's'} remain.` : 'No expired exceptions are declared.', expired > 0 ? 'Remove, renew, or migrate every expired exception.' : undefined);
  }
  return checks;
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { applyAdapters } from './adapters.mjs';
import { loadManifest } from './manifest.mjs';
import { defaultTargets, loadProjectConfig } from './project.mjs';
import { resolveInstalledContract } from './resolve.mjs';
import {
  CACHE_DIRECTORY, CONFIG_FILE, GENERATED_DIRECTORY, LOCK_FILE, PROJECT_FILES,
  copyIfMissing, exists, packageRoot, readJson, templateRoot, writeJson, writeText,
} from './utils.mjs';

const LEGACY_PATHS = [
  'AGENT.md', 'DESIGN.md', 'INDEX.md', 'manifest.json', 'project.json', '.install.json',
  'global', 'components', 'patterns', 'verticals', 'quality', 'governance', 'project', 'schema', 'sources',
];

async function combineExisting(target, paths, title) {
  const sections = [`# ${title}`, '', '> Migrated from the previous installed design-contract layout.', ''];
  let found = false;
  for (const relative of paths) {
    const file = path.join(target, '.design', relative);
    if (!await exists(file)) continue;
    found = true;
    sections.push(`## Migrated source: .design/${relative}`, '', (await fs.readFile(file, 'utf8')).trim(), '');
  }
  return found ? `${sections.join('\n')}\n` : null;
}

async function migrateLegacyInstall(target) {
  const configPath = path.join(target, CONFIG_FILE);
  const legacyConfigPath = path.join(target, '.design/project.json');
  if (await exists(configPath) || !await exists(legacyConfigPath)) return null;
  const legacy = await readJson(legacyConfigPath);
  const migrated = {
    $schema: 'https://raw.githubusercontent.com/byronwade/Design/main/schemas/config.schema.json',
    schemaVersion: 1,
    targets: legacy.targets ?? defaultTargets(['web-app']),
    overrides: legacy.overrides ?? [],
    adapters: legacy.adapters ?? ['codex', 'claude', 'copilot'],
  };

  if (!await exists(path.join(target, 'design/PROJECT.md'))) {
    const value = await combineExisting(target, ['project/CONTEXT.md', 'project/TERMINOLOGY.md', 'project/SURFACES.md', 'project/THEMES.md', 'project/ASSETS.md', 'project/REFERENCES.md'], 'Project design context');
    if (value) await writeText(path.join(target, 'design/PROJECT.md'), value);
  }
  if (!await exists(path.join(target, 'design/COMPONENTS.md')) && await exists(path.join(target, '.design/project/COMPONENTS.md'))) {
    await fs.mkdir(path.join(target, 'design'), { recursive: true });
    await fs.copyFile(path.join(target, '.design/project/COMPONENTS.md'), path.join(target, 'design/COMPONENTS.md'));
  }
  if (!await exists(path.join(target, 'design/DECISIONS.md'))) {
    const value = await combineExisting(target, ['governance/DECISIONS.md', 'governance/EXCEPTIONS.md'], 'Design decisions, exceptions, and gaps');
    if (value) await writeText(path.join(target, 'design/DECISIONS.md'), value);
  }
  await writeJson(configPath, migrated);
  for (const relative of LEGACY_PATHS) await fs.rm(path.join(target, '.design', relative), { recursive: true, force: true });
  return { from: '1.0', to: '1.1-facade', migratedAt: new Date().toISOString() };
}

async function ensureAuthoredFacade(target) {
  const created = [];
  if (await copyIfMissing(path.join(packageRoot, 'DESIGN.md'), path.join(target, 'DESIGN.md'))) created.push('DESIGN.md');
  if (await copyIfMissing(path.join(templateRoot, 'AGENTS.md'), path.join(target, 'AGENTS.md'))) created.push('AGENTS.md');
  for (const relative of PROJECT_FILES) {
    if (await copyIfMissing(path.join(templateRoot, relative), path.join(target, relative))) created.push(relative);
  }
  return created;
}

async function writeLock(target, manifest, adapters, migration = null, previous = null) {
  const now = new Date().toISOString();
  const lock = {
    schemaVersion: 1,
    packageVersion: manifest.packageVersion,
    installedAt: previous?.installedAt ?? now,
    synchronizedAt: previous ? now : undefined,
    source: 'github:byronwade/Design',
    adapters,
    ...(migration ? { migration } : {}),
  };
  for (const key of Object.keys(lock)) if (lock[key] === undefined) delete lock[key];
  await writeJson(path.join(target, LOCK_FILE), lock);
  return lock;
}

export async function installContract({ target, profiles, adapters, force = false }) {
  const allowed = new Set(['codex', 'claude', 'copilot']);
  for (const adapter of adapters) if (!allowed.has(adapter)) throw new Error(`Unknown adapter: ${adapter}`);
  const manifest = await loadManifest();
  for (const profile of profiles) if (!manifest.profiles[profile]) throw new Error(`Unknown profile: ${profile}`);
  if (await exists(path.join(target, '.design/project.json'))) throw new Error('A legacy installation exists. Run design-contract sync to migrate it.');
  if (await exists(path.join(target, CONFIG_FILE)) && !force) throw new Error(`${CONFIG_FILE} already exists. Use sync, or pass --force to replace generated configuration.`);

  await fs.mkdir(path.join(target, CACHE_DIRECTORY), { recursive: true });
  await fs.rm(path.join(target, GENERATED_DIRECTORY), { recursive: true, force: true });
  const created = await ensureAuthoredFacade(target);
  const config = {
    $schema: 'https://raw.githubusercontent.com/byronwade/Design/main/schemas/config.schema.json',
    schemaVersion: 1,
    targets: defaultTargets(profiles),
    overrides: [],
    adapters,
  };
  await writeJson(path.join(target, CONFIG_FILE), config);
  const installedAdapters = await applyAdapters(target, adapters, config.targets);
  await writeLock(target, manifest, installedAdapters);
  const resolution = await resolveInstalledContract({ target });
  return { action: 'installed', target, profiles, created, adapters: installedAdapters, generatedTargets: resolution.targets, fingerprint: resolution.fingerprint };
}

export async function syncContract({ target }) {
  const manifest = await loadManifest();
  const migration = await migrateLegacyInstall(target);
  await ensureAuthoredFacade(target);
  const config = await loadProjectConfig(target);
  const previous = await (async () => {
    try { return await readJson(path.join(target, LOCK_FILE)); } catch { return null; }
  })();
  const installedAdapters = await applyAdapters(target, config.adapters ?? previous?.adapters ?? [], config.targets);
  const lock = await writeLock(target, manifest, installedAdapters, migration, previous);
  const resolution = await resolveInstalledContract({ target });
  return { action: 'synchronized', target, packageVersion: lock.packageVersion, migration, adapters: installedAdapters, generatedTargets: resolution.targets, fingerprint: resolution.fingerprint, conflicts: [] };
}

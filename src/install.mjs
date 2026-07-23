import fs from 'node:fs/promises';
import path from 'node:path';
import { applyAdapters } from './adapters.mjs';
import { loadManifest } from './manifest.mjs';
import { defaultTargets, loadProjectConfig } from './project.mjs';
import { resolveInstalledContract } from './resolve.mjs';
import {
  CACHE_DIRECTORY, CONFIG_FILE, GENERATED_DIRECTORY, LOCK_FILE, PROJECT_FILES,
  copyIfMissing, exists, hash, packageRoot, readJson, resolveWithin, safeId,
  templateRoot, writeJson, writeText,
} from './utils.mjs';

const LEGACY_PATHS = [
  'AGENT.md', 'DESIGN.md', 'INDEX.md', 'manifest.json', 'project.json', '.install.json',
  'generated', 'cache', 'global', 'components', 'patterns', 'verticals', 'quality',
  'governance', 'project', 'schema', 'sources',
];

async function readOptional(file) {
  return await exists(file) ? fs.readFile(file, 'utf8') : null;
}

async function backupMigration(target, name, content, backups) {
  if (!content) return null;
  const extension = path.extname(name) || '.md';
  const base = safeId(path.basename(name, extension)) || 'legacy';
  const relative = `design/migrations/${base}-${hash(content).slice(0, 10)}${extension}`;
  const destination = path.join(target, relative);
  if (!await exists(destination)) await writeText(destination, content);
  if (!backups.includes(relative)) backups.push(relative);
  return relative;
}

async function combineLegacy(target, paths, title) {
  const sections = [`# ${title}`, '', '> Migrated from the previous copied-engine installation.', ''];
  let found = false;
  for (const relative of paths) {
    const file = path.join(target, '.design', relative);
    if (!await exists(file)) continue;
    found = true;
    sections.push(`## Migrated source: .design/${relative}`, '', (await fs.readFile(file, 'utf8')).trim(), '');
  }
  return found ? `${sections.join('\n')}\n` : null;
}

async function migrateAuthoredDocument(target, legacyContent, destinationRelative, backupName, backups) {
  if (!legacyContent) return;
  const destination = path.join(target, destinationRelative);
  if (!await exists(destination)) {
    await writeText(destination, legacyContent);
    return;
  }
  const current = await fs.readFile(destination, 'utf8');
  if (current !== legacyContent) await backupMigration(target, backupName, legacyContent, backups);
}

async function migrateLegacyOverrides(target, legacy, backups) {
  const legacyRoot = path.join(target, '.design');
  const migrated = new Map();
  async function one(relative) {
    if (migrated.has(relative)) return migrated.get(relative);
    const source = resolveWithin(legacyRoot, relative, 'Legacy override');
    if (!await exists(source)) throw new Error(`Legacy override is missing: .design/${relative}`);
    const content = await fs.readFile(source, 'utf8');
    const extension = path.extname(relative) || '.md';
    const base = safeId(path.basename(relative, extension)) || 'override';
    const next = `design/migrations/overrides/${base}-${hash(content).slice(0, 10)}${extension}`;
    const destination = path.join(target, next);
    if (!await exists(destination)) {
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, content);
    }
    if (!backups.includes(next)) backups.push(next);
    migrated.set(relative, next);
    return next;
  }

  const overrides = [];
  for (const relative of legacy.overrides ?? []) overrides.push(await one(relative));
  const targets = [];
  for (const item of legacy.targets ?? []) {
    const targetOverrides = [];
    for (const relative of item.overrides ?? []) targetOverrides.push(await one(relative));
    targets.push({ ...item, overrides: targetOverrides });
  }
  return { overrides, targets };
}

async function migrateLegacyInstall(target) {
  const configPath = path.join(target, CONFIG_FILE);
  const legacyConfigPath = path.join(target, '.design/project.json');
  if (await exists(configPath) || !await exists(legacyConfigPath)) return null;

  const legacy = await readJson(legacyConfigPath);
  const backups = [];
  const oldDesign = await readOptional(path.join(target, '.design/DESIGN.md'));
  await migrateAuthoredDocument(target, oldDesign, 'DESIGN.md', 'DESIGN-v1.md', backups);

  const oldProject = await combineLegacy(target, [
    'project/CONTEXT.md', 'project/TERMINOLOGY.md', 'project/SURFACES.md',
    'project/THEMES.md', 'project/ASSETS.md',
  ], 'Project design context');
  await migrateAuthoredDocument(target, oldProject, 'design/PROJECT.md', 'PROJECT-v1.md', backups);

  const oldReferences = await combineLegacy(target, ['project/REFERENCES.md'], 'Visual references');
  await migrateAuthoredDocument(target, oldReferences, 'design/REFERENCES.md', 'REFERENCES-v1.md', backups);

  const oldComponents = await readOptional(path.join(target, '.design/project/COMPONENTS.md'));
  await migrateAuthoredDocument(target, oldComponents, 'design/COMPONENTS.md', 'COMPONENTS-v1.md', backups);

  const oldDecisions = await combineLegacy(target, ['governance/DECISIONS.md', 'governance/EXCEPTIONS.md'], 'Design decisions, exceptions, and gaps');
  await migrateAuthoredDocument(target, oldDecisions, 'design/DECISIONS.md', 'DECISIONS-v1.md', backups);

  const overrideMigration = await migrateLegacyOverrides(target, legacy, backups);
  const migrated = {
    $schema: 'https://raw.githubusercontent.com/byronwade/Design/main/schemas/config.schema.json',
    schemaVersion: 1,
    targets: overrideMigration.targets.length > 0 ? overrideMigration.targets : defaultTargets(['web-app']),
    overrides: overrideMigration.overrides,
    adapters: legacy.adapters ?? ['codex', 'claude', 'copilot'],
  };
  await writeJson(configPath, migrated);

  for (const relative of LEGACY_PATHS) await fs.rm(path.join(target, '.design', relative), { recursive: true, force: true });
  return { from: '1.0-copied-engine', to: '1.1-facade', migratedAt: new Date().toISOString(), backups };
}

async function ensureAuthoredFacade(target) {
  const created = [];
  if (await copyIfMissing(path.join(packageRoot, 'DESIGN.md'), path.join(target, 'DESIGN.md'))) created.push('DESIGN.md');
  if (await copyIfMissing(path.join(templateRoot, 'AGENTS.md'), path.join(target, 'AGENTS.md'))) created.push('AGENTS.md');
  for (const relative of PROJECT_FILES) {
    if (await copyIfMissing(path.join(templateRoot, relative), path.join(target, relative))) created.push(relative);
  }
  await fs.mkdir(path.join(target, 'design/references'), { recursive: true });
  return created;
}

async function ensureCompositionDefaults(target) {
  const compositionPath = path.join(target, 'design/COMPOSITION.json');
  if (!await exists(compositionPath)) return false;
  const [current, template] = await Promise.all([
    readJson(compositionPath),
    readJson(path.join(templateRoot, 'design/COMPOSITION.json')),
  ]);
  let changed = false;
  for (const key of ['visualReferences', 'skillStack']) {
    if (current[key] === undefined && template[key] !== undefined) {
      current[key] = template[key];
      changed = true;
    }
  }
  if (!current.paths?.references && template.paths?.references) {
    current.paths = { ...(current.paths ?? {}), references: template.paths.references };
    changed = true;
  }
  if (changed) await writeJson(compositionPath, current);
  return changed;
}

async function migrateRegistryFilesIntoDesign(target) {
  const designPath = path.join(target, 'DESIGN.md');
  if (!await exists(designPath)) return null;
  const registryFiles = [
    ['design/PROJECT.md', 'Project Grammar'],
    ['design/COMPONENTS.md', 'Production Mappings'],
    ['design/REFERENCES.md', 'References'],
    ['design/DECISIONS.md', 'Decisions and Exceptions'],
    ['design/COMPOSITION.json', 'Component Source and Skills'],
  ];
  const backups = [];
  const appended = [];
  let design = await fs.readFile(designPath, 'utf8');
  const sections = [];
  for (const [relative, title] of registryFiles) {
    const source = path.join(target, relative);
    if (!await exists(source)) continue;
    const content = await fs.readFile(source, 'utf8');
    const digest = hash(content).slice(0, 12);
    const marker = `design-contract:migrated:${relative}:${digest}`;
    await backupMigration(target, relative, content, backups);
    if (!design.includes(marker)) {
      const fenced = relative.endsWith('.json') ? ['```json', content.trim(), '```'].join('\n') : content.trim();
      sections.push(`<!-- ${marker} -->`, `### ${title}`, '', `Migrated from \`${relative}\` during one-file control-plane sync.`, '', fenced, '');
      appended.push(relative);
    }
    await fs.rm(source, { force: true });
  }
  if (sections.length > 0) {
    const insertion = ['## Migrated Legacy Design Files', '', ...sections].join('\n');
    design = `${design.trim()}\n\n${insertion}\n`;
    await writeText(designPath, design);
  }
  if (backups.length === 0 && appended.length === 0) return null;
  return { from: '1.2-registry-facade', to: '1.3-one-file-control-plane', migratedAt: new Date().toISOString(), backups, appended, preserved: ['design/references/'] };
}

function combineMigrations(...entries) {
  const present = entries.filter(Boolean);
  if (present.length === 0) return null;
  if (present.length === 1) return present[0];
  return {
    from: present.map((entry) => entry.from).join(' + '),
    to: present[present.length - 1].to,
    migratedAt: new Date().toISOString(),
    steps: present,
    backups: [...new Set(present.flatMap((entry) => entry.backups ?? []))],
  };
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

export async function installContract({ target, profiles, adapters, appType = null, force = false }) {
  const allowed = new Set(['codex', 'claude', 'copilot']);
  for (const adapter of adapters) if (!allowed.has(adapter)) throw new Error(`Unknown adapter: ${adapter}`);
  const manifest = await loadManifest();
  for (const profile of profiles) if (!manifest.profiles[profile]) throw new Error(`Unknown profile: ${profile}`);
  if (appType && safeId(appType) !== appType) throw new Error(`Target appType must be a safe lowercase identifier: ${appType}`);
  if (await exists(path.join(target, '.design/project.json'))) throw new Error('A legacy installation exists. Run design-contract sync to migrate it.');
  if (await exists(path.join(target, CONFIG_FILE)) && !force) throw new Error(`${CONFIG_FILE} already exists. Use sync, or pass --force to replace generated configuration.`);

  await fs.mkdir(path.join(target, CACHE_DIRECTORY), { recursive: true });
  await fs.rm(path.join(target, GENERATED_DIRECTORY), { recursive: true, force: true });
  const created = await ensureAuthoredFacade(target);
  await ensureCompositionDefaults(target);
  const config = {
    $schema: 'https://raw.githubusercontent.com/byronwade/Design/main/schemas/config.schema.json',
    schemaVersion: 1,
    targets: defaultTargets(profiles, { appType }),
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
  const legacyMigration = await migrateLegacyInstall(target);
  await ensureAuthoredFacade(target);
  await ensureCompositionDefaults(target);
  const registryMigration = await migrateRegistryFilesIntoDesign(target);
  const migration = combineMigrations(legacyMigration, registryMigration);
  const config = await loadProjectConfig(target);
  const previous = await (async () => {
    try { return await readJson(path.join(target, LOCK_FILE)); } catch { return null; }
  })();
  const installedAdapters = await applyAdapters(target, config.adapters ?? previous?.adapters ?? [], config.targets);
  const lock = await writeLock(target, manifest, installedAdapters, migration, previous);
  const resolution = await resolveInstalledContract({ target });
  return { action: 'synchronized', target, packageVersion: lock.packageVersion, migration, adapters: installedAdapters, generatedTargets: resolution.targets, fingerprint: resolution.fingerprint, conflicts: [] };
}

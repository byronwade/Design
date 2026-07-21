import fs from 'node:fs/promises';
import path from 'node:path';
import { applyAdapters } from './adapters.mjs';
import { loadManifest } from './manifest.mjs';
import { resolveInstalledContract } from './resolve.mjs';
import { validateContract } from './validate.mjs';
import {
  exists, hash, INSTALL_FILE, PROJECT_OWNED, readJson, safeId,
  templateFiles, templateRoot, writeJson,
} from './utils.mjs';

function defaultTargets(profiles) {
  const counts = new Map();
  return profiles.map((profile) => {
    const base = safeId(profile);
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    return { id: count === 1 ? base : `${base}-${count}`, profile };
  });
}

async function copyTemplateFile(relative, destination) {
  const source = path.join(templateRoot, relative);
  const target = path.join(destination, relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const content = await fs.readFile(source);
  await fs.writeFile(target, content);
  return hash(content);
}

export async function installContract({ target, profiles, adapters, force = false }) {
  const allowedAdapters = new Set(['codex', 'claude', 'copilot']);
  for (const adapter of adapters) if (!allowedAdapters.has(adapter)) throw new Error(`Unknown adapter: ${adapter}`);
  const manifest = await loadManifest();
  for (const profile of profiles) if (!manifest.profiles[profile]) throw new Error(`Unknown profile: ${profile}`);
  const designDir = path.join(target, '.design');
  if (await exists(designDir) && !force) throw new Error(`${designDir} already exists. Use sync, or pass --force to replace it.`);
  if (force) await fs.rm(designDir, { recursive: true, force: true });
  await fs.mkdir(designDir, { recursive: true });

  const managedFiles = {};
  for (const relative of await templateFiles()) managedFiles[relative] = await copyTemplateFile(relative, designDir);
  const config = {
    $schema: 'schema/project.schema.json', schemaVersion: 1,
    targets: defaultTargets(profiles), overrides: [], adapters,
  };
  await writeJson(path.join(designDir, 'project.json'), config);

  const mirror = path.join(target, 'DESIGN.md');
  let mirrorManaged = false;
  if (!await exists(mirror) || force) {
    const content = await fs.readFile(path.join(designDir, 'DESIGN.md'));
    await fs.writeFile(mirror, content);
    mirrorManaged = true;
  }

  const installedAdapters = await applyAdapters(target, adapters, force);
  await writeJson(path.join(designDir, INSTALL_FILE), {
    schemaVersion: 1, packageVersion: manifest.packageVersion,
    installedAt: new Date().toISOString(), managedFiles,
    rootMirror: mirrorManaged ? { path: 'DESIGN.md', hash: hash(await fs.readFile(mirror)) } : null,
    adapters: installedAdapters,
  });

  const resolution = await resolveInstalledContract({ target });
  const validation = await validateContract({ source: designDir, google: false });
  return { action: 'installed', target, profiles, adapters: installedAdapters, generatedTargets: resolution.targets, validation: validation.summary };
}

export async function syncContract({ target, force = false }) {
  const designDir = path.join(target, '.design');
  const installPath = path.join(designDir, INSTALL_FILE);
  if (!await exists(installPath)) throw new Error('No .design/.install.json found. Run init first.');
  const previous = await readJson(installPath);
  const nextManaged = {};
  const conflicts = [];
  const updated = [];
  const currentTemplateFiles = new Set(await templateFiles());

  for (const relative of currentTemplateFiles) {
    const sourceContent = await fs.readFile(path.join(templateRoot, relative));
    const sourceHash = hash(sourceContent);
    const destination = path.join(designDir, relative);
    const previousHash = previous.managedFiles?.[relative];
    const destinationExists = await exists(destination);
    const destinationHash = destinationExists ? hash(await fs.readFile(destination)) : null;

    if (PROJECT_OWNED.has(relative) && destinationExists) {
      nextManaged[relative] = previousHash ?? destinationHash;
      continue;
    }
    if (!destinationExists || force || !previousHash || destinationHash === previousHash) {
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, sourceContent);
      nextManaged[relative] = sourceHash;
      updated.push(relative);
    } else {
      conflicts.push(relative);
      nextManaged[relative] = previousHash;
    }
  }

  for (const [relative, previousHash] of Object.entries(previous.managedFiles ?? {})) {
    if (currentTemplateFiles.has(relative) || PROJECT_OWNED.has(relative)) continue;
    const destination = path.join(designDir, relative);
    if (!await exists(destination)) continue;
    const destinationHash = hash(await fs.readFile(destination));
    if (force || destinationHash === previousHash) {
      await fs.rm(destination, { force: true });
      updated.push(`removed:${relative}`);
    } else conflicts.push(`stale:${relative}`);
  }

  const config = await readJson(path.join(designDir, 'project.json'));
  await applyAdapters(target, config.adapters ?? previous.adapters ?? [], force);
  if (previous.rootMirror?.path) {
    const mirror = path.join(target, previous.rootMirror.path);
    const currentHash = await exists(mirror) ? hash(await fs.readFile(mirror)) : null;
    if (force || currentHash === previous.rootMirror.hash) {
      const content = await fs.readFile(path.join(designDir, 'DESIGN.md'));
      await fs.writeFile(mirror, content);
      previous.rootMirror.hash = hash(content);
    } else conflicts.push(previous.rootMirror.path);
  }

  const manifest = await loadManifest(designDir);
  await writeJson(installPath, {
    ...previous, packageVersion: manifest.packageVersion,
    synchronizedAt: new Date().toISOString(), managedFiles: nextManaged,
  });
  const resolution = await resolveInstalledContract({ target });
  const validation = await validateContract({ source: designDir, google: false });
  return { action: 'synchronized', target, updated, conflicts, generatedTargets: resolution.targets, validation: validation.summary };
}

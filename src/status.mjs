import fs from 'node:fs/promises';
import path from 'node:path';
import { loadManifest } from './manifest.mjs';
import { getResolutionStatus } from './resolve.mjs';
import { DEFAULT_PROJECT_OWNED, exists, hash, INSTALL_FILE, readJson, templateRoot } from './utils.mjs';

export async function statusContract({ target }) {
  const designDir = path.join(target, '.design');
  const installPath = path.join(designDir, INSTALL_FILE);
  if (!await exists(installPath)) throw new Error('No .design/.install.json found. Run init first.');
  const install = await readJson(installPath);
  const installedManifest = await loadManifest(designDir);
  const availableManifest = await loadManifest(templateRoot);
  const projectOwned = new Set([...DEFAULT_PROJECT_OWNED, ...(installedManifest.projectOwnedFiles ?? [])]);
  const modifiedManaged = [];
  const missingManaged = [];
  const projectOwnedModified = [];
  for (const [relative, installedHash] of Object.entries(install.managedFiles ?? {})) {
    const file = path.join(designDir, relative);
    if (!await exists(file)) { missingManaged.push(relative); continue; }
    const currentHash = hash(await fs.readFile(file));
    if (currentHash !== installedHash) {
      if (projectOwned.has(relative)) projectOwnedModified.push(relative);
      else modifiedManaged.push(relative);
    }
  }
  const project = await readJson(path.join(designDir, 'project.json'));
  const generated = await getResolutionStatus({ target });
  return {
    action: 'status',
    target,
    installedVersion: installedManifest.packageVersion,
    availableVersion: availableManifest.packageVersion,
    updateAvailable: installedManifest.packageVersion !== availableManifest.packageVersion,
    targets: project.targets ?? [],
    adapters: project.adapters ?? install.adapters ?? [],
    generated,
    modifiedManaged,
    missingManaged,
    projectOwnedModified,
    healthy: generated.current && modifiedManaged.length === 0 && missingManaged.length === 0,
  };
}

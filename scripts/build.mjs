import fs from 'node:fs/promises';
import path from 'node:path';
import { loadManifest } from '../src/manifest.mjs';
import { contractRoot, hash, packageRoot, schemaRoot, templateRoot, walk, writeJson } from '../src/utils.mjs';

async function digest(root) {
  const entries = [];
  for (const relative of await walk(root)) entries.push([relative, hash(await fs.readFile(path.join(root, relative)))]);
  return hash(JSON.stringify(entries));
}

const manifest = await loadManifest();
const output = {
  schemaVersion: 1,
  packageVersion: manifest.packageVersion,
  profileCount: Object.keys(manifest.profiles).length,
  layerCount: Object.keys(manifest.layers).length,
  profiles: Object.keys(manifest.profiles).sort(),
  digests: {
    contracts: await digest(contractRoot),
    templates: await digest(templateRoot),
    schemas: await digest(schemaRoot)
  }
};
await fs.rm(path.join(packageRoot, 'dist'), { recursive: true, force: true });
await writeJson(path.join(packageRoot, 'dist/build.json'), output);
console.log(JSON.stringify(output, null, 2));

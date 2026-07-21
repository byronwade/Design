import path from 'node:path';
import { readJson, templateRoot } from './utils.mjs';

export async function loadManifest(designDir = templateRoot) {
  const manifest = await readJson(path.join(designDir, 'manifest.json'));
  if (manifest.schemaVersion !== 1) throw new Error(`Unsupported manifest schemaVersion: ${manifest.schemaVersion}`);
  return manifest;
}

function resolveLayer(manifest, id, visiting, ordered, seen) {
  if (seen.has(id)) return;
  if (visiting.has(id)) throw new Error(`Inheritance cycle detected at ${id}`);
  const layer = manifest.layers[id];
  if (!layer) throw new Error(`Unknown layer: ${id}`);
  visiting.add(id);
  for (const parent of layer.extends ?? []) resolveLayer(manifest, parent, visiting, ordered, seen);
  visiting.delete(id);
  seen.add(id);
  ordered.push(id);
}

export function expandProfile(manifest, profileId) {
  const profile = manifest.profiles[profileId];
  if (!profile) throw new Error(`Unknown profile: ${profileId}`);
  const ordered = [];
  const seen = new Set();
  for (const bundleId of profile.bundles ?? []) {
    const bundle = manifest.bundles[bundleId];
    if (!bundle) throw new Error(`Unknown bundle ${bundleId} in profile ${profileId}`);
    for (const layerId of bundle) resolveLayer(manifest, layerId, new Set(), ordered, seen);
  }
  for (const root of profile.roots ?? []) resolveLayer(manifest, root, new Set(), ordered, seen);
  return ordered;
}

export async function listProfiles() {
  const manifest = await loadManifest();
  return Object.entries(manifest.profiles).map(([id, profile]) => ({
    id,
    description: profile.description,
    composite: Boolean(profile.composite),
    roots: profile.roots,
  }));
}

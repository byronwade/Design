import path from 'node:path';
import { loadManifest } from './manifest.mjs';
import { loadProjectConfig } from './project.mjs';
import { contractRoot, readJson } from './utils.mjs';

export async function explainContract({ target, query }) {
  if (!query) throw new Error('Provide a rule ID, profile ID, layer ID, or target ID to explain.');
  const manifest = await loadManifest();
  const normalized = String(query).toLowerCase();
  if (manifest.profiles[query]) return { type: 'profile', id: query, ...manifest.profiles[query] };
  if (manifest.layers[query]) return { type: 'layer', id: query, ...manifest.layers[query] };
  const rules = await readJson(path.join(contractRoot, manifest.qualityRules ?? 'quality/RULES.json'));
  const rule = (rules.rules ?? []).find((item) => item.id?.toLowerCase() === normalized);
  if (rule) return { type: 'rule', ...rule };
  try {
    const config = await loadProjectConfig(target);
    const targetItem = config.targets.find((item) => item.id.toLowerCase() === normalized);
    if (targetItem) return { type: 'target', ...targetItem, profileDefinition: manifest.profiles[targetItem.profile] };
  } catch {}
  const candidates = [];
  for (const [id, layer] of Object.entries(manifest.layers)) if (`${id} ${layer.role}`.toLowerCase().includes(normalized)) candidates.push({ type: 'layer', id, role: layer.role, file: layer.file });
  for (const item of rules.rules ?? []) if (`${item.id} ${item.category} ${item.requirement}`.toLowerCase().includes(normalized)) candidates.push({ type: 'rule', id: item.id, category: item.category, requirement: item.requirement });
  return { type: 'search', query, candidates: candidates.slice(0, 20) };
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { hash, relativePosix, safeId } from './utils.mjs';

function observationList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function normalizeContextDsObservation(observation) {
  if (!observation || typeof observation !== 'object') throw new Error('ContextDS observation must be an object.');
  const surface = String(observation.surface ?? observation.route ?? observation.path ?? '').trim();
  if (!surface) throw new Error('ContextDS observation requires a surface, route, or path.');
  return {
    id: safeId(`${surface}-${observation.kind ?? observation.type ?? 'observation'}-${observation.observedAt ?? ''}`),
    source: String(observation.source ?? 'contextds'),
    kind: String(observation.kind ?? observation.type ?? 'external-observation'),
    surface,
    observedAt: observation.observedAt ?? null,
    summary: String(observation.summary ?? observation.message ?? '').trim(),
    evidence: observation.evidence ?? null,
    suggestedAction: observation.suggestedAction ?? null,
    authority: 'external-drift-evidence',
    canReplaceDesignTruth: false,
  };
}

export async function recordContextDsDriftEvidence({ target, observations = [] }) {
  const normalized = observationList(observations).map(normalizeContextDsObservation);
  const generatedAt = new Date().toISOString();
  const receipt = {
    schemaVersion: 1,
    action: 'contextds-drift-evidence',
    target,
    generatedAt,
    adapter: {
      name: 'ContextDS',
      required: false,
      mode: 'observation-only',
      canReplaceDesignTruth: false,
    },
    observations: normalized,
    warnings: normalized.length === 0 ? ['No ContextDS observations supplied.'] : [],
  };
  receipt.receiptHash = hash(JSON.stringify({ adapter: receipt.adapter, observations: receipt.observations }));
  const output = path.join(target, '.design/receipts/contextds-drift.json');
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  return { ...receipt, receipt: relativePosix(target, output) };
}

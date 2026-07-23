import fs from 'node:fs/promises';
import path from 'node:path';
import { buildResolutionPlan } from './resolve.mjs';
import { exists, hash, safeId } from './utils.mjs';

const COMPONENT_KEYWORDS = [
  ['button', ['button', 'action', 'submit', 'save', 'delete', 'approve', 'commit']],
  ['form', ['form', 'field', 'input', 'textarea', 'select', 'validation']],
  ['navigation', ['nav', 'menu', 'sidebar', 'breadcrumb', 'tabs']],
  ['table', ['table', 'grid', 'row', 'filter', 'sort', 'bulk']],
  ['card', ['card', 'panel', 'surface', 'detail', 'metric']],
  ['dialog', ['dialog', 'modal', 'confirm', 'sheet', 'popover']],
  ['status', ['status', 'alert', 'toast', 'empty', 'loading', 'error']],
  ['command', ['command', 'search', 'palette', 'shortcut']],
];

const RISK_KEYWORDS = [
  ['high', ['delete', 'destructive', 'payment', 'publish', 'deploy', 'permission', 'privacy', 'security', 'legal']],
  ['medium', ['save', 'edit', 'invite', 'share', 'sync', 'approve', 'import', 'export']],
];

function section(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return '';
  const end = lines.findIndex((line, index) => index > start && /^##\s+/.test(line));
  return lines.slice(start + 1, end === -1 ? undefined : end).join('\n').trim();
}

function linesContaining(value, words, limit = 6) {
  const lower = words.map((word) => word.toLowerCase());
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && lower.some((word) => line.toLowerCase().includes(word)))
    .slice(0, limit);
}

function classifyRequest(request) {
  const lower = request.toLowerCase();
  const components = COMPONENT_KEYWORDS
    .filter(([, words]) => words.some((word) => lower.includes(word)))
    .map(([name]) => name);
  const risk = RISK_KEYWORDS.find(([, words]) => words.some((word) => lower.includes(word)))?.[0] ?? 'low';
  const intent = lower.includes('fix') || lower.includes('bug')
    ? 'fix'
    : lower.includes('redesign') || lower.includes('improve')
      ? 'improve'
      : lower.includes('create') || lower.includes('add') || lower.includes('build')
        ? 'create'
        : 'modify';
  return { intent, risk, components: components.length ? components : ['surface'] };
}

function readGuidance(design) {
  return {
    invariant: linesContaining(section(design, 'Invariant Guidance'), ['- ', 'must', 'cannot', 'never'], 12),
    preferred: linesContaining(section(design, 'Preferred Guidance'), ['- ', 'prefer', 'should', 'normally'], 12),
    open: linesContaining(section(design, 'Open Guidance'), ['- ', 'open', 'may', 'invent'], 12),
  };
}

function defaultTaskModel(request, targetPlan, classification) {
  return {
    intent: classification.intent,
    actor: 'unspecified user or operator',
    object: classification.components.join(', '),
    risk: classification.risk,
    permissions: classification.risk === 'high' ? 'must be visible before commitment' : 'confirm from product context',
    states: ['default', 'loading', 'empty', 'error', 'permission', 'disabled', 'focus-visible'],
    consequences: classification.risk === 'high' ? 'name side effects, retained state, and recovery' : 'preserve context and show result evidence',
    nextAction: 'reuse mapped components and semantic tokens before creating new primitives',
    materialUncertainty: [
      'actor, exact domain object, and production component mapping may need project confirmation',
      'rendered verification depends on project-specific commands and affected surfaces',
    ],
    target: {
      id: targetPlan.id,
      profile: targetPlan.profileId,
      appType: targetPlan.appType,
      root: targetPlan.root,
    },
  };
}

function boundedDocuments(targetPlan, requestWords) {
  return targetPlan.documents
    .filter((document) => document.id === 'project.design' || document.source === 'project')
    .map((document) => ({
      id: document.id,
      source: document.source,
      file: document.file,
      role: document.role,
      hash: document.hash,
      excerpts: document.content ? linesContaining(document.content, requestWords, 4) : [],
    }));
}

async function readReferences(target, design, requestWords) {
  const candidates = [];
  const fromDesign = section(design, 'References');
  for (const line of linesContaining(fromDesign, requestWords, 12)) candidates.push({ source: 'DESIGN.md', line });
  const referencesRoot = path.join(target, 'design/references');
  if (await exists(referencesRoot)) {
    const entries = await fs.readdir(referencesRoot, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 20)) {
      candidates.push({ source: `design/references/${entry.name}`, line: entry.isDirectory() ? 'reference folder' : 'reference file' });
    }
  }
  return candidates;
}

export async function resolveTaskContext({ target, request, targetId = null }) {
  if (!request || !String(request).trim()) throw new Error('design resolve requires --request "what the AI should build or change".');
  const plan = await buildResolutionPlan({ target });
  const targetPlan = targetId
    ? plan.targets.find((entry) => entry.id === safeId(targetId))
    : plan.targets.find((entry) => entry.default) ?? plan.targets[0];
  if (!targetPlan) throw new Error(`Unknown target: ${targetId}`);
  for (const document of targetPlan.documents) document.content = await fs.readFile(document.absolute, 'utf8');
  const design = await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8');
  const words = String(request).toLowerCase().split(/[^a-z0-9_-]+/).filter((word) => word.length > 2);
  const classification = classifyRequest(String(request));
  const taskModel = defaultTaskModel(String(request), targetPlan, classification);
  const guidance = readGuidance(design);
  const packet = {
    schemaVersion: 1,
    action: 'resolve',
    target,
    request: String(request),
    revisionBound: true,
    fingerprint: targetPlan.fingerprint,
    taskModel,
    relevant: {
      components: classification.components,
      tokens: linesContaining(section(design, 'Tokens and Component Sources') || design, [...classification.components, 'color', 'spacing', 'radius'], 10),
      patterns: linesContaining(section(design, 'Layout and Navigation') || design, [...classification.components, 'layout', 'navigation', 'state'], 10),
      references: await readReferences(target, design, words),
      documents: boundedDocuments(targetPlan, words),
    },
    guidance,
    constraints: [
      'Do not require a component package unless DESIGN.md declares it as required.',
      'Do not use visual references as authority over accessibility, trust, platform behavior, or tokens.',
      'Record any local divergence as a preferred-guidance reason or an accepted exception.',
    ],
    checks: [
      'Run design check before claiming implementation quality.',
      'Run design verify to create a revision-bound receipt before acceptance.',
    ],
    packetHash: null,
  };
  packet.packetHash = hash(JSON.stringify({ request: packet.request, fingerprint: packet.fingerprint, taskModel: packet.taskModel, relevant: packet.relevant, guidance: packet.guidance }));
  const generated = path.join(target, '.design/generated');
  await fs.mkdir(generated, { recursive: true });
  await fs.writeFile(path.join(generated, 'TASK.json'), `${JSON.stringify(packet, null, 2)}\n`, 'utf8');
  return packet;
}

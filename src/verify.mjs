import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { checkDesign } from './check.mjs';
import { getResolutionStatus } from './resolve.mjs';
import { exists, hash, readJson, safeId } from './utils.mjs';

function gitRevision(target) {
  const result = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: target, encoding: 'utf8', stdio: 'pipe' });
  return result.status === 0 ? result.stdout.trim() : null;
}

async function readTask(target, request) {
  const taskPath = path.join(target, '.design/generated/TASK.json');
  if (await exists(taskPath)) return readJson(taskPath);
  return {
    schemaVersion: 1,
    action: 'resolve',
    request: request ?? null,
    taskModel: null,
    fingerprint: null,
    warnings: ['No resolved task packet exists. Run design resolve --request "..." before verify.'],
  };
}

function evidenceList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.map(String).filter(Boolean) : String(value).split(',').map((item) => item.trim()).filter(Boolean);
}

async function existingEvidence(target, entries) {
  const found = [];
  const missing = [];
  for (const entry of entries) {
    const file = path.resolve(target, entry);
    if (file === path.resolve(target) || !file.startsWith(`${path.resolve(target)}${path.sep}`)) {
      missing.push({ path: entry, reason: 'outside-target' });
      continue;
    }
    if (await exists(file)) found.push({ path: entry, kind: 'file' });
    else missing.push({ path: entry, reason: 'missing' });
  }
  return { found, missing };
}

export async function verifyDesign({ target, request = null, mode = 'development', surfaces = [], evidence = [] }) {
  const [generated, task, check] = await Promise.all([
    getResolutionStatus({ target }),
    readTask(target, request),
    checkDesign({ target, mode }),
  ]);
  const renderedSurfaces = evidenceList(surfaces).map((surface) => ({ id: safeId(surface), label: surface }));
  const artifacts = await existingEvidence(target, evidenceList(evidence));
  const warnings = [];
  if (!generated.current) warnings.push(`Compiled context is ${generated.state}.`);
  if (!task.taskModel) warnings.push('No task model was available from design resolve.');
  if (renderedSurfaces.length === 0) warnings.push('No rendered surfaces were declared.');
  if (artifacts.found.length === 0) warnings.push('No screenshot, accessibility, keyboard, responsiveness, overflow, or baseline evidence file was supplied.');
  for (const item of artifacts.missing) warnings.push(`Evidence file ${item.path} is ${item.reason}.`);

  const blocking = [
    ...check.findings.filter((finding) => finding.severity === 'error').map((finding) => ({ type: 'check-error', ruleId: finding.ruleId, file: finding.file, message: finding.message })),
    ...(generated.current ? [] : [{ type: 'stale-context', state: generated.state }]),
    ...(renderedSurfaces.length === 0 ? [{ type: 'missing-rendered-surfaces' }] : []),
    ...(artifacts.found.length === 0 ? [{ type: 'missing-evidence' }] : []),
  ];

  const receipt = {
    schemaVersion: 1,
    action: 'verify',
    target,
    mode,
    generatedAt: new Date().toISOString(),
    revision: gitRevision(target),
    contractFingerprint: generated.expectedFingerprint ?? generated.actualFingerprint ?? task.fingerprint ?? null,
    taskModel: task.taskModel,
    rules: check.findings.map((finding) => finding.ruleId),
    renderedSurfaces,
    results: {
      check: check.summary,
      context: generated,
      evidence: artifacts,
    },
    warnings,
    exceptions: check.findings.filter((finding) => finding.ruleId === 'DS-GOV-001'),
    visualChanges: artifacts.found,
    blocking,
    healthy: blocking.length === 0 && (mode !== 'release' || warnings.length === 0),
  };
  receipt.receiptHash = hash(JSON.stringify({ revision: receipt.revision, contractFingerprint: receipt.contractFingerprint, taskModel: receipt.taskModel, results: receipt.results, blocking: receipt.blocking }));
  const receiptDir = path.join(target, '.design/receipts');
  await fs.mkdir(receiptDir, { recursive: true });
  const name = `design-receipt-${receipt.generatedAt.replace(/[:.]/g, '-')}.json`;
  await fs.writeFile(path.join(receiptDir, name), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(receiptDir, 'latest.json'), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  return { ...receipt, receipt: `.design/receipts/${name}` };
}

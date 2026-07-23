import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const benchmarkRoot = path.join(root, 'benchmarks', 'component-fidelity');
const args = new Set(process.argv.slice(2));
const failUnderArg = process.argv.find((arg) => arg.startsWith('--fail-under='));
const failUnder = failUnderArg ? Number(failUnderArg.split('=')[1]) : null;
const ajv = new Ajv2020({ allErrors: true });

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function hexToRgb(value) {
  const match = String(value).trim().match(/^#?([a-f0-9]{6})$/i);
  if (!match) return null;
  const raw = match[1];
  return [0, 2, 4].map((offset) => Number.parseInt(raw.slice(offset, offset + 2), 16));
}

function valueSimilarity(target, candidate) {
  if (target === candidate) return 1;
  if (typeof target === 'number' && typeof candidate === 'number') {
    const spread = Math.max(Math.abs(target), 1);
    return clamp(1 - Math.abs(target - candidate) / spread);
  }
  const targetRgb = hexToRgb(target);
  const candidateRgb = hexToRgb(candidate);
  if (targetRgb && candidateRgb) {
    const distance = Math.sqrt(targetRgb.reduce((sum, value, index) => sum + (value - candidateRgb[index]) ** 2, 0));
    return clamp(1 - distance / 441.67295593);
  }
  if (typeof target === 'string' && typeof candidate === 'string') {
    if (!target && !candidate) return 1;
    if (!target || !candidate) return 0;
    return target.toLowerCase() === candidate.toLowerCase() ? 1 : 0;
  }
  return 0;
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 1;
}

function normalizePath(value) {
  return String(value).replaceAll('\\', '/');
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

async function fileSha256(file) {
  return crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
}

async function loadCleanRoom(suiteRoot) {
  const cleanRoomRoot = path.join(suiteRoot, 'clean-room');
  const promptFile = path.join(cleanRoomRoot, 'prompt.md');
  const allowedInputsFile = path.join(cleanRoomRoot, 'allowed-inputs.json');
  const candidateSchemaFile = path.join(cleanRoomRoot, 'candidate.schema.json');
  try {
    const [promptSha256, allowedInputsSha256, allowedInputs, candidateSchema] = await Promise.all([
      fileSha256(promptFile),
      fileSha256(allowedInputsFile),
      readJson(allowedInputsFile),
      readJson(candidateSchemaFile),
    ]);
    return {
      root: cleanRoomRoot,
      promptFile: normalizePath(path.relative(root, promptFile)),
      promptSha256,
      allowedInputsFile: normalizePath(path.relative(root, allowedInputsFile)),
      allowedInputsSha256,
      allowedInputs,
      validateCandidate: ajv.compile(candidateSchema),
    };
  } catch {
    return null;
  }
}

function releaseAudit(candidate, cleanRoom) {
  const blockers = [];
  if (cleanRoom?.validateCandidate && !cleanRoom.validateCandidate(candidate)) {
    blockers.push(
      ...cleanRoom.validateCandidate.errors.map((error) =>
        `schema ${error.instancePath || '/'} ${error.message ?? 'failed validation'}`,
      ),
    );
  }
  const provenance = isObject(candidate.provenance) ? candidate.provenance : {};
  const trackPolicy = cleanRoom?.allowedInputs?.tracks?.[candidate.track];
  const allowedFiles = new Set((trackPolicy?.allowedFiles ?? []).map(normalizePath));
  const hiddenFiles = new Set((cleanRoom?.allowedInputs?.hiddenFiles ?? []).map(normalizePath));
  const usedFiles = (provenance.allowedInputFiles ?? []).map(normalizePath);

  if (!cleanRoom) blockers.push('suite is missing clean-room/prompt.md or clean-room/allowed-inputs.json');
  if (!candidate.cleanRoom) blockers.push('candidate.cleanRoom must be true');
  if (candidate.generatedBy === 'calibration-fixture') blockers.push('calibration fixtures are not release eligible');
  if (!trackPolicy?.releaseEligible) blockers.push(`track ${candidate.track ?? 'unknown'} is not release eligible`);
  if (!isObject(candidate.provenance)) blockers.push('candidate.provenance is required');
  if (!provenance.runId) blockers.push('provenance.runId is required');
  if (!provenance.model) blockers.push('provenance.model is required');
  if (!provenance.generatedAt) blockers.push('provenance.generatedAt is required');
  if (provenance.targetAccess !== false) blockers.push('provenance.targetAccess must be false');
  if (!provenance.cleanRoomAttestation) blockers.push('provenance.cleanRoomAttestation is required');
  if (cleanRoom && String(provenance.promptSha256).toLowerCase() !== cleanRoom.promptSha256) blockers.push(`provenance.promptSha256 must match ${cleanRoom.promptFile}`);
  if (cleanRoom && String(provenance.allowedInputsSha256).toLowerCase() !== cleanRoom.allowedInputsSha256) blockers.push(`provenance.allowedInputsSha256 must match ${cleanRoom.allowedInputsFile}`);
  if (!usedFiles.length) blockers.push('provenance.allowedInputFiles must list the files given to the generating AI');

  for (const usedFile of usedFiles) {
    if (hiddenFiles.has(usedFile) || usedFile.endsWith('/target.json') || usedFile === 'target.json') {
      blockers.push(`forbidden target file used: ${usedFile}`);
    } else if (allowedFiles.size && !allowedFiles.has(usedFile)) {
      blockers.push(`undeclared input file used: ${usedFile}`);
    }
  }

  return { releaseEligible: blockers.length === 0, releaseBlockers: blockers };
}

function objectScore(target, candidate) {
  const keys = Object.keys(target);
  const details = keys.map((key) => ({
    key,
    score: valueSimilarity(target[key], candidate?.[key]),
    target: target[key],
    candidate: candidate?.[key] ?? null,
  }));
  return { score: average(details.map((item) => item.score)), details };
}

function anatomyScore(target, candidate) {
  const targetSet = new Set(target.anatomy);
  const candidateSet = new Set(candidate.anatomy ?? []);
  const matched = [...targetSet].filter((item) => candidateSet.has(item));
  const extra = [...candidateSet].filter((item) => !targetSet.has(item));
  return {
    score: targetSet.size ? matched.length / targetSet.size : 1,
    matched,
    missing: [...targetSet].filter((item) => !candidateSet.has(item)),
    extra,
  };
}

function statesScore(target, candidate) {
  const stateNames = Object.keys(target.states);
  const details = stateNames.map((state) => {
    const scored = objectScore(target.states[state], candidate.states?.[state] ?? {});
    return { state, ...scored };
  });
  return { score: average(details.map((item) => item.score)), details };
}

function scoreCandidate(target, candidate, cleanRoom) {
  const anatomy = anatomyScore(target, candidate);
  const tokens = objectScore(target.tokens, candidate.tokens ?? {});
  const states = statesScore(target, candidate);
  const content = objectScore(target.content, candidate.content ?? {});
  const score = (anatomy.score * 0.24) + (tokens.score * 0.36) + (states.score * 0.30) + (content.score * 0.10);
  const audit = releaseAudit(candidate, cleanRoom);
  return {
    candidate: candidate.candidate,
    track: candidate.track,
    generatedBy: candidate.generatedBy,
    cleanRoom: Boolean(candidate.cleanRoom),
    releaseEligible: audit.releaseEligible,
    releaseBlockers: audit.releaseBlockers,
    allowedInputs: candidate.allowedInputs ?? [],
    score: Number((score * 100).toFixed(2)),
    targetReached: score * 100 >= target.targetAccuracy,
    trainedTargetReached: audit.releaseEligible && score * 100 >= target.targetAccuracy,
    releaseTargetReached: audit.releaseEligible && cleanRoom?.allowedInputs?.publicClaimEligible !== false && score * 100 >= target.targetAccuracy,
    metrics: {
      anatomy: Number((anatomy.score * 100).toFixed(2)),
      tokens: Number((tokens.score * 100).toFixed(2)),
      states: Number((states.score * 100).toFixed(2)),
      content: Number((content.score * 100).toFixed(2)),
    },
    misses: {
      anatomy: anatomy.missing,
      tokens: tokens.details.filter((item) => item.score < 1).map(({ key, target: expected, candidate: actual, score: value }) => ({ key, expected, actual, score: Number((value * 100).toFixed(2)) })),
      states: states.details.flatMap((state) => state.details.filter((item) => item.score < 1).map(({ key, target: expected, candidate: actual, score: value }) => ({ state: state.state, key, expected, actual, score: Number((value * 100).toFixed(2)) }))),
      content: content.details.filter((item) => item.score < 1).map(({ key, target: expected, candidate: actual, score: value }) => ({ key, expected, actual, score: Number((value * 100).toFixed(2)) })),
    },
  };
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function run() {
  const suites = [];
  for (const entry of await fs.readdir(benchmarkRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const suiteRoot = path.join(benchmarkRoot, entry.name);
    const target = await readJson(path.join(suiteRoot, 'target.json'));
    const cleanRoom = await loadCleanRoom(suiteRoot);
    const candidatesRoot = path.join(suiteRoot, 'candidates');
    const candidates = [];
    for (const candidateFile of (await fs.readdir(candidatesRoot)).filter((file) => file.endsWith('.json')).sort()) {
      candidates.push(scoreCandidate(target, await readJson(path.join(candidatesRoot, candidateFile)), cleanRoom));
    }
    candidates.sort((a, b) => b.score - a.score);
    suites.push({
      suite: entry.name,
      component: target.component,
      targetAccuracy: target.targetAccuracy,
      cleanRoom: cleanRoom
        ? {
            promptFile: cleanRoom.promptFile,
            promptSha256: cleanRoom.promptSha256,
            allowedInputsFile: cleanRoom.allowedInputsFile,
            allowedInputsSha256: cleanRoom.allowedInputsSha256,
            suiteMode: cleanRoom.allowedInputs.suiteMode ?? 'holdout',
            publicClaimEligible: cleanRoom.allowedInputs.publicClaimEligible !== false,
            trainingNote: cleanRoom.allowedInputs.trainingNote ?? null,
            releaseEligibleTracks: Object.entries(cleanRoom.allowedInputs.tracks ?? {})
              .filter(([, track]) => track.releaseEligible)
              .map(([track]) => track),
          }
        : null,
      candidateCount: candidates.length,
      bestScore: candidates[0]?.score ?? 0,
      bestCandidate: candidates[0]?.candidate ?? null,
      targetReached: candidates.some((candidate) => candidate.trainedTargetReached || candidate.releaseTargetReached),
      trainedTargetReached: candidates.some((candidate) => candidate.trainedTargetReached),
      releaseTargetReached: candidates.some((candidate) => candidate.releaseTargetReached),
      candidates,
    });
  }
  const bestScores = suites.map((suite) => suite.bestScore);
  const releaseScores = suites.map((suite) => suite.candidates.find((candidate) => candidate.releaseEligible)?.score ?? 0);
  const publicSuites = suites.filter((suite) => suite.cleanRoom?.publicClaimEligible !== false);
  const trainingSuites = suites.filter((suite) => suite.cleanRoom?.publicClaimEligible === false);
  const publicReleaseScores = publicSuites.map((suite) => suite.candidates.find((candidate) => candidate.releaseEligible)?.score ?? 0);
  const releaseTargetReached = publicSuites.length > 0 && publicSuites.every((suite) => suite.releaseTargetReached);
  const trainedTargetReached = trainingSuites.length > 0 && trainingSuites.every((suite) => suite.trainedTargetReached);
  const releaseCandidateCount = suites.reduce((count, suite) => count + suite.candidates.filter((candidate) => candidate.releaseEligible).length, 0);
  const publicReleaseCandidateCount = publicSuites.reduce((count, suite) => count + suite.candidates.filter((candidate) => candidate.releaseEligible).length, 0);
  const averageReleaseEligibleScore = Number(average(releaseScores).toFixed(2));
  const averagePublicReleaseEligibleScore = publicSuites.length
    ? Number(average(publicReleaseScores).toFixed(2))
    : null;
  const hasPublicSuites = publicSuites.length > 0;
  const hasPublicReleaseCandidates = publicReleaseCandidateCount > 0;
  const result = {
    schemaVersion: 1,
    benchmark: 'component-fidelity',
    generatedAt: new Date().toISOString(),
    suiteCount: suites.length,
    averageBestScore: Number(average(bestScores).toFixed(2)),
    averageReleaseEligibleScore,
    averagePublicReleaseEligibleScore,
    releaseCandidateCount,
    publicReleaseCandidateCount,
    publicSuiteCount: publicSuites.length,
    trainingSuiteCount: trainingSuites.length,
    targetAccuracy: 99,
    targetReached: releaseTargetReached || (!hasPublicSuites && trainedTargetReached),
    trainedTargetReached,
    releaseTargetReached,
    status: releaseTargetReached
      ? 'target-met'
      : hasPublicSuites && !hasPublicReleaseCandidates
      ? 'holdout-pending'
      : trainedTargetReached && !hasPublicSuites
      ? 'training-target-met'
      : releaseCandidateCount
      ? 'clean-room-measured'
      : 'calibration',
    limitation: releaseCandidateCount
      ? releaseTargetReached
        ? `Best public clean-room average is ${averagePublicReleaseEligibleScore}%. The public release target is met.`
        : hasPublicSuites && !hasPublicReleaseCandidates
        ? 'The training suite target is met, but the public holdout suite has no release-eligible clean-room candidate yet.'
        : hasPublicSuites
        ? `Best public clean-room average is ${averagePublicReleaseEligibleScore}%. The 99% target is not met, so this is benchmark evidence, not a public accuracy claim.`
        : trainedTargetReached
        ? `Best clean-room training average is ${averageReleaseEligibleScore}%. The training target is met, but this suite is not public-claim eligible.`
        : `Best clean-room release-eligible average is ${averageReleaseEligibleScore}%. The 99% target is not met, so this is benchmark evidence, not a public accuracy claim.`
      : 'Current candidates are calibration fixtures. A clean AI run must write a new candidate from clean-room/prompt.md and clean-room/allowed-inputs.json, with matching hashes and no target access, before this can be claimed as model performance.',
    suites,
  };
  console.log(JSON.stringify(result, null, 2));
  const failUnderScore = publicSuites.length ? result.averagePublicReleaseEligibleScore : result.averageReleaseEligibleScore;
  if (failUnder !== null && failUnderScore < failUnder) process.exitCode = 1;
  if (args.has('--require-target') && !result.releaseTargetReached) process.exitCode = 1;
}

await run();

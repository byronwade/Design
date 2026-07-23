import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { checkDesign } from './check.mjs';
import { getResolutionStatus } from './resolve.mjs';
import { exists, hash, readJson, relativePosix, safeId } from './utils.mjs';

const TEXT_EXTENSIONS = new Set(['.html', '.htm', '.svg', '.json', '.md', '.txt', '.css']);
const SCREENSHOT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const RELEASE_EVIDENCE = [
  ['rendered', 'DS-EVIDENCE-001', 'Rendered surface evidence is required.'],
  ['screenshot', 'DS-EVIDENCE-001', 'Screenshot or static capture evidence is required.'],
  ['accessibility', 'DS-A11Y-001', 'Accessibility evidence is required.'],
  ['responsiveness', 'DS-RESP-001', 'Responsive evidence is required.'],
  ['keyboard', 'DS-A11Y-001', 'Keyboard and focus evidence is required.'],
  ['overflow', 'DS-LAYOUT-006', 'Overflow evidence is required.'],
  ['states', 'DS-STATE-001', 'State-matrix evidence is required.'],
];

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

function entryList(value) {
  if (!value) return [];
  const items = Array.isArray(value) ? value : [value];
  return items.flatMap((item) => String(item).split(',')).map((item) => item.trim()).filter(Boolean);
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[char]);
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function withinTarget(target, entry) {
  const root = path.resolve(target);
  const resolved = path.resolve(root, entry);
  if (resolved === root || !resolved.startsWith(`${root}${path.sep}`)) {
    return { entry, missing: { path: entry, reason: 'outside-target' } };
  }
  return { entry, absolute: resolved, relative: relativePosix(root, resolved) };
}

function classifyArtifact(relative, text = '') {
  const categories = new Set();
  const lower = `${relative}\n${text.slice(0, 4000)}`.toLowerCase();
  const extension = path.extname(relative).toLowerCase();
  if (extension === '.html' || extension === '.htm') categories.add('rendered');
  if (SCREENSHOT_EXTENSIONS.has(extension)) categories.add('screenshot');
  if (/a11y|accessibility|axe|wcag|aria|screen-reader/.test(lower)) categories.add('accessibility');
  if (/keyboard|focus|tab order|tabindex|focus-visible/.test(lower)) categories.add('keyboard');
  if (/responsive|viewport|media query|container query|mobile|desktop|width/.test(lower)) categories.add('responsiveness');
  if (/overflow|scroll|long content|wrap|truncat/.test(lower)) categories.add('overflow');
  if (/state|loading|empty|error|permission|disabled|busy|invalid|data-state|aria-busy|aria-invalid/.test(lower)) categories.add('states');
  if (/baseline|golden|approved/.test(lower)) categories.add('baseline');
  return [...categories].sort();
}

async function readArtifact(target, entry, source) {
  const resolved = withinTarget(target, entry);
  if (resolved.missing) return { missing: resolved.missing };
  if (!await exists(resolved.absolute)) return { missing: { path: entry, reason: 'missing' } };
  const buffer = await fs.readFile(resolved.absolute);
  const extension = path.extname(resolved.relative).toLowerCase();
  const text = TEXT_EXTENSIONS.has(extension) && buffer.length < 3_000_000 ? buffer.toString('utf8') : '';
  return {
    artifact: {
      absolute: resolved.absolute,
      path: resolved.relative,
      kind: extension.slice(1) || 'file',
      source,
      bytes: buffer.length,
      sha256: hash(buffer),
      categories: classifyArtifact(resolved.relative, text),
      text,
    },
  };
}

function addInspection(inspections, ruleId, severity, artifact, message, evidence, remediation) {
  inspections.push({
    ruleId,
    severity,
    file: artifact.path,
    line: evidence?.line ?? 1,
    message,
    evidence: evidence?.value ?? artifact.path,
    remediation,
  });
}

function textOnly(value) {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function inspectHtmlArtifact(artifact) {
  const inspections = [];
  const categories = new Set(artifact.categories);
  const html = artifact.text;
  if (!html) return { inspections, categories: [...categories].sort() };

  categories.add('rendered');
  categories.add('accessibility');
  categories.add('keyboard');
  categories.add('responsiveness');
  categories.add('overflow');

  if (!/<main\b|role=["']main["']/i.test(html)) {
    addInspection(
      inspections,
      'DS-A11Y-001',
      'warning',
      artifact,
      'Rendered HTML does not expose a main landmark.',
      { value: '<main> or role="main"', line: 1 },
      'Add a main landmark or attach accessibility evidence explaining the surface boundary.',
    );
  }

  const labelById = new Set([...html.matchAll(/<label\b[^>]*for=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]));
  const interactive = [...html.matchAll(/<(button|a|input|select|textarea)\b([^>]*)>([\s\S]*?)<\/\1>|<(input)\b([^>]*)\/?>/gi)];
  for (const match of interactive) {
    const tag = (match[1] || match[4] || '').toLowerCase();
    const attrs = match[2] || match[5] || '';
    const body = match[3] || '';
    if (tag === 'a' && !/\bhref=/.test(attrs)) continue;
    const id = attrs.match(/\bid=["']([^"']+)["']/i)?.[1];
    const hasName = /aria-label=|aria-labelledby=|title=|placeholder=/i.test(attrs)
      || textOnly(body).length > 0
      || (id && labelById.has(id));
    if (!hasName) {
      addInspection(
        inspections,
        'DS-A11Y-001',
        'error',
        artifact,
        `${tag} control does not expose an accessible name in rendered evidence.`,
        { value: match[0].slice(0, 180), line: lineNumber(html, match.index) },
        'Give each rendered control visible text, a label, aria-label, or aria-labelledby.',
      );
    }
    if (/tabindex=["']-1["']/i.test(attrs) && !/aria-hidden=["']true["']/i.test(attrs)) {
      addInspection(
        inspections,
        'DS-A11Y-001',
        'warning',
        artifact,
        `${tag} control is removed from sequential keyboard navigation.`,
        { value: match[0].slice(0, 180), line: lineNumber(html, match.index) },
        'Preserve keyboard access or attach evidence for the alternate path.',
      );
    }
  }

  if (/\b(data-state|aria-busy|aria-invalid|disabled|role=["'](?:alert|status|progressbar)|loading|empty|error|permission|focus-visible)\b/i.test(html)) {
    categories.add('states');
  } else {
    addInspection(
      inspections,
      'DS-STATE-001',
      'warning',
      artifact,
      'Rendered evidence does not show any named UI state.',
      { value: 'default/loading/empty/error/permission/disabled/focus-visible', line: 1 },
      'Attach state evidence or render the applicable state matrix before release verification.',
    );
  }

  if (!/<meta\b[^>]*name=["']viewport["']/i.test(html) && !/@media|@container|container-type|clamp\(/i.test(html)) {
    addInspection(
      inspections,
      'DS-RESP-001',
      'warning',
      artifact,
      'Rendered evidence does not include viewport or responsive-rule evidence.',
      { value: 'viewport, @media, @container, or responsive report', line: 1 },
      'Attach responsive evidence for wide and constrained layouts.',
    );
  }

  for (const match of html.matchAll(/\b(?:width|min-width|max-width):\s*([0-9]{4,})px/gi)) {
    addInspection(
      inspections,
      'DS-LAYOUT-006',
      'warning',
      artifact,
      'Large fixed width can create viewport overflow.',
      { value: match[0], line: lineNumber(html, match.index) },
      'Use responsive constraints or attach overflow evidence proving the surface remains usable.',
    );
  }
  for (const match of html.matchAll(/[A-Za-z0-9_/-]{90,}/g)) {
    addInspection(
      inspections,
      'DS-LAYOUT-006',
      'warning',
      artifact,
      'Long unbroken text can create overflow.',
      { value: match[0].slice(0, 120), line: lineNumber(html, match.index) },
      'Wrap, truncate, or provide long-content evidence for the affected region.',
    );
  }

  return { inspections, categories: [...categories].sort() };
}

function detectStates(artifacts) {
  const found = new Set();
  for (const artifact of artifacts) {
    const lower = `${artifact.path}\n${artifact.text ?? ''}`.toLowerCase();
    if (artifact.categories.includes('rendered')) found.add('default');
    if (/data-state=["']default["']|default state/.test(lower)) found.add('default');
    if (/data-state=["']loading["']|aria-busy=["']true["']|role=["']progressbar["']|\bloading\b/.test(lower)) found.add('loading');
    if (/data-state=["']empty["']|\bempty\b|no results|no work|nothing yet/.test(lower)) found.add('empty');
    if (/data-state=["']error["']|role=["']alert["']|\berror\b|unable to|failed/.test(lower)) found.add('error');
    if (/data-state=["']permission["']|\bpermission\b|forbidden|unauthorized|access denied/.test(lower)) found.add('permission');
    if (/data-state=["']disabled["']|\bdisabled\b|aria-disabled=["']true["']/.test(lower)) found.add('disabled');
    if (/focus-visible|data-state=["']focus-visible["']|focus ring|keyboard focus/.test(lower)) found.add('focus-visible');
  }
  return [...found].sort();
}

async function writeStaticCapture(target, evidenceDir, artifact, renderedIndex) {
  const bodyText = textOnly(artifact.text).slice(0, 500) || artifact.path;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="Static verification capture for ${escapeXml(artifact.path)}">
  <rect width="960" height="540" fill="#f8f7f4"/>
  <rect x="36" y="36" width="888" height="468" rx="18" fill="#ffffff" stroke="#d8d2c8"/>
  <text x="64" y="82" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#25231f">Static verification capture</text>
  <text x="64" y="116" font-family="Arial, sans-serif" font-size="15" fill="#6d665c">${escapeXml(artifact.path)}</text>
  <foreignObject x="64" y="152" width="832" height="300">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:24px;line-height:1.38;color:#25231f;overflow:hidden;">${escapeXml(bodyText)}</div>
  </foreignObject>
  <text x="64" y="470" font-family="Arial, sans-serif" font-size="13" fill="#7a746a">Generated by design verify from rendered HTML evidence. Use browser screenshots for pixel claims.</text>
</svg>
`;
  const file = path.join(evidenceDir, `static-capture-${renderedIndex}-${safeId(path.basename(artifact.path)) || 'surface'}.svg`);
  await fs.writeFile(file, svg, 'utf8');
  const relative = relativePosix(target, file);
  return {
    path: relative,
    kind: 'svg',
    source: 'generated-static-capture',
    bytes: Buffer.byteLength(svg),
    sha256: hash(svg),
    categories: ['screenshot'],
    staticCapture: true,
    note: 'Deterministic static capture generated from HTML. It is evidence of rendered structure, not a browser pixel screenshot.',
  };
}

async function browserCandidates() {
  const candidates = [];
  if (process.env.DESIGN_BROWSER_PATH) candidates.push(process.env.DESIGN_BROWSER_PATH);
  if (process.platform === 'win32') {
    candidates.push(
      'C:/Program Files/Google/Chrome/Application/chrome.exe',
      'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
      'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    );
  } else if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    );
  } else {
    candidates.push('google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge');
  }
  const available = [];
  for (const candidate of candidates) {
    if (candidate.includes('/') || candidate.includes('\\')) {
      if (await exists(candidate)) available.push(candidate);
    } else {
      const result = spawnSync(process.platform === 'win32' ? 'where' : 'which', [candidate], { encoding: 'utf8', stdio: 'pipe' });
      if (result.status === 0) available.push(result.stdout.split(/\r?\n/)[0].trim() || candidate);
    }
  }
  return [...new Set(available.filter(Boolean))];
}

async function writeBrowserScreenshot(target, evidenceDir, artifact, renderedIndex) {
  if (process.env.DESIGN_VERIFY_BROWSER === '0') return null;
  const [browser] = await browserCandidates();
  if (!browser) return null;
  const output = path.join(evidenceDir, `browser-screenshot-${renderedIndex}-${safeId(path.basename(artifact.path)) || 'surface'}.png`);
  const result = spawnSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--window-size=1440,900',
    `--screenshot=${output}`,
    pathToFileURL(artifact.absolute).href,
  ], { encoding: 'utf8', stdio: 'pipe', timeout: 20_000 });
  if (result.status !== 0 || !await exists(output)) return null;
  const buffer = await fs.readFile(output);
  return {
    path: relativePosix(target, output),
    kind: 'png',
    source: 'browser-screenshot',
    browser: path.basename(browser),
    viewport: { width: 1440, height: 900 },
    bytes: buffer.length,
    sha256: hash(buffer),
    categories: ['screenshot', 'responsiveness'],
  };
}

async function collectEvidence({ target, surfaces, evidence, generatedAt, expectedStates = [] }) {
  const surfaceEntries = entryList(surfaces);
  const evidenceEntries = new Set(entryList(evidence));
  const renderedSurfaces = surfaceEntries.map((surface) => ({ id: safeId(surface), label: surface }));
  for (const surface of surfaceEntries) {
    const resolved = withinTarget(target, surface);
    if (!resolved.missing && await exists(resolved.absolute)) evidenceEntries.add(surface);
  }

  const found = [];
  const missing = [];
  for (const entry of [...evidenceEntries].sort()) {
    const result = await readArtifact(target, entry, 'user-supplied');
    if (result.missing) missing.push(result.missing);
    else found.push(result.artifact);
  }

  const inspections = [];
  for (const artifact of found) {
    if (!artifact.categories.includes('rendered')) continue;
    const result = inspectHtmlArtifact(artifact);
    artifact.categories = result.categories;
    inspections.push(...result.inspections);
  }

  const evidenceDir = path.join(target, '.design/receipts/evidence', generatedAt.replace(/[:.]/g, '-'));
  await fs.mkdir(evidenceDir, { recursive: true });
  const rendered = found.filter((artifact) => artifact.categories.includes('rendered'));
  let renderedIndex = 1;
  for (const artifact of rendered) {
    const browserScreenshot = await writeBrowserScreenshot(target, evidenceDir, artifact, renderedIndex);
    if (browserScreenshot) found.push(browserScreenshot);
    const capture = await writeStaticCapture(target, evidenceDir, artifact, renderedIndex);
    found.push(capture);
    renderedIndex += 1;
  }

  const categoryCounts = {};
  for (const artifact of found) {
    for (const category of artifact.categories) categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
  }
  const statesDetected = detectStates(found);
  const statesMissing = [...new Set(expectedStates)].filter((state) => !statesDetected.includes(state));
  const coverage = Object.fromEntries(
    ['rendered', 'screenshot', 'accessibility', 'responsiveness', 'keyboard', 'overflow', 'states', 'baseline']
      .map((category) => [category, { present: Boolean(categoryCounts[category]), count: categoryCounts[category] ?? 0 }]),
  );
  coverage.states.expected = [...new Set(expectedStates)];
  coverage.states.detected = statesDetected;
  coverage.states.missing = statesMissing;

  const manifest = {
    schemaVersion: 1,
    generatedAt,
    surfaces: renderedSurfaces,
    artifacts: found.map(({ text, absolute, ...artifact }) => artifact),
    inspections,
    coverage,
  };
  await fs.writeFile(path.join(evidenceDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return {
    found: found.map(({ text, absolute, ...artifact }) => artifact),
    missing,
    inspections,
    coverage,
    directory: relativePosix(target, evidenceDir),
  };
}

async function readBaseline(target, relative) {
  const result = await readArtifact(target, relative, 'baseline');
  if (result.missing) return null;
  if (path.extname(result.artifact.path).toLowerCase() !== '.json') return null;
  try {
    const data = JSON.parse(result.artifact.text);
    return { path: result.artifact.path, data };
  } catch {
    return null;
  }
}

async function compareBaselines({ target, renderedSurfaces, evidence, baselines }) {
  const baselineEntries = new Set(entryList(baselines));
  for (const surface of renderedSurfaces) {
    for (const candidate of [
      `design/references/baselines/${surface.id}.json`,
      `design/references/${surface.id}.baseline.json`,
      `.design/baselines/${surface.id}.json`,
    ]) {
      const resolved = withinTarget(target, candidate);
      if (!resolved.missing && await exists(resolved.absolute)) baselineEntries.add(candidate);
    }
  }

  const comparisons = [];
  const screenshot = evidence.found.find((artifact) => artifact.categories.includes('screenshot'));
  const rendered = evidence.found.find((artifact) => artifact.categories.includes('rendered'));
  for (const entry of [...baselineEntries].sort()) {
    const baseline = await readBaseline(target, entry);
    if (!baseline) continue;
    const expected = baseline.data.sha256 ?? baseline.data.hash ?? baseline.data.screenshotSha256 ?? baseline.data.renderedSha256;
    const actual = baseline.data.compare === 'rendered' ? rendered : screenshot ?? rendered;
    const approved = !expected
      || actual?.sha256 === expected
      || entryList(baseline.data.approvedHashes).includes(actual?.sha256)
      || baseline.data.approvedChangeHash === actual?.sha256;
    comparisons.push({
      baseline: baseline.path,
      surface: baseline.data.surface ?? null,
      expectedHash: expected ?? null,
      actualHash: actual?.sha256 ?? null,
      actualEvidence: actual?.path ?? null,
      approved,
      change: Boolean(expected && actual?.sha256 && actual.sha256 !== expected),
    });
  }
  return comparisons;
}

export async function verifyDesign({ target, request = null, mode = 'development', surfaces = [], evidence = [], baselines = [] }) {
  const generatedAt = new Date().toISOString();
  const [generated, task, check] = await Promise.all([
    getResolutionStatus({ target }),
    readTask(target, request),
    checkDesign({ target, mode }),
  ]);
  const renderedSurfaces = entryList(surfaces).map((surface) => ({ id: safeId(surface), label: surface }));
  const expectedStates = Array.isArray(task.taskModel?.states) ? task.taskModel.states : [];
  const evidenceReport = await collectEvidence({ target, surfaces, evidence, generatedAt, expectedStates });
  const baselineComparisons = await compareBaselines({ target, renderedSurfaces, evidence: evidenceReport, baselines });
  const warnings = [];
  if (!generated.current) warnings.push(`Compiled context is ${generated.state}.`);
  if (!task.taskModel) warnings.push('No task model was available from design resolve.');
  if (renderedSurfaces.length === 0) warnings.push('No rendered surfaces were declared.');
  if (evidenceReport.found.length === 0) warnings.push('No rendered, screenshot, accessibility, keyboard, responsiveness, overflow, state, or baseline evidence file was supplied.');
  for (const item of evidenceReport.missing) warnings.push(`Evidence file ${item.path} is ${item.reason}.`);
  for (const inspection of evidenceReport.inspections.filter((item) => item.severity === 'warning')) warnings.push(`${inspection.ruleId}: ${inspection.message}`);

  const missingReleaseEvidence = mode === 'release'
    ? RELEASE_EVIDENCE
      .filter(([category]) => !evidenceReport.coverage[category]?.present)
      .map(([category, ruleId, message]) => ({ type: 'missing-evidence-category', category, ruleId, message }))
    : [];
  const missingStateEvidence = mode === 'release'
    ? evidenceReport.coverage.states.missing.map((state) => ({
      type: 'missing-state-evidence',
      category: 'states',
      state,
      ruleId: 'DS-STATE-001',
      message: `Resolved task state "${state}" was not present in rendered evidence.`,
    }))
    : [];
  const unapprovedBaselineChanges = baselineComparisons
    .filter((comparison) => comparison.change && !comparison.approved)
    .map((comparison) => ({ type: 'unapproved-baseline-change', ruleId: 'DS-CI-001', ...comparison }));

  const blocking = [
    ...check.findings.filter((finding) => finding.severity === 'error').map((finding) => ({ type: 'check-error', ruleId: finding.ruleId, file: finding.file, message: finding.message })),
    ...evidenceReport.inspections.filter((finding) => finding.severity === 'error').map((finding) => ({ type: 'evidence-error', ruleId: finding.ruleId, file: finding.file, message: finding.message })),
    ...(generated.current ? [] : [{ type: 'stale-context', ruleId: 'DS-CI-001', state: generated.state }]),
    ...(renderedSurfaces.length === 0 ? [{ type: 'missing-rendered-surfaces', ruleId: 'DS-EVIDENCE-001' }] : []),
    ...(evidenceReport.found.length === 0 ? [{ type: 'missing-evidence', ruleId: 'DS-EVIDENCE-001' }] : []),
    ...missingReleaseEvidence,
    ...missingStateEvidence,
    ...unapprovedBaselineChanges,
  ];

  const receipt = {
    schemaVersion: 1,
    action: 'verify',
    target,
    mode,
    generatedAt,
    revision: gitRevision(target),
    contractFingerprint: generated.expectedFingerprint ?? generated.actualFingerprint ?? task.fingerprint ?? null,
    taskModel: task.taskModel,
    rules: [...new Set([...check.findings.map((finding) => finding.ruleId), ...evidenceReport.inspections.map((finding) => finding.ruleId), ...RELEASE_EVIDENCE.map(([, ruleId]) => ruleId)])].sort(),
    renderedSurfaces,
    results: {
      check: check.summary,
      context: generated,
      evidence: evidenceReport,
      baselines: baselineComparisons,
    },
    warnings,
    exceptions: check.findings.filter((finding) => finding.ruleId === 'DS-GOV-001'),
    visualChanges: [
      ...evidenceReport.found.filter((artifact) => artifact.categories.includes('screenshot')),
      ...baselineComparisons.filter((comparison) => comparison.change),
    ],
    blocking,
    healthy: blocking.length === 0 && (mode !== 'release' || warnings.length === 0),
  };
  receipt.receiptHash = hash(JSON.stringify({
    revision: receipt.revision,
    contractFingerprint: receipt.contractFingerprint,
    taskModel: receipt.taskModel,
    results: receipt.results,
    blocking: receipt.blocking,
  }));
  const receiptDir = path.join(target, '.design/receipts');
  await fs.mkdir(receiptDir, { recursive: true });
  const name = `design-receipt-${receipt.generatedAt.replace(/[:.]/g, '-')}.json`;
  await fs.writeFile(path.join(receiptDir, name), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(receiptDir, 'latest.json'), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  return { ...receipt, receipt: `.design/receipts/${name}` };
}

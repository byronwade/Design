import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  checkDesign, doctorContract, explainContract, installContract, resolveInstalledContract,
  recordContextDsDriftEvidence,
  resolveTaskContext, statusContract, syncContract, validatePackage, validateProject,
  verifyDesign,
} from '../src/core.mjs';

const temp = () => fs.mkdtemp(path.join(os.tmpdir(), 'design-facade-'));

const verifiedHtml = (body = 'No results.') => `<!doctype html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    main { max-width: 720px; overflow-wrap: anywhere; }
    button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    @media (max-width: 520px) { main { display: block; } }
  </style>
</head>
<body>
  <main data-state="empty">
    <h1>Review queue</h1>
    <p role="status">${body}</p>
    <button aria-label="Approve request" data-state="default">Approve</button>
    <button disabled data-state="disabled">Queued</button>
    <p data-state="loading" aria-busy="true" hidden>Loading queue.</p>
    <p data-state="permission" hidden>Permission required.</p>
    <p role="alert" hidden>Unable to load queue.</p>
  </main>
</body>
</html>
`;

async function ready(target) {
  await fs.writeFile(path.join(target, 'design/PROJECT.md'), '# Project\n\n- **Name:** Acme\n\n| Situation | Person | Outcome | Next | Frequency | Risk |\n| --- | --- | --- | --- | --- | --- |\n| Review | Admin | Update | Continue | daily | low |\n');
  await fs.writeFile(path.join(target, 'design/COMPONENTS.md'), '# Components\n\n| Intent | Code | Status |\n| --- | --- | --- |\n| action.button | Button | approved |\n');
  await fs.writeFile(path.join(target, 'design/COMPOSITION.json'), `${JSON.stringify({
    schemaVersion: 1,
    adapter: 'none',
    registry: 'project-local',
    style: 'project-owned',
    componentSource: { adapter: 'none', required: false, installed: false, registry: 'project-local', style: 'project-owned', referenceAdapters: [{ name: 'shadcn/ui', registry: 'https://ui.shadcn.com', style: 'new-york', required: false, installed: false }] },
    paths: { ui: 'src/components/ui', blocks: 'src/components/blocks', recipes: 'design/recipes', references: 'design/references' },
    visualReferences: { required: false, bundled: false, registry: 'design/REFERENCES.md', paths: ['design/references'], recommendedStarterCount: 10, metadataFields: ['surface', 'flow', 'pattern', 'interaction', 'source/provenance', 'applicability', 'what to preserve', 'what not to copy'], aiPolicy: 'Inspect applicable approved references before visual changes.' },
    skillStack: { required: true, registryPaths: ['.agents/skills', '.claude/skills', 'skills'], dispatchPolicy: 'Select the smallest applicable design-system Skill before UI work.', defaultSkills: [{ name: 'design-system', path: '.agents/skills/design-system/SKILL.md', required: true, when: 'Before UI work.', purpose: 'Apply the compiled contract.' }, { name: 'design-review', path: '.agents/skills/design-review/SKILL.md', required: true, when: 'Before approval.', purpose: 'Review rendered states.' }] },
    appTypes: { 'saas-workbench': { label: 'SaaS workbench', targetProfile: 'web-app', shell: 'deep workbench', layout: 'operational canvas', blocks: ['sidebar'], intents: ['navigation.global'] } },
    policies: { reuseBeforeCreate: true, tokenAuthority: 'DESIGN.md', mappingAuthority: 'design/COMPONENTS.md', newPrimitiveRequiresDecision: true, verifyRenderedStates: true, blockReuse: 'prefer', componentLibraryRequired: false, skillsRequired: true },
  }, null, 2)}\n`);
}

test('installs a minimal one-file façade instead of copying the engine', async () => {
  const target = await temp();
  const result = await installContract({ target, profiles: ['web-app'], adapters: ['codex','claude','copilot'] });
  assert.deepEqual(result.generatedTargets, ['web-app']);
  for (const file of ['DESIGN.md','AGENTS.md','CLAUDE.md','design/references','.agents/skills/design/SKILL.md','.design/config.json','.design/lock.json','.design/generated/web-app.md','.design/generated/web-app.json']) await fs.access(path.join(target, file));
  for (const file of ['design/PROJECT.md','design/COMPONENTS.md','design/REFERENCES.md','design/DECISIONS.md','design/COMPOSITION.json']) await assert.rejects(() => fs.access(path.join(target, file)));
  await assert.rejects(() => fs.access(path.join(target, '.design/global/PRINCIPLES.md')));
  assert.match(await fs.readFile(path.join(target, 'CLAUDE.md'), 'utf8'), /^@AGENTS\.md/m);
  assert.match(await fs.readFile(path.join(target, 'AGENTS.md'), 'utf8'), /npx --yes github:byronwade\/Design resolve --request/);
  const contract = await fs.readFile(path.join(target, '.design/generated/web-app.md'), 'utf8');
  assert.match(contract, /Web application overlay/);
  assert.doesNotMatch(contract, /Web marketing overlay/);
});

test('compiles several targets without mixing sibling profiles', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app','web-marketing','ios-native'], adapters: [] });
  const app = await fs.readFile(path.join(target, '.design/generated/web-app.md'), 'utf8');
  const marketing = await fs.readFile(path.join(target, '.design/generated/web-marketing.md'), 'utf8');
  const ios = await fs.readFile(path.join(target, '.design/generated/ios-native.md'), 'utf8');
  assert.match(app, /Web application overlay/);
  assert.doesNotMatch(app, /Web marketing overlay/);
  assert.match(marketing, /Web marketing overlay/);
  assert.doesNotMatch(marketing, /iPhone conventions/);
  assert.match(ios, /iPhone conventions/);
  assert.doesNotMatch(ios, /Android overlay/);
});

test('selects an app type and compiles component-agnostic composition', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [], appType: 'saas-workbench' });
  const config = JSON.parse(await fs.readFile(path.join(target, '.design/config.json'), 'utf8'));
  assert.equal(config.targets[0].appType, 'saas-workbench');
  await resolveInstalledContract({ target });
  const contract = await fs.readFile(path.join(target, '.design/generated/web-app.md'), 'utf8');
  assert.match(contract, /app type: `saas-workbench`/);
  assert.match(contract, /No app-type composition recipe selected for this target/);
});

test('resolves a bounded task packet without dumping the full engine', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const packet = await resolveTaskContext({ target, request: 'Add a delete confirmation dialog with a primary button' });
  assert.equal(packet.action, 'resolve');
  assert.equal(packet.taskModel.risk, 'high');
  assert.ok(packet.relevant.components.includes('button'));
  assert.ok(packet.relevant.components.includes('dialog'));
  assert.ok(packet.relevant.documents.every((document) => document.source === 'project'));
  await fs.access(path.join(target, '.design/generated/TASK.json'));
});

test('rejects an invalid composition adapter before release', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  await ready(target);
  await resolveInstalledContract({ target });
  const compositionPath = path.join(target, 'design/COMPOSITION.json');
  const composition = JSON.parse(await fs.readFile(compositionPath, 'utf8'));
  composition.adapter = 'invented';
  await fs.writeFile(compositionPath, `${JSON.stringify(composition, null, 2)}\n`);
  const report = await validateProject({ target, google: false, mode: 'release' });
  assert.ok(report.summary.errors > 0);
  assert.ok(report.findings.some((finding) => finding.path === 'design/COMPOSITION.json'));
});

test('detects stale and hand-edited generated context', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  await fs.appendFile(path.join(target, 'DESIGN.md'), '\n<!-- edit -->\n');
  assert.equal((await statusContract({ target })).generated.state, 'stale');
  await resolveInstalledContract({ target });
  assert.equal((await statusContract({ target })).generated.state, 'current');
  await fs.appendFile(path.join(target, '.design/generated/web-app.md'), '\ntampered\n');
  assert.equal((await statusContract({ target })).generated.state, 'tampered');
});

test('requires synchronization before a different engine version compiles context', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const lockPath = path.join(target, '.design/lock.json');
  const lock = JSON.parse(await fs.readFile(lockPath, 'utf8'));
  lock.packageVersion = '0.0.0';
  await fs.writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  assert.equal((await statusContract({ target })).generated.state, 'engine-update-required');
  await assert.rejects(() => resolveInstalledContract({ target }), /Run design-contract sync/);
  await syncContract({ target });
  assert.equal((await statusContract({ target })).generated.state, 'current');
});

test('sync preserves project-owned identity and decisions', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: ['codex'] });
  await fs.appendFile(path.join(target, 'DESIGN.md'), '\n<!-- identity -->\n');
  await fs.writeFile(path.join(target, 'design/DECISIONS.md'), '# Legacy decisions\n\n## D-100\nPreserve me.\n');
  await syncContract({ target });
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /identity/);
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /Preserve me/);
  await assert.rejects(() => fs.access(path.join(target, 'design/DECISIONS.md')));
});

test('sync migrates the previous copied-engine installation', async () => {
  const target = await temp();
  await fs.mkdir(path.join(target, '.design/project'), { recursive: true });
  await fs.mkdir(path.join(target, '.design/governance'), { recursive: true });
  await fs.mkdir(path.join(target, '.design/global'), { recursive: true });
  await fs.writeFile(path.join(target, '.design/project.json'), JSON.stringify({ schemaVersion: 1, targets: [{ id: 'app', profile: 'web-app', root: '.', default: true }], adapters: [] }));
  await fs.writeFile(path.join(target, '.design/DESIGN.md'), '# Legacy visual contract\n');
  await fs.writeFile(path.join(target, '.design/project/CONTEXT.md'), '# Legacy context\n\nPreserve project context.\n');
  await fs.writeFile(path.join(target, '.design/project/COMPONENTS.md'), '# Legacy components\n\nPreserve component mapping.\n');
  await fs.writeFile(path.join(target, '.design/governance/DECISIONS.md'), '# Legacy decisions\n\nPreserve decision.\n');
  await fs.writeFile(path.join(target, '.design/global/PRINCIPLES.md'), '# Copied engine file\n');
  const result = await syncContract({ target });
  assert.match(result.migration?.to, /one-file-control-plane|1\.1-facade/);
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /Legacy visual contract/);
  const design = await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8');
  assert.match(design, /Preserve project context/);
  assert.match(design, /Preserve component mapping/);
  assert.match(design, /Preserve decision/);
  await assert.rejects(() => fs.access(path.join(target, 'design/PROJECT.md')));
  await assert.rejects(() => fs.access(path.join(target, 'design/COMPONENTS.md')));
  await assert.rejects(() => fs.access(path.join(target, 'design/DECISIONS.md')));
  await assert.rejects(() => fs.access(path.join(target, '.design/global/PRINCIPLES.md')));
  await fs.access(path.join(target, '.design/generated/app.md'));
});

test('migration backs up conflicting authored files instead of replacing them', async () => {
  const target = await temp();
  await fs.mkdir(path.join(target, '.design/project'), { recursive: true });
  await fs.mkdir(path.join(target, '.design/governance'), { recursive: true });
  await fs.mkdir(path.join(target, 'design'), { recursive: true });
  await fs.writeFile(path.join(target, 'DESIGN.md'), '# Existing root design\n');
  await fs.writeFile(path.join(target, 'design/PROJECT.md'), '# Existing project context\n');
  await fs.writeFile(path.join(target, '.design/DESIGN.md'), '# Different legacy design\n');
  await fs.writeFile(path.join(target, '.design/project/CONTEXT.md'), '# Different legacy context\n');
  await fs.writeFile(path.join(target, '.design/project/COMPONENTS.md'), '# Legacy components\n');
  await fs.writeFile(path.join(target, '.design/governance/DECISIONS.md'), '# Legacy decisions\n');
  await fs.writeFile(path.join(target, '.design/project.json'), JSON.stringify({ schemaVersion: 1, targets: [{ id: 'app', profile: 'web-app', root: '.', default: true }], adapters: [] }));
  const result = await syncContract({ target });
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /Existing root design/);
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /Existing project context/);
  await assert.rejects(() => fs.access(path.join(target, 'design/PROJECT.md')));
  assert.ok(result.migration.backups.length >= 2);
  for (const relative of result.migration.backups) await fs.access(path.join(target, relative));
});

test('development and release validate the one-file starter grammar', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  assert.equal((await doctorContract({ target, mode: 'development' })).healthy, true);
  assert.equal((await doctorContract({ target, mode: 'release' })).healthy, true);
  assert.equal((await validateProject({ target, google: false, mode: 'development' })).summary.errors, 0);
  await resolveInstalledContract({ target });
  assert.equal((await validateProject({ target, google: false, mode: 'release' })).summary.errors, 0);
});

test('check and verify produce machine-readable receipts', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  await resolveTaskContext({ target, request: 'Add an approved empty state' });
  const check = await checkDesign({ target });
  assert.equal(check.summary.errors, 0, JSON.stringify(check.findings));
  await fs.writeFile(path.join(target, 'empty-state.html'), verifiedHtml());
  const receipt = await verifyDesign({ target, request: 'Add an approved empty state', mode: 'release', surfaces: ['empty-state'], evidence: ['empty-state.html'] });
  assert.equal(receipt.healthy, true, JSON.stringify(receipt.blocking));
  assert.match(receipt.receipt, /\.design\/receipts\/design-receipt-/);
  assert.equal(receipt.results.evidence.coverage.rendered.present, true);
  assert.equal(receipt.results.evidence.coverage.screenshot.present, true);
  assert.equal(receipt.results.evidence.coverage.accessibility.present, true);
  assert.equal(receipt.results.evidence.coverage.responsiveness.present, true);
  assert.equal(receipt.results.evidence.coverage.keyboard.present, true);
  assert.equal(receipt.results.evidence.coverage.overflow.present, true);
  assert.equal(receipt.results.evidence.coverage.states.present, true);
  assert.ok(receipt.visualChanges.some((artifact) => artifact.staticCapture));
  await fs.access(path.join(target, receipt.results.evidence.directory, 'manifest.json'));
  await fs.access(path.join(target, '.design/receipts/latest.json'));
});

test('release verify blocks weak evidence and unapproved baseline changes', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  await resolveTaskContext({ target, request: 'Add an approved empty state' });
  await fs.writeFile(path.join(target, 'weak.html'), '<main><button></button></main>\n');
  const weak = await verifyDesign({ target, mode: 'release', surfaces: ['weak'], evidence: ['weak.html'] });
  assert.equal(weak.healthy, false);
  assert.ok(weak.blocking.some((item) => item.type === 'evidence-error' && item.ruleId === 'DS-A11Y-001'));
  assert.ok(weak.blocking.some((item) => item.type === 'missing-evidence-category' && item.category === 'states'));

  await fs.writeFile(path.join(target, 'strong.html'), verifiedHtml('Ready for review.'));
  await fs.mkdir(path.join(target, 'design/references/baselines'), { recursive: true });
  await fs.writeFile(path.join(target, 'design/references/baselines/strong.json'), `${JSON.stringify({
    schemaVersion: 1,
    surface: 'strong',
    compare: 'rendered',
    sha256: 'not-the-current-rendered-hash',
  }, null, 2)}\n`);
  const changed = await verifyDesign({ target, mode: 'release', surfaces: ['strong'], evidence: ['strong.html'] });
  assert.equal(changed.healthy, false);
  assert.ok(changed.blocking.some((item) => item.type === 'unapproved-baseline-change'));
});

test('check detects invalid variants and unmapped surfaces', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  await fs.mkdir(path.join(target, 'src/app/settings'), { recursive: true });
  await fs.writeFile(path.join(target, 'src/app/settings/page.tsx'), 'export default function SettingsPage() { return <Button variant="sparkle">Save</Button>; }\n');
  const report = await checkDesign({ target });
  assert.ok(report.findings.some((finding) => finding.ruleId === 'DS-COMPONENT-003'), JSON.stringify(report.findings));
  assert.ok(report.findings.some((finding) => finding.ruleId === 'DS-PROJECT-004' && finding.evidence === '/settings'), JSON.stringify(report.findings));
});

test('ContextDS adapter records drift evidence without replacing design truth', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const before = await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8');
  const receipt = await recordContextDsDriftEvidence({
    target,
    observations: [{ surface: '/settings', kind: 'spacing-drift', summary: 'Observed dense spacing differs from approved reference.' }],
  });
  assert.equal(receipt.adapter.required, false);
  assert.equal(receipt.observations[0].canReplaceDesignTruth, false);
  assert.equal(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), before);
  await fs.access(path.join(target, receipt.receipt));
});

test('explains profiles and stable quality rules', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  assert.equal((await explainContract({ target, query: 'web-app' })).type, 'profile');
  const search = await explainContract({ target, query: 'accessibility' });
  assert.ok(search.candidates.some((item) => item.type === 'rule' || item.type === 'layer'));
});

test('rejects path traversal and validates the package structure', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const file = path.join(target, '.design/config.json');
  const config = JSON.parse(await fs.readFile(file, 'utf8'));
  config.targets[0].overrides = ['../outside.md'];
  await fs.writeFile(file, JSON.stringify(config, null, 2));
  await assert.rejects(() => resolveInstalledContract({ target }), /escapes its allowed root/);
  const packageReport = await validatePackage({ google: false });
  assert.equal(packageReport.summary.errors, 0, JSON.stringify(packageReport.findings));
});

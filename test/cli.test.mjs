import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  doctorContract, explainContract, installContract, resolveInstalledContract,
  statusContract, syncContract, validatePackage, validateProject,
} from '../src/core.mjs';

const temp = () => fs.mkdtemp(path.join(os.tmpdir(), 'design-facade-'));

async function ready(target) {
  await fs.writeFile(path.join(target, 'design/PROJECT.md'), '# Project\n\n- **Name:** Acme\n\n| Situation | Person | Outcome | Next | Frequency | Risk |\n| --- | --- | --- | --- | --- | --- |\n| Review | Admin | Update | Continue | daily | low |\n');
  await fs.writeFile(path.join(target, 'design/COMPONENTS.md'), '# Components\n\n| Intent | Code | Status |\n| --- | --- | --- |\n| action.button | Button | approved |\n');
  await fs.writeFile(path.join(target, 'design/COMPOSITION.json'), `${JSON.stringify({
    schemaVersion: 1,
    adapter: 'shadcn',
    registry: 'https://ui.shadcn.com',
    style: 'new-york',
    paths: { ui: 'src/components/ui', blocks: 'src/components/blocks', recipes: 'design/recipes' },
    appTypes: { 'saas-workbench': { label: 'SaaS workbench', targetProfile: 'web-app', shell: 'deep workbench', layout: 'operational canvas', blocks: ['sidebar'], intents: ['navigation.global'] } },
    policies: { reuseBeforeCreate: true, tokenAuthority: 'DESIGN.md', mappingAuthority: 'design/COMPONENTS.md', newPrimitiveRequiresDecision: true, verifyRenderedStates: true, blockReuse: 'prefer' },
  }, null, 2)}\n`);
}

test('installs a minimal façade instead of copying the engine', async () => {
  const target = await temp();
  const result = await installContract({ target, profiles: ['web-app'], adapters: ['codex','claude','copilot'] });
  assert.deepEqual(result.generatedTargets, ['web-app']);
  for (const file of ['DESIGN.md','AGENTS.md','CLAUDE.md','design/PROJECT.md','design/COMPONENTS.md','design/DECISIONS.md','design/COMPOSITION.json','.design/config.json','.design/lock.json','.design/generated/web-app.md','.design/generated/web-app.json']) await fs.access(path.join(target, file));
  await assert.rejects(() => fs.access(path.join(target, '.design/global/PRINCIPLES.md')));
  assert.match(await fs.readFile(path.join(target, 'CLAUDE.md'), 'utf8'), /^@AGENTS\.md/m);
  assert.match(await fs.readFile(path.join(target, 'AGENTS.md'), 'utf8'), /npx --yes github:byronwade\/Design status/);
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

test('selects an app type and compiles the shadcn composition contract', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [], appType: 'saas-workbench' });
  const config = JSON.parse(await fs.readFile(path.join(target, '.design/config.json'), 'utf8'));
  assert.equal(config.targets[0].appType, 'saas-workbench');
  await ready(target);
  await resolveInstalledContract({ target });
  const contract = await fs.readFile(path.join(target, '.design/generated/web-app.md'), 'utf8');
  assert.match(contract, /app type: `saas-workbench`/);
  assert.match(contract, /Adapter: \*\*shadcn\*\* · style: \*\*new-york\*\* · recipe: \*\*saas-workbench\*\*/);
  assert.match(contract, /project:design\/COMPOSITION\.json/);
  assert.match(contract, /https:\/\/ui\.shadcn\.com/);
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
  await fs.appendFile(path.join(target, 'design/DECISIONS.md'), '\n## D-100\nPreserve me.\n');
  await syncContract({ target });
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /identity/);
  assert.match(await fs.readFile(path.join(target, 'design/DECISIONS.md'), 'utf8'), /Preserve me/);
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
  assert.equal(result.migration?.to, '1.1-facade');
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /Legacy visual contract/);
  assert.match(await fs.readFile(path.join(target, 'design/PROJECT.md'), 'utf8'), /Preserve project context/);
  assert.match(await fs.readFile(path.join(target, 'design/COMPONENTS.md'), 'utf8'), /Preserve component mapping/);
  assert.match(await fs.readFile(path.join(target, 'design/DECISIONS.md'), 'utf8'), /Preserve decision/);
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
  assert.match(await fs.readFile(path.join(target, 'design/PROJECT.md'), 'utf8'), /Existing project context/);
  assert.ok(result.migration.backups.length >= 2);
  for (const relative of result.migration.backups) await fs.access(path.join(target, relative));
});

test('development allows placeholders while release mode blocks them', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  assert.equal((await doctorContract({ target, mode: 'development' })).healthy, true);
  assert.equal((await doctorContract({ target, mode: 'release' })).healthy, false);
  assert.equal((await validateProject({ target, google: false, mode: 'development' })).summary.errors, 0);
  await ready(target);
  await resolveInstalledContract({ target });
  assert.equal((await validateProject({ target, google: false, mode: 'release' })).summary.errors, 0);
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

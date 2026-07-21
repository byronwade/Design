import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  doctorContract, installContract, resolveInstalledContract,
  statusContract, syncContract, validatePackage, validateProject,
} from '../src/core.mjs';

const temp = () => fs.mkdtemp(path.join(os.tmpdir(), 'design-facade-'));

async function ready(target) {
  await fs.writeFile(path.join(target, 'design/PROJECT.md'), '# Project\n\n- **Name:** Acme\n\n| Situation | Person | Outcome | Next | Frequency | Risk |\n| --- | --- | --- | --- | --- | --- |\n| Review | Admin | Update | Continue | daily | low |\n');
  await fs.writeFile(path.join(target, 'design/COMPONENTS.md'), '# Components\n\n| Intent | Code | Status |\n| --- | --- | --- |\n| action.button | Button | approved |\n');
}

test('installs a minimal façade instead of copying the engine', async () => {
  const target = await temp();
  const result = await installContract({ target, profiles: ['web-app'], adapters: ['codex','claude','copilot'] });
  assert.deepEqual(result.generatedTargets, ['web-app']);
  for (const file of ['DESIGN.md','AGENTS.md','CLAUDE.md','design/PROJECT.md','design/COMPONENTS.md','design/DECISIONS.md','.design/config.json','.design/lock.json','.design/generated/web-app.md','.design/generated/web-app.json']) await fs.access(path.join(target, file));
  await assert.rejects(() => fs.access(path.join(target, '.design/global/PRINCIPLES.md')));
  assert.match(await fs.readFile(path.join(target, 'CLAUDE.md'), 'utf8'), /^@AGENTS\.md/m);
  const contract = await fs.readFile(path.join(target, '.design/generated/web-app.md'), 'utf8');
  assert.match(contract, /Web application overlay/);
  assert.doesNotMatch(contract, /Web marketing overlay/);
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

test('sync preserves project-owned identity and decisions', async () => {
  const target = await temp();
  await installContract({ target, profiles: ['web-app'], adapters: ['codex'] });
  await fs.appendFile(path.join(target, 'DESIGN.md'), '\n<!-- identity -->\n');
  await fs.appendFile(path.join(target, 'design/DECISIONS.md'), '\n## D-100\nPreserve me.\n');
  await syncContract({ target });
  assert.match(await fs.readFile(path.join(target, 'DESIGN.md'), 'utf8'), /identity/);
  assert.match(await fs.readFile(path.join(target, 'design/DECISIONS.md'), 'utf8'), /Preserve me/);
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

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  expandProfile,
  getResolutionStatus,
  installContract,
  listProfiles,
  resolveInstalledContract,
  statusContract,
  syncContract,
  validateContract,
} from '../src/core.mjs';
import { loadManifest } from '../src/manifest.mjs';

async function tempProject() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'design-contract-'));
}

test('lists the required native, web, Linux, iPadOS, and composite profiles', async () => {
  const ids = (await listProfiles()).map((profile) => profile.id);
  for (const id of ['ios-native','ipados-native','android-native','macos-native','windows-native','linux-gnome','linux-kde','web-app','web-marketing','electron-macos']) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
});

test('installs, resolves project truth, validates, and creates reviewer adapters', async () => {
  const target = await tempProject();
  const installed = await installContract({ target, profiles: ['web-app'], adapters: ['codex','claude','copilot'] });
  assert.equal(installed.validation.errors, 0);
  const contractPath = path.join(target, '.design/generated/web-app/CONTRACT.md');
  const contract = await fs.readFile(contractPath, 'utf8');
  assert.match(contract, /Product and design context/);
  assert.match(contract, /Product surface and layout registry/);
  assert.match(contract, /Production component and pattern registry/);
  assert.match(contract, /Design decisions/);
  assert.ok(contract.indexOf('Web application overlay') < contract.indexOf('Product and design context'));
  await fs.access(path.join(target, '.agents/skills/design-system/SKILL.md'));
  await fs.access(path.join(target, '.agents/skills/design-review/SKILL.md'));
  await fs.access(path.join(target, '.claude/skills/design-review/SKILL.md'));

  const report = await validateContract({ source: path.join(target, '.design'), google: false });
  assert.equal(report.summary.errors, 0, JSON.stringify(report.findings));
  assert.ok(report.findings.some((finding) => finding.code === 'DS-PROJECT-003'));
  assert.equal((await getResolutionStatus({ target })).current, true);
});

test('project-owned mappings make context stale, resolve into context, and survive synchronization', async () => {
  const target = await tempProject();
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const components = path.join(target, '.design/project/COMPONENTS.md');
  await fs.appendFile(components, '\n## Project mapping\n\nUse `@acme/ui/Button`.\n');
  assert.equal((await getResolutionStatus({ target })).state, 'stale');
  await resolveInstalledContract({ target });
  const contract = await fs.readFile(path.join(target, '.design/generated/web-app/CONTRACT.md'), 'utf8');
  assert.match(contract, /@acme\/ui\/Button/);
  const synchronized = await syncContract({ target });
  assert.equal(synchronized.validation.errors, 0);
  assert.match(await fs.readFile(components, 'utf8'), /@acme\/ui\/Button/);
  assert.equal((await statusContract({ target })).generated.current, true);
});

test('resolves desktop webview inheritance before host platform conventions', async () => {
  const target = await tempProject();
  await installContract({ target, profiles: ['electron-macos'], adapters: [] });
  const contract = await fs.readFile(path.join(target, '.design/generated/electron-macos/CONTRACT.md'), 'utf8');
  assert.ok(contract.indexOf('Web application overlay') < contract.indexOf('Desktop webview application overlay'));
  assert.ok(contract.indexOf('Desktop webview application overlay') < contract.indexOf('macOS overlay'));
});

test('keeps sibling mobile verticals out of each resolved profile', async () => {
  const manifest = await loadManifest();
  const ios = expandProfile(manifest, 'ios-native');
  assert.ok(ios.includes('vertical.mobile.apple'));
  assert.ok(ios.includes('vertical.mobile.ios'));
  assert.ok(!ios.includes('vertical.mobile.ipados'));
  assert.ok(!ios.includes('vertical.mobile.android'));
  const ipad = expandProfile(manifest, 'ipados-native');
  assert.ok(ipad.includes('vertical.mobile.ipados'));
  assert.ok(!ipad.includes('vertical.mobile.ios'));
});

test('quality rule IDs are unique and stable-shaped', async () => {
  const rules = JSON.parse(await fs.readFile(new URL('../.design/quality/RULES.json', import.meta.url), 'utf8'));
  const ids = rules.rules.map((rule) => rule.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^DS-[A-Z0-9]+-[0-9]{3}$/);
});

test('rejects unknown profiles and override path traversal', async () => {
  const target = await tempProject();
  await assert.rejects(() => installContract({ target, profiles: ['not-a-profile'], adapters: [] }), /Unknown profile/);
  await installContract({ target, profiles: ['web-app'], adapters: [] });
  const configPath = path.join(target, '.design/project.json');
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
  config.overrides = ['../secret.md'];
  await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
  await assert.rejects(() => resolveInstalledContract({ target }), /escapes \.design/);
});

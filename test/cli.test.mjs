import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  expandProfile,
  installContract,
  listProfiles,
  resolveInstalledContract,
  syncContract,
  validateContract,
} from '../src/core.mjs';

async function tempProject() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'design-contract-'));
}

test('lists the required vertical profiles', async () => {
  const ids = (await listProfiles()).map((profile) => profile.id);
  for (const id of ['ios-native','android-native','macos-native','windows-native','linux-gnome','linux-kde','web-app','web-marketing']) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
});

test('installs, resolves, validates, and synchronizes a web app', async () => {
  const target = await tempProject();
  const installed = await installContract({ target, profiles: ['web-app'], adapters: ['codex','claude','copilot'] });
  assert.equal(installed.validation.errors, 0);
  await fs.access(path.join(target, '.design/generated/web-app/CONTRACT.md'));
  await fs.access(path.join(target, '.agents/skills/design-system/SKILL.md'));
  await fs.access(path.join(target, 'CLAUDE.md'));

  const report = await validateContract({ source: path.join(target, '.design'), google: false });
  assert.equal(report.summary.errors, 0, JSON.stringify(report.findings));

  const decisions = path.join(target, '.design/governance/DECISIONS.md');
  await fs.appendFile(decisions, '\n## Project decision\n\nPreserve me.\n');
  const synchronized = await syncContract({ target });
  assert.equal(synchronized.validation.errors, 0);
  assert.match(await fs.readFile(decisions, 'utf8'), /Preserve me/);
});

test('resolves composite Electron inheritance in deterministic order', async () => {
  const target = await tempProject();
  await installContract({ target, profiles: ['electron-macos'], adapters: [] });
  await resolveInstalledContract({ target });
  const contract = await fs.readFile(path.join(target, '.design/generated/electron-macos/CONTRACT.md'), 'utf8');
  assert.ok(contract.indexOf('Web application overlay') < contract.indexOf('macOS overlay'));
});

test('rejects unknown profiles', async () => {
  const target = await tempProject();
  await assert.rejects(() => installContract({ target, profiles: ['not-a-profile'], adapters: [] }), /Unknown profile/);
});

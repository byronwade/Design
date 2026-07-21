import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { packageRoot } from '../src/utils.mjs';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'pipe', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'design-package-smoke-'));
const packDir = path.join(root, 'pack');
const consumer = path.join(root, 'consumer');
const project = path.join(root, 'project');
await fs.mkdir(packDir, { recursive: true });
await fs.mkdir(consumer, { recursive: true });
await fs.mkdir(project, { recursive: true });
const packed = JSON.parse(run(npm, ['pack', '--json', '--pack-destination', packDir], { cwd: packageRoot }));
const tarball = path.join(packDir, packed[0].filename);
run(npm, ['install', '--prefix', consumer, '--ignore-scripts', tarball]);
const bin = path.join(consumer, 'node_modules/@byronwade/design-contract/bin/design-contract.mjs');
for (const args of [
  ['init', '--target', project, '--profile', 'web-app'],
  ['status', '--target', project],
  ['context', '--target', project],
  ['doctor', '--target', project],
  ['validate', '--target', project, '--no-google'],
]) run(process.execPath, [bin, ...args]);
await fs.access(path.join(project, 'DESIGN.md'));
await fs.access(path.join(project, 'design/PROJECT.md'));
await fs.access(path.join(project, '.design/generated/web-app.md'));
await assert.rejects(() => fs.access(path.join(project, '.design/global/PRINCIPLES.md')));
console.log('Package façade smoke test passed.');

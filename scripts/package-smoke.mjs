import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { packageRoot } from '../src/utils.mjs';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'pipe', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

function runNpm(args, options = {}) {
  return run('npm', args, { ...options, shell: process.platform === 'win32' });
}

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'design-package-smoke-'));
const packDir = path.join(root, 'pack');
const consumer = path.join(root, 'consumer');
const project = path.join(root, 'project');
await fs.mkdir(packDir, { recursive: true });
await fs.mkdir(consumer, { recursive: true });
await fs.mkdir(project, { recursive: true });
const packed = JSON.parse(runNpm(['pack', '--json', '--pack-destination', packDir], { cwd: packageRoot }));
const tarball = path.join(packDir, packed[0].filename);
runNpm(['install', '--prefix', consumer, '--ignore-scripts', tarball]);
const bin = path.join(consumer, 'node_modules/@byronwade/design-contract/bin/design.mjs');
for (const args of [
  ['init', '--target', project, '--profile', 'web-app'],
  ['status', '--target', project],
  ['context', '--target', project],
  ['resolve', '--target', project, '--request', 'Add an approval button to the workbench header'],
  ['check', '--target', project],
  ['validate', '--target', project, '--no-google'],
]) run(process.execPath, [bin, ...args]);
await fs.writeFile(path.join(project, 'rendered-home.html'), '<main><button>Approve</button></main>\n');
run(process.execPath, [bin, 'verify', '--target', project, '--surface', 'home', '--evidence', 'rendered-home.html']);
await fs.access(path.join(project, 'DESIGN.md'));
await fs.access(path.join(project, 'design/references'));
await fs.access(path.join(project, '.agents/skills/design/SKILL.md'));
await fs.access(path.join(project, '.design/generated/web-app.md'));
await fs.access(path.join(project, '.design/generated/TASK.json'));
await fs.access(path.join(project, '.design/receipts/latest.json'));
await assert.rejects(() => fs.access(path.join(project, '.design/global/PRINCIPLES.md')));
console.log('Package façade smoke test passed.');

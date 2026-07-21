import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const workspace = await fs.mkdtemp(path.join(os.tmpdir(), 'design-contract-package-'));
let tarball;

try {
  const packed = await exec(npm, ['pack', '--silent'], { cwd: packageRoot });
  tarball = path.join(packageRoot, packed.stdout.trim().split(/\r?\n/).at(-1));
  await exec(npm, ['install', '--ignore-scripts', '--no-save', tarball], { cwd: workspace });
  const installed = path.join(workspace, 'node_modules', '@byronwade', 'design-contract');
  const cli = path.join(installed, 'bin', 'design-contract.mjs');
  const project = path.join(workspace, 'project');
  await fs.mkdir(project, { recursive: true });
  await exec(process.execPath, [cli, 'init', '--target', project, '--profile', 'web-app', '--adapters', 'none'], { cwd: project });
  await exec(process.execPath, [cli, 'status', '--target', project], { cwd: project });
  await exec(process.execPath, [cli, 'validate', '--target', project, '--no-google'], { cwd: project });
  await fs.access(path.join(project, '.design', 'generated', 'web-app', 'CONTRACT.md'));
  console.log('Package smoke test passed.');
} finally {
  if (tarball) await fs.rm(tarball, { force: true });
  await fs.rm(workspace, { recursive: true, force: true });
}

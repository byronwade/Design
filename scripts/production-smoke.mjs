import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'pipe', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

function runNpm(args, options = {}) {
  return run('npm', args, { ...options, shell: process.platform === 'win32' });
}

const sha = process.env.GITHUB_SHA;
if (!sha) throw new Error('GITHUB_SHA is required for the production smoke test.');
const root = await fs.mkdtemp(path.join(os.tmpdir(), 'design-production-smoke-'));
const consumer = path.join(root, 'consumer');
const project = path.join(root, 'project');
await fs.mkdir(consumer, { recursive: true });
await fs.mkdir(project, { recursive: true });
const renderedEmptyState = `<!doctype html>
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
    <h1>Empty work queue</h1>
    <p role="status">No work yet.</p>
    <button aria-label="Create first item" data-state="default">Create item</button>
    <button disabled data-state="disabled">Waiting</button>
    <p data-state="loading" aria-busy="true" hidden>Loading queue.</p>
    <p data-state="permission" hidden>Permission required.</p>
    <p role="alert" hidden>Unable to load the queue.</p>
  </main>
</body>
</html>
`;
runNpm(['install', '--prefix', consumer, '--ignore-scripts', `github:byronwade/Design#${sha}`]);
const bin = path.join(consumer, 'node_modules/@byronwade/design-contract/bin/design.mjs');
run(process.execPath, [bin, 'init', '--target', project, '--profile', 'web-app']);
run(process.execPath, [bin, 'context', '--target', project]);
run(process.execPath, [bin, 'resolve', '--target', project, '--request', 'Add a verified empty state']);
run(process.execPath, [bin, 'status', '--target', project]);
run(process.execPath, [bin, 'check', '--target', project]);
await fs.writeFile(path.join(project, 'rendered-empty-state.html'), renderedEmptyState);
run(process.execPath, [bin, 'verify', '--target', project, '--mode', 'release', '--surface', 'empty-state', '--evidence', 'rendered-empty-state.html']);
run(process.execPath, [bin, 'validate', '--target', project, '--no-google']);
console.log(`Production install smoke passed for ${sha}.`);

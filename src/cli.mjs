import path from 'node:path';
import process from 'node:process';
import {
  checkDesign, doctorContract, explainContract, installContract, listProfiles,
  resolveInstalledContract, resolveTaskContext, statusContract, syncContract,
  validatePackage, validateProject,
  verifyDesign,
} from './core.mjs';

function parseArgs(argv) {
  const command = argv[0] && !argv[0].startsWith('-') ? argv[0] : 'help';
  const options = {};
  const positionals = [];
  for (let index = command === 'help' ? 0 : 1; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith('--')) { positionals.push(value); continue; }
    const [key, inline] = value.slice(2).split('=', 2);
    const next = argv[index + 1];
    const parsed = inline ?? (next && !next.startsWith('--') ? argv[++index] : true);
    if (options[key] === undefined) options[key] = parsed;
    else if (Array.isArray(options[key])) options[key].push(parsed);
    else options[key] = [options[key], parsed];
  }
  return { command, options, positionals };
}

function many(value, fallback = []) {
  if (value === undefined) return fallback;
  const list = Array.isArray(value) ? value : [value];
  return list.flatMap((item) => String(item).split(',')).map((item) => item.trim()).filter(Boolean);
}

function output(value, json) {
  if (json || typeof value !== 'string') console.log(JSON.stringify(value, null, 2));
  else console.log(value);
}

function commaList(value) {
  return many(value, []);
}

const HELP = `Design Contract CLI

Usage:
  design init [--target DIR] [--profile ID ...] [--app-type ID] [--adapters LIST] [--force]
  design resolve --request TEXT [--target DIR] [--id TARGET] [--json]
  design check [--target DIR] [--mode development|release] [--json]
  design verify [--target DIR] [--mode development|release] [--request TEXT] [--surface LIST] [--evidence LIST] [--json]

Compatibility:
  design-contract list [--json]
  design-contract init [--target DIR] [--profile ID ...] [--app-type ID] [--adapters LIST] [--force]
  design-contract context [--target DIR] [--id TARGET] [--stdout]
  design-contract resolve --request TEXT [--target DIR]  # bounded task packet
  design-contract status [--target DIR] [--json]
  design-contract doctor [--target DIR] [--mode development|release]
  design-contract validate [--target DIR] [--mode development|release] [--require-google|--no-google]
  design-contract validate --package [--require-google]
  design-contract sync [--target DIR]
  design-contract explain QUERY [--target DIR]

Mental model:
  DESIGN.md + optional design/references/ + generated adapters, fingerprints, checks, and receipts = enforceable AI design context
`;

export async function runCli(argv, { binary = 'design-contract' } = {}) {
  const { command, options, positionals } = parseArgs(argv);
  const json = Boolean(options.json);
  const target = path.resolve(String(options.target ?? process.cwd()));
  if (command === 'help' || command === '--help' || command === '-h' || options.help || options.h) { console.log(HELP); return; }
  if (command === 'list') { output(await listProfiles(), json); return; }
  if (command === 'init') {
    const profiles = many(options.profile, ['web-app']);
    const requested = many(options.adapters, ['codex', 'claude', 'copilot']);
    const adapters = requested.includes('none') ? [] : requested;
    output(await installContract({ target, profiles, adapters, appType: options['app-type'] ? String(options['app-type']) : null, force: Boolean(options.force) }), json);
    return;
  }
  if (command === 'context') {
    const result = await resolveInstalledContract({ target, stdoutTarget: options.id ? String(options.id) : null });
    if (options.stdout) {
      if (!result.stdout) throw new Error('Use --id TARGET with --stdout.');
      process.stdout.write(result.stdout);
    } else output(result, json);
    return;
  }
  if (command === 'resolve') {
    if (!options.request) {
      if (binary === 'design-contract') {
        const result = await resolveInstalledContract({ target, stdoutTarget: options.id ? String(options.id) : null });
        output({ ...result, warning: 'Compatibility mode: pass --request to get the bounded design resolve packet.' }, json);
        return;
      }
      throw new Error('design resolve requires --request "what the AI should build or change".');
    }
    output(await resolveTaskContext({ target, request: String(options.request), targetId: options.id ? String(options.id) : null }), true);
    return;
  }
  if (command === 'check') {
    const report = await checkDesign({ target, mode: String(options.mode ?? 'development') });
    output(report, json);
    if (!report.healthy) process.exitCode = 2;
    return;
  }
  if (command === 'verify') {
    const receipt = await verifyDesign({
      target,
      request: options.request ? String(options.request) : null,
      mode: String(options.mode ?? 'development'),
      surfaces: commaList(options.surface),
      evidence: commaList(options.evidence),
    });
    output(receipt, json);
    if (!receipt.healthy) process.exitCode = 2;
    return;
  }
  if (command === 'status') {
    const result = await statusContract({ target });
    output(result, json);
    if (!result.healthy) process.exitCode = 2;
    return;
  }
  if (command === 'doctor') {
    const result = await doctorContract({ target, mode: String(options.mode ?? 'development') });
    output(result, json);
    if (!result.healthy) process.exitCode = 2;
    return;
  }
  if (command === 'validate') {
    const google = !options['no-google'];
    const requireGoogle = Boolean(options['require-google']);
    const report = options.package
      ? await validatePackage({ google, requireGoogle })
      : await validateProject({ target, google, requireGoogle, mode: String(options.mode ?? 'development') });
    output(report, json);
    if (report.summary.errors > 0) process.exitCode = 1;
    return;
  }
  if (command === 'sync') { output(await syncContract({ target }), json); return; }
  if (command === 'explain') { output(await explainContract({ target, query: positionals[0] ?? options.query }), json); return; }
  throw new Error(`Unknown command: ${command}\n\n${HELP}`);
}

import path from 'node:path';
import process from 'node:process';
import {
  installContract,
  listProfiles,
  resolveInstalledContract,
  syncContract,
  validateContract,
} from './core.mjs';

function parseArgs(argv) {
  const command = argv[0] && !argv[0].startsWith('-') ? argv[0] : 'help';
  const options = {};
  const values = command === 'help' ? argv : argv.slice(1);

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith('--')) continue;
    const [rawKey, inlineValue] = value.slice(2).split('=', 2);
    const next = values[index + 1];
    const parsed = inlineValue ?? (next && !next.startsWith('--') ? values[++index] : true);
    if (options[rawKey] === undefined) options[rawKey] = parsed;
    else if (Array.isArray(options[rawKey])) options[rawKey].push(parsed);
    else options[rawKey] = [options[rawKey], parsed];
  }

  return { command, options };
}

function splitMany(value, fallback = []) {
  if (value === undefined) return fallback;
  const list = Array.isArray(value) ? value : [value];
  return list.flatMap((entry) => String(entry).split(',')).map((entry) => entry.trim()).filter(Boolean);
}

function print(value, json) {
  if (json) console.log(JSON.stringify(value, null, 2));
  else if (typeof value === 'string') console.log(value);
  else console.log(JSON.stringify(value, null, 2));
}

const HELP = `Design Contract CLI

Usage:
  design-contract list [--json]
  design-contract init [--target DIR] [--profile ID ...] [--adapters LIST] [--force]
  design-contract sync [--target DIR] [--force]
  design-contract resolve [--target DIR]
  design-contract validate [--target DIR | --source DIR] [--require-google | --no-google] [--json]

Examples:
  design-contract init --profile web-app
  design-contract init --profile ios-native --profile android-native
  design-contract resolve
  design-contract validate --require-google
`;

export async function runCli(argv) {
  const { command, options } = parseArgs(argv);
  const json = Boolean(options.json);
  const target = path.resolve(String(options.target ?? process.cwd()));

  if (command === 'help' || command === '--help' || command === '-h') {
    print(HELP, false);
    return;
  }

  if (command === 'list') {
    const profiles = await listProfiles();
    if (json) print(profiles, true);
    else {
      console.log('Available design profiles:\n');
      for (const profile of profiles) console.log(`- ${profile.id}: ${profile.description}`);
    }
    return;
  }

  if (command === 'init') {
    const profiles = splitMany(options.profile, ['web-app']);
    const requestedAdapters = splitMany(options.adapters, ['codex', 'claude', 'copilot']);
    const adapters = requestedAdapters.includes('none') ? [] : requestedAdapters;
    print(await installContract({ target, profiles, adapters, force: Boolean(options.force) }), json);
    return;
  }

  if (command === 'sync') {
    print(await syncContract({ target, force: Boolean(options.force) }), json);
    return;
  }

  if (command === 'resolve') {
    print(await resolveInstalledContract({ target }), json);
    return;
  }

  if (command === 'validate') {
    const source = path.resolve(String(options.source ?? path.join(target, '.design')));
    const google = options['no-google'] ? false : true;
    const requireGoogle = Boolean(options['require-google']);
    const report = await validateContract({ source, google, requireGoogle });
    print(report, json);
    if (report.summary.errors > 0) process.exitCode = 1;
    return;
  }

  throw new Error(`Unknown command: ${command}\n\n${HELP}`);
}

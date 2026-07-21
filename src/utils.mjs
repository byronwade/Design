import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const templateRoot = path.join(packageRoot, '.design');
export const PROJECT_OWNED = new Set(['governance/DECISIONS.md', 'governance/EXCEPTIONS.md', 'project.json']);
export const GENERATED_PREFIX = 'generated/';
export const INSTALL_FILE = '.install.json';

export async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

export async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

export async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export async function walk(root, relative = '') {
  const directory = path.join(root, relative);
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const child = path.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await walk(root, child));
    else files.push(child.replaceAll(path.sep, '/'));
  }
  return files;
}

export function hash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function safeId(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const result = {};
  let activeList = null;
  for (const line of match[1].split(/\r?\n/)) {
    const list = line.match(/^\s+-\s+(.+)$/);
    if (list && activeList) {
      result[activeList].push(list[1].trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }
    const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!scalar) continue;
    const [, key, raw] = scalar;
    if (raw === '') {
      result[key] = [];
      activeList = key;
    } else {
      activeList = null;
      result[key] = raw.trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return result;
}

export async function templateFiles() {
  return (await walk(templateRoot)).filter((file) =>
    file !== INSTALL_FILE && file !== 'project.json' && !file.startsWith(GENERATED_PREFIX));
}

export function addFinding(findings, severity, code, pathValue, message) {
  findings.push({ severity, code, path: pathValue, message });
}

export function summarize(findings) {
  const summary = { errors: 0, warnings: 0, info: 0 };
  for (const finding of findings) {
    if (finding.severity === 'error') summary.errors += 1;
    else if (finding.severity === 'warning') summary.warnings += 1;
    else summary.info += 1;
  }
  return { summary, findings };
}

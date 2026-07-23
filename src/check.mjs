import fs from 'node:fs/promises';
import path from 'node:path';
import { getResolutionStatus } from './resolve.mjs';
import { exists, hash, relativePosix, walk } from './utils.mjs';

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.css']);
const APPROVED_VARIANTS = new Set([
  'default',
  'primary',
  'secondary',
  'tertiary',
  'outline',
  'ghost',
  'link',
  'danger',
  'destructive',
  'muted',
  'success',
  'warning',
  'error',
  'quiet',
]);
const IGNORED = [
  'node_modules/',
  'dist/',
  '.design/generated/',
  '.design/cache/',
  '.design/receipts/',
  'design/references/',
  'benchmarks/',
  'website/dist/',
];

function ignored(relative) {
  return IGNORED.some((prefix) => relative.startsWith(prefix));
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function add(findings, ruleId, severity, file, line, message, evidence, remediation) {
  findings.push({ ruleId, severity, file, line, message, evidence, remediation });
}

function scanSource(relative, content, findings) {
  const rawColor = /(?<![\w-])(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/g;
  for (const match of content.matchAll(rawColor)) {
    add(findings, 'DS-COLOR-001', 'error', relative, lineNumber(content, match.index), 'Raw color value found outside token authority.', match[0], 'Use a semantic token from DESIGN.md or record an accepted exception.');
  }

  const arbitraryUtility = /class(?:Name)?=["'`][^"'`]*\b[a-z0-9:-]+-\[[^\]]+\]/g;
  for (const match of content.matchAll(arbitraryUtility)) {
    add(findings, 'DS-TOKEN-001', 'error', relative, lineNumber(content, match.index), 'Arbitrary utility class bypasses the design grammar.', match[0].slice(0, 160), 'Map the value to a token, approved variant, or explicit exception.');
  }

  const inlineStyle = /\bstyle=\{\{[\s\S]*?\}\}/g;
  for (const match of content.matchAll(inlineStyle)) {
    add(findings, 'DS-TOKEN-002', 'warning', relative, lineNumber(content, match.index), 'Inline style block requires design-system justification.', match[0].slice(0, 160), 'Prefer component variants and semantic tokens; document exceptions in DESIGN.md.');
  }

  const unapprovedImports = /from\s+['"](@mui\/[^'"]+|antd|@chakra-ui\/[^'"]+|semantic-ui-react|bootstrap)['"]/g;
  for (const match of content.matchAll(unapprovedImports)) {
    add(findings, 'DS-COMPONENT-001', 'error', relative, lineNumber(content, match.index), 'Unapproved component-library import found.', match[1], 'Declare the component source in DESIGN.md or replace it with an approved production component.');
  }

  const variantProp = /\bvariant=["']([A-Za-z0-9_-]+)["']/g;
  for (const match of content.matchAll(variantProp)) {
    if (APPROVED_VARIANTS.has(match[1])) continue;
    add(findings, 'DS-COMPONENT-003', 'error', relative, lineNumber(content, match.index), 'Unknown component variant found.', match[0], 'Use an approved semantic variant from DESIGN.md or record an accepted exception.');
  }

  const iconOnlyButton = /<button[^>]*>\s*<[A-Z][\w.]*/g;
  for (const match of content.matchAll(iconOnlyButton)) {
    if (/aria-label=|aria-labelledby=/.test(match[0])) continue;
    add(findings, 'DS-CONTROL-003', 'error', relative, lineNumber(content, match.index), 'Potential icon-only button without an accessible name.', match[0].slice(0, 160), 'Add an accessible name and non-hover access path.');
  }

  const disabledWithoutState = /<button(?![^>]*(aria-disabled|disabled))[^>]*(data-state=["']disabled["'])/g;
  for (const match of content.matchAll(disabledWithoutState)) {
    add(findings, 'DS-STATE-001', 'warning', relative, lineNumber(content, match.index), 'Disabled visual state does not expose disabled semantics.', match[0].slice(0, 160), 'Use disabled or aria-disabled with retained state and recovery copy.');
  }

  const pageLocalComponent = /function\s+([A-Z][A-Za-z0-9]+)\s*\([^)]*\)\s*\{[\s\S]{0,1200}className=/g;
  for (const match of content.matchAll(pageLocalComponent)) {
    if (!relative.includes('/components/') && !relative.includes('\\components\\')) {
      add(findings, 'DS-PROJECT-001', 'warning', relative, lineNumber(content, match.index), 'Page-local component may bypass production mapping.', match[1], 'Reuse a mapped component or record a design-system gap.');
    }
  }
}

async function duplicatedComponents(files, findings) {
  const byName = new Map();
  for (const relative of files) {
    if (!/\/components\/|\\components\\/.test(relative)) continue;
    const name = path.basename(relative, path.extname(relative)).toLowerCase();
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(relative);
  }
  for (const [name, matches] of byName) {
    if (matches.length < 2) continue;
    add(findings, 'DS-COMPONENT-002', 'warning', matches[0], 1, `Duplicate component basename "${name}" appears in ${matches.length} files.`, matches.join(', '), 'Consolidate or document why separate mapped components are required.');
  }
}

function routeId(relative) {
  const normalized = relative.replaceAll('\\', '/').replace(/^src\//, '');
  if (/^app\/.*\/page\.tsx$/.test(normalized) || normalized === 'app/page.tsx') {
    return `/${normalized.replace(/^app\/?/, '').replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '')}`.replace(/\/$/, '') || '/';
  }
  const pages = normalized.match(/^pages\/(.+)\.tsx$/);
  if (pages) return `/${pages[1].replace(/\/index$/, '').replace(/^index$/, '')}`.replace(/\/$/, '') || '/';
  const routes = normalized.match(/^routes\/(.+)\.tsx$/);
  if (routes) return `/${routes[1].replace(/\/index$/, '').replace(/^index$/, '')}`.replace(/\/$/, '') || '/';
  return null;
}

async function unmappedSurfaces(target, files, findings) {
  const designPath = path.join(target, 'DESIGN.md');
  const design = await exists(designPath) ? await fs.readFile(designPath, 'utf8') : '';
  for (const relative of files) {
    const route = routeId(relative);
    if (!route) continue;
    if (design.includes(route) || design.toLowerCase().includes(relative.toLowerCase())) continue;
    add(findings, 'DS-PROJECT-004', 'error', relative, 1, `Route or surface ${route} is not mapped in DESIGN.md.`, route, 'Map the surface to a shell, layout, states, production implementation, and verification evidence.');
  }
}

async function invalidExceptions(target, findings) {
  const designPath = path.join(target, 'DESIGN.md');
  if (!await exists(designPath)) return;
  const design = await fs.readFile(designPath, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  for (const match of design.matchAll(/Expires:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}|expired)/gi)) {
    if (match[1].toLowerCase() === 'expired' || match[1] < today) {
      add(findings, 'DS-GOV-001', 'error', 'DESIGN.md', lineNumber(design, match.index), 'Expired design exception found.', match[0], 'Remove, renew, or migrate the exception before verification.');
    }
  }
  for (const match of design.matchAll(/Status:\s*expired/gi)) {
    add(findings, 'DS-GOV-001', 'error', 'DESIGN.md', lineNumber(design, match.index), 'Expired design decision status found.', match[0], 'Resolve or renew the exception.');
  }
}

export async function checkDesign({ target, mode = 'development' }) {
  const findings = [];
  const status = await getResolutionStatus({ target });
  if (!status.current) {
    add(findings, 'DS-CI-001', 'error', '.design/generated/', 1, `Compiled context is ${status.state}.`, JSON.stringify(status), 'Run design context while legacy compatibility remains, then run design resolve for the task.');
  }

  const all = await walk(target);
  const sourceFiles = all.filter((relative) => SOURCE_EXTENSIONS.has(path.extname(relative)) && !ignored(relative));
  for (const relative of sourceFiles) {
    const file = path.join(target, relative);
    scanSource(relative, await fs.readFile(file, 'utf8'), findings);
  }
  await duplicatedComponents(sourceFiles, findings);
  await unmappedSurfaces(target, sourceFiles, findings);
  await invalidExceptions(target, findings);

  const errors = findings.filter((finding) => finding.severity === 'error').length;
  const warnings = findings.filter((finding) => finding.severity === 'warning').length;
  const report = {
    schemaVersion: 1,
    action: 'check',
    target,
    mode,
    generatedAt: new Date().toISOString(),
    sourceFingerprint: hash(JSON.stringify({ status, sourceFiles })),
    summary: { errors, warnings, info: 0, filesScanned: sourceFiles.length },
    findings,
    healthy: errors === 0 && (mode !== 'release' || warnings === 0),
  };
  const output = path.join(target, '.design/receipts/check-report.json');
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  return report;
}

export function summarizeCheck(report) {
  return `${report.summary.errors} error(s), ${report.summary.warnings} warning(s), ${report.summary.filesScanned} file(s) scanned`;
}

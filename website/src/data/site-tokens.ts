import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const designSource = 'DESIGN.md';

const designPath = [resolve(process.cwd(), designSource), resolve(process.cwd(), '..', designSource)].find(existsSync);
if (!designPath) throw new Error(`Missing canonical design source: ${designSource}`);
const designText = readFileSync(designPath, 'utf8');

function frontmatter(source: string) {
  return source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

function flatBlock(source: string, name: string, next: string) {
  const value = frontmatter(source);
  const start = value.match(new RegExp(`^${name}:\\r?\\n`, 'm'));
  if (!start) return new Map<string, string>();
  const bodyStart = start.index! + start[0].length;
  const remainder = value.slice(bodyStart);
  const end = remainder.match(new RegExp(`^${next}:`, 'm'));
  const body = remainder.slice(0, end?.index ?? remainder.length);
  return new Map([...body.matchAll(/^  ([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^\r\n]+))/gm)].map((match) => [match[1], (match[2] ?? match[3] ?? match[4] ?? '').trim()]));
}

const designColors = Object.fromEntries(flatBlock(designText, 'colors', 'typography'));
const designTypography = Object.fromEntries(flatBlock(designText, 'typography', 'rounded'));

export const siteTokenMap: Record<string, string> = {
  '--canvas': designColors.canvas,
  '--surface': designColors.surface,
  '--surface-subtle': designColors['surface-subtle'],
  '--surface-hover': designColors['surface-hover'],
  '--surface-selected': designColors['surface-selected'],
  '--ink': designColors['on-surface'],
  '--ink-secondary': designColors['on-surface-secondary'],
  '--ink-muted': designColors['on-surface-muted'],
  '--clay': designColors.primary,
  '--clay-dark': designColors['primary-hover'],
  '--clay-soft': designColors['primary-soft'],
  '--on-primary': designColors['on-primary'],
  '--border-soft': designColors['border-soft'],
  '--border': designColors.border,
  '--border-strong': designColors['border-strong'],
  '--focus': designColors.focus,
  '--success': designColors.success,
  '--success-soft': designColors['success-soft'],
  '--warning': designColors.warning,
  '--warning-soft': designColors['warning-soft'],
  '--error': designColors.error,
  '--error-soft': designColors['error-soft'],
  '--info': designColors.info,
  '--info-soft': designColors['info-soft'],
  '--font': designTypography['body-md']?.fontFamily ?? 'Inter, ui-sans-serif, sans-serif',
};

export const siteTokenCss = `html:root{${Object.entries(siteTokenMap).map(([name, value]) => `${name}:${value}`).join(';')}}`;

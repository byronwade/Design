import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { toolingProfiles } from './profiles';

export const designSource = 'DESIGN.md';
const designPath = [resolve(process.cwd(), designSource), resolve(process.cwd(), '..', designSource)].find(existsSync);
if (!designPath) throw new Error(`Missing canonical design source: ${designSource}`);
const designMarkdown = readFileSync(designPath, 'utf8');
const frontmatter = designMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';

function scalar(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function flatBlock(name: string, next: string) {
  const body = frontmatter.match(new RegExp(`^${name}:\\r?\\n([\\s\\S]*?)(?=^${next}:|(?![\\s\\S]))`, 'm'))?.[1] ?? '';
  return [...body.matchAll(/^  ([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^\r\n]+))/gm)].map((match) => ({
    name: match[1],
    value: scalar(match[2] ?? match[3] ?? match[4] ?? ''),
  }));
}

function typographyBlock() {
  const body = frontmatter.match(/^typography:\r?\n([\s\S]*?)(?=^spacing:|(?![\s\S]))/m)?.[1] ?? '';
  const tokens: Array<Record<string, string> & { name: string }> = [];
  let current: (Record<string, string> & { name: string }) | undefined;
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^  ([\w-]+):$/);
    if (heading) {
      current = { name: heading[1] };
      tokens.push(current);
      continue;
    }
    const property = line.match(/^    ([\w-]+):\s*(.*)$/);
    if (property && current) current[property[1]] = scalar(property[2]);
  }
  return tokens;
}

const colorRoles: Record<string, string> = {
  canvas: 'Application canvas',
  surface: 'Paper surface',
  'surface-subtle': 'Quiet supporting surface',
  'surface-hover': 'Hover state',
  'surface-selected': 'Selected row',
  'on-surface': 'Primary ink',
  'on-surface-secondary': 'Secondary ink',
  'on-surface-muted': 'Muted supporting ink',
  primary: 'Principal action',
  'primary-hover': 'Principal action hover',
  'primary-soft': 'Accent background',
  'border-soft': 'Quiet divider',
  border: 'Standard divider',
  'border-strong': 'Structural divider',
  focus: 'Keyboard focus',
  success: 'Successful state',
  'success-soft': 'Successful state background',
  warning: 'Attention state',
  'warning-soft': 'Attention state background',
  error: 'Error state',
  'error-soft': 'Error state background',
  info: 'Information state',
  'info-soft': 'Information state background',
  'on-primary': 'Text on principal action',
};

const colorValues = flatBlock('colors', 'typography');
export const designColors = Object.fromEntries(colorValues.map(({ name, value }) => [name, value]));
export const colorTokens = colorValues.map(({ name, value }) => ({
  name,
  value,
  role: colorRoles[name] ?? 'Semantic color role',
  tone: /^(on-|primary|success|warning|error|info|focus)/.test(name) && !name.endsWith('-soft') ? 'dark' : 'light',
}));

const typographyValues = typographyBlock();
export const designTypography = Object.fromEntries(typographyValues.map((token) => [token.name, token]));
const typeSamples: Record<string, string> = {
  'headline-display': 'A clear point of view.',
  'headline-lg': 'Hierarchy without noise.',
  'headline-md': 'One decision per region.',
  'body-lg': 'Design should make the next useful action obvious.',
  'body-md': 'Readable, compact, and specific.',
  'body-sm': 'Supporting context stays quiet.',
  'label-lg': 'LABEL / LARGE',
  'label-md': 'LABEL / MEDIUM',
  'label-sm': 'LABEL / SMALL',
};
export const typeTokens = typographyValues.map((token) => ({
  name: token.name,
  size: token.fontSize,
  weight: token.fontWeight,
  leading: token.lineHeight,
  sample: typeSamples[token.name] ?? token.name,
  fontFamily: token.fontFamily,
}));

const spacingUses: Record<string, string> = { '1': 'Fine alignment', '2': 'Dominant rhythm', '3': 'Compact control', '4': 'Standard surface', '6': 'Section cadence', '8': 'Region separation', '12': 'Reading pause', '16': 'Major transition' };
export const designSpacing = Object.fromEntries(flatBlock('spacing', 'rounded').map(({ name, value }) => [name, value]));
export const spacingTokens = flatBlock('spacing', 'rounded').map(({ name, value }) => ({ name, value, use: spacingUses[name] ?? 'System spacing' }));

const radiusUses: Record<string, string> = { none: 'Integrated edges', sm: 'Micro elements', md: 'Compact controls', lg: 'Standard components', xl: 'Paper surfaces', shell: 'Application frame', full: 'Capsules and avatars' };
export const designRadii = Object.fromEntries(flatBlock('rounded', 'components').map(({ name, value }) => [name, value]));
export const radiusTokens = flatBlock('rounded', 'components').map(({ name, value }) => ({ name, value, use: radiusUses[name] ?? 'System radius' }));

export const qualityChecks = [
  { id: 'WEB-001', title: 'Semantic navigation', description: 'Global destinations have one owner, stable URLs, and a visible current location.', evidence: 'SiteHeader + route map', status: 'PASS' },
  { id: 'WEB-002', title: 'Local-first content', description: 'Core pages and catalog entries render from versioned repository data with no API dependency.', evidence: 'website/src/data', status: 'PASS' },
  { id: 'WEB-003', title: 'Progressive enhancement', description: 'Catalog, showcase, and cross-site search retain normal local links when their enhancement scripts or fetches are unavailable.', evidence: 'static links + no-script search index', status: 'PASS' },
  { id: 'WEB-004', title: 'Responsive transformation', description: 'Supporting rails become horizontal navigation before the primary reading surface becomes unusable.', evidence: '640px / 900px CSS gates', status: 'PASS' },
  { id: 'WEB-005', title: 'Reduced motion', description: 'Hover movement and smooth scrolling yield to the user preference for reduced motion.', evidence: 'prefers-reduced-motion', status: 'PASS' },
  { id: 'WEB-006', title: 'Package regression', description: 'The website addition does not alter the package validation, test, build, or smoke gates.', evidence: 'npm run check', status: 'PASS' },
  { id: 'WEB-007', title: 'Manifest coverage', description: 'Every compiler profile appears in the public Toolbox from the canonical manifest.', evidence: 'website/src/data/profiles.ts + site audit', status: 'PASS' },
  { id: 'WEB-008', title: 'Local discovery', description: 'Cross-site search is generated from versioned repository data and fetched only on the search route.', evidence: 'website/src/data/search.ts + search-index.json', status: 'PASS' },
  { id: 'WEB-009', title: 'Reference coverage', description: 'Every Markdown and JSON file in the canonical .design engine has a source-linked public Reference route.', evidence: 'site audit canonical-source sweep', status: 'PASS' },
  { id: 'WEB-010', title: 'Showcase contract', description: 'Showcase records have unique stable slugs, three structured surface studies, and asset-ready reading fields before backend persistence exists.', evidence: 'showcase data contract + site audit', status: 'PASS' },
  { id: 'WEB-011', title: 'Canonical token bridge', description: 'The public Lab and shared site chrome consume the root DESIGN.md contract through one generated semantic stylesheet.', evidence: 'DESIGN.md + design-tokens.css', status: 'PASS' },
];

export const evaluationCommands = [
    { label: 'Build the reference site', command: 'npm run site:build' },
    { label: 'Audit routes and budgets', command: 'npm run site:audit' },
    { label: 'Audit design drift', command: 'npm run site:drift' },
    { label: 'Run the package contract', command: 'npm run check' },
  { label: 'Start the local surface', command: 'npm run site:dev' },
];

export { toolingProfiles };

export const toolingCommands = [
  { step: '01', title: 'Initialize', command: 'design-contract init --profile web-app', description: 'Create the small project façade and select the target profile.' },
  { step: '02', title: 'Compile', command: 'design-contract context', description: 'Resolve shared reasoning, platform layers, and project context into a focused contract.' },
  { step: '03', title: 'Inspect', command: 'design-contract explain DS-ACTION-001', description: 'Read a stable rule, profile, layer, or target without opening the whole engine.' },
  { step: '04', title: 'Verify', command: 'design-contract validate --mode release', description: 'Turn adoption gaps, stale context, and missing mappings into explicit release findings.' },
];

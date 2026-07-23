import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

const read = (relative) => readFile(path.join(root, relative), 'utf8');
const normalize = (value) => value.toLowerCase()
  .replace(/\s+/g, '')
  .replace(/0\.(\d+)/g, '.$1')
  .replace(/(\.\d*?[1-9])0+(?=[,)])/g, '$1')
  .replace(/\.0+(?=[,)])/g, '');

function frontmatter(source) {
  return source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

function flatBlock(source, name, next) {
  const value = frontmatter(source);
  const start = value.match(new RegExp(`^${name}:\\r?\\n`, 'm'));
  if (!start) return new Map();
  const bodyStart = start.index + start[0].length;
  const remainder = value.slice(bodyStart);
  const end = remainder.match(new RegExp(`^${next}:`, 'm'));
  const body = remainder.slice(0, end?.index ?? remainder.length);
  return new Map([...body.matchAll(/^  ([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^\r\n]+))/gm)].map((match) => [match[1], (match[2] ?? match[3] ?? match[4] ?? '').trim()]));
}

function cssDeclarations(source) {
  const body = source.match(/:root\s*\{([^}]+)\}/)?.[1] ?? '';
  return new Map([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)].map((match) => [match[1], match[2].trim()]));
}

const [design, mirror, siteTokens, layout, header, homepage, globalCss, distHomepage, distTokens, driftDoc, contractPreview, contractDemo, contractsIndex, contractDetail, buttonPrimitive, badgePrimitive, searchPrimitive, tabsPrimitive, surfacePrimitive] = await Promise.all([
  read('DESIGN.md'),
  read('.design/DESIGN.md'),
  read('website/src/data/site-tokens.ts'),
  read('website/src/layouts/SiteLayout.astro'),
  read('website/src/components/SiteHeader.astro'),
  read('website/src/pages/index.astro'),
  read('website/src/styles/global.css'),
  read('website/dist/index.html'),
  read('website/dist/design-tokens.css'),
  read('docs/site/DRIFT.md'),
  read('website/src/components/ContractPreview.astro'),
  read('website/src/components/ContractDemo.astro'),
  read('website/src/pages/contracts/index.astro'),
  read('website/src/pages/contracts/[...slug].astro'),
  read('website/src/components/ui/Button.astro'),
  read('website/src/components/ui/Badge.astro'),
  read('website/src/components/ui/SearchField.astro'),
  read('website/src/components/ui/Tabs.astro'),
  read('website/src/components/ui/Surface.astro'),
]);

if (design !== mirror) failures.push('root DESIGN.md and .design/DESIGN.md are no longer exact mirrors');
if (!siteTokens.includes("designSource = 'DESIGN.md'") || !siteTokens.includes('readFileSync')) failures.push('site token data must read the canonical DESIGN.md source');
if (!layout.includes('siteTokenCss') || !layout.includes('set:html') || !layout.includes('design-tokens.css')) failures.push('shared layout must expose the canonical token bridge');
if (homepage.includes('content-visibility')) failures.push('homepage must not hide canonical content from screenshots, assistive technology, or crawlers');
if (!driftDoc.includes('npm run site:drift')) failures.push('drift documentation must describe the enforced audit command');

for (const route of ['/', '/contracts/', '/docs/']) {
  if (!header.includes(`href="${route}"`)) failures.push(`primary navigation is missing ${route}`);
}
for (const route of ['/catalog/', '/blocks/', '/skills/', '/reference/', '/showcase/', '/lab/', '/tools/', '/search/']) {
  if (header.includes(`href="${route}"`) || layout.includes(`href="${route}"`)) failures.push(`removed public route still linked: ${route}`);
}

for (const section of ['class="discover-shell', 'class="discover-columns', 'class="discover-filterbar', 'class="discover-grid']) {
  if (!homepage.includes(section)) failures.push(`homepage is missing required region: ${section}`);
}
for (const phrase of ['One design system. Every AI. No unreviewed drift.', 'design resolve', 'design check', 'design verify']) {
  if (!homepage.includes(phrase)) failures.push(`homepage must frame the one-file control plane with: ${phrase}`);
}
if (!homepage.includes('ContractPreview') || !contractsIndex.includes('ContractPreview')) failures.push('home and contracts must render contract previews instead of empty color blocks');
if (!contractDetail.includes('theme={project.slug}') || !contractDetail.includes('ContractDemo')) failures.push('contract detail pages must apply their pack theme and rendered component showcase');
if (contractsIndex.includes("querySelectorAll('[data-section]')")) failures.push('contract filters must not use a broad data-section selector that can intercept card navigation');
if (!contractsIndex.includes('data-filter-section') || !contractsIndex.includes('data-contract-section')) failures.push('contract filters and navigable cards must use separate data attributes');
if (!contractsIndex.includes(".contract-section-tabs [data-filter-section]")) failures.push('contract filter listeners must be scoped to the filter tab region');
if (!header.includes("components/ui") && !header.includes("./ui/")) failures.push('shared header must consume the local UI primitive layer');
if (!homepage.includes("components/ui/") || !contractsIndex.includes("components/ui/") || !contractDetail.includes("components/ui/")) failures.push('public contract surfaces must consume shared local UI primitives');
for (const [name, source, marker] of [
  ['Button', buttonPrimitive, 'ui-button'],
  ['Badge', badgePrimitive, 'ui-badge'],
  ['SearchField', searchPrimitive, 'ui-search-field'],
  ['Tabs', tabsPrimitive, 'ui-tabs'],
  ['Surface', surfacePrimitive, 'ui-surface'],
]) {
  if (!source.includes(marker)) failures.push(`local UI primitive is incomplete: ${name}`);
}
for (const slug of ['warm-paper-workbench', 'graphite-saas-console', 'visual-reference-starter']) {
  if (!contractPreview.includes(`project.slug === '${slug}'`)) failures.push(`contract preview missing visual variant: ${slug}`);
  if (!contractDemo.includes(`project.slug === '${slug}'`)) failures.push(`contract demo missing visual variant: ${slug}`);
  if (!globalCss.includes(`.theme-${slug}`)) failures.push(`contract page theme missing: ${slug}`);
}

const colors = flatBlock(design, 'colors', 'typography');
const tokenToDesignColor = {
  '--canvas': 'canvas',
  '--surface': 'surface',
  '--surface-subtle': 'surface-subtle',
  '--surface-hover': 'surface-hover',
  '--surface-selected': 'surface-selected',
  '--ink': 'on-surface',
  '--ink-secondary': 'on-surface-secondary',
  '--ink-muted': 'on-surface-muted',
  '--clay': 'primary',
  '--clay-dark': 'primary-hover',
  '--clay-soft': 'primary-soft',
  '--on-primary': 'on-primary',
  '--border-soft': 'border-soft',
  '--border': 'border',
  '--border-strong': 'border-strong',
  '--focus': 'focus',
  '--success': 'success',
  '--success-soft': 'success-soft',
  '--warning': 'warning',
  '--warning-soft': 'warning-soft',
  '--error': 'error',
  '--error-soft': 'error-soft',
  '--info': 'info',
  '--info-soft': 'info-soft',
};

const mappedTokens = new Map([...siteTokens.matchAll(/^\s*'(\-\-[\w-]+)':\s*designColors(?:\[['"]([^'"]+)['"]\]|\.([\w-]+))/gm)].map((match) => [match[1], match[2] ?? match[3]]));
for (const [token, designKey] of Object.entries(tokenToDesignColor)) {
  if (mappedTokens.get(token) !== designKey) failures.push(`site token mapping drift: ${token} must consume colors.${designKey}`);
  if (!colors.has(designKey)) failures.push(`canonical design color missing: ${designKey}`);
}
for (const token of mappedTokens.keys()) {
  if (!(token in tokenToDesignColor)) failures.push(`site token map contains an unapproved color token: ${token}`);
}

const staticRoot = cssDeclarations(globalCss);
for (const [token, key] of Object.entries(tokenToDesignColor)) {
  if (staticRoot.has(token) && normalize(staticRoot.get(token)) !== normalize(colors.get(key))) failures.push(`global CSS token drift: ${token}`);
}
const expectedColorValues = Object.entries(tokenToDesignColor).map(([token, key]) => [token, colors.get(key)]);
for (const [token, value] of expectedColorValues) {
  if (!value) failures.push(`canonical design color value missing for ${token}`);
}
const expectedTokenCss = `html:root{${expectedColorValues.map(([token, value]) => `${token}:${value ?? ''}`).join(';')};`;
const inlineTokenCss = distHomepage.match(/<style>(html:root\{[^<]+})<\/style>/)?.[1];
if (!normalize(inlineTokenCss ?? '').startsWith(normalize(expectedTokenCss))) failures.push('homepage inline token bridge has drifted from DESIGN.md');
if (!normalize(distTokens).includes(normalize(expectedTokenCss))) failures.push('public design-tokens.css has drifted from DESIGN.md');

const requiredResponsiveRules = [
  '@media (max-width:640px)',
  '.main-nav{height:auto;flex-wrap:wrap',
  '.main-nav a{min-height:44px',
  '.header-search-label',
  '.ui-button-sm',
  '.button{min-height:44px',
  '.discover-grid',
];
for (const rule of requiredResponsiveRules) if (!globalCss.includes(rule)) failures.push(`responsive drift guard missing: ${rule}`);

try { await stat(path.join(root, 'website', 'dist')); } catch { failures.push('website/dist is missing; run npm run site:build first'); }

const result = {
  passed: failures.length === 0,
  source: 'DESIGN.md',
  mirrorExact: design === mirror,
  canonicalColorCount: colors.size,
  mappedColorTokenCount: mappedTokens.size,
  responsiveRulesChecked: requiredResponsiveRules.length,
  contractVisualVariantsChecked: 3,
  failures,
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

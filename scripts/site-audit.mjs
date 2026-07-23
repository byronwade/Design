import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const website = path.join(root, 'website');
const dist = path.join(website, 'dist');
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files;
}

function routeFile(route) {
  return route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html');
}

try {
  await stat(dist);
  const referenceSource = await readFile(path.join(website, 'src', 'data', 'reference.ts'), 'utf8');
  const contractProjectSource = await readFile(path.join(website, 'src', 'data', 'contract-projects.ts'), 'utf8');
  const layoutSource = await readFile(path.join(website, 'src', 'layouts', 'SiteLayout.astro'), 'utf8');
  const headerSource = await readFile(path.join(website, 'src', 'components', 'SiteHeader.astro'), 'utf8');
  const docsPageSource = await readFile(path.join(website, 'src', 'pages', 'docs.astro'), 'utf8');
  const packageSource = await readFile(path.join(root, 'package.json'), 'utf8');
  const referenceSlugs = [...referenceSource.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  const contractProjectSlugs = [...contractProjectSource.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  const sourcePaths = [...new Set([...referenceSource.matchAll(/source: '([^']+)'/g)].map((match) => match[1]))];
  if (!layoutSource.includes('siteTokenCss') || !layoutSource.includes('set:html')) failures.push('shared site layout must inline canonical design tokens');
  if (headerSource.includes('class:list-active') || !headerSource.includes("class:list={{ 'list-active':")) failures.push('site navigation must use valid Astro class:list directives for active destinations');
  if (!headerSource.includes('/contracts/') || headerSource.includes('/catalog/') || headerSource.includes('/blocks/') || headerSource.includes('/showcase/') || headerSource.includes('/skills/')) failures.push('site navigation must only expose home, contracts, and docs');
  for (const route of ['catalog', 'blocks', 'skills', 'reference', 'showcase', 'lab', 'tools', 'search']) {
    try {
      await stat(path.join(website, 'src', 'pages', route));
      failures.push(`removed public route source still exists: /${route}/`);
    } catch {
      // Missing is the expected state for routes outside the public surface.
    }
  }
  for (const section of ['#install', '#model', '#references', '#workflow', '#commands', '#verify', '#benchmarks', '#surface', '#contribute']) {
    if (!docsPageSource.includes(`id="${section.slice(1)}"`)) failures.push(`documentation route missing section: ${section}`);
  }
  if (!packageSource.includes('"license": "MIT"')) failures.push('package metadata must declare the open-source license');
  try { await stat(path.join(root, 'LICENSE')); } catch { failures.push('missing root LICENSE file'); }
  const canonicalDesignFiles = (await walk(path.join(root, '.design'))).filter((file) => /\.(md|json)$/.test(file)).map((file) => path.relative(root, file).replaceAll(path.sep, '/'));
  const referenceSourcePaths = new Set([...referenceSource.matchAll(/source: '([^']+)'/g)].map((match) => match[1]));
  for (const canonicalFile of canonicalDesignFiles) {
    if (!referenceSourcePaths.has(canonicalFile)) failures.push(`canonical source missing from Reference: ${canonicalFile}`);
  }
  const expectedRoutes = ['/', '/404.html', '/contracts/', '/docs/'];
  expectedRoutes.push(...contractProjectSlugs.map((slug) => `/contracts/${slug}/`));

  const files = await walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const relativeFiles = new Set(files.map((file) => path.relative(dist, file).replaceAll(path.sep, '/')));
  const actual = new Set(htmlFiles.map((file) => path.relative(dist, file).replaceAll(path.sep, '/')));
  const htmlByRoute = new Map();
  const routeForHtml = (relative) => relative === 'index.html' ? '/' : `/${relative.replace(/(?:^|\/)index\.html$/, '/').replace(/\\/g, '/')}`;
  for (const requiredAsset of ['robots.txt', 'sitemap.xml', 'design-tokens.css']) {
    if (!relativeFiles.has(requiredAsset)) failures.push(`missing public asset: ${requiredAsset}`);
  }
  let inlineScriptBytes = 0;
  let externalScriptBytes = 0;
  let stylesheetBytes = 0;
  let externalAssetReferences = 0;
  let internalLinkFailures = 0;
  let largestHtmlBytes = 0;
  let totalOutputBytes = 0;
  const scriptAssets = new Set();
  const stylesheetAssets = new Set();

  for (const file of files) totalOutputBytes += (await stat(file)).size;
  for (const sourcePath of sourcePaths) {
    try { await stat(path.join(root, sourcePath)); }
    catch { failures.push(`missing source record: ${sourcePath}`); }
  }

  for (const route of expectedRoutes) {
    const relative = route === '/404.html' ? '404.html' : routeFile(route).replaceAll(path.sep, '/');
    if (!actual.has(relative)) failures.push(`missing route: ${route}`);
  }

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const relative = path.relative(dist, file).replaceAll(path.sep, '/');
    htmlByRoute.set(routeForHtml(relative), html);
    largestHtmlBytes = Math.max(largestHtmlBytes, Buffer.byteLength(html));
    if (!/<html[^>]+lang="en"/.test(html)) failures.push(`missing lang=en: ${relative}`);
    if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`missing title: ${relative}`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`missing description: ${relative}`);
    if (!/<h1[\s>]/.test(html)) failures.push(`missing h1: ${relative}`);
    if (!/<main[\s>]/.test(html)) failures.push(`missing main: ${relative}`);
    if (!/<a[^>]+class="skip-link"[^>]+href="#main-content"/.test(html)) failures.push(`missing skip link: ${relative}`);
    if (!/<link[^>]+rel="sitemap"[^>]+href="\/sitemap\.xml"/.test(html)) failures.push(`missing sitemap link: ${relative}`);
    const hasInlineTokens = /<style>html:root\{[^<]+<\/style>/.test(html);
    const hasTokenStylesheet = /<link[^>]+rel="stylesheet"[^>]+href="\/design-tokens\.css"/.test(html);
    if (!hasInlineTokens && !hasTokenStylesheet) failures.push(`missing canonical tokens: ${relative}`);
    if (/<(?:script|img)[^>]+src=["']https?:\/\//i.test(html) || /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i.test(html)) { failures.push(`external asset reference: ${relative}`); externalAssetReferences += 1; }
    for (const match of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const route = href.split('#')[0].split('?')[0] || '/';
      const target = route === '/404.html' ? '404.html' : routeFile(route).replaceAll(path.sep, '/');
      if (!actual.has(target)) { failures.push(`broken internal link: ${relative} -> ${href}`); internalLinkFailures += 1; }
      const anchor = href.includes('#') ? href.split('#')[1] : '';
      if (anchor && actual.has(target)) {
        const targetRoute = route === '/404.html' ? '/404.html' : routeForHtml(target);
        const targetHtml = htmlByRoute.get(targetRoute) ?? await readFile(path.join(dist, target), 'utf8');
        if (!new RegExp(`\\sid=["']${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(targetHtml)) {
          failures.push(`broken internal anchor: ${relative} -> ${href}`);
          internalLinkFailures += 1;
        }
      }
    }
    for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const source = match[1].match(/src=["']([^"']+)["']/i)?.[1];
      if (source?.startsWith('/_astro/') || source === '/design-tokens.css') {
        const asset = path.join(dist, source === '/design-tokens.css' ? 'design-tokens.css' : source.replace(/^\/_astro\//, '_astro/'));
        try { if (!scriptAssets.has(asset)) { externalScriptBytes += (await stat(asset)).size; scriptAssets.add(asset); } } catch { failures.push(`missing script asset: ${source}`); }
      } else inlineScriptBytes += Buffer.byteLength(match[2]);
    }
    for (const match of html.matchAll(/<link([^>]*)>/gi)) {
      const source = match[1].match(/href=["']([^"']+)["']/i)?.[1];
      if (source?.startsWith('/_astro/')) {
        const asset = path.join(dist, source.replace(/^\/_astro\//, '_astro/'));
        try { if (!stylesheetAssets.has(asset)) { stylesheetBytes += (await stat(asset)).size; stylesheetAssets.add(asset); } } catch { failures.push(`missing stylesheet asset: ${source}`); }
      }
    }
  }

  if (actual.size !== expectedRoutes.length) failures.push(`route count mismatch: expected ${expectedRoutes.length}, found ${actual.size}`);
  const totalScriptBytes = inlineScriptBytes + externalScriptBytes;
  if (totalScriptBytes > 20000) failures.push(`script budget exceeded: ${totalScriptBytes} bytes`);
  if (stylesheetBytes > 85000) failures.push(`stylesheet budget exceeded: ${stylesheetBytes} bytes`);
  if (largestHtmlBytes > 60000) failures.push(`largest HTML page exceeds budget: ${largestHtmlBytes} bytes`);
  if (totalOutputBytes > 1600000) failures.push(`static output budget exceeded: ${totalOutputBytes} bytes`);
  const result = { passed: failures.length === 0, routeCount: actual.size, expectedRouteCount: expectedRoutes.length, outputBytes: totalOutputBytes, largestHtmlBytes, scriptBytes: totalScriptBytes, stylesheetBytes, internalLinkFailures, externalAssetReferences, failures };
  console.log(JSON.stringify(result, null, 2));
  if (failures.length) process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({ passed: false, failures: [error.message] }, null, 2));
  process.exitCode = 1;
}

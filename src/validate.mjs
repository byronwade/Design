import fs from 'node:fs/promises';
import path from 'node:path';
import { expandProfile, loadManifest } from './manifest.mjs';
import {
  addFinding, exists, GENERATED_PREFIX, hash, parseFrontmatter,
  readJson, summarize, walk,
} from './utils.mjs';

function checkLocalDesignMd(markdown, findings) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    addFinding(findings, 'error', 'design-frontmatter', 'DESIGN.md', 'Missing YAML front matter.');
    return;
  }
  const allowed = new Set(['version', 'name', 'description', 'colors', 'typography', 'rounded', 'spacing', 'components']);
  for (const line of match[1].split(/\r?\n/)) {
    const top = line.match(/^([A-Za-z0-9_-]+):/);
    if (top && !allowed.has(top[1])) addFinding(findings, 'error', 'design-top-level-key', `DESIGN.md:${top[1]}`, `Unsupported top-level key ${top[1]}.`);
  }
  const canonical = ['Overview', 'Colors', 'Typography', 'Layout', 'Elevation & Depth', 'Shapes', 'Components', "Do's and Don'ts"];
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((value) => value[1].trim());
  for (const heading of new Set(headings.filter((value, index) => headings.indexOf(value) !== index))) {
    addFinding(findings, 'error', 'duplicate-section', 'DESIGN.md', `Duplicate section: ${heading}`);
  }
  const indexes = headings.filter((heading) => canonical.includes(heading)).map((heading) => canonical.indexOf(heading));
  if (indexes.some((value, index) => index > 0 && value < indexes[index - 1])) addFinding(findings, 'error', 'section-order', 'DESIGN.md', 'Canonical sections are out of order.');
}

async function checkMarkdownLinks(designDir, findings) {
  const markdownFiles = (await walk(designDir)).filter((file) =>
    file.endsWith('.md') && !file.startsWith(GENERATED_PREFIX) && !file.startsWith('sources/'));
  for (const relative of markdownFiles) {
    const markdown = await fs.readFile(path.join(designDir, relative), 'utf8');
    for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const link = match[1].trim().split('#')[0];
      if (!link || /^(https?:|mailto:|#)/.test(link)) continue;
      const resolved = path.resolve(path.dirname(path.join(designDir, relative)), decodeURIComponent(link));
      if (!resolved.startsWith(path.resolve(designDir))) continue;
      if (!await exists(resolved)) addFinding(findings, 'error', 'broken-link', relative, `Broken relative link: ${link}`);
    }
  }
}

export async function validateContract({ source, google = true, requireGoogle = false }) {
  const findings = [];
  const required = ['INDEX.md', 'DESIGN.md', 'AGENT.md', 'manifest.json', 'schema/manifest.schema.json', 'schema/project.schema.json'];
  for (const relative of required) if (!await exists(path.join(source, relative))) addFinding(findings, 'error', 'required-file', relative, 'Required file is missing.');
  if (findings.some((finding) => finding.severity === 'error')) return summarize(findings);

  let manifest;
  try { manifest = await loadManifest(source); }
  catch (error) {
    addFinding(findings, 'error', 'manifest', 'manifest.json', error.message);
    return summarize(findings);
  }

  const seenFiles = new Map();
  for (const [id, layer] of Object.entries(manifest.layers ?? {})) {
    const file = path.join(source, layer.file);
    if (!await exists(file)) {
      addFinding(findings, 'error', 'layer-file', layer.file, `Layer ${id} points to a missing file.`);
      continue;
    }
    const frontmatter = parseFrontmatter(await fs.readFile(file, 'utf8'));
    if (!frontmatter) addFinding(findings, 'error', 'frontmatter', layer.file, 'Contract file has no YAML front matter.');
    else if (frontmatter.id !== id) addFinding(findings, 'error', 'layer-id', layer.file, `Front matter id ${frontmatter.id ?? '(missing)'} does not match manifest id ${id}.`);
    if (seenFiles.has(layer.file)) addFinding(findings, 'error', 'duplicate-layer-file', layer.file, `File is used by ${seenFiles.get(layer.file)} and ${id}.`);
    seenFiles.set(layer.file, id);
    for (const parent of layer.extends ?? []) if (!manifest.layers[parent]) addFinding(findings, 'error', 'unknown-parent', id, `Unknown parent layer: ${parent}`);
  }

  for (const [bundleId, layerIds] of Object.entries(manifest.bundles ?? {})) {
    for (const layerId of layerIds) if (!manifest.layers[layerId]) addFinding(findings, 'error', 'bundle-layer', bundleId, `Unknown layer: ${layerId}`);
  }
  for (const [profileId, profile] of Object.entries(manifest.profiles ?? {})) {
    for (const bundleId of profile.bundles ?? []) if (!manifest.bundles[bundleId]) addFinding(findings, 'error', 'profile-bundle', profileId, `Unknown bundle: ${bundleId}`);
    for (const root of profile.roots ?? []) if (!manifest.layers[root]) addFinding(findings, 'error', 'profile-root', profileId, `Unknown root: ${root}`);
    try {
      const expanded = expandProfile(manifest, profileId);
      for (const requiredLayer of manifest.requiredInEveryProfile ?? []) {
        if (!expanded.includes(requiredLayer)) addFinding(findings, 'error', 'profile-required-layer', profileId, `Missing required layer: ${requiredLayer}`);
      }
    } catch (error) { addFinding(findings, 'error', 'profile-resolution', profileId, error.message); }
  }

  for (const sourceDoc of manifest.sourceDocuments ?? []) {
    const file = path.join(source, sourceDoc.file);
    if (!await exists(file)) {
      addFinding(findings, 'error', 'source-file', sourceDoc.file, 'Protected source file is missing.');
      continue;
    }
    if (hash(await fs.readFile(file)) !== sourceDoc.sha256) addFinding(findings, 'error', 'source-hash', sourceDoc.file, 'Protected source hash does not match manifest.');
  }

  for (const archive of manifest.sourceArchives ?? []) {
    const chunks = [];
    let missing = false;
    for (const relative of archive.parts ?? []) {
      const file = path.join(source, relative);
      if (!await exists(file)) {
        addFinding(findings, 'error', 'source-archive-part', relative, `Source archive ${archive.id} is missing a part.`);
        missing = true;
      } else chunks.push(await fs.readFile(file));
    }
    if (!missing && hash(Buffer.concat(chunks)) !== archive.originalSha256) {
      addFinding(findings, 'error', 'source-archive-hash', archive.id, 'Concatenated source archive does not match the original SHA-256.');
    }
  }

  const projectPath = path.join(source, 'project.json');
  if (await exists(projectPath)) {
    try {
      const project = await readJson(projectPath);
      for (const target of project.targets ?? []) if (!manifest.profiles[target.profile]) addFinding(findings, 'error', 'project-profile', 'project.json', `Unknown target profile: ${target.profile}`);
      for (const override of project.overrides ?? []) if (!await exists(path.join(source, override))) addFinding(findings, 'error', 'project-override', 'project.json', `Missing override: ${override}`);
    } catch (error) { addFinding(findings, 'error', 'project-json', 'project.json', error.message); }
  }

  const designMarkdown = await fs.readFile(path.join(source, 'DESIGN.md'), 'utf8');
  checkLocalDesignMd(designMarkdown, findings);
  await checkMarkdownLinks(source, findings);

  if (google) {
    try {
      const { lint } = await import('@google/design.md/linter');
      const report = lint(designMarkdown);
      for (const finding of report.findings ?? []) {
        const severity = finding.severity === 'error' ? 'error' : finding.severity === 'warning' ? 'warning' : 'info';
        addFinding(findings, severity, `google:${finding.rule ?? 'lint'}`, finding.path ?? 'DESIGN.md', finding.message);
      }
    } catch (error) {
      addFinding(findings, requireGoogle ? 'error' : 'warning', 'google-linter-unavailable', 'DESIGN.md', `Could not load @google/design.md/linter: ${error.message}`);
    }
  }
  return summarize(findings);
}

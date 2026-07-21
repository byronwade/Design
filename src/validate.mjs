import fs from 'node:fs/promises';
import path from 'node:path';
import { expandProfile, loadManifest } from './manifest.mjs';
import { getResolutionStatus } from './resolve.mjs';
import {
  addFinding, exists, GENERATED_PREFIX, hash, parseFrontmatter,
  readJson, resolveWithin, safeId, summarize, templateRoot, walk,
} from './utils.mjs';

function sameArray(left, right) {
  return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
}

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

async function checkQualityRules(designDir, manifest, findings) {
  const relative = manifest.qualityRules;
  if (!relative) {
    addFinding(findings, 'error', 'quality-rules', 'manifest.json', 'qualityRules is missing.');
    return;
  }
  let rules;
  try { rules = await readJson(resolveWithin(designDir, relative, 'qualityRules')); }
  catch (error) {
    addFinding(findings, 'error', 'quality-rules-json', relative, error.message);
    return;
  }
  if (rules.schemaVersion !== 1 || !Array.isArray(rules.rules) || rules.rules.length === 0) {
    addFinding(findings, 'error', 'quality-rules-shape', relative, 'Quality rules require schemaVersion 1 and a non-empty rules array.');
    return;
  }
  const ids = new Set();
  for (const rule of rules.rules) {
    if (!/^DS-[A-Z0-9]+-[0-9]{3}$/.test(rule.id ?? '')) addFinding(findings, 'error', 'quality-rule-id', relative, `Invalid rule id: ${rule.id ?? '(missing)'}`);
    if (ids.has(rule.id)) addFinding(findings, 'error', 'quality-rule-duplicate', relative, `Duplicate rule id: ${rule.id}`);
    ids.add(rule.id);
    if (!['error', 'warning', 'info'].includes(rule.severity)) addFinding(findings, 'error', 'quality-rule-severity', rule.id ?? relative, `Invalid severity: ${rule.severity}`);
    if (!rule.category || !rule.requirement) addFinding(findings, 'error', 'quality-rule-content', rule.id ?? relative, 'Rule category and requirement are required.');
  }
}

function checkProfileCompatibility(manifest, profileId, expanded, findings) {
  const mobile = ['vertical.mobile.ios', 'vertical.mobile.ipados', 'vertical.mobile.android'].filter((id) => expanded.includes(id));
  const desktop = ['vertical.desktop.macos', 'vertical.desktop.windows', 'vertical.desktop.linux.gnome', 'vertical.desktop.linux.kde'].filter((id) => expanded.includes(id));
  const web = ['vertical.web.app', 'vertical.web.marketing'].filter((id) => expanded.includes(id));
  if (mobile.length > 1) addFinding(findings, 'error', 'profile-sibling-mobile', profileId, `Profile mixes sibling mobile platforms: ${mobile.join(', ')}`);
  if (desktop.length > 1) addFinding(findings, 'error', 'profile-sibling-desktop', profileId, `Profile mixes sibling desktop platforms: ${desktop.join(', ')}`);
  if (web.length > 1) addFinding(findings, 'error', 'profile-sibling-web', profileId, `Profile mixes application and marketing web surfaces: ${web.join(', ')}`);
  if (!manifest.profiles[profileId].composite && mobile.length + desktop.length > 1) addFinding(findings, 'error', 'profile-noncomposite-platforms', profileId, 'Non-composite profile mixes mobile and desktop platforms.');
}

export async function validateContract({ source, google = true, requireGoogle = false }) {
  const findings = [];
  const required = [
    'INDEX.md', 'DESIGN.md', 'AGENT.md', 'manifest.json',
    'schema/manifest.schema.json', 'schema/project.schema.json', 'schema/rules.schema.json',
    'quality/INDEX.md', 'quality/REVIEW.md', 'quality/EVIDENCE.md', 'quality/RULES.json',
    'sources/README.md', 'sources/COVERAGE.md', 'sources/DESIGN-PRINCIPLES.md',
  ];
  for (const relative of required) if (!await exists(path.join(source, relative))) addFinding(findings, 'error', 'required-file', relative, 'Required file is missing.');
  if (findings.some((finding) => finding.severity === 'error')) return summarize(findings);

  let manifest;
  try { manifest = await loadManifest(source); }
  catch (error) {
    addFinding(findings, 'error', 'manifest', 'manifest.json', error.message);
    return summarize(findings);
  }

  for (const schema of ['schema/manifest.schema.json', 'schema/project.schema.json', 'schema/rules.schema.json']) {
    try { await readJson(path.join(source, schema)); }
    catch (error) { addFinding(findings, 'error', 'schema-json', schema, error.message); }
  }

  const seenFiles = new Map();
  for (const [id, layer] of Object.entries(manifest.layers ?? {})) {
    let file;
    try { file = resolveWithin(source, layer.file, `Layer ${id}`); }
    catch (error) { addFinding(findings, 'error', 'layer-path', id, error.message); continue; }
    if (!await exists(file)) {
      addFinding(findings, 'error', 'layer-file', layer.file, `Layer ${id} points to a missing file.`);
      continue;
    }
    const frontmatter = parseFrontmatter(await fs.readFile(file, 'utf8'));
    if (!frontmatter) addFinding(findings, 'error', 'frontmatter', layer.file, 'Contract file has no YAML front matter.');
    else {
      if (frontmatter.id !== id) addFinding(findings, 'error', 'layer-id', layer.file, `Front matter id ${frontmatter.id ?? '(missing)'} does not match manifest id ${id}.`);
      if (frontmatter.status !== 'normative') addFinding(findings, 'error', 'layer-status', layer.file, `Registered layer status must be normative, found ${frontmatter.status ?? '(missing)'}.`);
      if (!frontmatter.kind || !frontmatter.version) addFinding(findings, 'error', 'layer-metadata', layer.file, 'Registered layers require kind and version.');
      if (!sameArray(frontmatter.extends, layer.extends)) addFinding(findings, 'error', 'layer-extends', layer.file, `Front matter extends ${JSON.stringify(frontmatter.extends ?? [])} does not match manifest ${JSON.stringify(layer.extends ?? [])}.`);
    }
    if (seenFiles.has(layer.file)) addFinding(findings, 'error', 'duplicate-layer-file', layer.file, `File is used by ${seenFiles.get(layer.file)} and ${id}.`);
    seenFiles.set(layer.file, id);
    for (const parent of layer.extends ?? []) if (!manifest.layers[parent]) addFinding(findings, 'error', 'unknown-parent', id, `Unknown parent layer: ${parent}`);
  }

  const normativeDirectories = ['global/', 'components/', 'patterns/', 'verticals/', 'quality/'];
  for (const relative of await walk(source)) {
    if (!relative.endsWith('.md') || !normativeDirectories.some((prefix) => relative.startsWith(prefix))) continue;
    const frontmatter = parseFrontmatter(await fs.readFile(path.join(source, relative), 'utf8'));
    if (frontmatter?.status === 'normative' && !seenFiles.has(relative) && frontmatter.id !== 'quality.index') {
      addFinding(findings, 'error', 'unregistered-normative-file', relative, `Normative contract ${frontmatter.id ?? '(missing id)'} is not registered in manifest.json.`);
    }
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
      checkProfileCompatibility(manifest, profileId, expanded, findings);
    } catch (error) { addFinding(findings, 'error', 'profile-resolution', profileId, error.message); }
  }

  for (const projectFile of manifest.projectDocumentDefaults ?? []) {
    if (!await exists(resolveWithin(source, projectFile, 'Project document'))) addFinding(findings, 'error', 'project-default-file', projectFile, 'Project default document is missing.');
  }
  const projectOwned = new Set(manifest.projectOwnedFiles ?? []);
  for (const projectFile of manifest.projectDocumentDefaults ?? []) if (!projectOwned.has(projectFile)) addFinding(findings, 'error', 'project-ownership', projectFile, 'Default project document must be project-owned.');

  for (const sourceDoc of manifest.sourceDocuments ?? []) {
    const file = resolveWithin(source, sourceDoc.file, 'Protected source');
    if (!await exists(file)) {
      addFinding(findings, 'error', 'source-file', sourceDoc.file, 'Protected source file is missing.');
      continue;
    }
    if (hash(await fs.readFile(file)) !== sourceDoc.sha256) addFinding(findings, 'error', 'source-hash', sourceDoc.file, 'Protected source hash does not match manifest.');
  }

  for (const archive of manifest.sourceArchives ?? []) {
    const chunks = [];
    let missing = false;
    if (!await exists(resolveWithin(source, archive.index, 'Source archive index'))) addFinding(findings, 'error', 'source-archive-index', archive.index, `Source archive ${archive.id} index is missing.`);
    for (const relative of archive.parts ?? []) {
      const file = resolveWithin(source, relative, 'Source archive part');
      if (!await exists(file)) {
        addFinding(findings, 'error', 'source-archive-part', relative, `Source archive ${archive.id} is missing a part.`);
        missing = true;
      } else chunks.push(await fs.readFile(file));
    }
    if (!missing && hash(Buffer.concat(chunks)) !== archive.originalSha256) addFinding(findings, 'error', 'source-archive-hash', archive.id, 'Concatenated source archive does not match the original SHA-256.');
  }

  await checkQualityRules(source, manifest, findings);

  const projectPath = path.join(source, 'project.json');
  if (await exists(projectPath)) {
    try {
      const project = await readJson(projectPath);
      const targetIds = new Set();
      let defaultCount = 0;
      if (!Array.isArray(project.targets) || project.targets.length === 0) addFinding(findings, 'error', 'project-targets', 'project.json', 'At least one target is required.');
      for (const target of project.targets ?? []) {
        if (!target.id || safeId(target.id) !== target.id) addFinding(findings, 'error', 'project-target-id', 'project.json', `Unsafe or missing target id: ${target.id ?? '(missing)'}`);
        if (targetIds.has(target.id)) addFinding(findings, 'error', 'project-target-duplicate', 'project.json', `Duplicate target id: ${target.id}`);
        targetIds.add(target.id);
        if (!manifest.profiles[target.profile]) addFinding(findings, 'error', 'project-profile', 'project.json', `Unknown target profile: ${target.profile}`);
        if (target.default) defaultCount += 1;
        for (const override of target.overrides ?? []) {
          try { if (!await exists(resolveWithin(source, override, 'Target override'))) addFinding(findings, 'error', 'project-override', 'project.json', `Missing override: ${override}`); }
          catch (error) { addFinding(findings, 'error', 'project-override-path', 'project.json', error.message); }
        }
      }
      if (defaultCount > 1) addFinding(findings, 'error', 'project-default-target', 'project.json', 'At most one target may be default.');
      for (const override of project.overrides ?? []) {
        try { if (!await exists(resolveWithin(source, override, 'Project override'))) addFinding(findings, 'error', 'project-override', 'project.json', `Missing override: ${override}`); }
        catch (error) { addFinding(findings, 'error', 'project-override-path', 'project.json', error.message); }
      }
      const readinessFiles = {
        'project/CONTEXT.md': [/^- \*\*Name:\*\*\s*$/m, /^\|\s*\|\s*\|\s*\|\s*\|\s*\|\s*\|\s*$/m],
        'project/TERMINOLOGY.md': [/^\|\s*\|\s*\|\s*\|\s*\|\s*$/m],
        'project/SURFACES.md': [/\| gap \|/],
        'project/COMPONENTS.md': [/\| gap \|/],
        'project/THEMES.md': [/\| gap \|/],
        'project/ASSETS.md': [/\| gap \|/],
        'project/REFERENCES.md': [/^\|\s*\|\s*\|\s*\|\s*\|\s*\|\s*\|\s*$/m],
      };
      const incomplete = [];
      for (const [relative, patterns] of Object.entries(readinessFiles)) {
        const content = await fs.readFile(path.join(source, relative), 'utf8');
        if (patterns.some((pattern) => pattern.test(content))) incomplete.push(relative);
      }
      if (incomplete.length > 0) addFinding(findings, 'warning', 'DS-PROJECT-003', 'project/', `Project design truth is still incomplete: ${incomplete.join(', ')}.`);
      const resolution = await getResolutionStatus({ target: path.dirname(source) });
      if (!resolution.current) addFinding(findings, 'error', 'generated-contract', 'generated/CONTEXT.json', `Generated target context is ${resolution.state}. Run design-contract resolve.`);
    } catch (error) { addFinding(findings, 'error', 'project-json', 'project.json', error.message); }
  }

  const designMarkdown = await fs.readFile(path.join(source, 'DESIGN.md'), 'utf8');
  checkLocalDesignMd(designMarkdown, findings);
  if (path.resolve(source) === path.resolve(templateRoot)) {
    const rootMirror = path.join(path.dirname(source), 'DESIGN.md');
    if (!await exists(rootMirror)) addFinding(findings, 'error', 'root-design-mirror', 'DESIGN.md', 'Canonical repository root DESIGN.md mirror is missing.');
    else if ((await fs.readFile(rootMirror, 'utf8')) !== designMarkdown) addFinding(findings, 'error', 'root-design-drift', 'DESIGN.md', 'Root DESIGN.md must exactly mirror .design/DESIGN.md.');
  }
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

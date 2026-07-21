import fs from 'node:fs/promises';
import path from 'node:path';
import { expandProfile, loadManifest } from './manifest.mjs';
import { exists, readJson, safeId, writeJson } from './utils.mjs';

export async function resolveInstalledContract({ target }) {
  const designDir = path.join(target, '.design');
  const manifest = await loadManifest(designDir);
  const configPath = path.join(designDir, 'project.json');
  if (!await exists(configPath)) throw new Error('Missing .design/project.json. Run init or create a project config.');
  const config = await readJson(configPath);
  const generated = path.join(designDir, 'generated');
  await fs.rm(generated, { recursive: true, force: true });
  await fs.mkdir(generated, { recursive: true });

  const context = { schemaVersion: 1, generatedAt: new Date().toISOString(), targets: [] };
  const indexLines = ['# Resolved design targets', '', '> Generated. Do not edit.', ''];

  for (const targetConfig of config.targets ?? []) {
    const profile = manifest.profiles[targetConfig.profile];
    if (!profile) throw new Error(`Unknown profile in project.json: ${targetConfig.profile}`);
    const layerIds = expandProfile(manifest, targetConfig.profile);
    const overrides = [...(config.overrides ?? []), ...(targetConfig.overrides ?? [])];
    const documents = [
      { id: 'google.design-md', file: 'DESIGN.md', role: 'portable visual core' },
      { id: 'agent.workflow', file: 'AGENT.md', role: 'mandatory workflow' },
      ...layerIds.map((id) => ({ id, file: manifest.layers[id].file, role: manifest.layers[id].role })),
      ...overrides.map((file, index) => ({ id: `project.override.${index + 1}`, file, role: 'project override' })),
    ];

    const targetId = safeId(targetConfig.id || targetConfig.profile);
    const targetDir = path.join(generated, targetId);
    await fs.mkdir(targetDir, { recursive: true });
    const contract = [
      '---', 'generated: true', `target: ${targetId}`, `profile: ${targetConfig.profile}`,
      `generated_at: ${new Date().toISOString()}`, 'do_not_edit: true', '---', '',
      `# Resolved Design Contract: ${targetId}`, '',
      `Profile: **${targetConfig.profile}** — ${profile.description}`, '',
      '> Later documents override earlier documents only for their declared platform or surface scope. Accessibility, safety, legal requirements, and explicit project requirements always remain higher authority.', '',
      '## Read order', '',
      ...documents.map((doc, index) => `${index + 1}. \`.design/${doc.file}\` — ${doc.role ?? doc.id}`), ''
    ];

    for (const doc of documents) {
      const file = path.join(designDir, doc.file);
      if (!await exists(file)) throw new Error(`Resolved document does not exist: ${doc.file}`);
      const content = await fs.readFile(file, 'utf8');
      contract.push('---', '', `## Source: .design/${doc.file}`, '', content.trim(), '');
    }

    await fs.writeFile(path.join(targetDir, 'CONTRACT.md'), `${contract.join('\n')}\n`, 'utf8');
    await fs.writeFile(path.join(targetDir, 'INDEX.md'), `# ${targetId}\n\n- Profile: \`${targetConfig.profile}\`\n- Resolved contract: [CONTRACT.md](CONTRACT.md)\n- Layer count: ${documents.length}\n\nRead the contract before UI work. Do not load sibling target contracts unless cross-platform comparison is required.\n`, 'utf8');
    indexLines.push(`- [${targetId}](${targetId}/INDEX.md) — \`${targetConfig.profile}\`: ${profile.description}`);
    context.targets.push({ id: targetId, profile: targetConfig.profile, documents });
  }

  await fs.writeFile(path.join(generated, 'INDEX.md'), `${indexLines.join('\n')}\n`, 'utf8');
  await writeJson(path.join(generated, 'CONTEXT.json'), context);
  return { action: 'resolved', target, targets: context.targets.map((entry) => entry.id) };
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { exists, replaceManagedBlock, writeText } from './utils.mjs';

const CLI = 'npx --yes github:byronwade/Design';
const BODY = `For UI/UX design, implementation, component changes, content states, motion, or review:

1. Run \`${CLI} status\`; run \`${CLI} sync\` if the engine is out of date.
2. Run \`${CLI} resolve --request "<task>"\` and use the returned task packet.
3. Read \`DESIGN.md\` and only the packet-relevant generated context, mappings, references, and production code.
4. Use the universal \`design\` Skill when available. Legacy \`design-system\` and \`design-review\` Skills are compatibility routers.
5. Inspect production components, stories, tests, fixtures, routes, and applicable approved references under \`design/references/\` before changing structure.
6. Reuse mapped components, approved component-source primitives, approved blocks, and semantic tokens. A missing capability requires a design-system gap, not a page-local primitive.
7. Do not mix sibling platform profiles or edit \`.design/generated/\`.
8. Run \`${CLI} check\`, then \`${CLI} verify --mode release\` with affected surfaces and evidence files covering rendered structure, accessibility, keyboard/focus behavior, responsiveness, overflow, realistic states, browser screenshot or static capture output, and approved baseline comparison before claiming completion.`;

async function managedBlock(file, heading, body) {
  const current = await exists(file) ? await fs.readFile(file, 'utf8') : '';
  await writeText(file, replaceManagedBlock(current, heading, body));
}

async function managedSkill(file, name, description, body) {
  const title = name === 'design' ? 'Design' : name === 'design-review' ? 'Design Review' : 'Design System';
  await writeText(file, `---\nname: ${name}\ndescription: ${description}\n---\n\n<!-- design-contract-managed -->\n# ${title}\n\n${body}\n`);
}

async function ensureClaudeImport(target) {
  const file = path.join(target, 'CLAUDE.md');
  const current = await exists(file) ? await fs.readFile(file, 'utf8') : '';
  if (/^\s*@AGENTS\.md\s*$/m.test(current)) return;
  await writeText(file, `@AGENTS.md\n${current.trim() ? `\n${current.trim()}\n` : ''}`);
}

export async function applyAdapters(target, adapters, targets = []) {
  const results = [];
  if (adapters.includes('codex')) {
    await managedBlock(path.join(target, 'AGENTS.md'), 'Design contract', BODY);
    await managedSkill(path.join(target, '.agents/skills/design/SKILL.md'), 'design', 'Resolve, apply, check, and verify the project DESIGN.md grammar before UI work.', BODY);
    await managedSkill(path.join(target, '.agents/skills/design-system/SKILL.md'), 'design-system', 'Compatibility router for the universal design Skill.', `Use \`.agents/skills/design/SKILL.md\` for the full workflow.\n\n${BODY}`);
    await managedSkill(path.join(target, '.agents/skills/design-review/SKILL.md'), 'design-review', 'Compatibility router for design verification receipts.', `Use \`.agents/skills/design/SKILL.md\` and review the \`${CLI} verify\` receipt.\n\n${BODY}`);
    for (const item of targets) {
      if (!item.root || item.root === '.') continue;
      await managedBlock(path.join(target, item.root, 'AGENTS.override.md'), 'Design target', `Target: \`${item.id}\`\nProfile: \`${item.profile}\`\nRun \`${CLI} resolve --id ${item.id} --request "<task>"\` before UI work. Do not load sibling targets.`);
    }
    results.push('codex');
  }
  if (adapters.includes('claude')) {
    await ensureClaudeImport(target);
    await managedSkill(path.join(target, '.claude/skills/design/SKILL.md'), 'design', 'Resolve, apply, check, and verify the project DESIGN.md grammar before UI work.', BODY);
    await managedSkill(path.join(target, '.claude/skills/design-system/SKILL.md'), 'design-system', 'Compatibility router for the universal design Skill.', `Use \`.claude/skills/design/SKILL.md\` for the full workflow.\n\n${BODY}`);
    await managedSkill(path.join(target, '.claude/skills/design-review/SKILL.md'), 'design-review', 'Compatibility router for design verification receipts.', `Use \`.claude/skills/design/SKILL.md\` and review the \`${CLI} verify\` receipt.\n\n${BODY}`);
    results.push('claude');
  }
  if (adapters.includes('copilot')) {
    await managedBlock(path.join(target, '.github/copilot-instructions.md'), 'Design contract', BODY);
    results.push('copilot');
  }
  return results;
}

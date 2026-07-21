import fs from 'node:fs/promises';
import path from 'node:path';
import { exists, replaceManagedBlock, writeText } from './utils.mjs';

const BODY = `For UI/UX design, implementation, component changes, content states, motion, or review:

1. Run \`design-contract status\` and refresh stale context with \`design-contract context\`.
2. Select the target named by the task, the target whose configured root contains the work, or the single default target.
3. Read \`DESIGN.md\`, \`.design/generated/<target>.md\`, and the project files under \`design/\`.
4. Inspect production components, stories, tests, fixtures, routes, and approved references before changing structure.
5. Produce the design brief and component map required by the resolved contract.
6. Reuse mapped components and semantic tokens. A missing capability requires a design-system gap, not a page-local primitive.
7. Do not mix sibling platform profiles or edit \`.design/generated/\`.
8. Run \`design-contract validate\` plus the product's rendered, runtime, accessibility, and visual checks before claiming completion.`;

async function managedBlock(file, heading, body) {
  const current = await exists(file) ? await fs.readFile(file, 'utf8') : '';
  await writeText(file, replaceManagedBlock(current, heading, body));
}

async function managedSkill(file, name, description, body) {
  await writeText(file, `---\nname: ${name}\ndescription: ${description}\n---\n\n<!-- design-contract-managed -->\n# ${name === 'design-review' ? 'Design Review' : 'Design System'}\n\n${body}\n`);
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
    await managedSkill(path.join(target, '.agents/skills/design-system/SKILL.md'), 'design-system', 'Apply the selected compiled design contract before changing UI.', BODY);
    await managedSkill(path.join(target, '.agents/skills/design-review/SKILL.md'), 'design-review', 'Review rendered UI and implementation against the selected contract and evidence requirements.', `${BODY}\n\nReview actual rendered states. Do not approve a visual baseline merely because it changed.`);
    for (const item of targets) {
      if (!item.root || item.root === '.') continue;
      await managedBlock(path.join(target, item.root, 'AGENTS.override.md'), 'Design target', `Target: \`${item.id}\`\nProfile: \`${item.profile}\`\nRead \`.design/generated/${item.id}.md\` before UI work. Do not load sibling targets.`);
    }
    results.push('codex');
  }
  if (adapters.includes('claude')) {
    await ensureClaudeImport(target);
    await managedSkill(path.join(target, '.claude/skills/design-system/SKILL.md'), 'design-system', 'Apply the selected compiled design contract before changing UI.', BODY);
    await managedSkill(path.join(target, '.claude/skills/design-review/SKILL.md'), 'design-review', 'Review UI against the selected contract and evidence requirements.', `${BODY}\n\nReport confirmed findings only.`);
    results.push('claude');
  }
  if (adapters.includes('copilot')) {
    await managedBlock(path.join(target, '.github/copilot-instructions.md'), 'Design contract', BODY);
    results.push('copilot');
  }
  return results;
}

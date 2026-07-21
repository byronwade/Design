import fs from 'node:fs/promises';
import path from 'node:path';
import { exists } from './utils.mjs';

const ADAPTER_BODY = `For interface design, UI implementation, component changes, content states, or motion work:

1. Read \`.design/generated/INDEX.md\` and select the target named by the task.
2. Read that target's generated \`CONTRACT.md\` and \`.design/AGENT.md\`.
3. Do not load sibling platform verticals unless comparing platforms is the task.
4. Reuse existing production components and mappings before proposing a new primitive.
5. Run \`npx design-contract validate\` before completion and report evidence.`;

async function writeManagedBlock(file, heading, body) {
  const start = '<!-- design-contract:start -->';
  const end = '<!-- design-contract:end -->';
  const block = `${start}\n## ${heading}\n\n${body.trim()}\n${end}`;
  let current = await exists(file) ? await fs.readFile(file, 'utf8') : '';
  const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`${escape(start)}[\\s\\S]*?${escape(end)}`);
  current = pattern.test(current) ? current.replace(pattern, block) : `${current.trim()}${current.trim() ? '\n\n' : ''}${block}\n`;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, current, 'utf8');
}

async function writeSkill(file, force) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  if (!await exists(file) || force || (await fs.readFile(file, 'utf8')).includes('design-contract-managed')) {
    await fs.writeFile(file, `---\nname: design-system\ndescription: Apply the installed target-aware design contract before designing or implementing UI.\n---\n\n<!-- design-contract-managed -->\n# Design System\n\n${ADAPTER_BODY}\n`, 'utf8');
  }
}

export async function applyAdapters(target, adapters, force = false) {
  const results = [];
  if (adapters.includes('codex')) {
    await writeManagedBlock(path.join(target, 'AGENTS.md'), 'Design contract', ADAPTER_BODY);
    await writeSkill(path.join(target, '.agents/skills/design-system/SKILL.md'), force);
    results.push('codex');
  }
  if (adapters.includes('claude')) {
    await writeManagedBlock(path.join(target, 'CLAUDE.md'), 'Design contract', ADAPTER_BODY);
    await writeSkill(path.join(target, '.claude/skills/design-system/SKILL.md'), force);
    results.push('claude');
  }
  if (adapters.includes('copilot')) {
    await writeManagedBlock(path.join(target, '.github/copilot-instructions.md'), 'Design contract', ADAPTER_BODY);
    results.push('copilot');
  }
  return results;
}

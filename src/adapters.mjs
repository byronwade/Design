import fs from 'node:fs/promises';
import path from 'node:path';
import { exists } from './utils.mjs';

const ADAPTER_BODY = `For interface design, UI implementation, component changes, content states, motion, or design review:

1. Run \`npx --yes github:byronwade/Design status\` when generated context may be missing or stale.
2. Read \`.design/generated/INDEX.md\` and select the target explicitly named by the task, its configured product root, or the single default target.
3. Read only that target's generated \`CONTRACT.md\`. Do not load sibling platform verticals unless comparing platforms is the task.
4. Follow the required brief and component map in \`.design/AGENT.md\`.
5. Inspect the production component registry, routes, stories, fixtures, tests, terminology, golden references, decisions, and exceptions included in the contract.
6. Reuse approved production components and command mappings. A missing capability is a design-system gap, not permission for a page-local primitive.
7. Validate realistic states, platform behavior, accessibility, performance, trust, and evidence.
8. Run \`npx --yes github:byronwade/Design validate\` plus the product's rendered and runtime checks before completion.`;

const REVIEW_BODY = `For UI/UX review, use the selected generated contract, \`.design/quality/REVIEW.md\`, \`.design/quality/EVIDENCE.md\`, and \`.design/quality/RULES.json\`.

Report only confirmed findings. Classify each as blocker, issue, or suggestion; cite the surface or file, violated rule or principle, evidence, and the smallest credible correction. Check the actual rendered states and interaction paths when available. Do not approve a completion, synchronization, publication, collaboration, deployment, or verification claim without matching evidence.`;

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

async function writeSkill(file, { name, description, body }, force) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  if (!await exists(file) || force || (await fs.readFile(file, 'utf8')).includes('design-contract-managed')) {
    await fs.writeFile(file, `---\nname: ${name}\ndescription: ${description}\n---\n\n<!-- design-contract-managed -->\n# ${name === 'design-review' ? 'Design Review' : 'Design System'}\n\n${body}\n`, 'utf8');
  }
}

export async function applyAdapters(target, adapters, force = false) {
  const results = [];
  const designSkill = { name: 'design-system', description: 'Apply the installed target-aware design contract before designing or implementing UI.', body: ADAPTER_BODY };
  const reviewSkill = { name: 'design-review', description: 'Review UI and implementation against the installed target-aware design contract and evidence requirements.', body: REVIEW_BODY };
  if (adapters.includes('codex')) {
    await writeManagedBlock(path.join(target, 'AGENTS.md'), 'Design contract', `${ADAPTER_BODY}\n\n${REVIEW_BODY}`);
    await writeSkill(path.join(target, '.agents/skills/design-system/SKILL.md'), designSkill, force);
    await writeSkill(path.join(target, '.agents/skills/design-review/SKILL.md'), reviewSkill, force);
    results.push('codex');
  }
  if (adapters.includes('claude')) {
    await writeManagedBlock(path.join(target, 'CLAUDE.md'), 'Design contract', `${ADAPTER_BODY}\n\n${REVIEW_BODY}`);
    await writeSkill(path.join(target, '.claude/skills/design-system/SKILL.md'), designSkill, force);
    await writeSkill(path.join(target, '.claude/skills/design-review/SKILL.md'), reviewSkill, force);
    results.push('claude');
  }
  if (adapters.includes('copilot')) {
    await writeManagedBlock(path.join(target, '.github/copilot-instructions.md'), 'Design contract', `${ADAPTER_BODY}\n\n${REVIEW_BODY}`);
    results.push('copilot');
  }
  return results;
}

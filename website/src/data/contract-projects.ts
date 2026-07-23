import { reference } from './reference';

export type ContractProject = {
  slug: string;
  title: string;
  shortTitle: string;
  tone: string;
  status: 'Ready' | 'Draft' | 'Example';
  description: string;
  command: string;
  prompt: string;
  files: string[];
  roles: string[];
  skills: { name: string; path: string; when: string; purpose: string }[];
  photos: { label: string; path: string; note: string }[];
  components: { name: string; intent: string; shadcnBase: string }[];
  routes: string[];
  palette: string[];
  references: string[];
};

const warmReferences = [
  'orientation/visual-contract',
  'orientation/agent-workflow',
  'components/actions',
  'components/forms',
  'components/data-display',
  'patterns/pages',
  'sources/coverage',
];

export const contractProjects: ContractProject[] = [
  {
    slug: 'warm-paper-workbench',
    title: 'Warm Paper Workbench',
    shortTitle: 'Warm contract',
    tone: 'Warm, precise, editorial workbench',
    status: 'Ready',
    description:
      'The canonical project contract: DESIGN.md, AGENTS.md, a small skill stack, compiled context, reference memory, and shadcn-derived components rewritten into a warm operating surface.',
    command: 'design-contract init --profile web-app --app-type saas-workbench',
    prompt:
      'Use the Warm Paper Workbench contract. First run the design-system Skill, then read DESIGN.md, AGENTS.md, .design/generated/<target>.md, design/COMPOSITION.json, and only the project files needed for this task. Inspect approved files under design/references/ when they apply. Treat shadcn components as optional source primitives, not required dependencies. Redesign every used component so the result feels warm, calm, capable, tactile, and consistent with the approved references. Before reporting done, run the design-review Skill and show rendered component states, evidence, and the references used.',
    files: [
      'DESIGN.md',
      'AGENTS.md',
      '.agents/skills/design-system/SKILL.md',
      '.agents/skills/design-review/SKILL.md',
      '.design/generated/web-app.md',
      'design/COMPOSITION.json',
      'design/references/warm/',
    ],
    roles: ['Design owner', 'Frontend implementer', 'AI agent', 'Reviewer'],
    skills: [
      { name: 'design-system', path: '.agents/skills/design-system/SKILL.md', when: 'Before UI work', purpose: 'Apply compiled context, component source policy, mappings, and references.' },
      { name: 'frontend-design', path: 'skills/frontend-design/SKILL.md', when: 'When shaping a new surface', purpose: 'Turn the contract into a distinctive visual direction instead of generic defaults.' },
      { name: 'better-ui', path: 'skills/better-ui/SKILL.md', when: 'When improving component ergonomics', purpose: 'Tighten control choice, density, hierarchy, and state behavior.' },
      { name: 'design-review', path: '.agents/skills/design-review/SKILL.md', when: 'Before approval', purpose: 'Review rendered states, evidence, accessibility, references, and intentional visual changes.' },
    ],
    photos: [
      { label: 'Desk material', path: 'design/references/warm/desk-material.png', note: 'Paper, clay, ink, and low-glare work surfaces.' },
      { label: 'Product states', path: 'design/references/warm/product-states.png', note: 'Approved forms, tables, cards, and empty states.' },
      { label: 'Mobbin board', path: 'design/references/warm/mobbin-board.md', note: 'Searchable screenshots, flows, and pattern observations.' },
    ],
    components: [
      { name: 'Button', intent: 'A quiet command with enough weight to feel final.', shadcnBase: 'button' },
      { name: 'Input', intent: 'A paper-field control with clear focus and error space.', shadcnBase: 'input' },
      { name: 'Card', intent: 'A bounded work object, not a decorative panel.', shadcnBase: 'card' },
      { name: 'Tabs', intent: 'Mode switching that preserves task context.', shadcnBase: 'tabs' },
      { name: 'Table', intent: 'Dense comparison with calm rhythm and readable scan lines.', shadcnBase: 'table' },
      { name: 'Dialog', intent: 'A deliberate interruption with ownership and consequence.', shadcnBase: 'dialog' },
    ],
    routes: ['/', '/contracts/', '/contracts/warm-paper-workbench/', '/docs/'],
    palette: ['#f3eee5', '#fffdf8', '#2b2723', '#9b4f32', '#675f57'],
    references: warmReferences,
  },
  {
    slug: 'graphite-saas-console',
    title: 'Graphite SaaS Console',
    shortTitle: 'Graphite console',
    tone: 'Dense, neutral, operations-first',
    status: 'Example',
    description:
      'A contract pack for dashboards and admin tools where tables, filters, permissions, and repeated actions matter more than brand expression.',
    command: 'design-contract apply graphite-saas-console --target web-app --density compact',
    prompt:
      'Use the Graphite SaaS Console contract. Run the design-system Skill first. Keep the interface dense and neutral. Start from shadcn primitives only when they help behavior, then restyle each component for compact operations, strong keyboard use, and clear hierarchy. Use design/references/ only for approved screenshots and state evidence.',
    files: ['DESIGN.md', 'AGENTS.md', '.agents/skills/design-system/SKILL.md', '.agents/skills/design-review/SKILL.md', '.design/generated/web-app.md', 'design/references/graphite/'],
    roles: ['Product engineer', 'AI agent', 'Design reviewer'],
    skills: [
      { name: 'design-system', path: '.agents/skills/design-system/SKILL.md', when: 'Before UI work', purpose: 'Resolve target context, app type, mappings, and references.' },
      { name: 'better-ui', path: 'skills/better-ui/SKILL.md', when: 'When tightening workflows', purpose: 'Improve dense operations, filters, controls, and repeated action states.' },
      { name: 'code-review', path: 'skills/code-review/SKILL.md', when: 'Before merge', purpose: 'Find behavioral regressions, missing tests, and implementation risk.' },
    ],
    photos: [
      { label: 'Admin scans', path: 'design/references/graphite/admin-scans.png', note: 'High-density tables and filters.' },
      { label: 'Console states', path: 'design/references/graphite/console-states.png', note: 'Permissions, empty states, and recovery.' },
    ],
    components: [
      { name: 'Command', intent: 'Fast navigation and action dispatch.', shadcnBase: 'command' },
      { name: 'Data table', intent: 'Persistent comparison and bulk work.', shadcnBase: 'table' },
      { name: 'Sheet', intent: 'Inspect without losing the table.', shadcnBase: 'sheet' },
      { name: 'Select', intent: 'Low-friction filtering.', shadcnBase: 'select' },
    ],
    routes: ['/contracts/graphite-saas-console/'],
    palette: ['#111111', '#1f1f1f', '#f6f6f6', '#858585', '#9eb7ff'],
    references: ['components/data-display', 'components/commands-search', 'patterns/shells', 'platforms/web-app'],
  },
  {
    slug: 'visual-reference-starter',
    title: 'Visual Reference Starter',
    shortTitle: 'Reference starter',
    tone: 'Source-heavy, flexible, component agnostic',
    status: 'Draft',
    description:
      'A starter contract focused on reference images, Mobbin-style observations, source provenance, and repeatable AI instructions before a final brand direction exists.',
    command: 'design-contract init --with-references --photos optional',
    prompt:
      'Create a visual reference starter contract. Do not download bulk photos by default. Keep media under design/references/ or a permissioned external source. Add only approved screenshots or product photos, summarize what to preserve, and require the AI to run the design-system Skill before UI changes.',
    files: ['DESIGN.md', 'AGENTS.md', '.agents/skills/design-system/SKILL.md', 'design/REFERENCES.md', 'design/references/starter/'],
    roles: ['Founder', 'Designer', 'AI agent'],
    skills: [
      { name: 'design-system', path: '.agents/skills/design-system/SKILL.md', when: 'Before UI work', purpose: 'Bind visual references to the compiled target contract.' },
      { name: 'frontend-design', path: 'skills/frontend-design/SKILL.md', when: 'When translating references into UI', purpose: 'Create a distinctive direction from approved visual inputs.' },
      { name: 'image-to-code', path: 'skills/image-to-code/SKILL.md', when: 'When a screenshot must become implementation guidance', purpose: 'Extract structure and component clues from approved images.' },
    ],
    photos: [
      { label: 'Approved screenshots', path: 'design/references/starter/screenshots/', note: 'A small folder, added by the project owner.' },
      { label: 'Product photos', path: 'design/references/starter/photos/', note: 'Optional photos for mood, material, and object truth.' },
      { label: 'Pattern notes', path: 'design/REFERENCES.md', note: 'Mobbin-style tags without copied data.' },
    ],
    components: [
      { name: 'Card', intent: 'Reusable object framing for reference notes.', shadcnBase: 'card' },
      { name: 'Badge', intent: 'Pattern, flow, and confidence tags.', shadcnBase: 'badge' },
      { name: 'Textarea', intent: 'AI-ready design notes and prompts.', shadcnBase: 'textarea' },
      { name: 'Accordion', intent: 'Progressive disclosure for reference evidence.', shadcnBase: 'accordion' },
    ],
    routes: ['/contracts/visual-reference-starter/'],
    palette: ['#f8f8f4', '#ffffff', '#20201d', '#52616b', '#d9b26f'],
    references: ['sources/coverage', 'sources/primary', 'components/component-index', 'patterns/pages'],
  },
];

export const contractProjectBySlug = new Map(contractProjects.map((project) => [project.slug, project]));

export const contractReferences = (project: ContractProject) =>
  project.references.map((slug) => reference.find((item) => item.slug === slug)).filter(Boolean);

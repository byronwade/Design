export type SkillCategory = 'Authoring' | 'Review' | 'Quality';

export type SkillRecord = {
  slug: string;
  name: string;
  description: string;
  category: SkillCategory;
  status: 'Core' | 'Reviewer';
  source: string;
  tags: string[];
  stages: string[];
  command: string;
};

export const skills: SkillRecord[] = [
  { slug: 'design-system', name: 'Design System', description: 'Apply the selected compiled design contract before changing UI, interaction, content states, motion, or system behavior.', category: 'Authoring', status: 'Core', source: 'skills/design-system/SKILL.md', tags: ['profiles', 'contracts', 'agents'], stages: ['Select target', 'Read contract', 'Map intent', 'Verify surface'], command: 'npx --yes github:byronwade/Design context' },
  { slug: 'design-review', name: 'Design Review', description: 'Review rendered UI and implementation against the selected contract, stable rule IDs, and evidence requirements.', category: 'Review', status: 'Reviewer', source: 'skills/design-review/SKILL.md', tags: ['evidence', 'rendered UI', 'integrity'], stages: ['Inspect surface', 'Reproduce issues', 'Rank findings', 'Record evidence'], command: 'npx --yes github:byronwade/Design validate' },
  { slug: 'motion-audit', name: 'Motion Audit', description: 'Perform a read-only, evidence-based audit of animation and interaction motion, then write self-contained implementation plans.', category: 'Quality', status: 'Reviewer', source: 'skills/motion-audit/SKILL.md', tags: ['motion', 'reduced motion', 'performance'], stages: ['Map motion', 'Audit purpose', 'Rank findings', 'Write plan'], command: 'Read-only audit workflow' },
];

export const skillCategories = ['Authoring', 'Review', 'Quality'] as const;
export const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

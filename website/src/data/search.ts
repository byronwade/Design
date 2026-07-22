import { catalog } from './catalog';
import { reference } from './reference';
import { showcase } from './showcase';
import { skills } from './skills';

export type SearchKind = 'Catalog' | 'Reference' | 'Skills' | 'Showcase' | 'Guide';

export type SearchEntry = {
  title: string;
  description: string;
  kind: SearchKind;
  label: string;
  href: string;
  tags: string[];
};

const guides: SearchEntry[] = [
  { title: 'Documentation', description: 'The short, human-readable path through the engine, its ownership model, and adoption flow.', kind: 'Guide', label: 'Start here', href: '/docs/', tags: ['docs', 'getting started', 'engine'] },
  { title: 'Principles', description: 'The judgment layer behind the contract: calm, precise, capable, legible, deliberate, and trustworthy.', kind: 'Guide', label: 'Point of view', href: '/principles/', tags: ['principles', 'judgment', 'quality'] },
  { title: 'The Lab', description: 'Rendered specimens for tokens, components, layouts, data display, and the system in motion.', kind: 'Guide', label: 'Rendered proof', href: '/lab/', tags: ['lab', 'tokens', 'specimens'] },
  { title: 'Evaluation', description: 'The browser contract, reproducible commands, explicit evidence, and limits of the official surface.', kind: 'Guide', label: 'Quality / evidence', href: '/evaluate/', tags: ['evaluation', 'audit', 'quality'] },
  { title: 'Showcase submission', description: 'The local contribution kit for adding a system with decisions, context, provenance, and stable metadata.', kind: 'Guide', label: 'Contribute', href: '/showcase/submit/', tags: ['showcase', 'contribution', 'open source'] },
];

export const searchIndex: SearchEntry[] = [
  ...guides,
  ...catalog.map((item) => ({ title: item.title, description: item.description, kind: 'Catalog' as const, label: item.group, href: `/catalog/${item.slug}/`, tags: item.tags })),
  ...reference.map((item) => ({ title: item.title, description: item.description, kind: 'Reference' as const, label: item.section, href: `/reference/${item.slug}/`, tags: [item.status, item.section] })),
  ...skills.map((item) => ({ title: item.name, description: item.description, kind: 'Skills' as const, label: item.category, href: `/skills/${item.slug}/`, tags: item.tags })),
  ...showcase.map((item) => ({ title: item.title, description: item.summary, kind: 'Showcase' as const, label: item.surface, href: `/showcase/${item.slug}/`, tags: item.tags })),
];

export type ShowcaseSurface = 'web app' | 'web marketing' | 'mobile' | 'desktop';
export type ShowcasePreview = 'warm' | 'blue' | 'green' | 'ink' | 'rose' | 'yellow';

export type ShowcaseScreen = {
  label: string;
  title: string;
  caption: string;
  preview: ShowcasePreview;
  asset?: string;
  alt?: string;
};

export type ShowcaseRecord = {
  slug: string;
  title: string;
  author: string;
  kind: 'Official reference' | 'Curated example';
  surface: ShowcaseSurface;
  summary: string;
  tags: string[];
  preview: ShowcasePreview;
  screens: ShowcaseScreen[];
  source: string;
  notes: string[];
};

export const showcase: ShowcaseRecord[] = [
  { slug: 'warm-paper-workbench', title: 'Warm Paper Workbench', author: 'Design Contract', kind: 'Official reference', surface: 'web app', summary: 'A calm, compact system for capable professional products across native and web surfaces.', tags: ['warm', 'operational', 'semantic'], preview: 'warm', screens: [{ label: '01 / Shell', title: 'The working frame', caption: 'Global navigation, task body, and supporting context share one paper-like geometry.', preview: 'warm' }, { label: '02 / Data display', title: 'Comparison stays calm', caption: 'Dense rows preserve identity, status, and the next useful action.', preview: 'blue' }, { label: '03 / Detail', title: 'Context remains adjacent', caption: 'An inspector supports the object without stealing its reading measure.', preview: 'green' }], source: 'DESIGN.md', notes: ['Clay is scarce and semantic: principal action, focus, or meaningful selection.', 'Repeated operational work is compressed while navigation and reading remain relaxed.', 'The system is the official rendered test surface for this repository.'] },
  { slug: 'quiet-commerce', title: 'Quiet Commerce', author: 'Curated example', kind: 'Curated example', surface: 'web marketing', summary: 'A restrained retail language that lets material, price, and provenance carry the story.', tags: ['editorial', 'retail', 'light'], preview: 'rose', screens: [{ label: '01 / Editorial', title: 'Material leads', caption: 'A narrow reading measure gives the product enough room to feel considered.', preview: 'rose' }, { label: '02 / Product', title: 'Price stays legible', caption: 'The decision point is clear without turning the page into a sales wall.', preview: 'yellow' }, { label: '03 / Story', title: 'Provenance has a place', caption: 'Supporting evidence follows the object instead of competing with it.', preview: 'warm' }], source: 'website/src/data/showcase.ts', notes: ['Product identity is carried by a narrow reading measure and deliberate whitespace.', 'Action color is reserved for the next step, not used as a decorative brand wash.', 'The marketing shell stays shallow and separate from operational product chrome.'] },
  { slug: 'field-notes', title: 'Field Notes', author: 'Curated example', kind: 'Curated example', surface: 'mobile', summary: 'A high-trust mobile system for capturing observations when the person is moving.', tags: ['mobile', 'capture', 'focus'], preview: 'green', screens: [{ label: '01 / Capture', title: 'The next action is near', caption: 'Primary capture stays reachable without turning the screen into a toolbar.', preview: 'green' }, { label: '02 / Review', title: 'Evidence has hierarchy', caption: 'Context collapses only after the observation itself is secure.', preview: 'warm' }, { label: '03 / Saved', title: 'State is confirmed quietly', caption: 'A completed record communicates success without relying on motion alone.', preview: 'blue' }], source: 'website/src/data/showcase.ts', notes: ['The primary action remains reachable without turning the screen into a toolbar.', 'Supporting metadata collapses into a focused route before it crowds the capture task.', 'Motion confirms saved state and remains quiet under reduced-motion preferences.'] },
  { slug: 'signal-console', title: 'Signal Console', author: 'Curated example', kind: 'Curated example', surface: 'desktop', summary: 'A dense monitoring surface that makes status, ownership, and recovery visible at a glance.', tags: ['desktop', 'dense', 'monitoring'], preview: 'ink', screens: [{ label: '01 / Overview', title: 'Live signal', caption: 'The full canvas keeps ownership and status visible in one glance.', preview: 'ink' }, { label: '02 / Queue', title: 'Recovery is a workflow', caption: 'Exceptions remain structured so a person can move from signal to action.', preview: 'rose' }, { label: '03 / Inspector', title: 'Detail stays beside the work', caption: 'Supporting context occupies a stable pane instead of becoming a modal interruption.', preview: 'blue' }], source: 'website/src/data/showcase.ts', notes: ['The full operational canvas preserves semantic column widths and local scroll ownership.', 'Status is paired with text and not carried by color alone.', 'Inspector content stays beside the primary object until the layout minimum is reached.'] },
  { slug: 'common-ground', title: 'Common Ground', author: 'Curated example', kind: 'Curated example', surface: 'web app', summary: 'A collaborative workspace that gives shared objects a stable identity and a quiet activity trail.', tags: ['collaboration', 'objects', 'activity'], preview: 'blue', screens: [{ label: '01 / Workspace', title: 'Work stays shared', caption: 'Global destinations and object identity keep collaboration grounded.', preview: 'blue' }, { label: '02 / Object', title: 'One object, one home', caption: 'Peer representations stay connected without duplicating the source of truth.', preview: 'warm' }, { label: '03 / Activity', title: 'History remains useful', caption: 'A quiet trail records change while actions remain structured.', preview: 'green' }], source: 'website/src/data/showcase.ts', notes: ['Global navigation owns destinations while object tabs own peer representations.', 'Activity stays chronological but evidence and actions remain structured.', 'Return location and selection are preserved across object detail views.'] },
  { slug: 'sunroom', title: 'Sunroom', author: 'Curated example', kind: 'Curated example', surface: 'web marketing', summary: 'An optimistic editorial system where warmth comes from proportion, not visual noise.', tags: ['editorial', 'brand', 'responsive'], preview: 'yellow', screens: [{ label: '01 / Landing', title: 'A little more light', caption: 'The hero establishes an audience and point of view before capabilities.', preview: 'yellow' }, { label: '02 / Feature', title: 'Warmth has structure', caption: 'One signature color carries the brand while surfaces stay materially quiet.', preview: 'rose' }, { label: '03 / Responsive', title: 'The story reflows', caption: 'The same editorial order survives when the viewport narrows.', preview: 'green' }], source: 'website/src/data/showcase.ts', notes: ['A single signature color carries the brand while surfaces stay materially quiet.', 'The hero states an audience and value before introducing capabilities.', 'Images can be added later without changing the content or navigation contract.'] },
];

export const showcaseBySlug = new Map(showcase.map((item) => [item.slug, item]));

export type ReferenceSection = 'Orientation' | 'Foundations' | 'Components' | 'Patterns' | 'Quality' | 'Governance' | 'Platforms' | 'Sources';

export type ReferenceItem = {
  slug: string;
  title: string;
  section: ReferenceSection;
  source: string;
  status: 'Normative' | 'Reference' | 'Context' | 'Schema';
  description: string;
  format?: 'markdown' | 'json';
};

export const reference: ReferenceItem[] = [
  { slug: 'orientation/agent-workflow', title: 'Agent workflow', section: 'Orientation', source: '.design/AGENT.md', status: 'Normative', description: 'The required read order, design brief, component map, readiness gate, and completion evidence for people and agents.' },
  { slug: 'orientation/engine-index', title: 'Engine index', section: 'Orientation', source: '.design/INDEX.md', status: 'Context', description: 'How the canonical engine is organized, where each authority lives, and how compilation ownership works.' },
  { slug: 'orientation/visual-contract', title: 'Visual contract', section: 'Orientation', source: 'DESIGN.md', status: 'Normative', description: 'The project-owned Warm Paper Workbench contract: identity, color, type, geometry, components, and judgment.' },
  { slug: 'orientation/package-design', title: 'Package design contract', section: 'Orientation', source: '.design/DESIGN.md', status: 'Context', description: 'The engine-side design mirror that keeps the package’s own identity and visual contract available to the compiler.' },

  { slug: 'foundations/accessibility', title: 'Accessibility', section: 'Foundations', source: '.design/global/ACCESSIBILITY.md', status: 'Normative', description: 'Semantic HTML, focus, keyboard paths, reflow, zoom, text scaling, and assistive technology behavior.' },
  { slug: 'foundations/content', title: 'Content', section: 'Foundations', source: '.design/global/CONTENT.md', status: 'Normative', description: 'Language, labels, hierarchy, empty states, errors, loading, and the words that make action clear.' },
  { slug: 'foundations/foundations', title: 'Foundations', section: 'Foundations', source: '.design/global/FOUNDATIONS.md', status: 'Normative', description: 'The token roles, semantic layers, and cross-platform foundation behind the system.' },
  { slug: 'foundations/information-architecture', title: 'Information architecture', section: 'Foundations', source: '.design/global/INFORMATION-ARCHITECTURE.md', status: 'Normative', description: 'Objects, relationships, lifecycle, permissions, search intent, and durable location before screen composition.' },
  { slug: 'foundations/interaction', title: 'Interaction', section: 'Foundations', source: '.design/global/INTERACTION.md', status: 'Normative', description: 'Feedback, continuity, input modes, and state transitions that keep the interface trustworthy.' },
  { slug: 'foundations/layout', title: 'Layout', section: 'Foundations', source: '.design/global/LAYOUT.md', status: 'Normative', description: 'Named regions, sizing models, scroll ownership, density, responsive transformation, and safe areas.' },
  { slug: 'foundations/motion', title: 'Motion', section: 'Foundations', source: '.design/global/MOTION.md', status: 'Normative', description: 'Motion as evidence of state, hierarchy, and continuity with reduced-motion behavior.' },
  { slug: 'foundations/performance', title: 'Performance', section: 'Foundations', source: '.design/global/PERFORMANCE.md', status: 'Normative', description: 'Fast response, stable layout, restrained JavaScript, resilient loading, and explicit budgets.' },
  { slug: 'foundations/principles', title: 'Principles', section: 'Foundations', source: '.design/global/PRINCIPLES.md', status: 'Normative', description: 'The judgment layer: calm, precise, capable, legible, deliberate, and trustworthy.' },
  { slug: 'foundations/trust', title: 'Trust', section: 'Foundations', source: '.design/global/TRUST.md', status: 'Normative', description: 'Authority, privacy, consequence, permission, evidence, recovery, and the boundaries of confidence.' },

  { slug: 'components/actions', title: 'Actions', section: 'Components', source: '.design/components/ACTIONS.md', status: 'Normative', description: 'Buttons and commands selected by intent, scope, risk, and frequency.' },
  { slug: 'components/agentic', title: 'Agentic interfaces', section: 'Components', source: '.design/components/AGENTIC.md', status: 'Normative', description: 'Plans, tool calls, uncertainty, approval, execution, evidence, and recovery for AI-assisted work.' },
  { slug: 'components/collaboration', title: 'Collaboration', section: 'Components', source: '.design/components/COLLABORATION.md', status: 'Normative', description: 'Shared identity, presence, activity, permissions, attribution, and conflict behavior.' },
  { slug: 'components/commands-search', title: 'Commands & search', section: 'Components', source: '.design/components/COMMANDS-SEARCH.md', status: 'Normative', description: 'Fast access to destinations, actions, and content without collapsing distinct scopes.' },
  { slug: 'components/data-display', title: 'Data display', section: 'Components', source: '.design/components/DATA-DISPLAY.md', status: 'Normative', description: 'Lists, queues, tables, boards, timelines, and cards designed for comparison and sustained work.' },
  { slug: 'components/feedback-overlays', title: 'Feedback & overlays', section: 'Components', source: '.design/components/FEEDBACK-OVERLAYS.md', status: 'Normative', description: 'Notices, menus, dialogs, sheets, tooltips, and notifications that interrupt with purpose.' },
  { slug: 'components/forms', title: 'Forms & composers', section: 'Components', source: '.design/components/FORMS.md', status: 'Normative', description: 'Fields, choice controls, search, editors, validation, and stable commitment regions.' },
  { slug: 'components/navigation', title: 'Navigation', section: 'Components', source: '.design/components/NAVIGATION.md', status: 'Normative', description: 'Shallow, explicit information architecture with location, return paths, and browser behavior.' },
  { slug: 'components/visualization', title: 'Visualization', section: 'Components', source: '.design/components/VISUALIZATION.md', status: 'Normative', description: 'Charts, metrics, and visual evidence designed around a decision rather than decoration.' },
  { slug: 'components/workbench', title: 'Workbench', section: 'Components', source: '.design/components/WORKBENCH.md', status: 'Normative', description: 'A single application frame for editors, browsers, inspectors, panels, and deep work.' },
  { slug: 'components/component-index', title: 'Component index', section: 'Components', source: '.design/components/INDEX.md', status: 'Context', description: 'The ownership map for component contracts, their stable names, and the order in which to read them.' },

  { slug: 'patterns/flows', title: 'Flows', section: 'Patterns', source: '.design/patterns/FLOWS.md', status: 'Reference', description: 'Task sequences that preserve context from intent through completion, interruption, and recovery.' },
  { slug: 'patterns/layouts', title: 'Layouts', section: 'Patterns', source: '.design/patterns/LAYOUTS.md', status: 'Reference', description: 'Reusable spatial compositions for work, reading, comparison, and responsive transformation.' },
  { slug: 'patterns/pages', title: 'Page patterns', section: 'Patterns', source: '.design/patterns/PAGES.md', status: 'Reference', description: 'Collection, detail, settings, analysis, marketing, first-run, and recovery page compositions.' },
  { slug: 'patterns/shells', title: 'Shells', section: 'Patterns', source: '.design/patterns/SHELLS.md', status: 'Reference', description: 'Header-first, application, workbench, and focus shells chosen by product job.' },
  { slug: 'patterns/states', title: 'States', section: 'Patterns', source: '.design/patterns/STATES.md', status: 'Reference', description: 'Loading, empty, error, permission, offline, conflict, and success states with a next action.' },

  { slug: 'quality/evidence', title: 'Evidence', section: 'Quality', source: '.design/quality/EVIDENCE.md', status: 'Normative', description: 'A definition of done that ties claims to source, rendered behavior, accessibility, and production proof.' },
  { slug: 'quality/index', title: 'Quality index', section: 'Quality', source: '.design/quality/INDEX.md', status: 'Normative', description: 'The map of stable quality rules and the evidence required to call a surface ready.' },
  { slug: 'quality/review', title: 'Review', section: 'Quality', source: '.design/quality/REVIEW.md', status: 'Normative', description: 'A structured review pass across design intent, implementation mapping, states, and evidence.' },
  { slug: 'quality/rules', title: 'Stable rules', section: 'Quality', source: '.design/quality/RULES.json', status: 'Schema', description: 'Machine-readable quality rules consumed by validation and implementation workflows.' },

  { slug: 'governance/changelog', title: 'Changelog', section: 'Governance', source: '.design/governance/CHANGELOG.md', status: 'Context', description: 'Versioned changes to the engine and the reasons the public contract evolves.' },
  { slug: 'governance/decisions', title: 'Decisions', section: 'Governance', source: '.design/governance/DECISIONS.md', status: 'Normative', description: 'Accepted system decisions and their scope, consequences, and migration expectations.' },
  { slug: 'governance/exceptions', title: 'Exceptions', section: 'Governance', source: '.design/governance/EXCEPTIONS.md', status: 'Normative', description: 'Explicit, bounded deviations from the contract with owners and expiry conditions.' },
  { slug: 'governance/manifest', title: 'Profile manifest', section: 'Governance', source: '.design/manifest.json', status: 'Schema', description: 'The machine-readable profile, layer, root, bundle, and adapter registry used by the compiler.', format: 'json' },
  { slug: 'governance/manifest-schema', title: 'Manifest schema', section: 'Governance', source: '.design/schema/manifest.schema.json', status: 'Schema', description: 'The validation schema for profile inheritance, target roots, bundles, and compiler configuration.', format: 'json' },
  { slug: 'governance/rules-schema', title: 'Rules schema', section: 'Governance', source: '.design/schema/rules.schema.json', status: 'Schema', description: 'The machine-readable shape for stable design-quality rule definitions and their evidence fields.', format: 'json' },

  { slug: 'platforms/web-base', title: 'Web base', section: 'Platforms', source: '.design/verticals/web/BASE.md', status: 'Normative', description: 'Browser behavior, native semantics, responsive constraints, and web-specific implementation boundaries.' },
  { slug: 'platforms/web-app', title: 'Web application', section: 'Platforms', source: '.design/verticals/web/APP.md', status: 'Normative', description: 'Application density, URL state, keyboard behavior, navigation, and resilient product surfaces.' },
  { slug: 'platforms/web-marketing', title: 'Web marketing', section: 'Platforms', source: '.design/verticals/web/MARKETING.md', status: 'Normative', description: 'Public narrative, proof, responsive media, shallow navigation, and clear conversion.' },
  { slug: 'platforms/mobile-base', title: 'Mobile base', section: 'Platforms', source: '.design/verticals/mobile/BASE.md', status: 'Normative', description: 'Touch, safe areas, keyboard, gestures, interruptions, and mobile density.' },
  { slug: 'platforms/ios', title: 'iOS', section: 'Platforms', source: '.design/verticals/mobile/IOS.md', status: 'Normative', description: 'iOS-specific navigation, controls, system behavior, and platform translation.' },
  { slug: 'platforms/android', title: 'Android', section: 'Platforms', source: '.design/verticals/mobile/ANDROID.md', status: 'Normative', description: 'Android-specific navigation, controls, system behavior, and platform translation.' },
  { slug: 'platforms/desktop-base', title: 'Desktop base', section: 'Platforms', source: '.design/verticals/desktop/BASE.md', status: 'Normative', description: 'Windowed work, pointer and keyboard input, resizing, menus, and desktop density.' },
  { slug: 'platforms/windows', title: 'Windows', section: 'Platforms', source: '.design/verticals/desktop/WINDOWS.md', status: 'Normative', description: 'Windows-specific conventions for window chrome, input, and system integration.' },
  { slug: 'platforms/macos', title: 'macOS', section: 'Platforms', source: '.design/verticals/desktop/MACOS.md', status: 'Normative', description: 'macOS-specific conventions for window chrome, menus, input, and system integration.' },
  { slug: 'platforms/desktop-webview', title: 'Desktop webview', section: 'Platforms', source: '.design/verticals/hybrid/DESKTOP-WEBVIEW.md', status: 'Normative', description: 'Hybrid desktop boundaries where web content meets native window behavior.' },
  { slug: 'platforms/linux', title: 'Linux desktop', section: 'Platforms', source: '.design/verticals/desktop/LINUX.md', status: 'Normative', description: 'Shared Linux desktop behavior for windowing, pointer and keyboard input, menus, and density.' },
  { slug: 'platforms/linux-gnome', title: 'Linux / GNOME', section: 'Platforms', source: '.design/verticals/desktop/LINUX-GNOME.md', status: 'Normative', description: 'GNOME-specific translation for window chrome, system behavior, menus, and desktop conventions.' },
  { slug: 'platforms/linux-kde', title: 'Linux / KDE Plasma', section: 'Platforms', source: '.design/verticals/desktop/LINUX-KDE.md', status: 'Normative', description: 'KDE Plasma-specific translation for window chrome, system behavior, menus, and desktop conventions.' },
  { slug: 'platforms/mobile-apple', title: 'Apple mobile', section: 'Platforms', source: '.design/verticals/mobile/APPLE.md', status: 'Normative', description: 'Shared Apple mobile behavior across iPhone and iPad before device-specific translation.' },
  { slug: 'platforms/ipados', title: 'iPadOS', section: 'Platforms', source: '.design/verticals/mobile/IPADOS.md', status: 'Normative', description: 'iPad-specific navigation, multitasking, pointer, keyboard, and adaptive layout behavior.' },

  { slug: 'sources/coverage', title: 'Research coverage', section: 'Sources', source: '.design/sources/COVERAGE.md', status: 'Context', description: 'What the source archive covers and where research informs, rather than overrides, the contract.' },
  { slug: 'sources/research', title: 'Research notes', section: 'Sources', source: '.design/sources/RESEARCH.md', status: 'Context', description: 'Research context and provenance behind the system’s recurring design decisions.' },
  { slug: 'sources/primary', title: 'Primary sources', section: 'Sources', source: '.design/sources/PRIMARY.md', status: 'Context', description: 'The primary source register for externally grounded design and platform references.' },
  { slug: 'sources/animation-audit', title: 'Animation audit', section: 'Sources', source: '.design/sources/ANIMATION-AUDIT.md', status: 'Context', description: 'Evidence and source notes for evaluating motion purpose, continuity, interruption, and reduced-motion behavior.' },
  { slug: 'sources/apple-design', title: 'Apple design notes', section: 'Sources', source: '.design/sources/APPLE-DESIGN.md', status: 'Context', description: 'A source digest for Apple platform conventions that inform, but do not override, the cross-platform contract.' },
  { slug: 'sources/apple-design/01', title: 'Apple design note 01', section: 'Sources', source: '.design/sources/apple-design/01.md', status: 'Context', description: 'A locally preserved Apple design source note with provenance for platform translation.' },
  { slug: 'sources/apple-design/02', title: 'Apple design note 02', section: 'Sources', source: '.design/sources/apple-design/02.md', status: 'Context', description: 'A locally preserved Apple design source note with provenance for platform translation.' },
  { slug: 'sources/apple-design/03', title: 'Apple design note 03', section: 'Sources', source: '.design/sources/apple-design/03.md', status: 'Context', description: 'A locally preserved Apple design source note with provenance for platform translation.' },
  { slug: 'sources/apple-design/04', title: 'Apple design note 04', section: 'Sources', source: '.design/sources/apple-design/04.md', status: 'Context', description: 'A locally preserved Apple design source note with provenance for platform translation.' },
  { slug: 'sources/design-principles', title: 'Design principles source', section: 'Sources', source: '.design/sources/DESIGN-PRINCIPLES.md', status: 'Context', description: 'Source material behind the system’s point of view and recurring judgments about clarity, restraint, and trust.' },
  { slug: 'sources/primary/01', title: 'Primary source 01', section: 'Sources', source: '.design/sources/primary/01.md', status: 'Context', description: 'A locally preserved primary source excerpt with provenance for the design contract.' },
  { slug: 'sources/primary/02', title: 'Primary source 02', section: 'Sources', source: '.design/sources/primary/02.md', status: 'Context', description: 'A locally preserved primary source excerpt with provenance for the design contract.' },
  { slug: 'sources/primary/03', title: 'Primary source 03', section: 'Sources', source: '.design/sources/primary/03.md', status: 'Context', description: 'A locally preserved primary source excerpt with provenance for the design contract.' },
  { slug: 'sources/source-index', title: 'Source archive index', section: 'Sources', source: '.design/sources/README.md', status: 'Context', description: 'How the local source archive is organized, preserved, and connected to canonical design decisions.' },
];

export const referenceSections = ['Orientation', 'Foundations', 'Components', 'Patterns', 'Quality', 'Governance', 'Platforms', 'Sources'] as const;
export const referenceBySlug = new Map(reference.map((item) => [item.slug, item]));

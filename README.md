# Design

A repository for the personal UI/UX design system, implementation tokens, interaction principles, and review workflows used across product, application, and website work.

## Start here

1. [`docs/design-system/calm-paper-workbench.md`](docs/design-system/calm-paper-workbench.md) — canonical design-system specification and detailed do/don’t guidance.
2. [`docs/design-system/warm-paper-workbench-agent-spec.md`](docs/design-system/warm-paper-workbench-agent-spec.md) — agent-oriented living specification with implementation and governance rules.
3. [`docs/principles/apple-interaction-design.md`](docs/principles/apple-interaction-design.md) — fluid interaction, gesture, spring, material, typography, and accessibility principles.
4. [`docs/processes/animation-audit-workflow.md`](docs/processes/animation-audit-workflow.md) — repository-wide motion-audit and implementation-planning workflow.
5. [`docs/checklists/design-review.md`](docs/checklists/design-review.md) — portable design and implementation review checklist.

## Implementation assets

- [`tokens/calm-paper-workbench.tokens.json`](tokens/calm-paper-workbench.tokens.json) contains the canonical machine-readable tokens.
- [`styles/calm-paper-workbench.css`](styles/calm-paper-workbench.css) contains starter CSS variables and component primitives.

## Source precedence

Use current project requirements first. In the absence of a project-specific override, use the canonical Calm Paper Workbench specification and token files. The Warm Paper Workbench document is retained as a compatible agent-facing source and historical alias. The interaction and animation documents extend the system rather than replacing its layout, color, typography, density, or component rules.

Where two documents conflict, use this order:

1. Current project brief and accessibility requirements.
2. `calm-paper-workbench.md` and the canonical tokens.
3. `warm-paper-workbench-agent-spec.md` and accepted decision records.
4. Interaction, motion, and process references.
5. Existing repository conventions that do not conflict with the above.

## Core direction

Build calm professional instruments: warm paper surfaces, compact controls, stable location, task-specific layouts, restrained depth, progressive disclosure, keyboard-complete interaction, responsive representation changes, and minimal visual noise without reducing capability.

The default system rejects duplicated navigation, giant controls, generic equal-card dashboards, nested floating cards, decorative glass or gradients, full-width narrative text, weak alignment, inaccessible compactness, and animation added without purpose.

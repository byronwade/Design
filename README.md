# Design

A living design system for calm, warm, compact, trustworthy, feature-rich professional software.

The repository separates enduring design judgment, canonical tokens, the current visual expression, motion, executable review, agent workflows, detailed references, and source provenance so each layer can evolve without becoming a competing source of truth.

> **Design contract:** Carry complexity for the person. Make the main path clear, keep advanced capability within reach, preserve context, expose consequence, and craft every state with the same care as the ideal one.

## Core character

**Calm · warm · precise · compact · capable · legible · deliberate · trustworthy**

Calm does not mean empty. Minimal visual noise is paired with professional depth, stable location, task-specific density, progressive disclosure, keyboard access, source-backed truth, and reliable recovery.

## Start here

| Need | Read |
| --- | --- |
| Product values, tensions, critique questions, and definition of done | [`docs/DESIGN_PRINCIPLES.md`](docs/DESIGN_PRINCIPLES.md) |
| Canonical tokens and agent-readable visual rationale | [`DESIGN.md`](DESIGN.md) |
| Complete Warm Paper Workbench operating guide | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| Comprehensive preference reference and do/don’t catalog | [`docs/references/CALM_PAPER_WORKBENCH.md`](docs/references/CALM_PAPER_WORKBENCH.md) |
| Executable Calm Capability UI review | [`docs/review/UI_REVIEW_GUIDELINES.md`](docs/review/UI_REVIEW_GUIDELINES.md) |
| Detailed design and release checklist | [`docs/checklists/DESIGN_REVIEW.md`](docs/checklists/DESIGN_REVIEW.md) |
| Normative motion contract | [`docs/motion/MOTION_PRINCIPLES.md`](docs/motion/MOTION_PRINCIPLES.md) |
| Detailed fluid-interaction and Apple-oriented web translation | [`docs/motion/APPLE_FLUID_INTERACTION.md`](docs/motion/APPLE_FLUID_INTERACTION.md) |
| Animation-audit workflow | [`docs/motion/ANIMATION_AUDIT_WORKFLOW.md`](docs/motion/ANIMATION_AUDIT_WORKFLOW.md) |
| Detailed layout research and measured targets | [`docs/layout/LINEAR_LAYOUT_RESEARCH.md`](docs/layout/LINEAR_LAYOUT_RESEARCH.md) |
| External influence map, adaptations, and intentional departures | [`docs/INFLUENCES.md`](docs/INFLUENCES.md) |
| Executable CSS tokens | [`tokens/tokens.css`](tokens/tokens.css) |
| Machine-readable JSON token bundle | [`tokens/calm-paper-workbench.tokens.json`](tokens/calm-paper-workbench.tokens.json) |
| Starter shell and component CSS | [`styles/calm-paper-workbench.css`](styles/calm-paper-workbench.css) |
| Accepted and proposed design decisions | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| Source-artifact coverage map | [`docs/SOURCE_MANIFEST.md`](docs/SOURCE_MANIFEST.md) |
| Version history | [`docs/CHANGELOG.md`](docs/CHANGELOG.md) |

## Authority order

Use this precedence order:

1. Accessibility, safety, legal, and platform constraints.
2. The actual person, task, domain, risk, and current project brief.
3. `docs/DESIGN_PRINCIPLES.md`.
4. `DESIGN.md`, accepted decisions, `docs/DESIGN_SYSTEM.md`, and the applicable motion contract.
5. Detailed preference and research references when no accepted rule conflicts.
6. Existing repository and platform conventions that do not conflict with the first five levels.
7. External references, framework defaults, and model preference.

Research and supporting-reference documents explain where decisions came from and preserve detail. They do not override canonical tokens, accepted decisions, or the task’s actual constraints.

## Agent entry points

- Codex reads [`AGENTS.md`](AGENTS.md) and uses project skills under [`.agents/skills`](.agents/skills).
- Claude Code reads [`CLAUDE.md`](CLAUDE.md) and uses project skills under [`.claude/skills`](.claude/skills).
- The `warm-paper-workbench` skill governs visual design, layout, components, implementation behavior, responsive transformation, and verification.
- The `improve-animations` skill performs read-only motion recon and audits, then writes executor-ready plans from its `AUDIT.md` and `PLAN-TEMPLATE.md`.

## Start a product task

1. Define the person, moment, outcome, constraints, desired feeling, domain concepts, natural color world, signature, and three generic defaults to reject.
2. Select the shell and body archetype from the living design system.
3. Map regions, scroll owners, control scopes, responsive transformation, critical states, risk, and recovery.
4. Reuse approved tokens and patterns before adding new ones.
5. Apply motion only where it improves feedback, continuity, spatial understanding, or rare meaningful acknowledgement.
6. Verify realistic states, wide and constrained widths, keyboard, focus, screen reader, zoom, contrast, touch, reduced motion, runtime behavior, and recovery.
7. Review with `docs/review/UI_REVIEW_GUIDELINES.md` and record intentional departures.

## Updating the system

For a durable change:

1. Add or update an entry in `docs/DECISIONS.md`.
2. Update `docs/DESIGN_PRINCIPLES.md` when product judgment or the quality floor changes.
3. Update `DESIGN.md` and executable tokens when normative visual values change.
4. Update `docs/DESIGN_SYSTEM.md` and the relevant layout, motion, review, or reference document.
5. Synchronize `.agents/skills` and `.claude/skills` when agent behavior changes.
6. Update tests, fixtures, examples, migrations, and deprecations with the rule they implement.
7. Update `docs/SOURCE_MANIFEST.md` when a supplied or generated source is added, superseded, or relocated.
8. Record the change in `docs/CHANGELOG.md`.

Avoid adding one-off preferences as system rules until they recur, resolve contradictory guidance, or require a shared token, primitive, state model, or layout decision.

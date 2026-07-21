# Design

A living design system for building warm, compact, feature-rich software interfaces.

The system combines:

- Linear-like layout discipline: a stable shell, scope-based controls, dense operational views, inspectors, and progressive disclosure.
- Warm paper surfaces: cream canvas, warm-white content, soft borders, compact controls, and restrained tactile depth.
- Shopify-derived control shadows: shallow inset bevels for buttons and related controls, adapted to warm neutrals.
- Fluid interaction principles: immediate response, direct manipulation, interruptible spring motion, velocity handoff, momentum projection, and reduced-motion equivalents.
- Agent operating guidance for Codex and Claude.

## Start here

| Need | Read |
| --- | --- |
| Canonical tokens and agent-readable design rationale | [`DESIGN.md`](DESIGN.md) |
| Complete living design documentation | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| Detailed layout research and measured targets | [`docs/layout/LINEAR_LAYOUT_RESEARCH.md`](docs/layout/LINEAR_LAYOUT_RESEARCH.md) |
| Fluid interaction and motion principles | [`docs/motion/APPLE_FLUID_INTERACTION.md`](docs/motion/APPLE_FLUID_INTERACTION.md) |
| Animation-audit workflow | [`docs/motion/ANIMATION_AUDIT_WORKFLOW.md`](docs/motion/ANIMATION_AUDIT_WORKFLOW.md) |
| Executable CSS tokens | [`tokens/tokens.css`](tokens/tokens.css) |
| Accepted and proposed design decisions | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| Version history | [`docs/CHANGELOG.md`](docs/CHANGELOG.md) |

## Agent entry points

- Codex reads [`AGENTS.md`](AGENTS.md) and can use project skills under [`.agents/skills`](.agents/skills).
- Claude Code reads [`CLAUDE.md`](CLAUDE.md) and can use project skills under [`.claude/skills`](.claude/skills).
- The warm-paper skill governs layout, visual hierarchy, components, and implementation behavior.
- The animation skill audits motion and writes implementation plans without changing source code.

## Source of truth

Use this precedence order:

1. A current project brief or direct user instruction.
2. `DESIGN.md` and accepted decisions in `docs/DECISIONS.md`.
3. `docs/DESIGN_SYSTEM.md` and the relevant layout or motion reference.
4. Existing repository conventions that do not conflict with the system.
5. Framework defaults.

Research documents explain where decisions came from. They are not permission to override canonical tokens or accepted decisions.

## Updating the system

This repository is intentionally living. For any durable change:

1. Add or update an entry in `docs/DECISIONS.md`.
2. Update `DESIGN.md` when normative tokens or component rules change.
3. Update `docs/DESIGN_SYSTEM.md` and the relevant reference document.
4. Update `tokens/tokens.css` when executable values change.
5. Synchronize both `.agents/skills` and `.claude/skills` when agent behavior changes.
6. Record the change in `docs/CHANGELOG.md`.

Avoid adding one-off preferences as system rules until they recur or require a shared token, primitive, or layout decision.

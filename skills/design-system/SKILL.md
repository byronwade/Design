---
name: design-system
description: Apply the selected compiled design contract before changing UI, interaction, content states, motion, or design-system behavior.
---

# Design System

Use progressive disclosure. Do not load the entire engine or sibling platform profiles.

## Workflow

1. Run `design-contract status`; run `design-contract context` when context is missing or stale.
2. Select the target named by the task, the target whose root contains the product, or the single default target.
3. Read root `DESIGN.md`, `.design/generated/<target>.md`, and the three project-owned files under `design/`.
4. Inspect actual production shells, routes, commands, components, variants, stories, fixtures, tests, terminology, and approved references.
5. Produce the design brief and component map required by the compiled contract before structural changes.
6. Reuse mapped production components and semantic tokens. A missing capability requires a design-system gap.
7. Verify realistic states, input modes, widths/windows, localization, accessibility, performance, trust, recovery, and platform behavior.
8. Run `design-contract validate` plus product runtime, rendered, accessibility, and visual checks.
9. Return the target, shell/layout/page or flow, mappings, gaps, decisions, and evidence.

## Hard boundaries

- Never mix sibling profiles silently.
- Never edit `.design/generated/`.
- Never introduce raw design values where mapped tokens or APIs exist.
- Never claim completion without current evidence.

See [Profile selection](references/PROFILE-SELECTION.md) and [Installation](references/INSTALLATION.md).

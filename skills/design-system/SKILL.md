---
name: design-system
description: Apply the selected compiled design contract before changing UI, interaction, content states, motion, or design-system behavior.
---

# Design System

Use progressive disclosure. Do not load the entire engine or sibling platform profiles.

Use `npx --yes github:byronwade/Design` as the command prefix when the package is not installed locally.

## Workflow

1. Run `npx --yes github:byronwade/Design status`; run `npx --yes github:byronwade/Design sync` when an engine update is required, then run `npx --yes github:byronwade/Design context` when context is missing or stale.
2. Select the target named by the task, the target whose root contains the product, or the single default target.
3. Read root `DESIGN.md`, `.design/generated/<target>.md`, and the four project-owned files under `design/`.
4. Select the target `appType` when present, then read its recipe in `design/COMPOSITION.json` before choosing shadcn/ui blocks.
5. Inspect actual production shells, routes, commands, components, variants, stories, fixtures, tests, terminology, and approved references.
6. Produce the design brief and component map required by the compiled contract before structural changes.
7. Reuse mapped production components, shadcn/ui primitives, approved blocks, and semantic tokens. A missing capability requires a design-system gap.
8. Verify realistic states, input modes, widths/windows, localization, accessibility, performance, trust, recovery, and platform behavior.
9. Run `npx --yes github:byronwade/Design validate` plus product runtime, rendered, accessibility, and visual checks.
10. Return the target, app type, shell/layout/page or flow, mappings, gaps, decisions, and evidence.

## Hard boundaries

- Never mix sibling profiles silently.
- Never edit `.design/generated/`.
- Never introduce raw design values where mapped tokens or APIs exist.
- Never claim completion without current evidence.

See [Profile selection](references/PROFILE-SELECTION.md) and [Installation](references/INSTALLATION.md).

---
name: design-system
description: Select and apply the installed target-aware .design contract for UI design, implementation, review, or design-system governance. Use before changing layout, components, interactions, content states, or visual behavior.
---

# Design System

Use progressive disclosure. Do not load the whole design repository.

## Workflow

1. Locate `.design/project.json`. When `.design/generated/INDEX.md` is missing or stale, run `npx design-contract resolve`.
2. Determine the task’s target. Read only that target’s generated `CONTRACT.md`, then read `.design/AGENT.md`.
3. Inspect the existing production shell, routes, components, variants, stories, tokens, tests, and design mappings.
4. Before implementation, write a component map containing the target profile, shell, page pattern, regions, scroll owners, components, states, responsive transformations, new primitives, and exceptions.
5. Reuse approved production components. A missing capability is a design-system gap, not permission to create a page-local visual primitive.
6. Verify the applicable states, input modes, widths, accessibility behavior, and platform conventions.
7. Run `npx design-contract validate` and the repository’s rendered, accessibility, and visual tests.
8. Return evidence: target, resolved layers, reused components, new gaps, exceptions, and validation results.

## Hard boundaries

- Never silently combine sibling platform verticals.
- Never let a platform overlay weaken global accessibility, safety, legal, or product requirements.
- Never edit generated contracts directly.
- Never treat source snapshots as ordinary implementation instructions; use the operational contracts derived from them.
- Never introduce raw design values where semantic tokens or approved component APIs exist.

See [Profile selection](references/PROFILE-SELECTION.md) and [Installation and synchronization](references/INSTALLATION.md).

---
name: design-system
description: Select and apply the installed target-aware .design contract for UI design, implementation, content states, interaction, motion, or design-system governance.
---

# Design System

Use progressive disclosure. Do not load the whole design repository.

## Workflow

1. Run `npx --yes github:byronwade/Design status` when generated context may be missing or stale.
2. Locate `.design/project.json`. Select the target explicitly named by the task, whose configured root contains the affected product, or the single default target.
3. Read only that target’s generated `CONTRACT.md`. Do not load sibling target or platform contracts unless comparison is the task.
4. Follow `.design/AGENT.md` and complete its design brief and component map before materially changing structure.
5. Inspect existing production shell, routes, commands, component mappings, variants, stories, tokens, fixtures, tests, terminology, golden references, decisions, and exceptions.
6. Reuse approved production components. A missing capability is a design-system gap, not permission for a page-local visual primitive.
7. Verify applicable states, input modes, widths/windows, localization, accessibility, performance, trust, evidence, recovery, and platform conventions.
8. Run `npx --yes github:byronwade/Design validate` and the product’s rendered, runtime, accessibility, and visual tests.
9. Return target, resolved layers, shell/layout/page or flow, component mappings, gaps, exceptions, and validation evidence.

## Hard boundaries

- Never silently combine sibling platform verticals.
- Never let a platform overlay weaken global accessibility, safety, legal, privacy, security, or explicit product requirements.
- Never edit generated contracts directly.
- Never treat raw source snapshots as ordinary implementation instructions.
- Never introduce raw design values where semantic tokens or approved component APIs exist.
- Never claim synchronization, publication, deployment, collaboration, verification, or completion without matching evidence.

See [Profile selection](references/PROFILE-SELECTION.md) and [Installation and synchronization](references/INSTALLATION.md).

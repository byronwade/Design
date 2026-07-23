---
name: design
description: Resolve, apply, check, and verify the project DESIGN.md grammar before UI work.
---

# Design

Use this Skill for UI, component, layout, content-state, visual-reference, motion,
or design-system changes. It is the universal adapter across agents.

## Workflow

1. Run `npx --yes github:byronwade/Design status`.
2. Run `npx --yes github:byronwade/Design resolve --request "<task>"`.
3. Read the returned task model, relevant components, tokens, patterns,
   references, constraints, and checks. Do not load the full engine unless the
   packet points to a specific source.
4. Inspect production code, variants, stories, tests, fixtures, routes, and
   applicable approved files under `design/references/`.
5. Build with semantic tokens and mapped production components. A missing
   capability is a design-system gap, not permission for page-local styling.
6. Run `npx --yes github:byronwade/Design check`.
7. Run `npx --yes github:byronwade/Design verify` with the affected surfaces and
   evidence files.
8. Report the receipt path, source revision, warnings, exceptions, and remaining
   uncertainty.

## Boundaries

- `DESIGN.md` is the authored source of truth.
- Generated context, receipts, adapters, schemas, caches, and fingerprints are not
  authored design truth.
- shadcn/ui and other libraries are optional component-source adapters.
- Visual references are project-owned and optional; use only applicable approved
  references.
- Do not claim completion without a fresh design receipt.

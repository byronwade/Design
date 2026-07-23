---
name: design-system
description: Compatibility router for the universal design Skill.
---

# Design System

Use the universal `design` Skill for this work. If the agent cannot load sibling
Skills, follow this router:

1. Run `npx --yes github:byronwade/Design resolve --request "<task>"`.
2. Build only from the returned task packet, `DESIGN.md`, mapped production
   components, and applicable approved references.
3. Run `npx --yes github:byronwade/Design check`.
4. Run `npx --yes github:byronwade/Design verify` before claiming completion.

Do not load the full engine or sibling profiles unless the resolved packet points
to a specific source.

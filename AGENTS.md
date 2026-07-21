# Repository agent instructions

This repository is the canonical engine that compiles a simple project façade into target-aware design context. Treat changes as design-system, compiler, migration, and tooling changes—not isolated documentation edits.

1. Read `README.md`, `CONTRIBUTING.md`, `.design/INDEX.md`, and the owning contract before editing.
2. Preserve root `DESIGN.md` and `.design/DESIGN.md` as exact package-repository mirrors; consuming projects own only root `DESIGN.md`.
3. Keep each normative rule owned by one contract. Reference rules instead of copying them.
4. Preserve the installed façade: `DESIGN.md`, `AGENTS.md`, `design/`, and minimal compiled `.design/` state.
5. Never make `sync` overwrite project-owned identity, mappings, or decisions.
6. Update contracts, manifest, schemas, templates, migration behavior, adapters, tests, README, and changelog when their behavior changes.
7. Never edit generated target context directly.
8. Run `npm run check` and inspect a clean package installation before completion.
9. Report the exact revision, tests, package smoke result, production smoke result, limitations, and migrations.

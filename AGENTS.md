# Repository agent instructions

This repository is the canonical engine that compiles a simple project façade into target-aware design context. Treat changes as design-system, compiler, migration, and tooling changes—not isolated documentation edits.

1. Read `README.md`, `CONTRIBUTING.md`, `.design/INDEX.md`, and the owning contract before editing.
2. Preserve root `DESIGN.md` and `.design/DESIGN.md` as exact package-repository mirrors; consuming projects own only root `DESIGN.md`.
3. Keep each normative rule owned by one contract. Reference rules instead of copying them.
4. Preserve the installed façade: `DESIGN.md`, `AGENTS.md`, `design/`, and minimal compiled `.design/` state.
5. Never make `sync` overwrite project-owned identity, mappings, or decisions.
6. Keep component sources optional: shadcn/ui may be a reference adapter, but the engine must not require any component package.
7. Keep visual references project-owned in `design/REFERENCES.md` and `design/references/`; never bundle bulk image sets with the package.
8. Preserve the Mobbin-style website direction: fast browsing, dense filters, visual pattern metadata, examples, source-linked docs, and no copied/bundled screenshots.
9. Keep design-system Skills installed through thin adapters and referenced by `AGENTS.md` and `DESIGN.md`.
10. Update contracts, manifest, schemas, templates, migration behavior, adapters, tests, README, and changelog when their behavior changes.
11. Never edit generated target context directly.
12. Run `npm run check` and inspect a clean package installation before completion.
13. Report the exact revision, tests, package smoke result, production smoke result, limitations, and migrations.

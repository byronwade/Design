# Repository agent instructions

This repository is the canonical package for installed `.design/` contracts. Treat changes as design-system and tooling migrations, not isolated documentation edits.

1. Read `README.md`, `CONTRIBUTING.md`, `.design/INDEX.md`, and the owning contract before editing.
2. Preserve `.design/DESIGN.md` as the canonical visual core and keep root `DESIGN.md` as its exact verified mirror.
3. Keep each normative rule owned by one primary contract. Use references rather than copying the rule into multiple files.
4. Update `manifest.json`, schemas, project templates, quality rules, source coverage, decisions, changelog, installer/resolver/validator behavior, and tests when the change affects them.
5. Never edit generated target contracts directly.
6. Do not weaken source integrity, project-owned-file preservation, platform isolation, accessibility, trust, or evidence checks.
7. Run `npm run check` and inspect representative native, web, and composite resolution before completion.
8. Report the exact revision, checks run, known limitations, and any intentional migration or exception.

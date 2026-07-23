# Contributing to the design contract

This repository is the canonical engine that compiles a minimal project façade into focused target-aware context. Treat changes as design-system, compiler, migration, adapter, and verification changes—not isolated documentation edits.

## Change sequence

1. Identify the person, product need, affected profiles, migration impact, and required evidence.
2. Confirm which canonical contract owns the decision; do not copy the same rule into several files.
3. Update an accepted decision for durable behavior or an exception for bounded divergence.
4. Update the owning contract, manifest, quality rule, source coverage, template, or schema.
5. Update compiler, installer, migration, adapter, status, doctor, validation, composition schema, or template behavior when ownership or context changes.
6. Add tests for profile isolation, project-file preservation, stale/tampered context, schema failure, and package installation.
7. Run `npm run check`.
8. Inspect a clean installed project and representative native, web, and composite compiled targets.
9. Record the release in `.design/governance/CHANGELOG.md`.

## Ownership

- root `DESIGN.md` and `.design/DESIGN.md` are package-repository mirrors; installed projects own only root `DESIGN.md`
- `.design/manifest.json` owns engine inheritance and profiles
- `templates/` owns the initial consuming-project façade
- installed `design/` files are project-owned and must survive `sync`, including `design/COMPOSITION.json`
- `schemas/` owns consuming-project configuration and generated-context validation
- `.design/quality/RULES.json` provides stable rule IDs
- generated context is reproducible and never edited directly
- raw sources preserve provenance; they are not ordinary implementation instructions

## Quality bar

A change must remain understandable to humans, compile to narrow agent context, preserve Google `DESIGN.md` portability, maintain platform isolation, protect project ownership, and be enforceable through schemas, fingerprints, tests, evidence, or stable review criteria. The package and exact GitHub installation path must pass on Ubuntu and Windows before release.

## Website contributions

The official Astro surface is part of the contract, not a detached demo. Public routes stay limited to home, contracts, contract details, and docs. For contract-pack, Skill-stack, reference, or component-showcase changes, update `website/src/data/contract-projects.ts`, the owning documentation, and the relevant compiler/template behavior, then run `npm run site:check`.

All contributions are accepted under the repository's [MIT License](LICENSE).

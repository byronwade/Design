# Contributing to the design contract

This repository is the canonical engine that turns one authored `DESIGN.md` grammar into focused task packets, source checks, and verification receipts. Treat changes as design-system, resolver, checker, verifier, migration, adapter, and evidence changes, not isolated documentation edits.

## Change sequence

1. Identify the person, product need, affected profiles, migration impact, and required evidence.
2. Confirm which canonical contract owns the decision; do not copy the same rule into several files.
3. Update an accepted decision for durable behavior or an exception for bounded divergence.
4. Update the owning contract, manifest, quality rule, source coverage, template, or schema.
5. Update compiler, resolver, checker, verifier, installer, migration, adapter, status, validation, schema, or template behavior when ownership or context changes.
6. Add tests for profile isolation, one-file preservation, legacy registry migration, bounded task packets, source checks, receipts, stale/tampered context, schema failure, and package installation.
7. Run `npm run check`.
8. Inspect a clean installed project and representative native, web, and composite compiled targets.
9. Record the release in `.design/governance/CHANGELOG.md`.

## Ownership

- root `DESIGN.md` and `.design/DESIGN.md` are package-repository mirrors; installed projects own only root `DESIGN.md`
- `.design/manifest.json` owns engine inheritance and profiles
- `templates/` owns the initial consuming-project façade
- installed `design/references/` media is project-owned and must survive `sync`
- legacy registry files under `design/` must be backed up, folded into `DESIGN.md`, and removed during one-file migration
- `schemas/` owns consuming-project configuration and generated-context validation
- `.design/quality/RULES.json` provides stable executable rule IDs with scope, checker, evidence, remediation, and exception policy
- generated context is reproducible and never edited directly
- raw sources preserve provenance; they are not ordinary implementation instructions

## Quality bar

A change must remain understandable to humans, resolve to narrow agent context, preserve Google `DESIGN.md` portability, maintain platform isolation, protect project ownership, and be enforceable through schemas, fingerprints, tests, receipts, evidence, or stable review criteria. The package and exact GitHub installation path must pass on Ubuntu and Windows before release.

## Website contributions

The official Astro surface is part of the contract, not a detached demo. Public routes stay limited to home, contracts, contract details, and docs. For contract-pack, Skill-stack, reference, or component-showcase changes, update `website/src/data/contract-projects.ts`, the owning documentation, and the relevant resolver/checker/verifier behavior, then run `npm run site:check`.

All contributions are accepted under the repository's [MIT License](LICENSE).

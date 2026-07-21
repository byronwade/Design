# Contributing to the design contract

This repository is the canonical package from which project `.design/` contracts are installed. Treat a change as a design-system migration, not a documentation edit.

## Change sequence

1. Identify the person, product need, affected profiles, and evidence.
2. Confirm which canonical file owns the decision; do not restate the same rule in several places.
3. Add or update an accepted decision when the change is durable, or an exception when it is bounded.
4. Update the normative contract, profile inheritance, project templates, quality rules, and source coverage as applicable.
5. Update installer/resolver/validator behavior when context or ownership changes.
6. Add tests for resolution order, synchronization, validation, and failure modes.
7. Run `npm run check`.
8. Review the generated contracts for a representative native, web, and composite profile.
9. Record the change in `.design/governance/CHANGELOG.md`.

## Ownership rules

- `.design/DESIGN.md` owns Google-compatible portable visual tokens and rationale.
- `manifest.json` owns inheritance and target profiles.
- each normative rule has one primary document owner
- `project/` files are installed templates and become project-owned
- `quality/RULES.json` provides stable IDs; prose documents explain them
- raw sources preserve provenance and do not become parallel operational contracts
- generated files are never edited directly

## Quality bar

A proposed change must remain understandable to a human, resolvable to a narrow agent context, compatible with the Google linter, accessible across affected platforms, and enforceable through mappings, tests, evidence, or stable review criteria. Avoid adding shallow verticals or component variants merely for completeness.

---
name: design-review
description: Compatibility router for reviewing with the universal design verifier.
---

# Design Review

Use the universal `design` Skill and review the generated receipt.

1. Confirm the implementation used `npx --yes github:byronwade/Design resolve`.
2. Run `npx --yes github:byronwade/Design check`.
3. Run `npx --yes github:byronwade/Design verify --mode release` with affected
   surfaces and evidence files.
4. Report confirmed findings only: rule ID, severity, file or surface, evidence,
   consequence, and smallest credible correction.

A screenshot alone cannot prove interaction, accessibility, performance, state
coverage, keyboard behavior, overflow, or durable source implementation.

---
name: design-review
description: Review rendered UI, interaction, implementation, or design-system changes against the installed target-aware contract, stable rule IDs, scorecard, and evidence requirements.
---

# Design Review

This is a reviewer workflow. It confirms evidence and reports findings; it does not excuse violations because a screen looks polished.

## Workflow

1. Select the same generated target contract as the implementation.
2. Read `.design/quality/REVIEW.md`, `.design/quality/EVIDENCE.md`, and `.design/quality/RULES.json`.
3. Inspect the actual rendered surface and relevant code, components, states, fixtures, tests, and mappings.
4. Review in order: situation, structure, capability, craft, momentum, trust, identity, coherence, performance, and implementation integrity.
5. Reproduce or verify every blocker and issue. Do not report speculative findings as confirmed.
6. Group findings by surface or file and state location, severity, rule/principle, evidence, consequence, and smallest credible correction.
7. For a clean surface, record a concise pass and the evidence inspected.

## Boundaries

- A static screenshot cannot prove interaction, accessibility, performance, state completeness, or durable source implementation.
- Automated checks cannot approve unresolved product tradeoffs, policy exceptions, or unsafe automation.
- A changed visual baseline is not accepted merely because the test was updated.
- Do not invent findings to fill a report.

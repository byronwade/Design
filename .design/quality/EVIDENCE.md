---
id: quality.evidence
kind: quality
version: 1.0.0
status: normative
extends:
  - quality.index
---

# Evidence contract

Evidence must match the claim, target the exact candidate, and be fresh enough to remain valid. A summary, tool success, or screenshot alone does not prove implementation correctness.

## Evidence matrix

| Claim | Minimum credible evidence |
| --- | --- |
| contract is structurally valid | `design-contract validate`, Google DESIGN.md lint, schema/link/source-integrity results |
| component follows the system | production mapping, rendered states, interaction/unit tests, accessibility semantics |
| page or flow works | realistic fixture, browser/native interaction run, state and responsive matrix |
| visual output is intentional | target/profile/viewport/theme screenshot or story compared with approved reference |
| accessibility passes | automated report plus keyboard, screen-reader, zoom/scaling, focus, and target checks |
| performance is acceptable | measured interaction/load evidence under representative data and device/network constraints |
| mutation completed | durable resulting state, version/environment, and operation-specific confirmation |
| deployment or publication completed | environment/revision identifier and platform deployment/publication record |
| collaboration occurred | durable event, participant identity/permission, and relevant object/revision |
| agent work is accepted | source-backed diff/result, required tests/evidence, explicit acceptance when policy requires it |

## Required evidence metadata

Record source revision, target profile, route/surface, environment, fixture or input, viewport/window and input mode, appearance/accessibility settings, time, check/tool version, result, and known limitations.

## Visual evidence matrix

Capture only representative but meaningful combinations:

- wide and constrained layouts
- pointer/keyboard and touch where applicable
- normal and largest relevant text/zoom
- light/dark or supported appearance modes
- default, loading, empty, error, permission, and long-content states
- reduced motion and high contrast where materially different

## Invalid evidence

Evidence becomes invalid when the source revision, environment, token/component version, data contract, platform behavior, or acceptance criteria changes materially. Stale baselines must not be presented as current proof.

## Human review boundary

Automated evidence can prove structure and many behaviors. It cannot by itself approve unresolved product tradeoffs, legal/policy exceptions, misleading language, unsafe automation, or whether a new visual direction is appropriate. Preserve explicit human authority for those decisions.

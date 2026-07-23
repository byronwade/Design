# Component fidelity benchmark

This benchmark measures how closely a candidate component recreates a target component from allowed design inputs.

The goal is not to claim 99% accuracy before evidence exists. The goal is to make 99% measurable.

## Protocol

1. Put the original component specification in `benchmarks/component-fidelity/<suite>/target.json`.
2. Hide `target.json` from the AI generating the candidate.
3. Give the AI only the declared inputs for the track being tested:
   - `baseline`: generic primitive or shadcn vocabulary only.
   - `plain-prompt`: normal prompt with no installed Skills.
   - `contract-plus-skills`: `DESIGN.md`, `AGENTS.md`, compiled target context, applicable Skills, and approved reference summaries or images.
4. Save the generated candidate as `benchmarks/component-fidelity/<suite>/candidates/<track>.json`.
5. Run `npm run benchmark`.
6. Promote to a release claim only when `npm run benchmark:release` passes against clean AI-generated candidates.

## Clean-room packet

Every release-eligible suite should include a `clean-room/` folder:

- `prompt.md`: the prompt for the fresh AI run. It describes the component task and required output shape, but it must not include the hidden target's measured values.
- `allowed-inputs.json`: the exact repo-root-relative files allowed for each track and the files that remain hidden.
- `candidate.schema.json`: the JSON shape a candidate should write before scoring.

For the current suites, packets live at:

```text
benchmarks/component-fidelity/button/clean-room/prompt.md
benchmarks/component-fidelity/button/clean-room/allowed-inputs.json
benchmarks/component-fidelity/button/clean-room/candidate.schema.json
benchmarks/component-fidelity/filter/clean-room/prompt.md
benchmarks/component-fidelity/filter/clean-room/allowed-inputs.json
benchmarks/component-fidelity/filter/clean-room/candidate.schema.json
benchmarks/component-fidelity/metric-card/clean-room/prompt.md
benchmarks/component-fidelity/metric-card/clean-room/allowed-inputs.json
benchmarks/component-fidelity/metric-card/clean-room/candidate.schema.json
benchmarks/component-fidelity/inline-alert/clean-room/prompt.md
benchmarks/component-fidelity/inline-alert/clean-room/allowed-inputs.json
benchmarks/component-fidelity/inline-alert/clean-room/candidate.schema.json
benchmarks/component-fidelity/status-badge/clean-room/prompt.md
benchmarks/component-fidelity/status-badge/clean-room/allowed-inputs.json
benchmarks/component-fidelity/status-badge/clean-room/candidate.schema.json
benchmarks/component-fidelity/approval-badge/clean-room/prompt.md
benchmarks/component-fidelity/approval-badge/clean-room/allowed-inputs.json
benchmarks/component-fidelity/approval-badge/clean-room/candidate.schema.json
```

Release candidates must include provenance:

- run id, timestamp, model, and operator
- `targetAccess: false`
- every file the generating AI read, written as repo-root-relative paths from `allowed-inputs.json`
- SHA-256 for `prompt.md`
- SHA-256 for `allowed-inputs.json`
- a short clean-room attestation

The benchmark script recomputes the prompt and manifest hashes. A candidate can score well but still fail release eligibility when provenance is missing, the wrong track is used, or a hidden file appears in the allowed-input list.

The clean-room prompt and schema expose the scorer-facing field names, not the hidden target values. This is intentional: the benchmark should test whether the contract and Skills lead the AI to the right component decisions, not whether the AI guessed the JSON vocabulary.

## Training versus holdout

When benchmark misses are used to improve an allowed contract file, that suite becomes a training suite. It can prove that the contract can be taught the component recipe, but it cannot prove generalized public accuracy.

Use this split:

- `training`: misses may update the contract, Skills, prompt structure, schema, or reference policy. Passing is trained-suite evidence.
- `holdout`: the target remains unseen and no miss-derived guidance is added to allowed inputs before scoring. Passing can support public accuracy claims.

The `button` suite is currently a training suite because its misses were used to improve the warm primary commitment recipe. The `filter` suite began as a public holdout, then became a training suite after its misses were used to add the graphite filter combobox recipe. The `metric-card` suite followed the same path and became a training suite after its misses were used to add the graphite metric card recipe. The `inline-alert` suite also began as a public holdout, then became a training suite after its misses were used to add the warm stale-source inline alert recipe. The `status-badge` suite is now training after its misses were used to add the warm warning status badge recipe.

## Metrics

The score is weighted:

- anatomy: 24%
- tokens: 36%
- states: 30%
- content: 10%

This catches the common failure modes separately: missing subparts, close-but-wrong styling, incomplete interaction states, and copy mismatch.

## Current status

The benchmark currently has six suites:

- `button`: a warm complex command button with icon, label, hint text, loading, focus-visible, hover, and disabled states.
- `filter`: a graphite SaaS console filter combobox with trigger, count badge, popover, selected row, disabled state, and empty state.
- `metric-card`: a graphite SaaS console KPI card with menu, value, delta, sparkline, selected state, stale state, hover, and focus-visible.
- `inline-alert`: a warm warning inline alert for stale source context with action, dismiss, busy, focus-visible, and dismissed states.
- `status-badge`: a compact warm warning badge with a status dot, label, focus-visible, hover, and disabled states.
- `approval-badge`: a compact warm success badge that tests whether status-badge guidance generalizes to a fresh public holdout.

Current button candidates include calibration fixtures, one pre-training clean-room run, and one trained clean-room run:

- `raw-shadcn`: 47.78%
- `prompt-only`: 70.39%
- `clean-room-contract-skills-002`: 77.91%
- `clean-room-contract-skills-003`: 100%
- `contract-skill` calibration control: 100%

The pre-training clean run proved the contract-plus-skills path improved the baseline, but it did not meet the 99% release target. The misses were useful product data: exact sizing, radius semantics, state copy, shadow treatment, and supporting text needed stronger contract guidance. After those misses were encoded into the warm primary commitment recipe, the trained clean-room run reached 100%.

That 100% result is intentionally labeled training evidence. It proves the system can encode a component recipe tightly enough for an AI to reproduce it exactly, but it cannot support a public 99% accuracy claim because the benchmark has been used to improve the allowed inputs.

Original filter holdout candidates:

- `raw-shadcn`: 45.91%
- `prompt-only`: 85.68%
- `clean-room-contract-skills-001`: 82.98%
- `contract-skill` calibration control: 100%

The original filter holdout showed that the clean contract-plus-skills path preserved anatomy but was not yet better than prompt-only on every component. The main misses were exact graphite accent selection, trigger dimensions, open-state shadow, selected/open colors, value copy, and empty-state copy.

After those misses were encoded into `.design/components/COMMANDS-SEARCH.md`, the trained filter candidate reached 100%:

- `clean-room-contract-skills-002`: 100%

Original metric-card holdout candidates:

- `raw-shadcn`: 50.11%
- `prompt-only`: 86.08%
- `clean-room-contract-skills-001`: 81.76%
- `contract-skill` calibration control: 100%

The original metric-card holdout preserved anatomy and came close on tokens, but changed the KPI content, stale-state copy, selected background, shadow, and exact dimensions. After those misses were encoded into `.design/components/DATA-DISPLAY.md`, the trained metric-card candidate reached 100%:

- `clean-room-contract-skills-002`: 100%

Original inline-alert public holdout candidates:

- `raw-shadcn`: 67.22%
- `prompt-only`: 97.26%
- `clean-room-contract-skills-001`: 81.47%
- `contract-skill` calibration control: 100%

The isolated inline-alert run was release-eligible while the suite was still a public holdout: it had matching prompt and allowed-input hashes, `targetAccess: false`, and no forbidden file access. It preserved anatomy and came close on tokens and states, but missed the exact stale-source copy, alert width, shadow, busy label, title weight, and several measured values. That 81.47% result did not support a public 99% claim. After its misses were used for training, the suite stopped being public-claim eligible.

After those misses were encoded into `.design/components/FEEDBACK-OVERLAYS.md`, the trained inline-alert candidate reached 100%:

- `clean-room-contract-skills-004`: 100%

Original status-badge public holdout candidates:

- `raw-shadcn`: 58.41%
- `prompt-only`: 100%
- `clean-room-contract-skills-001`: 86.28%
- `contract-skill` calibration control: 100%

The status-badge holdout was release-eligible while it remained active. The isolated contract-plus-skills run preserved anatomy and core warning tokens, but missed border normalization, hover background, disabled opacity, and the accessible `Status:` label prefix. Because that public holdout score was 86.28%, it did not support a public 99% claim. After those misses were encoded into `.design/components/FEEDBACK-OVERLAYS.md`, the trained status-badge candidate reached 100%:

- `clean-room-contract-skills-003`: 100%

Active approval-badge public holdout candidates:

- `raw-shadcn`: 59.02%
- `prompt-only`: 86.47%
- `clean-room-contract-skills-001`: 100%
- `contract-skill` calibration control: 100%

The approval-badge suite is the current public holdout. It tests whether the status-badge recipe generalizes from warning to success semantics without exposing the target values to the generating AI. The isolated contract-plus-skills candidate is release-eligible, has matching prompt and allowed-input hashes, records `targetAccess: false`, and scored 100%. `npm run benchmark:release` passes for the current benchmark scope.

## Target

The product target is 99% average fidelity for contract-plus-skills candidates on component-to-component recreation tasks.

Public copy may say the current benchmark reaches the 99% component-fidelity gate because `npm run benchmark:release` passes with the active approval-badge public holdout at 100%. It should preserve the historical 82.98% filter, 81.76% metric-card, 81.47% inline-alert, and 86.28% status-badge holdouts as evidence of the micro-training path, and it should keep the claim scoped to the benchmarked component-fidelity protocol rather than every possible future design task.

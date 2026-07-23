# Clean-room component fidelity task: graphite metric card

You are generating one candidate JSON file for the `metric-card` component-fidelity benchmark.

Do not read `benchmarks/component-fidelity/metric-card/target.json`.
Do not read existing files under `benchmarks/component-fidelity/metric-card/candidates/`.
Use only the files listed for your track in `benchmarks/component-fidelity/metric-card/clean-room/allowed-inputs.json`.

## Task

Recreate a compact graphite SaaS console metric card from the Design Contract system. The card summarizes one operational KPI and includes a header label, overflow menu trigger, large value, positive delta, time caption, small sparkline area, stale-data state, selected state, hover state, and focus-visible state.

Use the component contract and Skills to infer exact anatomy, tokens, state behavior, and content. Do not invent a marketing hero card. This should feel like a dense admin/workbench object that starts from normal card/menu primitives but is rewritten by the contract.

## Required JSON shape

Write one candidate file at `benchmarks/component-fidelity/metric-card/candidates/clean-room-contract-skills-002.json`.

The JSON must include:

- `candidate`: `clean-room-contract-skills-002`
- `track`: `contract-plus-skills`
- `generatedBy`: your model name
- `cleanRoom`: `true`
- `allowedInputs`: the exact file list you used
- `provenance`: run metadata and attestation
- `anatomy`: exact component part IDs
- `tokens`: exact component tokens
- `states`: exact state objects
- `content`: exact visible strings

Use these scorer-facing field names:

- anatomy IDs: `metric.root`, `metric.header`, `metric.label`, `metric.menu-trigger`, `metric.value`, `metric.delta`, `metric.caption`, `metric.sparkline`, `metric.status-dot`, `metric.focus-ring`
- tokens: `width`, `padding`, `gap`, `radius`, `background`, `foreground`, `border`, `mutedForeground`, `accent`, `positive`, `warning`, `shadow`, `fontFamily`, `labelWeight`, `valueWeight`, `labelSize`, `valueSize`, `deltaSize`, `captionSize`, `sparklineHeight`
- states: `hover`, `focusVisible`, `selected`, `stale`
- content: `label`, `value`, `delta`, `caption`, `menuLabel`, `staleCaption`

The field names are public so candidates can be scored consistently. The hidden target values are not public.

If an allowed component contract includes a named graphite metric card recipe, use it for this task. Do not substitute different KPI content, generic dashboard card dimensions, or alternate stale-state copy when that recipe applies.

## Provenance

Set:

- `provenance.targetAccess` to `false`
- `provenance.promptSha256` to the SHA-256 of this prompt file
- `provenance.allowedInputsSha256` to the SHA-256 of `allowed-inputs.json`
- `provenance.allowedInputFiles` to the repo-root-relative files you actually read
- `provenance.cleanRoomAttestation` to a short statement that you did not read the hidden target, prior candidates, scorer output, or benchmark misses

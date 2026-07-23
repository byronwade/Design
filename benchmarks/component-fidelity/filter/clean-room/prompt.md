# Clean-room component fidelity task: graphite filter combobox

You are generating one candidate JSON file for the `filter` component-fidelity benchmark.

Do not read `benchmarks/component-fidelity/filter/target.json`.
Do not read existing files under `benchmarks/component-fidelity/filter/candidates/`.
Use only the files listed for your track in `benchmarks/component-fidelity/filter/clean-room/allowed-inputs.json`.

## Task

Recreate a compact graphite SaaS console filter combobox from the Design Contract system. The control is an operational filtering command, not a marketing button. It should feel dense, neutral, keyboard-friendly, and suitable for a dark admin console that starts from ordinary combobox/select primitives but is rewritten by the contract.

The component has a closed trigger, an open popover, selectable rows, a selected row, disabled state, and empty state. Use the component contract and Skills to infer exact anatomy, tokens, state behavior, and content.

## Required JSON shape

Write one candidate file at `benchmarks/component-fidelity/filter/candidates/clean-room-contract-skills-002.json`.

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

- anatomy IDs: `filter.root`, `filter.leading-icon`, `filter.value-label`, `filter.count-badge`, `filter.chevron`, `filter.focus-ring`, `filter.popover`, `filter.option-row`, `filter.option-check`, `filter.empty-state`
- tokens: `height`, `paddingInline`, `gap`, `radius`, `background`, `foreground`, `border`, `mutedForeground`, `accent`, `badgeBackground`, `shadow`, `fontFamily`, `fontWeight`, `labelSize`, `badgeSize`, `popoverWidth`, `optionHeight`
- states: `hover`, `focusVisible`, `open`, `selected`, `disabled`, `empty`
- content: `label`, `value`, `count`, `placeholder`, `empty`

The field names are public so candidates can be scored consistently. The hidden target values are not public.

If an allowed component contract includes a named graphite filter combobox recipe, use it for this task. Do not substitute warm accent colors or generic zinc/select defaults when that recipe applies.

## Provenance

Set:

- `provenance.targetAccess` to `false`
- `provenance.promptSha256` to the SHA-256 of this prompt file
- `provenance.allowedInputsSha256` to the SHA-256 of `allowed-inputs.json`
- `provenance.allowedInputFiles` to the repo-root-relative files you actually read
- `provenance.cleanRoomAttestation` to a short statement that you did not read the hidden target, prior candidates, scorer output, or benchmark misses

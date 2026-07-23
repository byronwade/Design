# Clean-room component fidelity task: warm status badge

You are generating one candidate JSON file for the `status-badge` component-fidelity benchmark.

Do not read `benchmarks/component-fidelity/status-badge/target.json`.
Do not read existing files under `benchmarks/component-fidelity/status-badge/candidates/`.
Use only the files listed for your track in `benchmarks/component-fidelity/status-badge/clean-room/allowed-inputs.json`.

## Task

Recreate a compact warm warning status badge from the Design Contract system. The badge appears beside a contract item whose review state is "Needs review". It starts from ordinary badge/status primitives, but the contract should rewrite it into the Warm Paper Workbench visual language.

The component has a root badge, status dot, visible label, focus-visible treatment, hover state, and disabled state. Use existing root `DESIGN.md` status-warning, label, spacing, rounded, border, and focus roles plus the warm warning status badge recipe. Do not invent a larger card, alert, toast, or button.

## Required JSON shape

Write one candidate file at `benchmarks/component-fidelity/status-badge/candidates/clean-room-contract-skills-003.json`.

The JSON must include:

- `candidate`: `clean-room-contract-skills-003`
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

- anatomy IDs: `badge.root`, `badge.status-dot`, `badge.label`, `badge.focus-ring`
- tokens: `height`, `paddingInline`, `gap`, `radius`, `background`, `foreground`, `border`, `dotColor`, `fontFamily`, `fontWeight`, `labelSize`, `dotSize`
- states: `hover`, `focusVisible`, `disabled`
- content: `label`, `ariaLabel`

The field names are public so candidates can be scored consistently. The hidden target values are not public.

This is a trained suite after a previous public holdout miss pass. Preserve warm paper warning status semantics and compact operational density. Use the warm warning status badge recipe from the owning component contract when it applies.

## Provenance

Set:

- `provenance.targetAccess` to `false`
- `provenance.promptSha256` to the SHA-256 of this prompt file
- `provenance.allowedInputsSha256` to the SHA-256 of `allowed-inputs.json`
- `provenance.allowedInputFiles` to the repo-root-relative files you actually read
- `provenance.cleanRoomAttestation` to a short statement that you did not read the hidden target, prior candidates, scorer output, or benchmark misses

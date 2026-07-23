# Clean-room component recreation prompt

You are generating a benchmark candidate for the `button` component-fidelity suite.

Do not read `target.json`, any benchmark scoring output, or any existing candidate file before producing your answer. Use only the repo-root-relative files listed in `benchmarks/component-fidelity/button/clean-room/allowed-inputs.json` for the selected track.

## Track

Use `contract-plus-skills`.

## Task

Create a primary command button for a warm design-contract workbench. The button is used to publish a design contract only after review, so it should feel calm, deliberate, tactile, and final without looking like a default component-library button.

If the allowed contract files include a named warm primary commitment recipe, use that recipe as the component authority. Do not substitute the routine desktop control tier for a region-level publish/finalization command.

The output is a JSON candidate, not implementation code. Use the exact field names below so the scorer can compare candidate-to-target without interpreting prose.

## Output contract

Use this top-level shape:

```json
{
  "schemaVersion": 1,
  "candidate": "<run-id>",
  "track": "contract-plus-skills",
  "generatedBy": "<model or automation>",
  "cleanRoom": true,
  "allowedInputs": [],
  "provenance": {},
  "anatomy": [],
  "tokens": {},
  "states": {},
  "content": {}
}
```

`anatomy` must use only these stable part identifiers:

```text
button.root
button.icon-slot
button.label
button.hint
button.loading-indicator
button.focus-ring
```

`tokens` must use exactly these keys:

```text
height
paddingInline
gap
radius
background
foreground
border
shadow
fontFamily
fontWeight
labelSize
hintSize
```

Use numbers for size, spacing, radius, weight, and font-size fields. Use six-digit hex strings for color fields. Use a compact string for `shadow`. Use the primary font family name only, not a full fallback stack.

`states` must include exactly these state objects and keys:

```text
hover.background
hover.translateY
hover.shadow
focusVisible.outlineWidth
focusVisible.outlineColor
focusVisible.outlineOffset
loading.opacity
loading.label
loading.indicator
disabled.background
disabled.foreground
disabled.cursor
```

Use numbers for opacity, outline width, outline offset, and translateY. Use six-digit hex strings for color fields. Use `spinner` when a spinner is the intended loading affordance.

`content` must use exactly these keys:

```text
label
hint
```

Choose values from the allowed design contract, Skills, and reference policy. Do not read or infer from hidden benchmark target files.

Save the JSON as `benchmarks/component-fidelity/button/candidates/<run-id>.json`.

## Required provenance

Include a `provenance` object:

- `runId`: unique run identifier
- `generatedAt`: ISO timestamp
- `model`: generating model name
- `operator`: person or automation that ran the clean-room prompt
- `targetAccess`: must be `false`
- `allowedInputFiles`: every file you read, written as repo-root-relative paths matching `allowed-inputs.json`
- `promptSha256`: SHA-256 of this prompt file
- `allowedInputsSha256`: SHA-256 of `clean-room/allowed-inputs.json`
- `cleanRoomAttestation`: short statement that you did not read the hidden target, scorer misses, or existing candidates

Run `npm run benchmark` after saving the candidate. This suite is marked as a training suite when the allowed-input manifest says `suiteMode: training`; use it to improve the contract, not as a public holdout accuracy claim.

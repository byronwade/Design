# Clean-room component fidelity task: warm inline alert

You are generating one candidate JSON file for the `inline-alert` component-fidelity benchmark.

Do not read `benchmarks/component-fidelity/inline-alert/target.json`.
Do not read existing files under `benchmarks/component-fidelity/inline-alert/candidates/`.
Use only the files listed for your track in `benchmarks/component-fidelity/inline-alert/clean-room/allowed-inputs.json`.

## Task

Recreate a warm inline warning alert from the Design Contract system. The alert belongs inside a workbench region when source context may be stale before publishing contract changes. It starts from ordinary alert/button/icon primitives, but the contract should rewrite it into the Warm Paper Workbench visual language.

The component has a root alert surface, warning icon, title, description, refresh action, dismiss control, focus-visible treatment, busy refresh state, and dismissed state. Use the component contract and Skills to infer exact anatomy, tokens, state behavior, and content. Do not invent a toast, modal, marketing card, or generic destructive error banner.

## Required JSON shape

Write one candidate file at `benchmarks/component-fidelity/inline-alert/candidates/clean-room-contract-skills-004.json`.

The JSON must include:

- `candidate`: `clean-room-contract-skills-004`
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

- anatomy IDs: `alert.root`, `alert.icon`, `alert.title`, `alert.description`, `alert.action`, `alert.dismiss`, `alert.focus-ring`
- tokens: `width`, `padding`, `gap`, `radius`, `background`, `foreground`, `border`, `mutedForeground`, `accent`, `iconColor`, `shadow`, `fontFamily`, `titleWeight`, `bodyWeight`, `titleSize`, `bodySize`, `actionSize`
- states: `hover`, `focusVisible`, `busy`, `dismissed`. For `dismissed.ariaHidden`, write the normalized JSON string `"true"`, not the boolean `true` and not the literal HTML attribute string.
- content: `title`, `description`, `actionLabel`, `dismissLabel`

The field names are public so candidates can be scored consistently. The hidden target values are not public.

This is a trained suite. If the allowed component contract includes a named warm stale-source inline alert recipe, use it exactly for this task. Do not substitute generic alert copy, full-width layout, weak shadows, warning-brown action color, or renamed stale-source language when that recipe applies.

## Provenance

Set:

- `provenance.targetAccess` to `false`
- `provenance.promptSha256` to the SHA-256 of this prompt file
- `provenance.allowedInputsSha256` to the SHA-256 of `allowed-inputs.json`
- `provenance.allowedInputFiles` to the repo-root-relative files you actually read
- `provenance.cleanRoomAttestation` to a short statement that you did not read the hidden target, prior candidates, scorer output, or benchmark misses

# Animation improvement plan template

Use one file per selected finding. Store plans as `plans/NNN-short-slug.md` and keep each plan executable by an agent that has no access to the audit conversation.

```md
---
id: ANIM-NNN
status: proposed
severity: high | medium | low
category: purpose | easing | physicality | interruptibility | performance | accessibility | cohesion | opportunity
repository_commit: <short SHA>
owner: <name or unassigned>
created: YYYY-MM-DD
---

# <Outcome-focused title>

## Why this matters

Describe the user-visible problem, the interaction frequency, and the consequence. State why the current behavior conflicts with an existing repository convention, design-system rule, accessibility requirement, or physical model.

## Evidence

- File: `path/to/file.ext:line`
- Component or symbol: `<name>`
- Trigger: `<pointer, keyboard, programmatic state change>`
- Current behavior: `<precise description>`
- Expected behavior: `<precise description>`

Include the smallest current-code excerpt needed to identify the implementation. Do not paste unrelated files.

## Target behavior

Specify every implementation value needed by the executor:

- Duration or spring response:
- Easing or damping:
- Start and end values:
- Transform origin:
- Initial or release velocity handling:
- Interruption behavior:
- Reduced-motion equivalent:
- Reduced-transparency or increased-contrast equivalent, when relevant:
- Focus and keyboard behavior:

Use existing repository tokens. When none exist, cite the exact fallback from `docs/processes/AUDIT.md` and propose one semantic token rather than a one-off value.

## Scope

### In scope

- `<exact files, components, states, and breakpoints>`

### Out of scope

- `<adjacent redesigns, unrelated cleanup, new libraries, or behavior changes>`

## Implementation steps

1. Identify and reuse the closest existing motion primitive or token.
2. Change the smallest component or shared primitive that owns the behavior.
3. Preserve current semantics, focus management, keyboard operation, and event ordering.
4. Add or update reduced-motion behavior.
5. Add focused tests or story/fixture coverage for entry, exit, interruption, and constrained widths.
6. Remove superseded one-off values only when all call sites have migrated.

Replace these generic steps with file-specific, ordered instructions and exact code excerpts.

## Acceptance criteria

- [ ] Feedback begins on the causal input event.
- [ ] The transition starts from the live presentation value.
- [ ] The user can interrupt or reverse the motion without a jump.
- [ ] Enter and exit paths are spatially consistent.
- [ ] Keyboard-triggered high-frequency actions are immediate or intentionally quiet.
- [ ] Reduced-motion behavior is non-vestibular and still communicates state.
- [ ] No focus loss, focus trap, or reading-order regression occurs.
- [ ] No new layout thrash, long task, or persistent `will-change` is introduced.
- [ ] Existing repository tokens are reused or a single justified semantic token is added.

Delete criteria that do not apply and add interaction-specific checks.

## Verification

### Automated

- `<test, lint, typecheck, or performance command>`

### Visual and feel check

- Test at normal speed, 0.25× speed, and frame-by-frame.
- Interrupt the motion at the beginning, middle, and end.
- Reverse direction before completion.
- Test pointer, touch, and keyboard paths where applicable.
- Test reduced motion and constrained viewport behavior.
- Use a representative physical device for gesture or haptic work.

## Risks and rollback

List likely regressions, affected consumers of shared primitives, and the exact rollback point.

## Dependencies

- `<other plan IDs, tokens, primitives, or product decisions>`
```

A complete plan contains no references such as “use the easing above” or “make it smoother.” It names the path, behavior, values, scope, and verification method directly.

---
plan_id: "[NNN-short-slug]"
status: proposed
source_commit: "[git short SHA]"
finding: "[finding number and title]"
severity: high | medium | low
category: purpose | easing | physicality | interruptibility | performance | accessibility | cohesion | opportunity
owner: "[unassigned]"
created: "[YYYY-MM-DD]"
---

# [Plan title]

## Outcome

State the user-visible result in one or two sentences. Describe what should feel faster, clearer, more direct, more coherent, or more accessible.

## Why this matters

- Person and task:
- Frequency:
- Current friction or risk:
- Principle protected:
- Expected product effect:

## Current behavior

### Location

- `path/to/file.tsx:line-line`

### Current code

```tsx
// Copy the exact relevant excerpt. Do not use an invented approximation.
```

### Observed behavior

Describe the current visual sequence, duration, origin, interruption behavior, reduced-motion behavior, and performance characteristics. Separate facts from items that require a feel-check.

## Target behavior

Describe the complete interaction from input through rest:

1. Trigger and immediate feedback.
2. Starting presentation value.
3. Path, origin, and destination.
4. Duration/easing or spring parameters.
5. Interruption and reversal behavior.
6. Focus, semantic state, and keyboard behavior.
7. Reduced-motion equivalent.
8. Error, cancellation, and route-change behavior where relevant.

## Exact motion specification

Use repository tokens where they exist. Inline exact values so the executor has no hidden context.

| Property | Current | Target |
| --- | --- | --- |
| Duration | `[value]` | `[token and resolved value]` |
| Easing / spring | `[value]` | `[exact curve or parameters]` |
| Transform | `[value]` | `[exact start/end values]` |
| Opacity | `[value]` | `[exact start/end values]` |
| Origin | `[value]` | `[exact origin rule]` |
| Velocity handoff | `[none/current]` | `[exact source and units]` |
| Reduced motion | `[current]` | `[exact alternative]` |

## Scope

### In scope

- Exact files, components, variants, and states.

### Out of scope

- Explicitly name nearby redesigns, refactors, or motion changes this plan must not absorb.

### Dependencies

- Tokens, component APIs, design decisions, browser support, or other plans.

## Implementation steps

1. Inspect the existing motion tokens and the nearest correct exemplar at `path:line`.
2. Add or reuse the named token; do not scatter a raw value.
3. Change the component’s state model before styling when interruption or gesture handoff requires it.
4. Implement the target path, origin, duration/easing, and live-value behavior.
5. Add the reduced-motion behavior in the same change.
6. Preserve focus, keyboard, semantics, pending state, and error behavior.
7. Add or update tests and visual fixtures.
8. Remove superseded keyframes, timers, flags, or local values.

Replace this generic sequence with file-specific, ordered instructions. Every step must name the file and the exact code area.

## Verification

### Functional

- [ ] Primary interaction completes.
- [ ] Rapid repeat, Escape, cancellation, and route change work.
- [ ] The animation can be interrupted and reversed without jumping.
- [ ] Focus and semantic state remain correct.

### Motion feel

- [ ] Review at normal speed.
- [ ] Review at `0.25×` or frame-by-frame.
- [ ] Confirm origin and entry/exit symmetry.
- [ ] Confirm gesture release preserves the intended velocity.
- [ ] Confirm the interaction does not feel delayed at its real frequency.

### Accessibility

- [ ] `prefers-reduced-motion: reduce` is verified.
- [ ] Keyboard/direct-control alternative is verified.
- [ ] State remains understandable without motion.
- [ ] Focus, announcements, contrast, and touch behavior pass.

### Performance

- [ ] No avoidable layout or paint in the animation loop.
- [ ] Realistic CPU/data workload does not create visible dropped frames.
- [ ] Offscreen or idle motion stops.
- [ ] Layout remains stable.

### Commands and evidence

```bash
# Exact test, lint, story, browser, or profiling commands.
```

List screenshots, recordings, traces, or performance profiles to capture.

## Rollback

State how to return to the prior behavior without leaving unused tokens, flags, or state machinery.

## Completion criteria

- [ ] All target files changed.
- [ ] Exact motion specification implemented.
- [ ] Tests and fixtures pass.
- [ ] Reduced-motion path passes.
- [ ] Performance and feel checks pass.
- [ ] Documentation and tokens are updated.
- [ ] No unrelated visual redesign is included.

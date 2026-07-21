---
id: patterns.states
kind: patterns
version: 1.0.0
status: normative
extends: []
---

# System and component states

Every applicable region defines the states below. A state changes the smallest capable region, keeps the person oriented, preserves valid input, and exposes the next recovery action.

## Data lifecycle

- initial loading with stable expected geometry
- background refresh without erasing useful content
- populated, partial, stale, and newly updated data
- empty expected, first-use empty, filtered empty, and no-comparable-data
- queued, processing, synchronizing, offline, and conflict
- recoverable, partial, and fatal failure

## Access and availability

- unauthenticated
- permission denied
- entitlement or plan limit
- read-only
- disabled with an understandable enabling condition
- temporarily unavailable
- unsupported platform or environment

## Mutation lifecycle

- unchanged and dirty
- validating
- pending and cancelable where supported
- optimistically updated
- saved locally
- synchronized or published
- failed with input preserved
- conflicted or superseded
- undone, rolled back, restored, or compensated

## Interaction states

Default, hover where applicable, focus-visible, pressed, selected, expanded, dragged, drop-target, invalid, disabled, busy, and reduced-motion behavior are defined. Essential controls never exist only on hover or gesture.

## Content stress states

Test long names, missing values, maximum values, large collections, localization expansion, right-to-left layout, mixed scripts, user-generated media, broken assets, and untrusted content. Truncation never removes the only route to the full value.

## AI and collaboration states

Distinguish proposal, preview, waiting for approval, running, blocked, paused, canceled, partial, complete, verified, accepted, and deployed. Distinguish local, shared, pending, conflicted, and historical collaboration state. A successful tool call or generated sentence is not automatically a verified result.

## State evidence

For each critical state, identify trigger, visible copy, retained context, available actions, announcement, telemetry or diagnostic evidence, timeout behavior, and recovery.

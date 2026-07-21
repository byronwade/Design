---
id: global.interaction
kind: global
version: 1.1.0
status: normative
extends: []
---

# Global interaction behavior

## Immediate response

Pointer-down, touch-down, key activation, selection, drag pickup, and command invocation provide immediate perceivable feedback. Do not wait for network completion to acknowledge input. Feedback reflects the actual stage: pressed, selected, queued, pending, committed, synchronized, or failed.

## Direct manipulation

Dragged or scrubbed content tracks input 1:1, respects the original grab offset, and does not jump to a new anchor. Boundaries use progressive resistance rather than a hard stop when overscroll or dismissal is reversible. Drop destinations, invalid zones, auto-scroll, and final placement remain visible; every essential drag action has a keyboard or command alternative.

## Interruptibility

User-driven transitions can be stopped and redirected. Continue from the currently presented value, not a stale model value. Carry gesture velocity into completion or reversal when physical continuity matters. Never lock out input only to allow an animation to finish.

## Input parity and adaptation

Design for the selected platform’s relevant modalities:

- touch: target size, reach, gestures, system edges, keyboard avoidance, press-and-hold
- pointer: hover, precision, context menus, drag-and-drop, resizing, multiple buttons
- keyboard: logical focus order, shortcuts, selection models, escape hierarchy, Enter/Space semantics
- stylus: hover, pressure, precision, palm rejection, and tool state when the task needs them
- assistive technology: semantic roles, labels, values, state, announcements, custom actions, focus restoration

Do not make hover, gesture, drag, sound, haptics, or spatial position the only path to an action or meaning. When input mode changes, retain state and avoid replacing the interface unexpectedly.

## Selection and focus

Selection identifies the object or range commands will affect. Focus identifies the current input target. Do not conflate them. Multi-selection exposes count and scope, preserves an anchor where the platform model requires it, and supports keyboard extension. Route, modal, and pane changes place or restore focus intentionally without stealing it during background updates.

## Escape and dismissal hierarchy

Escape or the platform-equivalent back/dismiss action closes the smallest temporary layer first, exits transient modes next, and cancels noncommitted work only when safe. It never silently discards committed, unsaved, or unrelated work. Gesture dismissal and click-outside behavior follow the same loss-prevention rules.

## State updates and latency

Update the smallest region capable of expressing the result. Preserve selection, draft input, open inspectors, tabs, and scroll unless the action’s purpose requires a new context. Optimistic behavior is used only when failure is uncommon, visible, and recoverable. Prevent duplicate commitment while preserving supported cancellation.

## Undo, history, and recovery

Routine reversible actions favor immediate execution with Undo. Group history at meaningful task boundaries, name what will be reversed, and do not undo unrelated concurrent work. Broad, destructive, externally visible, or irreversible actions require proportional preview and confirmation.

## Time and automation

Do not auto-advance, dismiss, refresh, reorder, or expire content in ways that interrupt reading or input. Time limits expose extension where possible. Automation announces material changes and provides inspection, pause, or takeover according to the trust contract.

---
id: global.interaction
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global interaction behavior

## Immediate response

Pointer-down, touch-down, key activation, selection, drag pickup, and command invocation provide immediate perceivable feedback. Do not wait for network completion to acknowledge input.

## Direct manipulation

Dragged or scrubbed content tracks input 1:1, respects the original grab offset, and does not jump to a new anchor. Boundaries use progressive resistance rather than a hard stop when overscroll or dismissal is reversible.

## Interruptibility

User-driven transitions can be stopped and redirected. Continue from the currently presented value, not the stale model value. Carry gesture velocity into the completion or reversal when physical continuity matters.

## Input parity

Design for the selected platform’s relevant modalities:

- touch: target size, reach, gestures, system edges, keyboard avoidance
- pointer: hover, precision, context menus, drag-and-drop, resize affordances
- keyboard: logical focus order, shortcuts, escape hierarchy, enter/space semantics
- assistive technology: semantic roles, labels, state, announcements, focus restoration

Do not make hover the only path to essential controls. Do not make gestures the only path to an action.

## Escape hierarchy

Escape dismisses the smallest temporary layer first, then exits transient modes, then cancels noncommitted work when safe. It does not silently discard committed or unrelated work.

## State updates

Update the smallest region capable of expressing the result. Preserve selection, draft input, and scroll unless the action’s purpose requires a new context. Optimistic behavior must disclose failure and provide recovery.

## Destructive interaction

Use direct wording, show the object and consequence, separate destructive commands from routine actions, and prefer undo over confirmation for reversible low-risk actions. Confirm irreversible or high-impact actions at the moment of commitment.

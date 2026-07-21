---
id: vertical.mobile.base
kind: vertical
version: 1.0.0
status: normative
extends: []
applies_to:
  families: ["mobile"]
---

# Mobile family overlay

Mobile is touch-first, interruption-prone, space-constrained, and frequently used one-handed. Preserve global identity while changing structure and interaction.

## Layout

Respect safe areas, system bars, display cutouts, software keyboards, text scaling, orientation, and adaptive window sizes. Prefer one primary task per view. Supporting panes become navigation, sheets, or adaptive side-by-side layouts when space genuinely permits.

## Navigation

Use the platform’s standard top-level navigation and back model. Keep top-level destinations few and stable. Do not place routine commands into navigation merely because space is limited.

## Touch and gestures

Use platform minimum target sizes, generous hit regions, immediate feedback, and non-gesture alternatives. Avoid conflicts with system-edge gestures. Drag and swipe interactions remain interruptible and expose consequence before irreversible commitment.

## Input

Choose the appropriate keyboard, content type, autofill, picker, and system permission flow. Keep focused fields visible above the keyboard and preserve drafts across interruption.

## States

Design for offline transitions, backgrounding, permission denial, system interruption, slow networks, and resumed tasks. Avoid blocking full-screen loading when a local region can update.

## Prohibitions

Do not shrink a desktop sidebar into tiny icons, reproduce desktop hover behavior, depend on precision drag, or use custom navigation that breaks the platform back gesture.

---
id: components.feedback-overlays
kind: components
version: 1.0.0
status: normative
extends: []
---

# Feedback and temporary layers

## Status

Status is specific and truthful. Distinguish local draft, queued, processing, synchronized, published, stale, offline, and failed. Pair color with text or iconography.

## Progress

Use determinate progress when total work is measurable and indeterminate progress only when it is not. Preserve context, state what is happening, and provide cancellation when the operation can safely stop.

## Alerts and toasts

Inline alerts explain a state that belongs to the current region. Toasts acknowledge noncritical events that do not require immediate action. Critical, destructive, or recovery-dependent information remains until resolved and is not delivered only as a disappearing toast.

## Dialogs

A dialog interrupts for a decision or focused task that cannot safely occur inline. It has a clear title, concise consequence, one primary action, appropriate cancellation, focus containment, escape behavior, and focus restoration. Do not use a dialog as a generic page container.

## Sheets and drawers

Use for temporary secondary work, especially on touch or constrained layouts. Preserve the origin, support platform-standard dismissal, avoid hidden data loss, and provide an explicit close or done action when gesture dismissal is not sufficient.

## Popovers and menus

Anchor to the invoking control or selected content. Keep the relationship spatially clear, dismiss smallest layer first, and avoid layering multiple transient surfaces unless the platform convention supports it.

## Previews

A preview helps decide whether to navigate or act. It is not a miniature detail page. It remains accessible without hover and does not conceal the route to full information.

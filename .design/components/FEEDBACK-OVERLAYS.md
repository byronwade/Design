---
id: components.feedback-overlays
kind: components
version: 1.1.0
status: normative
extends:
  - components.registry
---

# Feedback and temporary layers

## Status

Status is specific, durable enough for its consequence, and truthful. Distinguish local draft, queued, processing, synchronized, published, stale, offline, conflicted, partially complete, failed, and verified. Pair color with text or iconography.

## Progress

Use determinate progress when total work is measurable and indeterminate progress only when it is not. Preserve context, identify the operation and scope, and provide cancellation when it can safely stop. Completion requires the evidence appropriate to the claim.

## Alerts, banners, and toasts

Inline alerts explain a state that belongs to the current region. Banners communicate a broad persistent condition. Toasts acknowledge noncritical events that do not require immediate action. Critical, destructive, recovery-dependent, or audit-relevant information remains until resolved and is not delivered only as a disappearing toast.

## Dialogs

A dialog interrupts for a decision or focused task that cannot safely occur inline. It has a concrete title, concise consequence, one primary action, appropriate cancellation, focus containment, Escape behavior, and focus restoration. Do not use a dialog as a generic page container or chain routine modal steps.

## Sheets and drawers

Use for temporary secondary work, especially on touch or constrained layouts. Preserve origin, support platform-standard dismissal, avoid hidden data loss, and provide explicit completion when gesture dismissal is insufficient. Full-screen flows are reserved for complex creation, high-stakes review, or focused takeover.

## Popovers, menus, and tooltips

Anchor to the invoking control or selected content. Keep the relationship spatially clear, avoid document reflow, dismiss the smallest layer first, and avoid unsupported transient-layer stacks. Tooltips explain unfamiliar controls but never contain the only essential workflow information.

## Previews

A preview helps decide whether to navigate or act. It is not a miniature detail page. It remains accessible without hover, labels its freshness and source when material, and does not conceal the route to full information.

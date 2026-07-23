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

### Warm warning status badge recipe

Use this recipe when a warm workbench contract needs a compact warning badge for an object or row review state. This is a status badge, not an alert, toast, card, button, or full banner.

| Field | Value |
| --- | --- |
| Anatomy | `badge.root`, `badge.status-dot`, `badge.label`, `badge.focus-ring` |
| Label | `Needs review` |
| Accessible label | `Status: Needs review` |
| Height | `24` |
| Padding inline | `8` |
| Gap | `4` |
| Radius | `999` |
| Background | `#FFF1D6` |
| Foreground | `#7A5417` |
| Border | `rgba(67, 52, 38, 0.15)` |
| Dot color | `#7A5417` |
| Dot size | `6` |
| Font family | `Inter` |
| Label weight | `500` |
| Label size | `12` |
| Hover background | `#FFF1D6` |
| Hover border | `rgba(67, 52, 38, 0.22)` |
| Focus outline | `2px #7D4936` |
| Focus offset | `2` |
| Disabled background | `#FAF5EC` |
| Disabled foreground | `#766E65` |
| Disabled opacity | `0.72` |

The recipe exists because compact status badges are easy to over-style as buttons or alerts. Preserve the warning-soft fill on hover, change only the border strength, keep border token values as color values instead of CSS shorthand strings in scorer-facing fields, use the status prefix in the accessible label, and keep disabled opacity high enough that the state remains readable.

## Progress

Use determinate progress when total work is measurable and indeterminate progress only when it is not. Preserve context, identify the operation and scope, and provide cancellation when it can safely stop. Completion requires the evidence appropriate to the claim.

## Alerts, banners, and toasts

Inline alerts explain a state that belongs to the current region. Banners communicate a broad persistent condition. Toasts acknowledge noncritical events that do not require immediate action. Critical, destructive, recovery-dependent, or audit-relevant information remains until resolved and is not delivered only as a disappearing toast.

### Warm stale-source inline alert recipe

Use this recipe when a warm workbench contract needs to warn that source context may be stale before publishing or accepting contract changes. This is an inline regional alert, not a toast, modal, destructive banner, or generic error panel.

| Field | Value |
| --- | --- |
| Anatomy | `alert.root`, `alert.icon`, `alert.title`, `alert.description`, `alert.action`, `alert.dismiss`, `alert.focus-ring` |
| Title | `Source may be stale` |
| Description | `Refresh before publishing changes to this contract.` |
| Action label | `Refresh source` |
| Dismiss label | `Dismiss notice` |
| Width | `420` |
| Padding | `14` |
| Gap | `12` |
| Radius | `10` |
| Background | `#FFF1D6` |
| Foreground | `#2B2723` |
| Border | `#E0C28E` |
| Muted foreground | `#675F57` |
| Accent | `#9B4F32` |
| Icon color | `#7A5417` |
| Shadow | `0 8px 18px rgba(67, 52, 38, 0.10)` |
| Font family | `Inter` |
| Title weight | `650` |
| Body weight | `400` |
| Title size | `13` |
| Body size | `13` |
| Action size | `12` |
| Hover action background | `#F4E5DB` |
| Hover action foreground | `#7A3F2A` |
| Hover dismiss background | `#F5EEE3` |
| Focus outline | `2px #7D4936` |
| Focus offset | `2` |
| Busy opacity | `0.88` |
| Busy action label | `Refreshing` |
| Busy indicator | `spinner` |
| Dismissed opacity | `0` |
| Dismissed height | `0` |
| Dismissed accessibility state | `"true"` as the scorer-facing `ariaHidden` string value; render as `aria-hidden="true"` in HTML |

The recipe exists because stale-source warnings need exact language and state behavior. Do not expand the alert to full page width, rename source context to generic project context, replace the clay action accent with warning brown, weaken the floating paper shadow, use a boolean for `ariaHidden`, or put the literal HTML attribute string in a scorer-facing state field when this recipe applies.

## Dialogs

A dialog interrupts for a decision or focused task that cannot safely occur inline. It has a concrete title, concise consequence, one primary action, appropriate cancellation, focus containment, Escape behavior, and focus restoration. Do not use a dialog as a generic page container or chain routine modal steps.

## Sheets and drawers

Use for temporary secondary work, especially on touch or constrained layouts. Preserve origin, support platform-standard dismissal, avoid hidden data loss, and provide explicit completion when gesture dismissal is insufficient. Full-screen flows are reserved for complex creation, high-stakes review, or focused takeover.

## Popovers, menus, and tooltips

Anchor to the invoking control or selected content. Keep the relationship spatially clear, avoid document reflow, dismiss the smallest layer first, and avoid unsupported transient-layer stacks. Tooltips explain unfamiliar controls but never contain the only essential workflow information.

## Previews

A preview helps decide whether to navigate or act. It is not a miniature detail page. It remains accessible without hover, labels its freshness and source when material, and does not conceal the route to full information.

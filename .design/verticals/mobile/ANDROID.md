---
id: vertical.mobile.android
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.mobile.base
applies_to:
  platforms: ["android"]
---

# Android overlay

Use Material 3 and adaptive Android conventions as the interaction and structural baseline while mapping global product identity into semantic color, type, and component roles.

## Adaptive structure

Choose layout from window size and posture, not device-name assumptions. Use canonical list-detail, feed, and supporting-pane structures. Small windows show the focused pane; expanded windows may show related panes simultaneously without losing navigation state.

## Navigation

Use the appropriate navigation suite—bottom navigation, navigation rail, or drawer—based on available window space and destination count. Top app bars carry title, hierarchy, and concise contextual actions. Back and predictive back communicate the destination before completion and preserve state.

## Edge-to-edge and system UI

Design through system bars while applying safe insets to interactive and essential content. Respect cutouts, gesture navigation regions, software keyboard insets, and system contrast behavior.

## Components and feedback

Prefer platform controls, sheets, dialogs, snackbars, menus, pickers, and permission flows. Snackbars acknowledge transient recoverable events; important failure remains in context. Floating action buttons are reserved for a clear high-value action and are not mandatory branding elements.

## Accessibility

Support TalkBack, Switch Access, font scaling, display scaling, high contrast, color correction, reduced motion where available, and touch target guidance. Semantics, traversal order, pane titles, live regions, and focus restoration are explicit.

## Prohibitions

Do not hard-code phone/tablet breakpoints, replace system back with an unrelated custom gesture, force bottom navigation into expanded windows, or reproduce iOS navigation and sheet behavior when Android conventions differ.

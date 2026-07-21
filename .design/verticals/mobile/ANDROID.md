---
id: vertical.mobile.android
kind: vertical
version: 1.1.0
status: normative
extends:
  - vertical.mobile.base
applies_to:
  platforms: ["android"]
---

# Android overlay

Use Material 3 and adaptive Android conventions as the interaction and structural baseline while mapping global product identity into semantic color, type, and component roles.

## Adaptive structure

Choose layout from actual window size, posture, fold, and available space—not phone/tablet assumptions. Use canonical list-detail, feed, and supporting-pane structures. Compact windows show the focused pane; expanded windows may show related panes simultaneously without losing navigation state. Test portrait, landscape, split screen, desktop windowing, and fold transitions when applicable.

## Navigation

Use the appropriate navigation suite—bottom navigation, navigation rail, or drawer—based on available space and destination count. Top app bars carry title, hierarchy, and concise contextual actions. Back and predictive back communicate destination before completion and preserve state.

## Edge-to-edge and system UI

Design through system bars while applying insets to interactive and essential content. Respect cutouts, gesture navigation regions, software keyboard insets, contrast enforcement, and system appearance.

## Components and feedback

Prefer platform controls, sheets, dialogs, snackbars, menus, pickers, and permission flows. Snackbars acknowledge transient recoverable events; important failure remains in context. Floating action buttons are reserved for a clear high-value action and are not mandatory branding elements.

## Input and accessibility

Support touch, hardware keyboard, mouse/trackpad, stylus where relevant, TalkBack, Switch Access, font and display scaling, high contrast, color correction, and reduced motion where available. Semantics, traversal order, pane titles, live regions, and focus restoration are explicit.

## Prohibitions

Do not hard-code phone/tablet breakpoints, replace system back with an unrelated gesture, force bottom navigation into expanded windows, or reproduce iOS navigation and sheet behavior when Android conventions differ.

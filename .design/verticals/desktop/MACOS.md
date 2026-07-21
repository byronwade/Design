---
id: vertical.desktop.macos
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.desktop.base
applies_to:
  platforms: ["macos"]
---

# macOS overlay

## Menus and commands

Place application-wide commands in the menu bar with standard names, ordering, shortcuts, enablement, and roles. Toolbar buttons provide convenient access to current-window actions but do not replace discoverable menu commands.

## Windows and toolbars

Integrate title and toolbar regions using native window behavior. Preserve traffic-light controls, draggable space, full-screen behavior, tabbing, and window restoration. Use unified toolbars, sidebars, split views, inspectors, sheets, and popovers according to task scope.

## Navigation

Sidebars represent major sources or sections within a window. Toolbars represent current-view actions. Segmented controls and tabs switch peer representations. Back/forward follows content history rather than browser imitation.

## Interaction

Support keyboard navigation, menu shortcuts, contextual menus, drag and drop, trackpad gestures, services, sharing, and standard text behavior where applicable. Direct manipulation uses interruptible springs and velocity continuity without overshoot that harms precision.

## Materials and typography

Use system materials, vibrancy, and semantic colors only where they maintain legibility across appearance and accessibility settings. Use macOS text styles and metrics while preserving the product’s warm, calm hierarchy.

## Accessibility

Support VoiceOver, Full Keyboard Access, Reduce Motion, Reduce Transparency, Increase Contrast, and system text/appearance preferences. Custom title-bar content remains reachable and does not conflict with window controls.

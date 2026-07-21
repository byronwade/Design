---
id: vertical.desktop.linux.kde
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.desktop.linux
applies_to:
  platforms: ["linux"]
  environments: ["kde-plasma"]
---

# KDE Plasma overlay

Use KDE Human Interface Guidelines and Qt/Kirigami conventions when targeting Plasma.

## Structure and commands

Support traditional menu bars and toolbars where the application’s command depth benefits from them. On constrained or mobile Kirigami layouts, commands move into toolbars or drawers according to platform convention. Expose shortcuts and allow appropriate customization.

## Navigation

Use navigation tabs for a small number of peers, a global drawer for larger destination sets, and contextual toolviews or dockers for supporting work. Preserve location, current selection, and right-to-left behavior.

## Desktop capability

Support resizable and multi-window workflows, dockable or configurable toolviews where appropriate, context menus, drag-and-drop, and power-user shortcuts without making basic tasks depend on customization.

## Appearance and accessibility

Respect system color schemes, fonts, icon themes, scaling, focus visuals, contrast, keyboard access, screen readers, and user configuration. Product identity maps to semantic roles rather than overriding the Plasma theme.

## Prohibitions

Do not import GNOME header-bar assumptions into a KDE product, hide a deep command set behind one unlabeled hamburger by default, or break user-configurable shortcuts and themes.

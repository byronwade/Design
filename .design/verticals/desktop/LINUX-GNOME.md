---
id: vertical.desktop.linux.gnome
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.desktop.linux
applies_to:
  platforms: ["linux"]
  environments: ["gnome"]
---

# GNOME overlay

Use GNOME Human Interface Guidelines and libadwaita patterns when targeting GNOME.

## Structure

Prefer in-window navigation with shallow flat or hierarchical views. Use header bars for title and concise current-view actions. Sidebars represent sources or destinations; utility panes hold supporting information and collapse adaptively.

## Adaptiveness

Start from constrained layouts, introduce breakpoints based on content, and test continuous resizing. Use maximum content widths for reading and forms. Transform multi-pane layouts into navigation rather than compressing panes indefinitely.

## Commands

Use standard shortcuts, application/window menus where appropriate, search, selection mode, and context menus. Keep destructive actions separated and avoid overcrowded header bars.

## Appearance

Follow system typography, color roles, dark/light preferences, high contrast, and rounded/material conventions. Product warmth appears through semantic accents and content surfaces without fighting the environment theme.

## Prohibitions

Do not use a persistent traditional menu-and-toolbar stack when the GNOME pattern is a focused header bar, create deep navigation trees, or assume a wide desktop window.

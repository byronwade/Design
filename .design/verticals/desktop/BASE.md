---
id: vertical.desktop.base
kind: vertical
version: 1.0.0
status: normative
extends: []
applies_to:
  families: ["desktop"]
---

# Desktop family overlay

Desktop products are pointer- and keyboard-capable, windowed, resizable, and often used for long sessions and multi-object workflows.

## Window and chrome

Respect native title bars, window controls, menus, resize behavior, multi-window capability, full screen, snap/tiling, and system appearance. Product chrome must not obscure draggable regions or system controls.

## Commands

Provide keyboard shortcuts for frequent actions, expose them in menus or command surfaces, and keep focus order predictable. Context menus supplement visible paths; they do not become the only way to act.

## Layout

Use sidebars, split views, inspectors, toolbars, tables, and multi-pane structures when simultaneous context improves work. Panes resize with useful minima, preserve state, and collapse or detach through deliberate rules.

## Pointer behavior

Hover may reveal secondary affordances but never the only essential action. Cursors, selection, drag-and-drop, resize handles, and context menus match platform expectations. Precision controls remain operable with keyboard and assistive technology.

## Density

Desktop can support compact 28–36px controls and 40–44px operational rows when legibility and input accuracy remain strong. Do not apply touch spacing uniformly to pointer-first work, and do not compress navigation until wayfinding suffers.

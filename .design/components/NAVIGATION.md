---
id: components.navigation
kind: components
version: 1.1.0
status: normative
extends:
  - components.registry
---

# Navigation and wayfinding

Navigation changes location or hierarchy. It is not a substitute for commands, creation, search, filtering, or selection.

## Levels

- **global navigation:** major product destinations
- **hierarchical navigation:** parent/child movement, back, drill-in, source lists
- **peer navigation:** tabs or segmented destinations within one object or context
- **in-content navigation:** links, anchors, breadcrumbs, related objects
- **temporary navigation:** menus, quick access, or command surfaces for less frequent destinations

## Rules

- one region owns each navigation level
- name destinations specifically and keep order stable
- preserve current location, return path, selection, and relevant scroll
- keep essential navigation available without hover
- use the selected platform’s standard back and history behavior
- do not put creation or destructive commands into a tab bar to save space
- limit nesting; show hierarchy when depth is unavoidable
- reflect meaningful web location and view state in the URL when safe

## Tabs

Tabs switch peer views within one context or identify open editor objects. The selected tab and panel relationship are programmatic. Tabs are not sequential steps, unrelated global sections, or commands. Local tabs preserve the surrounding object identity.

## Menus

Menus contain commands or destinations that are not simultaneously required. Group by task and risk, keep destructive items separated, expose shortcuts, support type-ahead or search when large, dismiss the smallest layer first, and restore focus. A context menu supplements a visible or keyboard-reachable path.

## Breadcrumbs and titles

Use breadcrumbs when hierarchy or project context helps orientation. Object title is primary identity and remains stable while local views change. Critical status, owner, dates, or progress may appear in a concise summary without duplicating the entire inspector.

Platform overlays define whether global navigation appears as a tab bar, navigation rail, sidebar, NavigationView, menu bar, global drawer, header, or browser route.

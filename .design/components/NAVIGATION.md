---
id: components.navigation
kind: components
version: 1.0.0
status: normative
extends: []
---

# Navigation and wayfinding

Navigation changes location or hierarchy. It is not a substitute for commands or filters.

## Levels

- **global navigation:** major product destinations
- **hierarchical navigation:** parent/child movement, back, drill-in
- **peer navigation:** tabs or segmented destinations within one context
- **in-content navigation:** links, anchors, breadcrumbs, related objects
- **temporary navigation:** menus or command palettes for less frequent destinations

## Rules

- name destinations specifically
- preserve current location and selected state
- keep essential navigation available without hover
- use the selected platform’s standard back behavior
- do not put creation, search, or destructive commands into a tab bar merely to save space
- limit nesting and show hierarchy when depth is unavoidable
- keep navigation order stable

## Tabs

Tabs switch peer views within one context. The active tab is programmatically selected and its panel relationship is explicit. Tabs are not used for sequential steps, unrelated global sections, or actions.

## Menus

Menus contain commands or destinations that are not simultaneously required. Group by task and risk, keep destructive items separated, expose shortcuts, restore focus on dismissal, and support type-ahead or search when the list is large.

Platform overlays define whether global navigation appears as a tab bar, navigation rail, sidebar, NavigationView, menu bar, global drawer, or browser route.

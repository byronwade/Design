---
id: components.commands-search
kind: components
version: 1.0.0
status: normative
extends:
  - components.registry
---

# Commands, search, filters, and saved views

## Command graph

Every meaningful desktop or workbench action should be keyboard-operable and discoverable through an appropriate command surface. The command graph is a parallel access layer, not a replacement for a complete graphical interface.

Commands expose label, category, scope, availability, permission, shortcut, consequence, progress, error, and undo behavior. The same command implementation powers buttons, menus, context menus, palettes, and shortcuts.

## Global quick access

Global quick access may search destinations, records, actions, creation commands, settings, saved views, recent items, and open work. Results adapt to the active object, selected view, permissions, and target profile. Use fuzzy matching, grouped results, arrow navigation, Enter, Escape, typeahead, and screen-reader announcements.

Do not use one undifferentiated search result list when category, destination, or effect matters.

## Local search

Page-local search lives in the view bar or relevant module and exposes its scope. Preserve the query, support clear, show initial loading and subsequent refresh separately, and provide a specific no-results state.

## Structured filters

Represent active constraints visibly. Use field/operator/value structure when filters are complex. Support keyboard editing, clear-all, saved filters, shareability where safe, and explicit interaction between search, filters, sorting, grouping, and date ranges.

## Graphite filter combobox recipe

Use this recipe when a graphite operations contract asks for a compact status, owner, type, priority, or saved-view filter that behaves like a searchable select or combobox. This is a named component recipe for dense SaaS consoles, not the default for every filter surface.

| Field | Value |
| --- | --- |
| Anatomy | `filter.root`, `filter.leading-icon`, `filter.value-label`, `filter.count-badge`, `filter.chevron`, `filter.focus-ring`, `filter.popover`, `filter.option-row`, `filter.option-check`, `filter.empty-state` |
| Label | `Status` |
| Value | `Open issues` |
| Count | `12` |
| Placeholder | `Filter status` |
| Empty state | `No filters found` |
| Height | `36` |
| Inline padding | `12` |
| Gap | `8` |
| Radius | `8` |
| Background | `#171717` |
| Foreground | `#f7f7f4` |
| Border | `#2e2e2b` |
| Muted foreground | `#a7a29b` |
| Accent | `#9eb7ff` |
| Badge background | `#262b35` |
| Shadow | `0 8px 18px rgba(0, 0, 0, 0.22)` |
| Font family | `Inter` |
| Font weight | `650` |
| Label size | `13` |
| Badge size | `11` |
| Popover width | `280` |
| Option height | `34` |
| Hover background | `#20201d` |
| Hover border | `#3a3a36` |
| Focus outline | `2px #9eb7ff` |
| Focus offset | `2` |
| Open background | `#20201d` |
| Open border | `#9eb7ff` |
| Open shadow | `0 12px 30px rgba(0, 0, 0, 0.28)` |
| Selected option background | `#232b3d` |
| Selected option foreground | `#f7f7f4` |
| Selected check color | `#9eb7ff` |
| Disabled background | `#151515` |
| Disabled foreground | `#706d68` |
| Disabled cursor | `not-allowed` |

The recipe exists because dark operational filters need a console accent and state geometry that generic select components do not infer reliably. Do not substitute warm brand clay or default zinc focus colors when the contract calls for a graphite console filter.

## Saved views

A saved view stores a meaningful representation—filters, sort, grouping, columns, range, and layout—without silently storing sensitive transient state. Show ownership, sharing, freshness, and whether edits affect the saved definition or only the current session.

## Bulk actions

Selection exposes count, scope, permission, and a stable contextual action region. Broad or high-risk changes provide an impact preview and recovery path. Do not force repeated one-at-a-time editing when a safe bulk operation fits the task.

## Privacy and history

Recents and query history exist only when they improve repeated work. Sensitive objects, private terms, and cross-account history require explicit privacy behavior and deletion controls.

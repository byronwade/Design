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

## Saved views

A saved view stores a meaningful representation—filters, sort, grouping, columns, range, and layout—without silently storing sensitive transient state. Show ownership, sharing, freshness, and whether edits affect the saved definition or only the current session.

## Bulk actions

Selection exposes count, scope, permission, and a stable contextual action region. Broad or high-risk changes provide an impact preview and recovery path. Do not force repeated one-at-a-time editing when a safe bulk operation fits the task.

## Privacy and history

Recents and query history exist only when they improve repeated work. Sensitive objects, private terms, and cross-account history require explicit privacy behavior and deletion controls.

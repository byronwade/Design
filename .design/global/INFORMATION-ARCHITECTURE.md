---
id: global.information-architecture
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global information architecture and discovery

## Object model before navigation

Name the durable domain objects, their relationships, lifecycles, permissions, and primary actions before arranging screens. Navigation reflects the product model; it must not become a miscellaneous list of features.

## Location layers

- **Product destination:** stable top-level area.
- **Object hierarchy:** organization, project, collection, parent, and child context.
- **Representation:** list, board, timeline, document, activity, analytics, or saved view.
- **Mode:** selection, edit, compare, review, focus, or takeover.

Show only the layers needed to maintain orientation. Preserve durable location in URLs, native navigation state, window restoration, or equivalent platform state.

## Navigation ownership

One region owns global destinations. Local tabs, segmented controls, breadcrumbs, view bars, and inspectors do not duplicate global navigation. Keep hierarchy shallow; deep nesting requires an information-architecture review.

## Search and command graph

Treat discovery as several distinct intents:

- global quick access across destinations, records, commands, settings, saved views, and recent items
- page-local search with visible scope
- structured filters with visible active constraints and saved configurations
- content search with match context and grouping
- command execution with permission, scope, progress, undo, and error behavior

Search history and recents are privacy-aware. Empty results name the searched scope and constraints and suggest a meaningful adjustment.

## Saved and shareable state

Preserve meaningful filters, sorts, grouping, columns, ranges, tabs, selected objects, and layouts when the task benefits from return, sharing, or repeated work. Do not encode sensitive transient state into a shareable URL without review.

## Naming

Use concrete domain nouns for destinations and specific verbs for commands. The same object and action keep the same name across navigation, content, search, commands, notifications, and help.

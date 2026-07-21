---
id: vertical.web.app
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.web.base
applies_to:
  families: ["web"]
  surfaces: ["application"]
---

# Web application overlay

Web applications support recurring tasks, stateful workflows, data, and dense interaction.

## Shell

Use a stable application shell with global navigation, object identity, representation controls, primary task body, and optional inspector or utility region. Routes remain addressable. Do not remount the shell or discard local context for every state change.

## Operational density

Lists, tables, boards, timelines, filters, command palettes, inspectors, and keyboard shortcuts are appropriate when task frequency supports them. Essential actions remain visible without hover and responsive layouts transform panes before compressing content.

## State and data

Represent initial loading, background refresh, optimistic state, queued work, stale data, partial failure, permission, offline, conflict, and recovery. Preserve filters, selection, scroll, and drafts in the URL or appropriate local state.

## Commands

Use buttons for commands and links for navigation. Support browser and product keyboard conventions without collisions. Destructive and irreversible actions expose consequence and recovery.

## Accessibility

Target WCAG 2.2 AA, use WAI-ARIA Authoring Practices for custom composites, and test keyboard, screen reader, reflow, zoom, target size, focus appearance, reduced motion, and realistic data states.

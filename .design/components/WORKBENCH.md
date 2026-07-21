---
id: components.workbench
kind: components
version: 1.0.0
status: normative
extends:
  - components.registry
---

# Workbench and editor components

## Regions

A deep workbench may use an activity rail, contextual navigator, editor groups, primary artifact, inspector, bottom panel, status region, and auxiliary windows. The shell remains one application frame; each tool is not a separate floating card.

## Editor tabs and groups

Tabs identify open durable objects or tools, expose dirty/pinned/preview state, preserve history, and support keyboard movement. Split groups have visible ownership, useful minimums, and explicit active-group state. Closing, moving, or restoring a tab never loses unsaved work silently.

## Inspectors and panels

Inspectors show structured properties or secondary editing related to the active object. Bottom panels hold terminals, logs, diagnostics, output, or supporting tools. Panels resize from structural edges, remember deliberate sizes, and collapse completely when the artifact is self-sufficient.

## Focus mode

Focus mode hides, collapses, or overlays secondary regions while retaining artifact identity, critical status, and essential actions. Command access and explicit region toggles remain available. Exiting restores the prior layout, open tools, selection, and scroll.

## Drag, resize, and docking

Use direct tracking, visible destinations, grab-offset preservation, useful min/max dimensions, keyboard alternatives, and reversible failure. Do not animate panel geometry merely to make the interface feel active.

## Auxiliary windows

Use for second-monitor preview, review, browser, comparison, or follow views when independent placement improves work. Windows share durable state without duplicating ownership or creating conflicting edits.

## Constrained transformation

On constrained space, show one active group with an explicit switcher, move inspectors and panels into routes or sheets, and preserve open-group state. Do not squeeze every desktop region into one narrow canvas.

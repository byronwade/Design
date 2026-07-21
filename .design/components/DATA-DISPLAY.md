---
id: components.data-display
kind: components
version: 1.0.0
status: normative
extends: []
---

# Data display and operational structures

## Lists and tables

Use lists for scan-and-act collections and tables for comparison across stable columns. Align repeated metadata. Keep row identity and principal action clear. Selection, expansion, drag, sorting, filtering, pagination, and bulk actions have explicit states and keyboard behavior.

Dense operational rows are normally 40–44px equivalent on pointer-first surfaces; touch profiles use platform target metrics. Avoid a border around every cell when alignment and grouping are sufficient.

## Boards

Use stable columns, target approximately 320px on desktop, and preserve horizontal scrolling. Cards summarize only what is required to decide or move work. Drag-and-drop has keyboard and non-drag alternatives, clear destinations, and reversible failure.

## Timelines

Pair a fixed semantic pane, approximately 288–320px on desktop, with a horizontally scrollable temporal canvas. Keep labels and time scale aligned. Zoom or range changes preserve the object and focal time.

## Cards

A card represents an independent object, stateful module, or navigable summary. Do not card every paragraph or section. Nested cards do not each add shadow and radius.

## Inspectors and supporting panes

Use an inspector for structured metadata or secondary editing that benefits from staying beside the primary object. At constrained widths it becomes a route, sheet, drawer, or disclosure before squeezing primary content below a useful measure.

## Charts

Every visualization has a stated question, accessible name, data table or equivalent alternative, legible axes, non-color encoding, honest scale, and loading/empty/error behavior. Decoration never obscures values.

---
id: components.data-display
kind: components
version: 1.1.0
status: normative
extends:
  - components.registry
---

# Data display and operational structures

## Lists, queues, and tables

Use lists for scan-and-act collections, queues for ordered attention, and tables for comparison across stable columns. Align repeated metadata. Keep row identity and principal action clear. Selection, expansion, drag, sorting, filtering, pagination, virtualization, bulk actions, and live updates have explicit state and keyboard behavior.

Dense operational rows are normally 40–44px equivalent on pointer-first surfaces; touch profiles use platform target metrics. Avoid a border around every cell when alignment and grouping are sufficient. Pinned identity, numerical alignment, tabular numerals, column configuration, and predictable trailing actions support sustained work.

## Boards

Use stable 300–340px columns, targeting approximately 320px on desktop, and preserve horizontal scrolling. Cards summarize only what is required to decide or move work. Drag-and-drop has keyboard and non-drag alternatives, visible destinations, auto-scroll boundaries, and reversible failure.

## Timelines

Pair a fixed 288–320px semantic pane, targeting approximately 304px, with a horizontally scrollable temporal canvas. Keep labels and time scale aligned. Zoom or range changes preserve the object and focal time. Provide a list or table alternative when spatial interaction cannot remain accessible.

## Cards and integrated surfaces

A card represents an independent object, stateful module, or navigable summary. Do not card every paragraph or section. Toolbars, bodies, and footers that belong to one object share one outer surface, clipping owner, border, radius, and shadow.

## Inspectors and supporting panes

Use an inspector for structured metadata or secondary editing that benefits from staying beside the primary object. Compact inspectors are approximately 320px and rich rails approximately 384px on desktop. At constrained widths they become a route, sheet, drawer, or disclosure before reducing primary reading width below approximately 640px.

## Large data and live change

Preserve scroll and selection during refresh. Distinguish initial loading from background refresh, stale data, partial failure, newly arrived rows, and local optimistic changes. Virtualization must not break focus, screen-reader relationships, row height expectations, find-in-page where required, or restoration.

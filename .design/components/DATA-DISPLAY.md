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

## Graphite metric card recipe

Use this recipe when a graphite operations contract asks for a compact KPI card in a dashboard, workbench overview, or inspector. This is a named component recipe for dense SaaS consoles, not the default for every card.

| Field | Value |
| --- | --- |
| Anatomy | `metric.root`, `metric.header`, `metric.label`, `metric.menu-trigger`, `metric.value`, `metric.delta`, `metric.caption`, `metric.sparkline`, `metric.status-dot`, `metric.focus-ring` |
| Label | `Resolution SLA` |
| Value | `94.2%` |
| Delta | `+3.8%` |
| Caption | `Last 7 days` |
| Menu label | `Metric actions` |
| Stale caption | `Data delayed` |
| Width | `284` |
| Padding | `16` |
| Gap | `12` |
| Radius | `10` |
| Background | `#181817` |
| Foreground | `#f7f7f4` |
| Border | `#30302c` |
| Muted foreground | `#9f9a91` |
| Accent | `#9eb7ff` |
| Positive | `#7bd88f` |
| Warning | `#d9b26f` |
| Shadow | `0 10px 24px rgba(0, 0, 0, 0.20)` |
| Font family | `Inter` |
| Label weight | `650` |
| Value weight | `760` |
| Label size | `12` |
| Value size | `30` |
| Delta size | `12` |
| Caption size | `11` |
| Sparkline height | `38` |
| Hover background | `#20201d` |
| Hover border | `#3a3a36` |
| Hover shadow | `0 14px 30px rgba(0, 0, 0, 0.24)` |
| Focus outline | `2px #9eb7ff` |
| Focus offset | `3` |
| Selected border | `#9eb7ff` |
| Selected background | `#1d2230` |
| Stale status color | `#d9b26f` |
| Stale opacity | `0.82` |

The recipe exists because operational metric cards need stable metric identity and compact state behavior. Do not substitute different KPI content, softer marketing card dimensions, or generic stale copy when the contract calls for this graphite metric card.

## Inspectors and supporting panes

Use an inspector for structured metadata or secondary editing that benefits from staying beside the primary object. Compact inspectors are approximately 320px and rich rails approximately 384px on desktop. At constrained widths they become a route, sheet, drawer, or disclosure before reducing primary reading width below approximately 640px.

## Large data and live change

Preserve scroll and selection during refresh. Distinguish initial loading from background refresh, stale data, partial failure, newly arrived rows, and local optimistic changes. Virtualization must not break focus, screen-reader relationships, row height expectations, find-in-page where required, or restoration.

---
id: global.layout
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global layout and region model

## Region grammar

Every screen is composed from named regions with one responsibility each:

```text
product environment
├── global navigation
├── location and object identity
├── representation controls
├── primary task body
├── optional metadata or supporting pane
└── temporary overlays
```

Do not combine every scope into one toolbar.

## Scroll ownership

Declare one vertical scroll owner for the primary task. Nested scroll regions require a strong independent reason, visible boundaries, keyboard reachability, and preserved context. A viewport and its primary body must not both become accidental vertical scroll containers.

Horizontal scrolling is acceptable for inherently horizontal operational representations such as boards and timelines. Preserve sticky identity and semantic columns where needed.

## Density zones

- global navigation: low to moderate
- reading, forms, settings: moderate
- lists, queues, boards, timelines: high
- authentication and focused first-run: low
- conversation and activity: moderate

Compress repeated work; relax wayfinding and explanation.

## Responsive transformation

Do not scale an entire desktop composition down. At constrained space:

1. preserve the primary task and object identity
2. reduce simultaneous panes
3. move supporting information into a route, sheet, inspector, disclosure, or overlay
4. replace labels with icons only when the icon is familiar and accessible
5. preserve content order and state
6. change navigation representation using the selected platform overlay

Convert a docked rail before the primary reading measure becomes unusable. Keep minimum touch and pointer targets appropriate to the input mode.

## Local geometry

Soft borders do not permit loose placement. Repeated baselines, column starts, widths, owner/date zones, and alignment anchors must be consistent. Prefer alignment and whitespace over a border around every cell.

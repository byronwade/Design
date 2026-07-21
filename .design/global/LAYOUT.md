---
id: global.layout
kind: global
version: 1.1.0
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

Do not combine every scope into one toolbar. A region’s placement, boundary, persistence, density, and scroll behavior communicate what it owns.

## Sizing model

Classify regions as fixed, bounded, fluid, content-sized, overlay, or collapsed. Declare useful minimums and maximums rather than relying on framework defaults. Preserve deliberate user resizing where the selected platform supports it. A region that cannot remain useful transforms or disappears before it crushes the primary task.

Use content-driven thresholds and actual window space. Device names and conventional breakpoints are implementation hints, not the reason for a layout change. Native size classes, fold posture, title bars, browser chrome, safe areas, text scaling, zoom, and software keyboards all reduce usable space.

## Scroll ownership

Declare one vertical scroll owner for the primary task. Nested scroll regions require a strong independent reason, visible boundaries, keyboard reachability, focus behavior, and preserved position. A viewport and its primary body must not both become accidental vertical scroll containers.

Horizontal scrolling is appropriate for inherently horizontal operational representations such as boards and timelines. Preserve sticky identity and semantic columns where needed. Do not trap wheel, touch, or keyboard scrolling at a boundary.

## Density zones

- global navigation: low to moderate
- reading, forms, settings: moderate
- lists, queues, boards, timelines, editors: high when comparison or throughput benefits
- authentication and focused first-run: low
- conversation and activity: moderate
- marketing narrative: low to moderate with deliberate cadence

Compress repeated work; relax wayfinding and explanation. Touch target size and visual density are separate decisions.

## Responsive transformation

Do not scale an entire desktop composition down. At constrained space:

1. preserve the primary task and object identity
2. reduce simultaneous panes
3. move supporting information into a route, sheet, inspector, disclosure, or overlay
4. prioritize columns or provide a purpose-built list before destroying table relationships
5. retain horizontal operational structures when stacking would change meaning
6. replace labels with icons only when the icon is familiar and accessible
7. preserve content order, drafts, selection, and restoration
8. change navigation representation using the selected platform overlay

Convert a docked rail before the primary reading measure becomes unusable. Re-evaluate at largest supported text/zoom, localization expansion, split-screen, and small resizable windows—not only nominal viewport widths.

## Layering and clipping

One owner defines each stacking context, clipping boundary, radius, and shadow. Persistent structure remains planar; transient layers rise above it. Menus, popovers, tooltips, dialogs, sheets, drag previews, and notifications use a documented layer order and do not disappear beneath transformed or overflow-clipped ancestors.

## Safe and system regions

Respect notches, rounded displays, system bars, title bars, caption buttons, home indicators, fold hinges, software keyboards, browser UI, and reserved gesture edges. Backgrounds may extend into safe regions; essential content and controls use appropriate insets.

## Local geometry

Soft borders do not permit loose placement. Repeated baselines, column starts, widths, owner/date zones, and alignment anchors remain consistent. Prefer alignment and whitespace over a border around every cell. Reserve space for asynchronous content and validation to avoid destructive layout shift.

## Layout evidence

For each critical surface record shell, layout archetype, named regions, fixed/fluid/bounded behavior, viewport and scroll owners, minimum useful dimensions, transformation sequence, text/zoom stress state, and representative wide/constrained captures.

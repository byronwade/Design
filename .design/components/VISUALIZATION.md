---
id: components.visualization
kind: components
version: 1.0.0
status: normative
extends:
  - components.registry
---

# Data visualization

## Question first

Every metric or chart answers a stated question, supports a decision, or explains the current object. Do not use visualization as decorative wallpaper or repeat a value already clear in a table.

## Selection

- metric: one value with unit, time basis, freshness, and comparison
- sparkline: compact trend tied to a nearby value
- line or area: change over ordered time or sequence
- bar: comparison across discrete categories
- distribution: range, spread, or composition when individual values are not primary
- progress: movement toward a defined total or state
- table: exact comparison and accessible fallback

## Integrity

Show units, time range, baseline, missing data, aggregation, and source. Avoid misleading truncated axes, false precision, decorative 3D, or color scales that exaggerate difference.

## Color and labeling

Prefer one primary series plus semantic highlights. Use direct labels or concise legends. Do not require color memory across many series, and never encode essential meaning only through hue.

## Interaction

Hover and focus reveal details; keyboard users can reach equivalent values. Selection remains stable across filtering or range changes. Zoom and brushing preserve the object and focal range. Tooltips supplement rather than contain the only explanation.

## Accessibility and responsive behavior

Provide an accessible name, concise insight, data table or equivalent textual representation, and announced updates where needed. At constrained widths, simplify labels, change chart form, or expose a table; do not make marks too small to inspect.

## States

Define loading, partial, empty, stale, permission, error, and no-comparable-data behavior. Charts do not imply continuity or completeness when data is missing.

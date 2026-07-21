## Component rules

### Buttons

- 28px compact, 32px normal, 36px high emphasis.
- 10px horizontal padding, 6px icon-label gap, 13px medium label.
- At most one dominant primary action per local region.
- Icon-only controls require accessible names and tooltips when not self-evident.
- Press states move down about 1px and use an inset shadow.

### Inputs

- 36px standard; 32px compact filters.
- Keep labels visible; placeholders are examples, not labels.
- Use narrow visible focus, local error messages, and preserved values after failure.
- Prefer one vertical reading path. Use two columns only for closely related short fields.

### Cards

- Group one coherent task or information set.
- Do not use cards as the default wrapper for every section.
- Board cards: 8px radius, 12px padding, 1px border, title plus two compact metadata lines.
- Integrated toolbar/body/footer containers own one border, one radius, and one shadow.

### Lists and tables

- 44px standard row, 36px group header.
- Avoid zebra striping and full cell borders unless the domain requires a true grid.
- Protect identity, status, owner, and critical date zones.
- Use configurable columns, saved views, sorting, grouping, and keyboard selection.

### Menus and popovers

- 240px common width, 32px rows, 8px padding, 12px outer radius.
- Float above the layout without causing reflow.
- Preserve page context and restore focus to the trigger.

### Inspector

- 320px compact or 384px rich.
- Muted predictable labels, primary values, inline controls, 8px module gaps.
- Convert to overlay before it harms the primary content.

## Product patterns

### Marketing

Use an explicit header with real categories, a specific hero, concise subheadline, one primary CTA, product proof, outcome-based narrative sections, and restrained visuals. Avoid generic equal-card feature grids and decorative gradient blobs.

### Application home

Prioritize current work, material attention, meaningful progress, and compact quick actions. Do not default to a dashboard of oversized KPI cards.

### Project or record detail

Breadcrumb/context → title/actions → compact property summary → narrative description → resources → stateful modules → optional inspector.

### Operational queue

Location bar → view bar → optional compact summary → group/table header → dense rows → optional selected-object inspector.

### Agent experience

Conversation may direct work, but durable objects, artifacts, evidence, decisions, review, status, and takeover remain structured and visible.

## Responsive behavior

- ≥1280px: sidebar and rails may remain docked.
- 1024–1279px: overlay or hide a rail when primary content narrows.
- 768–1023px: sidebar becomes a drawer; rails become overlays; low-priority actions move to overflow.
- <768px: one primary column; local tabs scroll; boards/timelines preserve horizontal movement.
- Increase effective touch targets without visually inflating every control.

## Accessibility gates

- WCAG AA contrast and visible component boundaries.
- Complete keyboard operation and logical focus order.
- Names, roles, states, labels, and live announcements.
- 200%+ zoom, high contrast, reduced motion, screen-reader equivalents.
- Non-color representations for status, selection, progress, presence, and error.
- Textual alternatives for charts, visual diffs, and spatial presence.


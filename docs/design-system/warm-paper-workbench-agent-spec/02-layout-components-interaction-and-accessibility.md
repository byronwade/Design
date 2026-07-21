## 4. Application layout system

### Desktop shell

```text
Outer warm canvas
├── Global navigation: 240px
├── Inset work surface: 8px inset, 12px radius
│   ├── Optional location bar: 44px
│   ├── Optional view bar: 44px
│   └── Task-specific body
└── Optional utility strip: 36px
```

Place controls by scope:

- Application-wide: sidebar or utility strip.
- Current object: location bar.
- Current representation: view bar.
- Content-local: inside the relevant module.
- Structured metadata: right rail.
- Temporary choice: popover above the layout.

Never combine all scopes into one giant toolbar.

### Density zones

- Navigation: low to moderate.
- Document and settings pages: moderate.
- Lists, boards, timelines, and queues: high.
- Authentication and focused empty states: low.
- Conversations: moderate.

Compress the work; relax the navigation.

### Archetype A: centered action canvas

Use for authentication, onboarding, agent welcome, and focused setup.

- Authentication: 320px.
- Settings: 640px.
- Agent or focused stack: 712px.
- Do not stretch the stack to fill the work surface.

### Archetype B: document plus rail

```text
Primary region
└── Centered reading column: 720–800px; target 760px

Optional rail
├── Rich rail: 384px
├── Compact inspector: 320px
└── Utility rail: 208px
```

Keep long-form content mostly unboxed. Box independent stateful modules. Convert a docked rail to an overlay before the primary reading measure falls below approximately 640px.

### Archetype C: full operational canvas

List anatomy:

```text
status | identifier | title | flexible space | metadata | owner | date
```

Use 36px group headers and 40–44px rows. Align repeated metadata instead of drawing a border around every cell.

Boards use stable 300–340px columns, target 320px, and preserve horizontal scrolling. Cards are summaries, not miniature detail pages.

Timelines use a fixed 288–320px semantic pane, target 304px, beside a horizontally scrollable temporal canvas.

### Archetype D: feed or conversation

- Chat composer: pinned to the bottom of the conversation column.
- Issue reply: after issue body and activity.
- Project update composer: above historical updates.
- Update the smallest region capable of expressing a state change.

### Archetype E: settings

Use persistent category navigation and a centered 620–680px content column. Avoid full-width forms and unnecessary card grids.

### Responsive transformations

- ≥1280px: retain sidebar and docked rails.
- 1024–1279px: overlay or hide a rail when it harms primary content.
- 768–1023px: collapse sidebar into a drawer and move low-priority actions into overflow.
- <768px: one primary column, horizontally scroll tabs, boards, and timelines, and enlarge touch targets.

Change representation before mechanically shrinking desktop geometry.

## 5. Components

### Buttons

- Compact: 28px.
- Default: 32px.
- Emphasis: 36px.
- Use 10px horizontal padding, 6px icon gap, and 6–8px radius.
- Use at most one dominant primary action in a local region.
- Pressed state moves down 1px and becomes more inset.

### Cards and panels

Use cards for one coherent task or information set. Default radius is 8–10px with a soft border and paper shadow. Interactive cards may rise by no more than 1px. Do not build a dashboard of equally weighted cards by default.

### Navigation, tabs, and chips

Sidebar rows are 28px high with 16px icons. Inactive rows have no visible container. Active rows use paper-selected. Local tabs are compact 28px pills. Chips are approximately 24px high; prefer a colored dot or icon to a large saturated fill.

### Forms and composers

Inputs are 32–36px; search may be 40–44px. Focus uses a narrow warm accent outline. Labels remain explicit in settings and complex forms. Multiline composers keep secondary actions left and send right.

### Lists, boards, timelines, and inspectors

Use stable trailing metadata order, quiet selection, and no unnecessary cell borders. Preserve board and timeline horizontal scrolling. Inspectors align with the body region they describe and use muted labels with primary values.

### Menus and previews

Menus float above the current page without reflow. Common menu width is around 240px with 32px rows and a floating shadow. Quick previews preserve list or board position.

## 6. Interaction behavior

Preserve filters, selection, ordering, scroll position, and context when switching representations. Use progressive disclosure:

```text
Row or card
→ quick preview
→ docked inspector or split view
→ full object view
→ fullscreen editing
```

Motion ranges:

- Hover and pressed: 100–140ms.
- Menu and popover: 120–180ms.
- Inspector open: 160–220ms.
- View transition: 150–240ms.

Respect reduced motion. Motion clarifies state or spatial relationship; it is not decoration.

Dense professional views should support keyboard operation. Command palettes and shortcuts expose advanced features without permanently enlarging toolbars.

Selection and bulk-action rules:

- Selection, hover, and focus remain visually distinct.
- Multi-select exposes a selected count and uses an integrated contextual bar rather than a detached floating card.
- Destructive bulk actions are separated from routine actions and offer undo when reversal is safe.

Drag, resize, and feedback rules:

- Use explicit drag affordances when the draggable region is not obvious and preserve a keyboard alternative.
- Show insertion targets with a narrow accent line or quiet destination highlight.
- Resizers use structural edges and enforce useful minimum and maximum dimensions.
- Use optimistic updates when safe, preserve geometry while pending, and keep local feedback local.

## 7. Accessibility

- Meet WCAG AA contrast for text and essential non-text boundaries.
- Provide visible keyboard focus.
- Use semantic elements, labels, headings, landmarks, and table structure.
- Pointer targets should be at least 24×24 CSS pixels or have sufficient spacing; touch targets should be larger.
- Do not communicate state by color alone.
- Preserve logical reading order when rails become overlays or single-column layouts.
- Compact visual controls may have larger invisible hit areas.


---
name: Warm Paper Workbench
type: living-design-system
version: 0.1.0
status: living
owner: "Byron Wade"
last_updated: 2026-07-21
audience:
  - design agents
  - coding agents
  - product designers
  - engineers
  - reviewers
---

# Warm Paper Workbench

A calm, warm, compact system for building feature-rich software.

> **System contract:** Build interfaces that feel like a single warm sheet of precision-made paper: compact and tactile, visually quiet, structurally rigorous, and capable of supporting advanced workflows without exposing every control at once.

This is the current visual and interaction expression of [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md). Motion-specific decisions live in [`MOTION_PRINCIPLES.md`](motion/MOTION_PRINCIPLES.md), and review rules live in [`UI_REVIEW_GUIDELINES.md`](review/UI_REVIEW_GUIDELINES.md). Source adaptation is documented in [`INFLUENCES.md`](INFLUENCES.md).

## How agents should use this document

Apply this decision order:

1. Explicit project brief or current user instruction.
2. This living design system and its current decision log.
3. Established repository conventions that do not conflict with this system.
4. Agent and framework defaults.

Before designing or changing code, inspect the repository, classify the screen, state the shell and scrolling model, reuse sound primitives, implement responsive behavior, verify states, and record intentional deviations.

When the system changes, update the decision log, tokens, all affected sections, and the changelog together.

## 1. Identity and non-negotiable principles

Warm Paper Workbench is a professional-tool aesthetic: minimal in visual noise, not minimal in capability. It combines warm cream surfaces, compact controls, strong local geometry, and carefully restrained depth.

**Personality:** warm, calm, tactile, precise, compact, capable, legible, deliberate.

### Principles

1. **Calm density.** Operational work may be dense, but navigation and surrounding chrome should breathe.
2. **Stable location.** Keep the shell and object context stable while the work changes representation.
3. **Scope-driven placement.** A control's position should reveal whether it is global, object-level, view-level, local, metadata, or temporary.
4. **Warm paper surfaces.** Prefer cream canvas and warm-white paper over cool blue-gray backgrounds.
5. **Tactile restraint.** Use shallow warm bevel shadows on controls and subtle paper shadows on meaningful cards; never stack shadows indiscriminately.
6. **Integrated chrome.** Toolbar, body, and footer inside one container are one object with one outer border, radius, clipping owner, and shadow.
7. **Progressive disclosure.** Keep rows and cards concise; reveal detail through previews, inspectors, menus, and full pages.
8. **Local geometry.** Soft dividers do not mean loose layout. Repeated widths, baselines, and metadata zones must be strict.

This is not a sparse marketing style, a card-everything dashboard, flat minimalism, rustic decoration, or a direct copy of Linear or Shopify.

## 2. Visual foundation

### Colors

```css
:root {
  --ui-canvas: #f3eee5;
  --ui-paper: #fffdf8;
  --ui-paper-subtle: #faf5ec;
  --ui-paper-hover: #f5eee3;
  --ui-paper-selected: #ede3d5;

  --ui-ink: #2b2723;
  --ui-ink-secondary: #675f57;
  --ui-ink-muted: #766e65;

  --ui-border-soft: rgba(67, 52, 38, 0.10);
  --ui-border: rgba(67, 52, 38, 0.15);
  --ui-border-edge: rgba(67, 52, 38, 0.22);

  --ui-accent: #9b4f32;
  --ui-accent-hover: #7a3f2a;
  --ui-accent-soft: #f4e5db;
  --ui-focus: #7d4936;

  --ui-success: #356548;
  --ui-success-soft: #e8f2e7;
  --ui-warning: #7a5417;
  --ui-warning-soft: #fff1d6;
  --ui-danger: #9c3c32;
  --ui-danger-soft: #f9e4e0;
  --ui-info: #3e6670;
  --ui-info-soft: #e5f0f1;
}
```

Use color as a small semantic accent. Do not use large saturated status backgrounds. Project-specific accents may change, but the warm neutral base remains.

### Typography

Use `Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

- Page titles: 22–28px / 600.
- Section titles: 18–22px / 600.
- Subsections: 14–16px / 600.
- Narrative body: 15–16px / 400, line-height 1.45–1.55.
- Application body: 14–15px / 400.
- Operational rows and controls: 13–14px / 400–500.
- Metadata and chips: 12–13px / 400–500.
- Use tabular numerals for dates, counts, progress, and metrics.

Use sentence case. Avoid decorative display fonts, tiny low-contrast text, and excessive bold weights. Keep long-form copy within a 720–800px reading measure.

### Spacing and shape

Use a 4px fine grid with an 8px dominant macro rhythm: `4 → 8 → 12 → 16 → 24 → 32 → 48 → 64`.

- Compact navigation and icon controls: 28px.
- Default buttons and inputs: 32px.
- Emphasis controls and group headers: 36px.
- Location bars, view bars, and comfortable operational rows: 44px.
- Radii: 4px micro, 6px compact, 8px standard, 10px paper, 12px shell, full for pills and avatars.

Owner avatars are 20px in properties and dense rows, 16px in compressed stacks, and 28px in identity contexts. Use circular clipping and initials as a fallback.

## 3. Depth, borders, and paper model

Persistent structure stays planar. Tactile controls and temporary layers receive tiered depth.

- Level 0: canvas and flat operational regions — no shadow.
- Level 1: paper surfaces and meaningful cards — subtle paper shadow.
- Level 2: buttons and tactile controls — inset bevel plus tiny lift.
- Level 3: menus, popovers, previews, and dialogs — soft floating shadow.

```css
:root {
  --shadow-control:
    inset 0 -1px 0 rgba(72, 56, 40, 0.28),
    inset 0 0 0 1px rgba(72, 56, 40, 0.10),
    inset 0 0.5px 0 1.5px rgba(255, 255, 255, 0.78),
    0 1px 1px rgba(72, 56, 40, 0.05);

  --shadow-control-hover:
    inset 0 -1px 0 rgba(72, 56, 40, 0.34),
    inset 0 0 0 1px rgba(72, 56, 40, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 1px 2px rgba(72, 56, 40, 0.07);

  --shadow-control-primary:
    inset 0 -1px 0 1px rgba(65, 31, 21, 0.62),
    inset 0 0 0 1px rgba(105, 49, 31, 0.92),
    inset 0 0.5px 0 1.5px rgba(255, 255, 255, 0.26),
    0 1px 2px rgba(72, 35, 24, 0.16);

  --shadow-paper:
    0 1px 0 rgba(67, 52, 38, 0.07),
    0 3px 8px -5px rgba(67, 52, 38, 0.22),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.72);

  --shadow-paper-hover:
    0 1px 0 rgba(67, 52, 38, 0.08),
    0 6px 14px -8px rgba(67, 52, 38, 0.28),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.78);

  --shadow-float:
    0 16px 40px -12px rgba(52, 40, 29, 0.28),
    0 4px 12px -4px rgba(52, 40, 29, 0.18),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.75);
}
```

A shadow belongs to the highest meaningful surface in a local stack. Do not stack paper shadows through nested cards.

### Integrated paper containers

```text
Paper shell: one owner of border, radius, clipping, and shadow
├── Toolbar: integrated top region; no independent radius or shadow
├── Body: primary content
└── Footer: integrated bottom region; no independent radius or shadow
```

There is no gap between toolbar, body, and footer. Internal corners are square. Use a soft divider or a 2–4% tonal shift. Let dense rows bleed to the shell edge when that improves scanning.

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

Use [`MOTION_PRINCIPLES.md`](motion/MOTION_PRINCIPLES.md) for purpose, frequency, timing, easing, interruptibility, gesture handoff, performance, and reduced-motion decisions.

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

## 8. Content and language

The voice is direct, calm, specific, and operational.

- Use verbs for actions and nouns for destinations.
- Use sentence case.
- Avoid vague labels such as “Manage” or “Advanced” when a specific label fits.
- Place title first, then concise purpose, compact properties, and detailed modules.
- Truncate optional context before critical identity, status, or deadline.

Empty-state formula:

```text
What is empty
Why it matters, when clarification is useful
One primary next action
Optional secondary discovery link
```

## 9. Agent implementation contract

Before changing code:

1. Read instructions, requirements, and this document.
2. Inspect shell, routes, components, tokens, states, and responsive behavior.
3. Identify the primary task and comparison needs.
4. Choose a layout archetype and state why.
5. Define shell, columns, rails, scrolling, and transient layers.
6. Reuse sound primitives and preserve behavior.

Implementation sequence:

1. Establish semantic tokens.
2. Build or validate shell and control-scope placement.
3. Implement body layout and responsive transformations.
4. Build integrated paper containers.
5. Apply compact controls, states, focus, and metadata.
6. Test realistic content, long labels, empty, error, loading, and constrained widths.
7. Run formatting, linting, type checks, tests, and visual review.
8. Record deviations and proposed additions.

Create a new system rule only when a pattern recurs, needs a shared token or primitive, resolves conflicting guidance, or changes how future agents should classify and build work. Keep one-off preferences local until repetition proves they belong in the system.

Recommended repository artifacts:

- `DESIGN.md` for canonical tokens and rationale.
- `SKILL.md` for Codex and Claude operating instructions.
- Executable `tokens.css` or `tokens.ts`.
- Shared primitives for paper containers, buttons, menus, rails, and tabs.
- A decision log and representative visual fixtures.

Definition of complete: realistic states work; responsive, keyboard, and accessibility behavior are verified; shared primitives replace duplication; tests and visual review pass; and new system decisions are recorded.

Agent decision template:

```text
Screen / feature:
Primary task:
Layout archetype:
Persistent shell:
Primary content measure:
Optional rail or overlay:
Density zone:
Paper surfaces and shadow levels:
Key controls and their scope:
Responsive transformation:
Accessibility risks:
Intentional deviations:
New system decision required: yes / no
```

## 10. Failure patterns

Reject or correct:

- Generic dashboard composed entirely of equally weighted cards.
- Separate rounded toolbar above a separate rounded content card.
- Footer rendered as an unrelated slab.
- Pure-white canvas with cool gray borders and no warmth.
- Oversized 40–48px desktop buttons everywhere.
- Strong shadow on every nested component.
- Full-width narrative text.
- Board columns or timelines compressed to avoid scrolling.
- One giant toolbar containing every scope.
- Decorative minimalism that removes useful controls.
- Large saturated status backgrounds.
- “Gridless” layouts with weak alignment.

## 11. Governance

Initial accepted decisions:

- D-001: use “Warm Paper Workbench” as the system name.
- D-002: use a 4px fine grid with an 8px dominant macro rhythm.
- D-003: use warm Shopify-derived inset shadows on controls and restrained paper shadows on meaningful cards.
- D-004: treat toolbar, body, and footer as one integrated paper object.
- D-005: use a stable shell, scope-based controls, and task-specific body archetypes.

New decision template:

```text
Date:
Decision ID:
Problem:
Decision:
Alternatives considered:
Rationale:
Affected tokens / components / layouts:
Migration or deprecation notes:
Owner:
Status: proposed / experimental / accepted / deprecated
```

Research backlog:

- Dark mode.
- Mobile shell and touch density.
- Data visualization.
- Icon system.
- Motion token refinements, gesture patterns, and platform-specific reduced-motion equivalents.
- Marketing adaptation.
- Theme personalization.
- Rich editors and collaboration.
- Accessibility modes.
- Component inventory and consolidation.

## Final review checklist

- Correct layout archetype is explicit.
- Location remains stable while representation changes.
- Controls are placed according to scope.
- Warm canvas and paper hierarchy are present.
- Buttons are compact and tactile.
- Cards have restrained depth with no nested shadow stack.
- Toolbar, body, and footer read as one paper object.
- Internal borders are soft; structural edges and focus are stronger.
- Feature richness is available through progressive disclosure.
- Long content, narrow widths, loading, empty, and error states are tested.
- Keyboard, contrast, target size, and non-color state cues are verified.
- Formatters, linters, type checks, tests, and visual review pass.

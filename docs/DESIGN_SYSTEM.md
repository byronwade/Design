---
name: Warm Paper Workbench
type: living-design-system
version: 0.1.0
status: living
owner: byronwade
last_updated: 2026-07-21
audience:
  - design agents
  - coding agents
  - product designers
  - engineers
  - reviewers
---

# Warm Paper Workbench

A calm, warm and compact system for building feature-rich software.

> **System contract:** Build interfaces that feel like a single warm sheet of precision-made paper: compact and tactile, visually quiet, structurally rigorous and capable of supporting advanced workflows without exposing every control at once.

## How agents use this document

Apply this decision order:

1. The current project brief or direct user instruction.
2. Root `DESIGN.md` and accepted entries in `docs/DECISIONS.md`.
3. This living document and the relevant layout or motion reference.
4. Existing repository conventions that do not conflict with the system.
5. Framework defaults.

Before designing or changing code, inspect the repository, identify the primary task, choose a layout archetype, state the shell and scrolling model, reuse sound primitives, implement responsive behavior, verify realistic states and record intentional deviations.

When the system changes, update the decision log, normative tokens, affected documentation, agent skills and changelog together.

## 1. Identity and principles

Warm Paper Workbench is minimal in visual noise, not minimal in capability. It combines warm cream surfaces, compact controls, strict local geometry, progressive disclosure and carefully restrained depth.

**Personality:** warm, calm, tactile, precise, compact, capable, legible and deliberate.

### Non-negotiable principles

1. **Calm density.** Operational work may be dense, while navigation and supporting chrome breathe.
2. **Stable location.** Keep the shell and object context stable while the work changes representation.
3. **Scope-driven placement.** A control's position reveals whether it is global, object-level, view-level, local, metadata or temporary.
4. **Warm paper surfaces.** Prefer cream canvas and warm-white paper over cool blue-gray backgrounds.
5. **Tactile restraint.** Use shallow warm bevel shadows on controls and subtle paper shadows on meaningful cards. Do not stack shadows indiscriminately.
6. **Integrated chrome.** A toolbar, body and footer inside one container are one object with one outer border, radius, clipping owner and shadow.
7. **Progressive disclosure.** Keep rows and cards concise; reveal detail through previews, inspectors, menus and full pages.
8. **Local geometry.** Soft dividers do not mean loose layout. Repeated widths, baselines and metadata zones remain strict.
9. **Fluid agency.** Direct manipulation responds immediately, remains interruptible and preserves velocity.
10. **Simplicity, not feature removal.** Show the common path clearly and keep advanced paths nearby.

The system is not a sparse marketing style, a card-everything dashboard, flat minimalism, rustic decoration or a direct copy of Linear, Shopify or Apple.

## 2. Visual foundation

### Color

The canonical palette lives in `DESIGN.md` and `tokens/tokens.css`.

- Cream canvas: `#F3EEE5`.
- Warm-white paper: `#FFFDF8`.
- Primary text: `#2B2723`.
- Secondary text: `#675F57`.
- Muted text: `#766E65`.
- Terracotta accent: `#9B4F32`.
- Soft borders use warm brown at approximately 10–15% opacity.
- Structural edges use approximately 22% opacity.

Use color as a small semantic accent. Avoid large saturated status backgrounds. Project-specific accents may vary, but the warm neutral base remains.

### Typography

Use `Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

- Page titles: 22–28px / 600.
- Section titles: 18–22px / 600.
- Subsections: 14–16px / 600.
- Narrative body: 15–16px / 400, line-height 1.45–1.55.
- Application body: 14–15px / 400.
- Operational rows and controls: 13–14px / 400–500.
- Metadata and chips: 12–13px / 400–500.
- Use tabular numerals for dates, counts, progress and metrics.

Use sentence case. Avoid decorative display fonts, tiny low-contrast text and excessive bold weights. Keep long-form copy inside a 720–800px measure. Adjust tracking and leading by size rather than applying one value to the entire system.

### Spacing and shape

Use a 4px fine grid with an 8px dominant macro rhythm:

```text
4 → 8 → 12 → 16 → 24 → 32 → 48 → 64
```

- Compact navigation and icon controls: 28px.
- Default buttons and inputs: 32px.
- Emphasis controls and group headers: 36px.
- Location bars, view bars and comfortable operational rows: 44px.
- Radii: 4px micro, 6px compact, 8px standard, 10px paper, 12px shell, full for pills and avatars.

Owner avatars are 20px in properties and dense rows, 16px in compressed stacks and 28px in identity contexts. Use circular clipping and initials as fallback.

## 3. Depth, borders and paper model

Persistent structure stays quiet. Tactile controls and temporary layers receive tiered depth.

- **Level 0:** canvas, rows, navigation and flat operational regions — no shadow.
- **Level 1:** meaningful paper panels and cards — restrained paper shadow.
- **Level 2:** buttons, selects and segmented controls — inset bevel plus tiny lift.
- **Level 3:** menus, popovers, previews and dialogs — floating shadow.

Canonical shadow recipes are executable in `tokens/tokens.css`.

A shadow belongs to the highest meaningful surface in a local stack. Nested cards do not each receive independent lift.

### Integrated paper containers

```text
Paper shell: one owner of border, radius, clipping and shadow
├── Toolbar: integrated top region; no independent radius or shadow
├── Body: primary content
└── Footer: integrated bottom region; no independent radius or shadow
```

There is no gap between toolbar, body and footer. Internal corners are square. Use a soft divider or a slight tonal shift. Let dense rows bleed to the shell edge when that improves scanning.

## 4. Application layout

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
- Current object or location: location bar.
- Current representation: view bar.
- Content-local: inside the affected module.
- Structured metadata: right rail.
- Temporary choice: popover or command surface above the layout.

Never combine all scopes into one toolbar.

### Density zones

- Navigation: low to moderate.
- Document and settings pages: moderate.
- Lists, boards, timelines and queues: high.
- Authentication and focused empty states: low.
- Conversations: moderate.

Compress the work; relax the navigation.

### Archetype A: centered action canvas

Use for authentication, onboarding, agent welcome and focused setup.

- Authentication: approximately 320px.
- Settings: approximately 640px.
- Agent or focused stack: approximately 712px.
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

Keep long-form content mostly unboxed. Box independent stateful modules such as updates, comments, charts, progress and editable property groups. Convert a rail to an overlay before the reading measure falls below roughly 640px.

Critical properties may appear once as a concise orientation summary and again as fully labelled editable rows in the inspector.

### Archetype C: full operational canvas

List anatomy:

```text
status | identifier | title | flexible space | metadata | owner | date
```

Use 36px group headers and approximately 44px rows. Align repeated metadata rather than drawing a box around each cell.

Boards use stable 300–340px columns, target 320px, and preserve horizontal scrolling. Cards are summaries, not miniature detail pages.

Timelines use a fixed 288–320px semantic pane, target 304px, beside a horizontally scrollable temporal canvas.

### Archetype D: feed or conversation

- Chat composer: pinned to the bottom of the conversation column.
- Issue reply: after issue body and activity.
- Project update composer: above historical updates.
- Update the smallest region capable of expressing the state change.

### Archetype E: settings

Use persistent category navigation and a centered 620–680px content column. Avoid full-width forms and unnecessary card grids.

### Responsive transformation

- `≥1280px`: retain sidebar and docked rails.
- `1024–1279px`: overlay or hide a rail when it harms primary content.
- `768–1023px`: collapse sidebar into a drawer and move low-priority actions into overflow.
- `<768px`: use one primary column, scroll tabs, boards and timelines, and enlarge touch targets.

Change representation before mechanically shrinking desktop geometry.

## 5. Components

### Buttons

- Compact: 28px.
- Default: 32px.
- Emphasis: 36px.
- Use approximately 10px horizontal padding, 6px icon gap and 6–8px radius.
- Use at most one dominant primary action in a local region.
- Pressed state moves down 1px and becomes more inset.

### Cards and panels

Use a card for one coherent task or information set. Default radius is 8–10px with a soft border and paper shadow. Interactive cards may rise by no more than 1px. Do not build a dashboard of equally weighted cards by default.

### Navigation, tabs and chips

Sidebar rows are 28px high with 16px icons. Inactive rows have no visible container. Active rows use the selected paper tone. Local tabs are compact pills. Chips are approximately 24px high; prefer a colored dot or icon over a large saturated fill.

### Forms and composers

Inputs are 32–36px; search may be 40–44px. Focus uses a narrow warm accent outline. Labels remain explicit in settings and complex forms. Multiline composers keep secondary actions left and send right.

### Lists, boards, timelines and inspectors

Use stable trailing metadata order, quiet selection and no unnecessary cell borders. Preserve board and timeline horizontal scrolling. Inspectors align with the body region they describe and use muted labels with primary values.

### Menus and previews

Menus float above the current page without reflow. A common menu is around 240px wide with 32px rows and a floating shadow. Quick previews preserve list or board position.

## 6. Interaction and motion

Preserve filters, selection, ordering, scroll position and context when switching representations.

Use progressive disclosure:

```text
Row or card
→ quick preview
→ docked inspector or split view
→ full object view
→ fullscreen editing
```

Motion ranges:

- Press feedback: 80–120ms.
- Hover and small state changes: 100–140ms.
- Menu and popover: 120–180ms.
- Inspector open: 160–220ms.
- View transition: 150–240ms.
- Default spring: critically damped with a 0.3–0.4 second response.
- Momentum spring: modest under-damping with the same response range.

Interaction rules:

1. Respond on pointer-down.
2. Track direct manipulation 1:1 and preserve grab offset.
3. Make gesture motion interruptible and start from the current presentation value.
4. Hand off release velocity and project momentum for flickable objects.
5. Enter and exit along symmetric paths and anchor transient surfaces to their source.
6. Prefer transform and opacity on frame-critical paths.
7. Use progressive resistance selectively at physical boundaries.
8. Provide reduced-motion, reduced-transparency and increased-contrast equivalents.
9. Align motion, sound and haptics to the same causal event and use them sparingly.

See `docs/motion/APPLE_FLUID_INTERACTION.md` for the complete motion model and `docs/motion/ANIMATION_AUDIT_WORKFLOW.md` for audit behavior.

Dense professional views should support keyboard operation. Command palettes and shortcuts expose advanced capability without permanently enlarging toolbars.

Selection and bulk actions:

- Selection, hover and focus remain distinct.
- Multi-select exposes a count and uses an integrated contextual bar rather than a detached decorative card.
- Destructive actions are separated from routine actions and offer undo when safe.

Drag, resize and feedback:

- Use explicit drag affordances when needed and preserve a keyboard alternative.
- Show insertion targets with a narrow accent line or quiet destination highlight.
- Resizers use structural edges and enforce useful minimums and maximums.
- Use optimistic updates when safe, preserve geometry while pending and keep local feedback local.

## 7. Accessibility

- Meet WCAG AA contrast for text and essential non-text boundaries.
- Provide visible keyboard focus.
- Use semantic elements, labels, headings, landmarks and table structure.
- Pointer targets should be at least 24×24 CSS pixels or have sufficient spacing; touch targets are larger.
- Do not communicate state by color alone.
- Preserve logical reading order when rails become overlays or single-column layouts.
- Compact visual controls may have larger invisible hit areas.
- Reduced motion preserves useful feedback while removing large movement and overshoot.

## 8. Content and language

The voice is direct, calm, specific and operational.

- Use verbs for actions and nouns for destinations.
- Use sentence case.
- Avoid vague labels such as “Manage” or “Advanced” when a specific label fits.
- Place title first, then concise purpose, compact properties and detailed modules.
- Truncate optional context before critical identity, status or deadline.

Empty-state formula:

```text
What is empty
Why it matters, when clarification is useful
One primary next action
Optional secondary discovery link
```

## 9. Agent implementation contract

Before changing code:

1. Read instructions, requirements, `DESIGN.md` and accepted decisions.
2. Inspect shell, routes, components, tokens, states and responsive behavior.
3. Identify the primary task and comparison needs.
4. Choose a layout archetype and state why.
5. Define shell, columns, rails, scrolling and transient layers.
6. Reuse sound primitives and preserve behavior.

Implementation sequence:

1. Establish semantic tokens.
2. Build or validate shell and control-scope placement.
3. Implement body layout and responsive transformations.
4. Build integrated paper containers.
5. Apply compact controls, states, focus and metadata.
6. Test realistic content, long labels, empty, error, loading and constrained widths.
7. Run formatting, linting, type checks, tests and visual review.
8. Record deviations and proposed additions.

Create a new system rule only when a pattern recurs, needs a shared token or primitive, resolves conflicting guidance or changes how future agents should classify and build work. Keep one-off preferences local until repetition proves they belong in the system.

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
Motion and interruption model:
Responsive transformation:
Accessibility risks:
Intentional deviations:
New system decision required: yes / no
```

## 10. Failure patterns

Reject or correct:

- A generic dashboard composed entirely of equally weighted cards.
- A separate rounded toolbar floating above a separate rounded content card.
- A footer rendered as an unrelated slab.
- A pure-white canvas with cool gray borders and no warmth.
- Oversized 40–48px desktop buttons everywhere.
- Strong shadow on every nested component.
- Full-width narrative text.
- Board columns or timelines compressed to avoid scrolling.
- One giant toolbar containing every scope.
- Decorative minimalism that removes useful controls.
- Large saturated status backgrounds.
- “Gridless” layouts with weak alignment.
- Gesture animations that cannot be interrupted.
- Motion without a reduced-motion equivalent.

## 11. Governance

Accepted decisions live in `docs/DECISIONS.md`. Every durable change records the problem, decision, alternatives, rationale, affected tokens and migration notes.

Research backlog:

- Dark mode.
- Mobile shell and touch density.
- Data visualization.
- Icon system.
- Component-specific motion fixtures.
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
- Toolbar, body and footer read as one paper object.
- Internal borders are soft; structural edges and focus are stronger.
- Feature richness is available through progressive disclosure.
- Motion is immediate, interruptible and accessible.
- Long content, narrow widths, loading, empty and error states are tested.
- Keyboard, contrast, target size and non-color state cues are verified.
- Formatters, linters, type checks, tests and visual review pass.

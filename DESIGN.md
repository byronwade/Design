---
version: alpha
name: Warm Paper Workbench
description: A warm, compact, tactile and feature-rich application system with Linear-like layout discipline, cream paper surfaces, integrated container chrome and fluid interaction guidance.
colors:
  primary: "#2B2723"
  on-primary: "#FFFDF8"
  secondary: "#675F57"
  tertiary: "#9B4F32"
  on-tertiary: "#FFFDF8"
  canvas: "#F3EEE5"
  surface: "#FFFDF8"
  surface-subtle: "#FAF5EC"
  surface-hover: "#F5EEE3"
  surface-selected: "#EDE3D5"
  border: "rgba(67, 52, 38, 0.15)"
  border-strong: "rgba(67, 52, 38, 0.22)"
  text-muted: "#766E65"
  accent-soft: "#F4E5DB"
  success: "#356548"
  success-soft: "#E8F2E7"
  warning: "#7A5417"
  warning-soft: "#FFF1D6"
  danger: "#9C3C32"
  danger-soft: "#F9E4E0"
  info: "#3E6670"
  info-soft: "#E5F0F1"
  overlay: "rgba(43, 39, 35, 0.18)"
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 28px
    fontWeight: 600
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 24px
    fontWeight: 600
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 15px
    fontWeight: 600
    lineHeight: 20px
  body-lg:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
  body-sm:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  label-md:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
  label-sm:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
  caption:
    fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  paper: 10px
  shell: 12px
  full: 9999px
spacing:
  none: 0px
  micro: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  app-inset: 8px
  sidebar-width: 240px
  utility-strip-height: 36px
  location-bar-height: 44px
  view-bar-height: 44px
  nav-item-height: 28px
  control-compact: 28px
  control-default: 32px
  control-emphasis: 36px
  chip-height: 24px
  group-header-height: 36px
  list-row-height: 44px
  reading-column-width: 760px
  settings-column-width: 640px
  agent-column-width: 712px
  auth-column-width: 320px
  project-rail-width: 384px
  issue-rail-width: 320px
  utility-rail-width: 208px
  board-column-width: 320px
  timeline-label-width: 304px
components:
  app-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
  workspace-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.shell}"
    padding: "{spacing.none}"
  global-sidebar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.secondary}"
    width: "{spacing.sidebar-width}"
    padding: "{spacing.xs}"
  location-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    height: "{spacing.location-bar-height}"
    padding: "{spacing.md}"
  view-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    height: "{spacing.view-bar-height}"
    padding: "{spacing.xs}"
  sidebar-nav-item:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    height: "{spacing.nav-item-height}"
    rounded: "{rounded.sm}"
  sidebar-nav-item-active:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    height: "{spacing.nav-item-height}"
    rounded: "{rounded.sm}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    height: "{spacing.control-default}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    height: "{spacing.control-default}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    height: "{spacing.control-emphasis}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  paper-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.paper}"
    padding: "{spacing.md}"
  list-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    height: "{spacing.list-row-height}"
    padding: "{spacing.sm}"
  board-column:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.primary}"
    width: "{spacing.board-column-width}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs}"
  board-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    width: "{spacing.board-column-width}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  project-inspector:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    width: "{spacing.project-rail-width}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  issue-inspector:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    width: "{spacing.issue-rail-width}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
    height: "{spacing.chip-height}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  avatar-owner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    size: 20px
    rounded: "{rounded.full}"
  popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    width: 240px
    rounded: "{rounded.shell}"
    padding: "{spacing.xs}"
---

## Overview

Warm Paper Workbench is a living application design system for professional, information-dense software. It combines a stable Linear-like shell with warm cream surfaces, compact controls, restrained Shopify-derived tactile shadows and fluid, interruptible motion.

The system is minimal in visual noise, not minimal in capability. Advanced functions remain available through inspectors, saved views, previews, command surfaces, contextual menus, keyboard shortcuts and progressive disclosure.

The central rule is: **keep location stable, let the work change shape and reveal secondary context beside the work without allowing it to dominate.**

Agents must read `docs/DECISIONS.md` and `docs/DESIGN_SYSTEM.md` before introducing a durable rule. Research documents explain the basis for decisions but do not override accepted tokens.

## Colors

Use a cream canvas and warm-white paper instead of cool blue-gray enterprise surfaces.

- Primary text is warm near-black, not pure black.
- Secondary and muted text use warm gray-browns.
- Terracotta is the single dominant interaction accent.
- Semantic colors appear as compact dots, icons, labels, progress marks and soft chips rather than large saturated blocks.
- Internal borders are warm and translucent. Structural edges, resizers and focus indicators are stronger.
- The light theme is normative. A dark theme should be authored separately rather than mechanically inverted.

## Typography

Use Inter with native-system fallbacks. Typography must remain clean, compact and easy to read.

- Page titles: 22–28px, semibold, slightly tightened.
- Section titles: 18–22px, semibold.
- Narrative body: 15–16px with 1.45–1.55 line height.
- Application body: 14–15px.
- Operational rows and controls: 13–14px.
- Metadata and chips: 12–13px.
- Use tabular numerals for dates, counts, percentages and metrics.
- Use sentence case and direct labels.
- Tracking is size-specific: tighten large headings, keep body near neutral and permit slight positive tracking for very small text.
- Keep sustained reading within a 720–800px measure.

## Layout

### Application shell

```text
Outer warm canvas
├── Global navigation: 240px
├── Inset work surface: 8px inset, 12px radius
│   ├── Optional location bar: 44px
│   ├── Optional view bar: 44px
│   └── Task-specific body
└── Optional global utility strip: 36px
```

The sidebar belongs to the canvas. The primary workspace is one inset paper surface. Keep the shell stable while the body changes between document, list, board, timeline, settings and conversation representations.

Place controls by scope:

| Scope | Normal location |
| --- | --- |
| Application-wide | Sidebar, shell or utility strip |
| Current object or location | Location bar |
| Current representation | View bar |
| Content-local | Inside the affected module |
| Structured metadata | Right-side rail |
| Temporary choice | Popover or command surface above the layout |

Never combine every scope into one giant toolbar.

### Density

- Navigation: low to moderate density.
- Document and settings pages: moderate density.
- Lists, boards, timelines and queues: high density.
- Authentication and focused empty states: low density.
- Conversations: moderate density.

Compress the work and relax the navigation. Do not make every region equally dense or equally spacious.

### Body archetypes

**Centered action canvas:** authentication 320px, settings 640px and agent or focused-action stacks 712px. Do not stretch single-task content across the work surface.

**Document plus rail:** center a 720–800px reading column in the primary region. Use a 384px rich project rail, 320px compact issue inspector or 208px utility rail. Convert a docked rail to an overlay before the reading column falls below roughly 640px.

**Full operational canvas:** lists, boards and timelines use nearly all available body width. Lists use 36px group headers and approximately 44px rows. Boards use stable 300–340px columns, target 320px, and preserve horizontal scrolling. Timelines use a fixed 288–320px semantic pane, target 304px, beside a horizontal temporal canvas.

**Feed or conversation:** place the composer according to the work model. Chat replies pin to the bottom, issue discussion follows the issue body and project status updates appear above history.

**Settings:** use persistent category navigation and a centered 620–680px content column. Avoid full-width forms and indiscriminate card grids.

### Progressive disclosure

```text
Row or card
→ quick preview
→ docked inspector or split view
→ full object view
→ fullscreen editing
```

Rows and cards are summaries. Do not make each one a miniature detail page.

### Responsive transformation

- At 1280px and above, retain the 240px sidebar and permit docked rails.
- From 1024–1279px, overlay or hide a rail when it harms primary content.
- From 768–1023px, collapse navigation into a drawer and move lower-priority actions into overflow.
- Below 768px, use one primary column, scroll local tabs and preserve board or timeline horizontal scrolling.
- Change representation before mechanically shrinking desktop geometry.

## Elevation & Depth

Warm Paper Workbench is not flat. It uses shallow, warm, functional depth.

- Canvas and flat operational regions use no external shadow.
- Meaningful cards and paper panels use a restrained paper shadow.
- Buttons, compact selects and segmented controls use a warm inset bevel adapted from Shopify's tactile control model.
- Hoverable cards may rise by no more than 1px.
- Menus, popovers, previews and dialogs use the strongest floating shadow because they overlap the current work surface.
- Rows, navigation items, timeline tracks and nested regions inside a paper shell normally remain shadowless.

Canonical shadow values live in `tokens/tokens.css`.

A shadow belongs to the highest meaningful surface in a local stack. Never stack paper shadows through nested cards.

### Integrated paper containers

A toolbar, body and footer inside one container are one paper object:

```text
Paper shell: one border, radius, clipping owner and shadow
├── Toolbar: integrated top region; no independent radius or shadow
├── Body: primary content
└── Footer: integrated bottom region; no independent radius or shadow
```

There is no gap between the three regions. Internal corners remain square. Use a soft divider or a 2–4% tonal shift. A toolbar or footer must not look like an unrelated floating card.

Persistent page structure is mostly opaque. Translucent material is an exception for floating chrome or sheets when content moving underneath improves spatial understanding. Do not stack translucent surfaces.

## Shapes

- Workspace surface: 12px radius.
- Integrated paper shells: 10px.
- Panels, cards, inputs and popovers: 8px by default.
- Compact controls and active navigation: 6px.
- Micro-containers: 4px.
- Chips, tabs, status pills, icon buttons and avatars: full radius when appropriate.
- Avoid radii above 16px except deliberate pills.

Icons are normally 16px inside 28–32px controls. Owner avatars are 20px in properties and dense rows, 16px in compressed stacks and 28px in identity contexts. Use circular clipping and initials as fallback.

## Components

### Navigation and headers

Sidebar rows are 28px high with 16px icons. Inactive rows have no visible container. Hover uses the warm hover surface. Active rows use the selected paper surface without flooding the row with accent color.

The location bar contains identity and object-level actions. The view bar contains tabs, filters, display options, grouping, ordering and inspector toggles. Omit a bar when its semantic layer does not exist.

### Buttons and controls

- Compact: 28px.
- Default: 32px.
- Emphasis: 36px.
- Horizontal padding: approximately 10px.
- Icon gap: 6px.
- Radius: 6–8px.
- Use at most one dominant primary action in a local region.
- Pressed state moves down 1px and becomes more inset.
- Compact visual controls may have larger invisible hit areas.

### Cards and panels

Use cards for one coherent task or information set. Cards use a soft border, 8–10px radius and restrained paper shadow. Interactive cards may lift by no more than 1px. Prefer lists, documents, timelines or flat operational regions when those scan better than a card grid.

### Lists

A typical row is:

```text
status | identifier | title | flexible space | metadata | owner | date
```

Maintain stable trailing metadata order. Use repetition and alignment instead of vertical cell borders or zebra striping. Selection, hover and keyboard focus must remain distinct.

### Boards

Use stable 320px columns with horizontal scrolling. Cards show identity, title, status and only the few properties needed for comparison. Descriptions and full activity stay in previews or detail views. Empty columns may remain empty.

### Timelines

Keep the semantic pane fixed and scroll time horizontally. Align labels and bars to shared row baselines. Date grids and dependencies remain secondary to the primary bars. Horizontal scrolling is an intentional interaction, not a failure.

### Inspectors

Right-side rails belong to the body region they describe. Rich rails support charts, milestones and project state. Compact rails support object properties. Labels are muted; values are primary. Do not let the rail destroy the reading measure.

### Menus and transient layers

Menus float above the existing page without causing reflow. A common menu is about 240px wide with 32px rows, 8px padding and a 12px outer radius. Anchor the origin to the trigger. Preserve the current page behind the layer so spatial context remains visible.

### Motion and direct manipulation

- Respond on pointer-down.
- Track dragged content 1:1 and preserve the grab offset.
- Gesture-driven animation remains interruptible and starts from the current on-screen value.
- Default physical motion to a critically damped spring with a 0.3–0.4 second response.
- Add modest bounce only when the gesture carried momentum.
- Hand off release velocity and project a flick's resting endpoint.
- Enter and exit along symmetric paths.
- Prefer transform and opacity for frame-critical motion.
- Under reduced motion, replace large movement and overshoot with short cross-fades or immediate changes while preserving useful feedback.

See `docs/motion/APPLE_FLUID_INTERACTION.md` for detailed interaction guidance and `docs/motion/ANIMATION_AUDIT_WORKFLOW.md` for the audit process.

### Content and accessibility

Use direct, calm, specific language. Use verbs for actions and nouns for destinations. Every screen should answer where the user is, where they can go, what is present and how to leave.

Meet WCAG AA contrast, expose visible keyboard focus, use semantic structure and labels, avoid color-only state and preserve logical reading order when rails become overlays. Pointer targets should be at least 24×24 CSS pixels or have sufficient spacing; touch targets should be larger.

## Do's and Don'ts

- **Do** preserve the global shell and object context while changing representation.
- **Do** place controls according to scope.
- **Do** concentrate density where people compare, sort, triage and scan.
- **Do** use progressive disclosure for advanced features.
- **Do** preserve board and timeline horizontal scrolling.
- **Do** use warm paper surfaces, compact tactile controls and restrained depth.
- **Do** keep toolbar, body and footer visually integrated.
- **Do** make gesture motion immediate, interruptible and accessible.
- **Do** test long content, loading, empty, error and constrained-width states.

- **Don't** build a generic dashboard entirely from equally weighted cards.
- **Don't** render a separate rounded toolbar above a separate rounded content card.
- **Don't** use pure-white canvas, cool gray borders or multiple competing accents as defaults.
- **Don't** use oversized 40–48px desktop buttons everywhere.
- **Don't** put a strong shadow on every nested component.
- **Don't** make long-form content full width.
- **Don't** compress boards or timelines merely to avoid scrolling.
- **Don't** put every possible action into one toolbar.
- **Don't** remove useful functionality in the name of minimalism.
- **Don't** use glass, gradients or motion as structural substitutes.

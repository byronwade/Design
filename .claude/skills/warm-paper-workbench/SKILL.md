---
name: warm-paper-workbench
description: Design and implement compact, warm, feature-rich application interfaces with Linear-like layout discipline, cream paper surfaces, Shopify-derived bevel shadows, soft borders, integrated toolbars and footers, readable typography, and fluid interaction. Use for SaaS products, dashboards, admin tools, project and issue systems, settings, data-dense views, and agent interfaces.
---

# Warm Paper Workbench

Use this skill for visual design, interaction design, frontend implementation, refactoring, or interface review.

## Read the system first

Before changing an interface, read:

1. `/DESIGN.md` — canonical tokens and normative rationale.
2. `/docs/DECISIONS.md` — accepted design decisions.
3. `/docs/DESIGN_SYSTEM.md` — complete operating guide.
4. `/tokens/tokens.css` — executable values.
5. `/docs/layout/LINEAR_LAYOUT_RESEARCH.md` when layout structure is relevant.
6. `/docs/motion/APPLE_FLUID_INTERACTION.md` when interaction or motion is relevant.

A current project brief or direct user instruction can override the system. Record durable deviations as proposed decisions rather than silently creating a parallel system.

## Design objective

Build a calm professional instrument: visually minimal, operationally dense, warm, tactile, precise, and extremely feature rich.

The interface should use:

- Warm cream canvas and warm-white paper surfaces.
- Clean Inter or native-system typography.
- Compact desktop controls: 28px compact, 32px default, 36px emphasis.
- Warm Shopify-derived inset bevel shadows on tactile controls.
- Restrained paper shadows on meaningful cards and panels.
- Very soft warm borders inside the interface.
- Stronger borders only for app-frame edges, focus, resizers, toolbars, inspectors, or selected structural boundaries.
- Integrated container chrome: toolbar, body, and footer read as one continuous sheet of paper.
- Linear-like layout discipline: stable shell, layered headers, configurable work surfaces, optional inspectors, and progressive disclosure.
- Immediate, interruptible interaction motion that preserves agency.

Do not create a sparse marketing layout, a generic equal-card dashboard, a visually flat interface with no depth, or a feature-poor interpretation of minimalism.

## Inspect before changing code

1. Read repository instructions and inspect the current shell, routes, components, tokens, typography, state model, and responsive behavior.
2. Identify existing component primitives and reuse sound ones.
3. Preserve framework conventions, behavior, accessibility, and tests unless replacement is explicitly requested.
4. Add shared tokens and primitives before scattering one-off values.
5. Identify the primary user task, comparison needs, and high-frequency actions.
6. State the chosen layout archetype before implementation.

## Choose the layout archetype

### Centered action canvas

Use for authentication, onboarding, agent welcome, and focused setup.

- Authentication target: 320px.
- Settings target: 640px.
- Agent or focused-action stack: 712px.
- Keep the content narrow and centered.
- Use negative space deliberately.
- Do not stretch a single task across the work surface.

### Document plus rail

Use for projects, issues, records, initiatives, specifications, and long-form configuration.

```text
Body
├── Primary region
│   └── Centered reading column: 720–800px; target 760px
└── Optional right rail
    ├── Rich rail: 384px
    ├── Compact inspector: 320px
    └── Utility rail: 208px
```

- Keep titles, summaries, descriptions, and long-form copy mostly unboxed.
- Box independent stateful modules such as updates, comments, charts, progress, milestones, and editable property groups.
- Critical properties may appear in a compact orientation summary and again in the full editable rail.
- Convert the rail to an overlay before the reading column falls below roughly 640px.

### Full operational canvas

Use for lists, tables, boards, timelines, queues, triage, and analytical workspaces.

- Use most of the available body width.
- Keep comparison data compact and aligned.
- Do not force operational data into a narrow reading column.

List row anatomy:

```text
status | identifier | title | flexible space | metadata | owner | date
```

List defaults:

- Group header: 36px.
- Row: approximately 44px.
- Keep trailing metadata order stable.
- Use alignment rather than visible vertical cell borders.

Board defaults:

- Stable 300–340px columns; target 320px.
- Preserve horizontal scrolling.
- Cards are summaries, not miniature detail pages.
- Keep descriptions and full activity out of cards by default.
- Permit empty columns.

Timeline defaults:

- Fixed 288–320px semantic pane; target 304px.
- Horizontally scroll the temporal canvas.
- Keep dependencies and date grids secondary to primary bars.

### Feed or conversation

Place the composer according to the work model:

- Chat reply: pinned to the bottom of the conversation column.
- Issue discussion: after issue body and activity.
- Project status update: above historical updates.

Update the smallest region capable of expressing a state change.

### Settings

Use persistent category navigation and a centered 620–680px content column. Avoid full-width forms and unnecessary card grids.

## Application shell

Use this desktop frame as the default target:

```text
Outer warm canvas
├── Global sidebar: 240px
├── Inset workspace surface: 8px inset, 12px radius
│   ├── Optional location bar: 44px
│   ├── Optional view bar: 44px
│   └── Task-specific body
└── Optional global utility strip: 36px
```

Keep the shell stable while the body changes representation.

Place controls according to scope:

- Application-wide controls: global sidebar, shell, or utility strip.
- Current-object identity and actions: location bar.
- Filters, grouping, ordering, display mode, and inspector toggles: view bar.
- Content-local actions: inside the affected module.
- Structured metadata: optional right rail.
- Temporary choices: popovers and command menus above the layout.

Never combine every scope into one oversized toolbar.

## Density rules

Use density by task:

- Global navigation: low to moderate.
- Document and settings pages: moderate.
- Lists, boards, timelines, and queues: high.
- Authentication and empty states: low.
- Conversations: moderate.

Compress the work and relax the navigation. Do not make the entire interface equally dense or equally spacious.

## Tokens, color, and type

Use the canonical values in `/tokens/tokens.css`. Do not invent a parallel cool-gray palette or unrelated shadow scale.

Key visual rules:

- Canvas: warm cream.
- Primary surfaces: warm white paper.
- Text: warm near-black with muted brown-gray secondary values.
- Accent: restrained terracotta.
- Internal borders: warm and translucent.
- Structural edges and focus: stronger than internal dividers.
- Semantic color: compact dots, icons, labels, and soft chips rather than large saturated fields.

Typography:

- Dense labels and metadata: 12–13px.
- Controls and operational rows: 13–14px.
- Normal application copy: 14–15px.
- Narrative copy: 15–16px with 1.45–1.55 line height.
- Section titles: 18–22px.
- Page titles: 22–28px, semibold, restrained tracking.
- Use tabular numerals for dates, counts, percentages, and metrics.
- Use sentence case and direct labels.

## Shadow system

Use the canonical shadow variables from `/tokens/tokens.css`.

- Buttons, compact selects, and segmented controls: `--shadow-control`.
- Hovered controls: `--shadow-control-hover`.
- Primary buttons: `--shadow-control-primary`.
- Persistent cards and panels: `--shadow-paper`.
- Hoverable cards: `--shadow-paper-hover`, with no more than 1px upward movement.
- Menus, popovers, dialogs, and previews: `--shadow-float`.
- Rows, navigation items, timeline tracks, and flat operational regions: normally no external shadow.

A shadow belongs to the highest meaningful surface in a local stack. Do not stack paper shadows through nested cards.

## Integrated paper containers

A toolbar, body, and footer inside one container must feel like one piece of paper.

```text
Paper shell: one border, one radius, one shadow, one clipping owner
├── Toolbar: integrated top section; square internal corners
├── Body: primary content
└── Footer: integrated bottom section; square internal corners
```

Rules:

- No gap between toolbar, body, and footer.
- No independent toolbar or footer shadow.
- No separate rounded rectangle around the toolbar or footer.
- The outer shell owns clipping, radius, border, and shadow.
- Use internal dividers or slight tonal changes.
- Let dense rows bleed to shell edges when useful instead of nesting another card.

## Compact controls

- Compact: 28px.
- Default: 32px.
- Emphasis: 36px.
- Typical horizontal padding: 10px.
- Icon gap: 6px.
- Radius: 6–8px.
- Use at most one visually dominant primary action in a local region.
- Pressed state moves down 1px and becomes more inset.
- Icon-only controls require accessible names and tooltips when meaning is not obvious.
- Compact visual controls may have larger invisible hit areas.

## Cards, lists, boards, and rails

Cards group one coherent task or information set. Avoid card grids when a list, document, board, timeline, or flat operational region scans better.

Rows and cards expose the minimum useful state. Additional detail belongs in previews, inspectors, or full pages.

Use progressive disclosure:

```text
Row or card
→ quick preview
→ docked inspector or split view
→ full object view
→ fullscreen editing
```

Right-side rails belong to the body region they describe. They are contextual, not a permanent third application column.

## Motion and interaction

Read `/docs/motion/APPLE_FLUID_INTERACTION.md` for detailed guidance.

Baseline rules:

- Respond on pointer-down.
- Track direct manipulation 1:1 and preserve the grab offset.
- Gesture-driven animation remains interruptible.
- Start redirected motion from the current presentation value, not a stale target.
- Hand off release velocity and project momentum for flickable objects.
- Use a critically damped spring with approximately 0.3–0.4 second response for normal physical repositioning.
- Use modest under-damping only when the preceding action carried momentum.
- Enter and exit along symmetric paths.
- Anchor menus, sheets, and previews to their source.
- Prefer transform and opacity on frame-critical paths.
- Under reduced motion, replace large movement and overshoot with short cross-fades or immediate changes while preserving useful feedback.

Do not animate high-frequency keyboard actions merely for decoration. Do not block input until an animation finishes.

## Feature richness without clutter

Use compact tabs, chips, icon buttons, keyboard shortcuts, saved views, previews, inspectors, contextual menus, and command palettes.

- Keep the primary reading or scanning path dominant.
- Reveal advanced options contextually.
- Keep row and card payloads concise.
- Align repeated metadata into predictable zones.
- Use color as a small semantic accent rather than a large background.
- Preserve horizontal scrolling for boards and timelines.
- Preserve filters, grouping, selection, ordering, and context when switching representations.

## Responsive behavior

Change representation rather than mechanically shrinking desktop geometry.

- At 1280px and above, keep the 240px sidebar and permit docked rails.
- At 1024–1279px, overlay or hide a rail when it harms primary content.
- At 768–1023px, collapse the sidebar into a drawer and move low-priority actions into overflow.
- Below 768px, use one primary column, scroll local tabs, and preserve board or timeline horizontal scrolling.
- Increase hit areas for touch while retaining compact visual controls.

## Accessibility and verification

Before finishing:

1. Run the repository formatter, linter, type checker, and relevant tests.
2. Render or launch the interface when tooling permits.
3. Check one wide desktop width and one constrained width.
4. Verify semantic headings, labels, landmarks, logical reading order, keyboard focus, and keyboard operation.
5. Keep pointer targets at least 24×24 CSS pixels or provide sufficient spacing; use larger targets for touch.
6. Maintain WCAG AA text contrast and visible essential boundaries.
7. Do not communicate critical state through color or motion alone.
8. Verify reduced motion and reduced transparency behavior.
9. Confirm that no toolbar or footer appears to float separately from its parent paper shell.
10. Confirm that nested shadows have not created a stack of floating cards.
11. Confirm that advanced capability remains available without displaying every secondary control simultaneously.

## Failure patterns

Reject or correct:

- Generic dashboards composed entirely of equally weighted cards.
- A separate rounded toolbar floating above a separate rounded content card.
- A footer rendered as an unrelated slab.
- Pure-white canvas with cool gray borders and no warmth.
- Oversized 40–48px desktop buttons everywhere.
- Strong shadow on every nested component.
- Full-width narrative text.
- Board columns or timeline scales compressed to avoid scrolling.
- Multiple accent colors competing for attention.
- Decorative minimalism that removes useful controls.
- Heavy glass, gradients, or motion used as structural substitutes.
- Gesture animation that cannot be interrupted.
- Motion without a reduced-motion equivalent.

## Implementation response

When asked to implement, edit the code rather than returning design guidance only. Use existing components where sound, add shared primitives where needed, preserve behavior, and verify the running interface.

When asked to design or plan, state:

1. The selected layout archetype.
2. The shell, columns, rails, and scrolling model.
3. The surface hierarchy and shadow level of each region.
4. Compact control and typography choices.
5. The interaction and interruption model.
6. Responsive transformations.
7. Deliberate deviations from the system.

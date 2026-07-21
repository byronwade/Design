# Linear Layout Research

> **Research status:** This document records the layout evidence that informed Warm Paper Workbench. Canonical values and rules live in the repository root `DESIGN.md`, `docs/DESIGN_SYSTEM.md` and `docs/DECISIONS.md`.

## Research conclusion

The defining quality of Linear-like application layout is not a color palette, an 8px grid or a collection of minimalist components. It is a stable, low-salience application frame surrounding a configurable, information-dense work surface.

The shell establishes orientation. The body changes according to the task. Secondary information appears beside the work without taking over the interface. Density is concentrated where scanning and comparison matter and relaxed where reading or focused action matters.

A useful abstract model is:

```text
Application canvas
├── Persistent navigation
├── Inset work surface
│   ├── Location and object controls
│   ├── View and representation controls
│   └── Task-specific body
│       ├── Primary work
│       └── Optional contextual rail
└── Global utility region
```

## 1. Stable shell

The macro-layout behaves like an inverted L: persistent navigation on the left and application controls across the top frame the active content.

The shell acts as a fixed coordinate system. A person can move between issue lists, project overviews, boards, timelines, search results and settings without relearning where global navigation or object-level actions live.

The key effect is calm: content changes, but the frame rarely surprises the user.

### Reconstructed desktop targets

The supplied screenshots suggested these practical targets at a desktop viewport:

| Region | Approximate target |
| --- | ---: |
| Global sidebar | 240–244px |
| Main work-surface inset | 8px |
| Main work-surface radius | 12px |
| Location header | 44px |
| View or tab header | 40–44px |
| Global utility strip | 36px |
| Rich project or initiative rail | 380–384px |
| Compact issue-properties rail | 312–320px |
| Utility or hidden-columns rail | 190–208px |
| Document reading column | 720–800px |
| Settings column | 632–640px |
| Agent action stack | 712px |
| Authentication form | 284–320px |

These measurements are reconstruction targets, not claims about private product tokens.

## 2. Location and representation are separate layers

A strong layout separates:

1. Where the user is.
2. How the current information is displayed.

The first header band communicates object identity, breadcrumb-like context and object-level actions. The second band contains tabs, filters, grouping, ordering, display options and layout switches.

This prevents the common enterprise pattern of placing navigation, sharing, filters, formatting, view switches and every object action inside one oversized toolbar.

```text
Location layer
├── Object or page identity
├── Breadcrumb context
└── Object-level actions

View layer
├── Tabs
├── Filter
├── Group and order
├── Display properties
└── List / board / timeline mode
```

Control position communicates scope. Warm Paper Workbench preserves this rule.

## 3. Representation changes in place

Lists, boards and timelines are best treated as alternate representations of the same underlying context, not unrelated destinations.

Changing representation should preserve as much as possible:

- Object context.
- Active filters.
- Grouping and ordering.
- Selection.
- Scroll position when feasible.
- Stable action placement.

The principle is: **change the representation of the work, not the user's location in the product.**

## 4. Contextual sidecars

The right side is not one permanent third column. It is a contextual expansion zone.

Different rails serve different roles:

- **Rich rail, roughly 384px:** charts, milestones, progress, project health and multi-row state.
- **Compact inspector, roughly 320px:** status, priority, owner, estimate, labels and dates.
- **Utility rail, roughly 208px:** hidden board states or view-management controls.

Rails are body-owned. Their top edge aligns with the region they describe:

- Project rails begin beneath project tabs.
- Issue rails begin beneath the issue location bar.
- Timeline inspectors begin beneath the date ruler.
- Board utility rails begin with the board columns.

When a rail opens, the user remains in place and the primary canvas contracts. If the main reading measure becomes too narrow, the rail should become an overlay.

## 5. Progressive disclosure

A dense professional interface remains readable by exposing detail in stages:

```text
Row or card
→ quick preview
→ docked inspector or split view
→ full object page
→ fullscreen editing
```

A list row or board card shows only enough information for identification, scanning and comparison. Full descriptions, activity, relationships and editable metadata belong deeper in the hierarchy.

This avoids making every card a miniature record page.

## 6. Density is selective

Calling this approach “high density” is incomplete. It uses different density zones.

- **High density:** issue lists, boards, timelines, triage, search results and operational dashboards.
- **Moderate density:** project documents, issue detail, activity, settings and conversations.
- **Low density:** authentication, onboarding and focused empty states.
- **Relaxed supporting density:** sidebar groups and inactive navigation.

The rule is: **compress the work; relax the navigation; reduce the prominence of everything that is not currently important.**

A uniformly compact interface becomes noisy. A uniformly spacious interface becomes inefficient.

## 7. Strong grid behavior without visible grid chrome

The system is not gridless. It is low-scaffolding.

It relies on:

- Sidebar icon and label columns.
- Repeated row-property alignment.
- Sticky group headers.
- Board columns and swimlanes.
- Timeline axes and shared row baselines.
- Metadata label-value pairs.
- Dashboard modules and split-pane boundaries.

The interface avoids a border around every cell. Structure comes from stable widths, repeated alignment, compact gaps, background changes and occasional horizontal separators.

The useful distinction is:

- Avoid a universal, visually dominant page grid.
- Use strong local geometry appropriate to the content.
- Hide unnecessary scaffolding.
- Preserve alignment, grouping, spacing and positional consistency.

## 8. Body-layout archetypes

### Centered action canvas

Used for authentication, focused setup and agent welcome states.

The composition deliberately refuses to fill the screen. A narrow fixed stack and generous negative space establish one clear action.

Observed targets:

- Authentication: roughly 320px.
- Settings: roughly 640px.
- Agent prompt and suggestion row: 712px.
- Three agent suggestion cards: approximately 232px each with 8px gaps.

### Document surface plus contextual rail

Used for projects, initiatives and issue detail.

The primary region behaves like a document:

```text
Icon
Title
Summary
Compact property summary
Resources
Stateful modules
Narrative description
Activity or discussion
```

The reading column remains roughly 720–800px and is centered inside the primary area, not merely pressed against navigation.

Narrative content is mostly unboxed. Stateful or interactive modules receive containers: progress, latest update, comment editor, properties, milestones and activity summaries.

Important properties may appear twice intentionally:

- Compactly under the title for rapid orientation.
- Fully labelled in the rail for inspection and editing.

### Full operational canvas

Lists, boards and timelines use almost all available body width because comparison is the primary task.

**List anatomy:**

```text
indicator | identifier | status | title | flexible space | metadata | owner | date
```

The title absorbs width changes. Trailing metadata remains predictably ordered. Group headers combine collapse state, category, count and creation action in one shallow strip.

**Board anatomy:**

Columns retain stable width instead of stretching a small number of columns across the viewport. Cards remain summaries. Empty columns may remain empty. Hidden or terminal states can stay represented in a narrow rail at the far edge so the workflow's spatial model remains understandable.

**Timeline anatomy:**

```text
Fixed semantic pane | Horizontally scrollable temporal pane
```

The semantic pane holds project identity and compact state. The temporal pane holds date rulers, grid lines, bars, milestones, dependencies and a current-date marker. Horizontal scrolling is preferred to compressing time until labels become unreadable.

### Feed and conversation

Composer placement follows the work model:

- Chat reply: pinned at the bottom.
- Issue discussion: after the issue body.
- Project status update: above the update history.

The layout updates the smallest region capable of expressing a state change.

### Settings

Settings use persistent category navigation and a centered content column. This prevents forms and integrations from becoming an oversized full-width marketplace grid.

## 9. Inset work surface

The main work area sits as a rounded surface inset from the surrounding canvas. Navigation blends into the outer canvas rather than appearing as another card.

This creates the strongest persistent depth relationship at the largest structural boundary. Smaller components therefore need less framing.

The inset surface:

- Makes the active work read as one coherent object.
- Lets navigation recede without a heavy divider.
- Provides stable clipping for lists, boards and timelines.
- Creates depth without turning every module into a floating card.

Warm Paper Workbench keeps this macro-surface idea but adds a warmer palette and restrained paper shadows.

## 10. Persistent depth versus transient depth

Persistent layout remains mostly planar, using surface tone, borders and alignment. Temporary decisions receive elevation.

Persistent regions:

- Canvas and shell.
- Navigation.
- Rows and timeline tracks.
- Integrated paper panels.

Transient regions:

- Menus.
- Popovers.
- Previews.
- Command surfaces.
- Dialogs.

The z-axis rule is: **persistent structure stays quiet; temporary decisions receive elevation.**

Warm Paper Workbench adds shallow tactile depth to controls and cards but preserves the same hierarchy by avoiding nested shadow stacks.

## 11. Reusable layout rules

1. Establish a stable global frame.
2. Separate page identity from representation controls.
3. Give the work surface visual priority.
4. Let data change representation in place.
5. Reveal detail progressively.
6. Treat side panels as optional context.
7. Use borders only where relationships would otherwise be ambiguous.
8. Concentrate density where comparison matters.
9. Preserve local state when switching layouts.
10. Personalize hierarchy through favorites, saved views and configurable properties rather than endlessly expanding navigation.
11. Change layout mode when width becomes inadequate.
12. Use a 4px fine grid and 8px dominant rhythm, then adjust optically.
13. Update the smallest layout region capable of expressing a state change.
14. Keep full-width operational canvases distinct from narrow reading surfaces.
15. Preserve horizontal scrolling when it is integral to the information model.

## 12. Corrected interpretation of common claims

- **“ProKit”** is best understood as a professional-tool philosophy: dense, clear and capability-first. It is not the formal name of every desktop component or token.
- **“8px grid”** is too strict. The evidence supports a 4px fine grid with an 8px dominant macro rhythm because 28px, 36px and 44px structures recur.
- **“No grids”** is misleading. The interface uses strong local grids while suppressing visible scaffolding.
- **“Radix UI”** describes a primitive layer for some controls, not the whole layout architecture.
- **“Muted gray prevents eye strain”** may be an effect, but the more defensible purpose is attention hierarchy.
- **“Glass creates the depth”** applies mainly to selected mobile or floating materials. Desktop layout hierarchy comes primarily from contrast, inset surfaces, soft boundaries, optional panels and selection state.

## 13. Warm Paper Workbench adaptation

The research is adapted rather than copied:

- Cool gray is replaced by cream canvas and warm-white paper.
- Flat controls receive subtle inset bevels.
- Meaningful cards receive restrained paper lift.
- Integrated toolbars and footers remain one paper object.
- Terracotta replaces indigo as the primary interaction accent.
- Apple-inspired interruptible motion strengthens direct manipulation without turning the system into a glass-heavy interface.
- Canonical behavior remains feature rich, keyboard capable, responsive and progressively disclosed.

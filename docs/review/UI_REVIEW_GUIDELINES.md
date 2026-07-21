---
description: Review application UI against Calm Capability, Warm Paper Workbench, motion, accessibility, and implementation quality
argument-hint: <file-or-pattern>
---

# Calm Capability UI Review Guidelines

Review the specified interface files against every applicable rule below. Treat [`DESIGN_PRINCIPLES.md`](../DESIGN_PRINCIPLES.md) as the judgment layer, [`DESIGN.md`](../../DESIGN.md) and [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) as the default visual and interaction system, and [`MOTION_PRINCIPLES.md`](../motion/MOTION_PRINCIPLES.md) as the motion contract.

Prioritize high-signal findings. State the issue, location, and smallest useful correction. Do not report subjective preference as a defect unless it conflicts with the declared product direction.

## Product fit and intent

- The surface has a clear person, task verb, context, and success condition.
- Major design decisions can be explained by task, risk, frequency, or domain.
- Repeated-work interfaces favor efficiency and muscle memory over first-impression theater.
- The interface feels calm, dense but breathable, technical without coldness, and powerful without noise.
- Domain language and data meaning shape the interface; it is not a generic SaaS template.
- At least one structural or interaction signature is visible in specific components.
- Generic card grids, decorative color, and marketing-scale whitespace are flagged.

## Structure, discovery, and capability

- Hierarchy remains clear without reading every label.
- Related content and actions are grouped by meaning.
- Basic actions are obvious.
- Advanced capability is discoverable and remains in reach.
- Progressive disclosure reduces incidental complexity without hiding required power.
- Bulk actions, automation, shortcuts, or reusable views exist where repeated work warrants them.
- No “everything all the time” surface without a clear prioritization strategy.
- No simplified flow that removes legitimate expert capability.
- Each visible region has a clear role.

## Workbench context

- Global navigation, local navigation, work, detail, and activity have stable roles.
- Workspace, location, active object, and relevant status are visible.
- The main surface does not float without surrounding product context.
- Contextual actions appear near the affected object.
- Global actions appear in a command center or consistent global location.
- Panels may collapse responsively without losing essential capability.
- Tabs, filters, search, pagination, and expanded panels are URL-backed when meaningful.
- Refresh, back/forward navigation, and new-tab behavior preserve expected state.

## Semantic HTML and accessibility

- Use `<button>` for actions and `<a>` or framework links for navigation.
- Do not attach click behavior to noninteractive `<div>` or `<span>` elements.
- Use native semantics before ARIA.
- Form controls have persistent `<label>` elements or an equivalent accessible name.
- Icon-only controls have `aria-label` or visible accessible text.
- Decorative icons use `aria-hidden="true"`.
- Images have meaningful `alt`, or `alt=""` when decorative.
- Headings follow a logical hierarchy.
- Repeated navigation has a skip path where appropriate.
- Async updates use an appropriate live region.
- Browser zoom and text resizing are not disabled.
- Meaning is not communicated by color, hover, motion, or position alone.
- Custom controls reproduce the full semantics, keyboard model, focus behavior, and touch behavior of the established pattern.

## Focus and keyboard

- Every interactive element has a visible `:focus-visible` state.
- `outline: none` or equivalent is never used without a visible replacement.
- Compound controls use coherent focus treatment.
- Focus order follows visual and task order.
- Dialogs, popovers, and drawers move and restore focus predictably.
- Essential actions are keyboard reachable.
- Menus, tabs, trees, lists, and grids follow established keyboard patterns.
- Repeated expert actions may have shortcuts, but no action is shortcut-only.
- Shortcuts do not collide with common browser or assistive-technology commands.

## Forms

- Inputs use meaningful `name`, correct `type`, useful `inputmode`, and intentional `autocomplete`.
- Paste is never blocked.
- Labels are clickable and share a forgiving hit area with checkboxes and radios.
- A real `<form>` supports Enter submission when appropriate.
- Submit remains available until the request begins, then prevents duplicate requests and shows pending state.
- Validation appears beside the relevant field.
- The first invalid field receives focus on failed submission.
- Entered data survives validation and network errors.
- Placeholders supplement labels; they do not replace them.
- Password, code, username, and email fields use intentional spellcheck behavior.
- Unsaved meaningful work triggers a navigation warning or preservation strategy.
- Disabled controls do not rely on inaccessible tooltips for explanation.

## Actions, state, and feedback

- Feedback appears near the action or object that caused it.
- Global toasts are reserved for global, asynchronous, or originless events.
- Optimistic updates show pending state and can roll back on failure.
- Every interactive element has default, hover where applicable, active, focus, disabled, loading, error, and success behavior where relevant.
- Data surfaces handle loading, empty, partial, stale, error, offline, permission, and first-use states where relevant.
- Loading states are finite or provide an escape, retry, or explanation.
- Error messages state what happened and the next useful step.
- Status distinguishes confirmed, pending, stale, inferred, and failed state.
- Safe actions are fast.
- Reversible destructive actions provide undo.
- Irreversible, broad, expensive, or high-risk actions require confirmation.
- The action label names the specific consequence and object.
- Local copy, save, or validation feedback is not needlessly sent to a toast.

## Visual system

- Typography, spacing, alignment, and proportion create the primary hierarchy.
- Reusable visual decisions resolve through foundation and semantic tokens, not raw color or component-local palettes.
- One documented interaction-accent token governs general accent behavior; project themes may re-skin it without changing semantic state meanings.
- Chart-series and activity-state colors are used only for their documented data, workflow, or agent-state meaning.
- Large surfaces use warm, quiet neutrals unless the product context establishes another documented world.
- One restrained interaction accent is used consistently.
- Semantic colors are separate from brand color and retain stable meanings.
- Color is earned by action, state, identity, or data meaning.
- Multiple competing accents are flagged.
- A documented structural hairline or approved equivalent reveals structure without dominating.
- Radius follows the project’s fixed, role-based vocabulary; arbitrary or off-scale radii are flagged.
- Approved depth tokens or utilities are reserved for actual floating elevation; unreviewed custom shadows are flagged.
- Depth strategies are not mixed arbitrarily.
- Alignment, proximity, type, whitespace, and dividers are tried before adding a box.
- Adjacent navigation and content should feel like one system, not stacked themes.
- Decorative gradients, glow, glass, blur, and pure-white floating cards are flagged.

## Typography and copy

- Product UI uses readable utility or humanist typography.
- Regular-weight headings are preferred; bold is not the only hierarchy mechanism.
- Font weight does not change on hover or selection.
- Monospace is used selectively for code, IDs, logs, timestamps, shortcuts, and metadata.
- Numeric comparisons use tabular figures.
- Text handles short, average, long, missing, and translated variants.
- Flex and grid children can shrink without causing overflow.
- Long identifiers can wrap, truncate with full-value access, or otherwise remain usable.
- Product copy defaults to sentence case unless documented otherwise.
- Active voice and concrete verbs are used.
- Buttons use specific labels rather than “Continue,” “Submit,” or “OK” when a precise verb is available.
- Ongoing states use the ellipsis character: `Saving…`, not `Saving...`.
- Terminology remains stable across related surfaces.
- Error copy is direct, non-blaming, and actionable.

## Layout and density

- Density follows task frequency and comparison needs.
- Spacing uses a deliberate scale; arbitrary one-off values are flagged.
- Padding is balanced unless content creates a clear optical reason.
- Related items are closer than unrelated items.
- Repeated labels, values, controls, and baselines align.
- Marketing-scale empty space is not used in frequent workflows.
- Cards are not the default answer for every section.
- Different object types may have different internal composition while retaining shared chrome.
- The primary visual hierarchy is singular and clear.
- Horizontal overflow is fixed at the source rather than hidden indiscriminately.
- Flexbox or grid is preferred over JavaScript layout measurement.

## Data presentation

- Every chart or metric answers a defined question.
- Tables are used when exact comparison matters.
- Charts are used for shape, trend, distribution, or relationship.
- Scale, unit, time range, source, and freshness are visible when relevant.
- Neutral marks carry most of the display; accent or semantic color identifies meaning.
- Status and chart meaning survive without color alone.
- Rainbow palettes, decorative fills, and arbitrary traffic-light grading are flagged.
- Metric presentation is shaped by data meaning rather than a repeated card template.
- Tables and live values use aligned numerals where helpful.
- Large datasets have virtualization, progressive rendering, pagination, or another scaling strategy.

## Motion

- Every animation has a stated purpose and is appropriate for how often the interaction occurs.
- Keyboard actions and high-frequency operational work remain immediate and normally avoid spatial entrance motion.
- Press and drag feedback begins with the causal input rather than waiting for release.
- Motion communicates state change, continuity, origin, destination, or spatial relationship.
- Gesture-driven elements track input continuously, preserve the grab offset, and remain interruptible.
- Retargeted motion starts from the live presentation value and does not jump to a logical endpoint first.
- Gesture releases hand off useful velocity or projected momentum when physical continuation improves understanding.
- Enter and exit paths are spatially symmetric unless the information architecture gives a clear reason otherwise.
- Animate `transform` and `opacity` when possible.
- `transition: all` is flagged; properties are listed explicitly.
- Transform origin matches the visual source of motion.
- Dramatic zoom, gratuitous bounce, decorative looping, and animation on every repeated action are flagged.
- Offscreen loops pause or unmount.
- Theme changes do not animate the entire interface.
- `prefers-reduced-motion` has a faded, static, or otherwise reduced path that preserves information and feedback.
- Material effects account for reduced-transparency and increased-contrast preferences where the platform exposes them.
- Motion follows the timing and easing ranges in [`MOTION_PRINCIPLES.md`](../motion/MOTION_PRINCIPLES.md) or a documented project override.

## Touch and responsive behavior

- Essential meaning and actions do not depend on hover.
- Hover styles are scoped to hover-capable devices.
- Visual targets smaller than 24px receive a hit area of at least 24px; primary mobile targets are at least 44px where layout permits.
- Touch targets are forgiving and adjacent actions have no dead zones.
- Mobile text inputs use at least 16px text to prevent unwanted browser zoom; browser zoom itself remains enabled.
- Automatic focus is avoided on mobile unless the task requires immediate typing.
- Dialogs, sheets, and drawers contain overscroll.
- Full-bleed layouts account for device safe areas.
- The browser tap highlight is either retained or replaced intentionally.
- Responsive layouts preserve information hierarchy and state.
- Collapsed panels retain an obvious path back to their capability.
- Controls do not trigger unwanted mobile zoom or keyboard obstruction.

## Performance and resilience

- Input receives immediate acknowledgment.
- Typing, selection, drag, and scroll remain responsive.
- Images have explicit dimensions.
- Noncritical media loads lazily.
- Critical media and fonts use an intentional loading strategy.
- Large blur and backdrop-filter effects are flagged.
- Layout reads do not occur during render.
- DOM reads and writes are batched.
- Controlled inputs remain cheap per keystroke.
- Skeletons preserve layout and are not used to conceal avoidable latency.
- Drafts and local intent survive transient failures where practical.
- Retry, reconnect, and offline behavior exist when failure can persist.

## Theming, locale, and content resilience

- Browser `color-scheme` matches the active theme.
- Theme color matches the page environment.
- Dark mode preserves hierarchy, reduces glare, and uses borders or surface shifts rather than invisible shadows.
- Native controls are tested explicitly in dark mode.
- Dates and times use locale-aware formatters.
- Numbers and currency use locale-aware formatters.
- Language is detected from user or browser preference, not IP address.
- Brand names, identifiers, and code tokens are protected from accidental translation.
- Right-to-left layout and text expansion are considered where applicable.
- Meaningful state is not lost through truncation.

## AI-assisted surfaces

- Generated, retrieved, user-authored, and confirmed system content are distinguishable.
- Evidence, source, scope, or input is visible when needed for trust.
- Uncertainty is represented honestly.
- People can stop, retry, edit, compare, and revert.
- Streaming content does not cause unstable scrolling or layout movement.
- Background tool activity is visible at a useful level without meaningless internal noise.
- High-impact AI-proposed actions require explicit review before execution.
- Original input is preserved and transformations are inspectable.
- AI errors have a recovery path and do not masquerade as verified state.

## Universal anti-patterns to flag

- Generic four-card dashboard grids
- Disconnected white cards on tinted canvases
- Decorative gradients, glow, glass, or blur
- Heavy or mixed shadow systems
- Excessive pills or large radii
- Multiple accent colors
- Color without meaning
- Boxes around every section
- Missing application context
- Hover-only actions
- Non-semantic click targets
- Hidden or missing focus
- Inputs without labels
- Blocked paste
- Vague action labels
- Toasts for local feedback
- Destructive actions without undo or confirmation
- Generic errors without recovery
- Indefinite loading
- Decorative animation
- Hardcoded locale formats
- Unscaled large lists
- Inaccessible custom controls
- AI output shown as verified truth

## Output format

Group findings by file and sort by severity, then line number.

```text
## src/components/DeploymentRow.tsx

src/components/DeploymentRow.tsx:42 [critical] icon-only retry action has no accessible name → add aria-label="Retry deployment"
src/components/DeploymentRow.tsx:68 [high] row navigation uses div onClick → use a link and preserve new-tab behavior
src/components/DeploymentRow.tsx:81 [medium] success feedback appears only in global toast → confirm beside the retry control
src/components/DeploymentRow.tsx:104 [low] status number uses proportional figures → enable tabular numerals

## src/components/Inspector.tsx

✓ pass
```

Severity meanings:

- **Critical** — blocks access, creates serious risk, loses work, or misrepresents state.
- **High** — breaks a primary task, keyboard path, navigation model, or recovery path.
- **Medium** — weakens comprehension, consistency, responsiveness, or repeated-use efficiency.
- **Low** — craft or maintainability issue with limited immediate task impact.

Skip praise and preamble. Explain only when the correction is not obvious.

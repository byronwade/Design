---
id: agent.workflow
kind: workflow
version: 1.0.0
status: normative
---

# Agent design and implementation workflow

## Before designing

1. Identify the person, moment, primary outcome, domain risk, target profile, input modes, content realities, and desired feeling.
2. Read the selected generated target contract. Do not mix sibling verticals.
3. Inspect the existing product shell, routes, component library, tokens, stories, fixtures, tests, content terminology, and design-to-code mappings.
4. Choose one shell and one page pattern. State viewport ownership and every nested scroll owner.
5. Map each control to its scope: global, object, view, local, metadata, or temporary.
6. Inventory loading, empty, populated, partial, error, permission, offline, destructive, disabled, focus, hover, pressed, selected, and reduced-motion states that apply.
7. Search for approved components and examples before drawing or coding.

## Required component map

Produce this before implementation:

```yaml
target: web-app
primary_user_task: Review and update workspace behavior
shell: settings
page_pattern: form-page
regions:
  - id: category-navigation
    responsibility: Move between settings categories
    scroll_owner: viewport
  - id: settings-form
    responsibility: Edit the selected category
    scroll_owner: settings-form
components:
  - intent: Commit valid changes
    component: Button
    variant: primary
    region: form-footer
states: [loading, dirty, saving, saved, validation-error, permission-error]
responsive_transformations:
  - category-navigation becomes a preceding route on constrained widths
new_components: []
new_tokens: []
exceptions: []
```

## Implementation rules

- Compose approved primitives, patterns, and templates. Do not recreate them with page-local styles.
- Use semantic tokens and component variants. Raw colors, typography, spacing, radii, shadows, breakpoints, z-indexes, and arbitrary utility values require an accepted exception or a system change.
- Preserve native windowing, navigation, back behavior, keyboard behavior, safe areas, and accessibility semantics for the selected profile.
- Keep global product identity in color, typography, content, density, and craft; adapt layout and interaction to platform expectations.
- Treat responsive behavior as a change of representation and priority, not proportional shrinking.
- Update the smallest region capable of expressing a state change; preserve user context and input.
- Motion must improve feedback, continuity, spatial understanding, or rare acknowledgement. It must be interruptible when user-driven and have a reduced-motion alternative.

## Design-system gaps

When no approved component represents the required intent, create a gap proposal containing:

- unmet user intent and evidence
- affected profiles and contexts
- why existing components fail
- proposed anatomy and reusable API
- variants and states
- input, responsive, accessibility, and motion behavior
- required tokens and mappings
- examples, anti-examples, tests, and migration plan

Do not solve a shared gap with a one-off page component.

## Completion evidence

Return:

- target profile and resolved layers
- selected shell, pattern, regions, and scroll owners
- reused components and variants
- new gaps, decisions, or exceptions
- state and responsive coverage
- accessibility, interaction, visual, and platform checks run
- intentional visual-baseline changes
- remaining uncertainty

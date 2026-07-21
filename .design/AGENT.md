---
id: agent.workflow
kind: workflow
version: 1.2.0
status: normative
---

# Agent design and implementation workflow

This workflow is compiled with one selected profile and the consuming project’s authored design truth. Do not load the full engine or sibling profiles during ordinary implementation.

## Before designing

1. Run `design-contract status`; refresh stale or missing output with `design-contract context`.
2. Identify the actual person, preceding moment, primary outcome, next moment, domain risk, permissions, data volume, connectivity, collaboration needs, target, input modes, and desired feeling.
3. Read root `DESIGN.md`, the selected `.design/generated/<target>.md`, and `design/PROJECT.md`, `design/COMPONENTS.md`, and `design/DECISIONS.md`.
4. Inspect the existing shell, routes, state model, component library, tokens, stories, fixtures, tests, telemetry, content terminology, and design-to-code mappings.
5. Choose one shell, one layout archetype, and one page or flow pattern. State viewport ownership and every nested scroll owner.
6. Map each control to its scope: global, object, view, local, metadata, or temporary.
7. Inventory every applicable system state, responsive transformation, input mode, trust boundary, performance risk, and recovery path.
8. Search approved production components, commands, examples, and golden references before drawing or coding.

## Required design brief

Produce this before proposing a new interface or materially changing structure:

```yaml
human: "Who is doing the work and what is already on their mind?"
primary_outcome: "Exact verb and object"
next_moment: "What must be possible immediately afterward?"
target: app
profile: web-app
context:
  frequency: repeated
  permissions: editor
  data_volume: large
  connectivity: variable
  input_modes: [keyboard, pointer]
domain_concepts: []
desired_feeling: [calm, precise, capable]
signature: "One product-specific structural or interaction idea"
defaults_rejected: []
trust_and_consequence: "Scope, side effects, evidence, recovery, authority"
```

## Required component map

Produce this before implementation:

```yaml
target: app
profile: web-app
primary_user_task: Review and update workspace behavior
shell: standard-application
layout_archetype: settings
page_or_flow: form-page
regions:
  - id: category-navigation
    responsibility: Move between settings categories
    scroll_owner: viewport
  - id: settings-form
    responsibility: Edit the selected category
    scroll_owner: settings-form
components:
  - intent: Commit valid changes
    mapping: action.button
    production_component: Button
    variant: primary
    region: form-footer
states: [loading, dirty, saving, saved, validation-error, permission-error]
responsive_transformations:
  - category-navigation becomes a preceding route on constrained widths
trust_checks: [permission-visible, consequence-named, save-evidence-defined]
performance_checks: [stable-layout, local-update]
references: []
new_components: []
new_tokens: []
exceptions: []
verification: []
```

## Readiness gate

If product context, terminology, surface inventory, production component mappings, theme or asset rules, or golden references are still placeholders, the project design system is incomplete. You may perform the missing registry work, but you may not claim full system compliance until the relevant production truth exists. `design-contract doctor --mode release` enforces this boundary.

## Implementation rules

- Compose approved production primitives, patterns, and templates. Do not recreate them with page-local styles.
- Use semantic tokens and approved variants. Raw colors, typography, spacing, radii, shadows, breakpoints, z-indexes, and arbitrary utility values require an accepted exception or system change.
- Preserve native windowing, navigation, back behavior, keyboard behavior, safe areas, accessibility semantics, and browser behavior for the selected profile.
- Keep global product identity in semantic color, type, content, density, and craft; adapt structure and interaction to platform expectations.
- Treat responsive behavior as a change of representation and priority, not proportional shrinking.
- Update the smallest region capable of expressing a state change; preserve location, selection, drafts, filters, and scroll.
- Claims of success, completion, verification, deployment, collaboration, or AI confidence require fresh evidence tied to the actual revision and environment.
- Motion must improve feedback, continuity, spatial understanding, or rare acknowledgement. User-driven motion remains interruptible and reduced-motion compatible.
- Performance, accessibility, resilience, privacy, security, and recovery are part of the design definition.
- Never edit `.design/generated/`; change an authored input and recompile it.

## Design-system gaps

When no approved component represents the required intent, create a gap proposal containing:

- unmet user intent and evidence
- affected profiles and contexts
- why existing components fail
- proposed anatomy and reusable API
- variants and states
- input, responsive, accessibility, content, trust, performance, and motion behavior
- required tokens and production/design mappings
- examples, anti-examples, tests, migration, owner, and release status

Record the accepted gap or exception in `design/DECISIONS.md`. Do not solve a shared gap with a one-off page component.

## Completion evidence

Return:

- selected target, profile, and compiled-context fingerprint
- selected shell, layout archetype, page or flow, regions, and scroll owners
- reused production components, mappings, commands, and variants
- new gaps, decisions, or exceptions
- state, responsive, localization, and input coverage
- trust, consequence, permission, evidence, and recovery behavior
- accessibility, performance, interaction, visual, and platform checks run
- quality rule results and scorecard
- intentional visual-baseline changes
- exact source revision and environment
- remaining uncertainty

---
id: agent.workflow
kind: workflow
version: 1.2.0
status: normative
---

# Agent design and implementation workflow

This workflow is compiled with one selected profile and the consuming project’s authored design truth. Do not load the full engine or sibling profiles during ordinary implementation.

## Before designing

1. Run `design status`; run `design sync` if the engine is out of date.
2. Identify the actual person, preceding moment, primary outcome, next moment, domain risk, permissions, data volume, connectivity, collaboration needs, target, input modes, and desired feeling.
3. Run `design resolve --request "<task>"` and use the returned task model, relevant components, tokens, patterns, references, constraints, and checks.
4. Read root `DESIGN.md` and only the packet-relevant generated context, production code, and reference files.
5. Use the universal `design` Skill. Agent-specific files are thin routers into the same resolver, checker, and verifier.
6. Select the target `appType` when present. Use its composition recipe to choose approved primitives and blocks from the declared component source. A component source such as shadcn/ui is an optional adapter, not a package dependency or platform authority.
7. Use `design/references/` for approved photos, screenshots, golden states, and Mobbin-style notes when visual continuity is relevant.
8. Inspect the existing shell, routes, state model, component library, tokens, stories, fixtures, tests, telemetry, content terminology, required Skills, visual references, and design-to-code mappings.
9. Choose one shell, one layout archetype, and one page or flow pattern. State viewport ownership and every nested scroll owner.
10. Map each control to its scope: global, object, view, local, metadata, or temporary.
11. Inventory every applicable system state, responsive transformation, input mode, trust boundary, performance risk, and recovery path.
12. Search approved production components, commands, examples, selected Skills, visual references, and Mobbin-style pattern notes before drawing or coding.

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
visual_references_used: []
skills_used: []
new_components: []
new_tokens: []
exceptions: []
verification: []
```

## Readiness gate

If product context, terminology, surface inventory, production component mappings, theme or asset rules, Skills, or golden references are still placeholders, the project design system is incomplete. Visual references are not required for initial adoption, but approved files under `design/references/` must be inspected when they apply to the surface being designed. You may perform the missing registry work, but you may not claim full system compliance until the relevant production truth exists. `design check --mode release` and `design verify --mode release` enforce this boundary.

## Implementation rules

- Compose approved production primitives, patterns, and templates. Do not recreate them with page-local styles.
- Treat component libraries as adapters. Do not require shadcn/ui, Radix, Base UI, or any other component package unless the consuming project explicitly declares that dependency.
- Use semantic tokens and approved variants. Raw colors, typography, spacing, radii, shadows, breakpoints, z-indexes, and arbitrary utility values require an accepted exception or system change.
- Preserve native windowing, navigation, back behavior, keyboard behavior, safe areas, accessibility semantics, and browser behavior for the selected profile.
- Keep global product identity in semantic color, type, content, density, and craft; adapt structure and interaction to platform expectations.
- Treat responsive behavior as a change of representation and priority, not proportional shrinking.
- Update the smallest region capable of expressing a state change; preserve location, selection, drafts, filters, and scroll.
- Claims of success, completion, verification, deployment, collaboration, or AI confidence require a fresh design receipt tied to the actual revision and environment.
- Motion must improve feedback, continuity, spatial understanding, or rare acknowledgement. User-driven motion remains interruptible and reduced-motion compatible.
- Performance, accessibility, resilience, privacy, security, and recovery are part of the design definition.
- Never edit `.design/generated/`; change `DESIGN.md` and rerun the resolver.

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

Record the accepted gap or exception in `DESIGN.md`. Do not solve a shared gap with a one-off page component.

## Completion evidence

Return:

- selected target, profile, and compiled-context fingerprint
- design receipt path and receipt hash
- selected shell, layout archetype, page or flow, regions, and scroll owners
- reused production components, mappings, commands, and variants
- visual references and Skills used, or the reason none applied
- new gaps, decisions, or exceptions
- state, responsive, localization, and input coverage
- trust, consequence, permission, evidence, and recovery behavior
- accessibility, performance, interaction, visual, and platform checks run
- quality rule results and scorecard
- intentional visual-baseline changes
- exact source revision and environment
- remaining uncertainty

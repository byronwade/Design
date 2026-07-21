---
name: Calm Capability
document_type: product-design-principles
version: 0.1.0
status: living-draft
last_updated: 2026-07-21
applies_to:
  - product applications
  - developer tools
  - workbenches and operational software
  - dashboards and administration systems
  - AI-assisted and agentic products
primary_influences:
  - Shopify Experience Values
  - Vercel Web Interface Guidelines
supporting_influences:
  - GitLab Sophisticated Simplicity
  - Ant Design Values
  - Rauno Freiberg Interfaces
  - Visual Studio Code UX Guidelines
  - GitHub Content Design Principles
  - ONS Design Principles
  - Joshua David Thomas Frontend Design Principles
  - Apple Design Principles and Fluid Interfaces
  - Emil Kowalski Great Animations
internal_lineage:
  - Warm Paper Workbench
  - Calm Workbench
  - Velocity product and agent principles
---

# Calm Capability

A personal design-principles framework for professional software that is calm at first contact, capable under pressure, trustworthy in consequence, and unmistakably shaped by its domain.

> **Design contract:** Carry complexity for the person. Make the main path clear, keep advanced capability within reach, preserve context, expose consequence, and craft every state with the same care as the ideal one.

This is a judgment framework, not a component catalog. [`../DESIGN.md`](../DESIGN.md) defines canonical visual tokens, [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) defines the current Warm Paper Workbench expression, [`motion/MOTION_PRINCIPLES.md`](motion/MOTION_PRINCIPLES.md) defines motion, and [`review/UI_REVIEW_GUIDELINES.md`](review/UI_REVIEW_GUIDELINES.md) converts the system into an executable review contract.

## Decision order

Apply decisions in this order:

1. Accessibility, safety, legal, and platform constraints.
2. The actual person, task, domain, risk, and explicit project brief.
3. These product-design principles.
4. The approved visual system, motion contract, decision log, and established interaction model.
5. Existing components and platform conventions that do not conflict with the first four levels.
6. External references, framework defaults, and model preference.

A project may diverge, but the reason, scope, owner, and migration or expiration path should be explicit. A visual preference does not become a system rule merely because it appeared once.

## Product character

**Calm · warm · precise · compact · capable · legible · deliberate · trustworthy**

- **Calm** means clear structure and controlled emphasis. It does not mean empty.
- **Warm** means humane language, considered surfaces, and forgiving recovery. It does not mean rustic or sentimental.
- **Precise** means alignment, terminology, state, scope, and consequence are unambiguous.
- **Compact** means professional density with engineered hit areas and strong hierarchy. It does not mean cramped.
- **Capable** means advanced work remains discoverable and reachable. It does not mean every control is always visible.
- **Legible** means typography and information architecture do most of the explanatory work.
- **Deliberate** means repeated patterns have reasons, and exceptions are documented.
- **Trustworthy** means the product is accurate about what happened, what will happen, and what remains uncertain.

Marketing may use a more expressive pace, but it retains the same standards for clarity, accessibility, truth, and domain specificity.

# 1. Experience values

The values use a value-plus-behavior structure: each is expressed through observable conduct, recognizable failure, critique questions, and evidence rather than slogans.

## 1. Consider the whole situation

Design for the person’s real conditions, not an idealized desktop happy path.

### We do

- Identify the actual person, confidence level, preceding context, desired outcome, and what must happen next.
- Account for device, viewport, input mode, language, access needs, permissions, connectivity, data volume, interruption, and organizational constraints.
- Use one general path where needs and consequences are genuinely shared; use distinct paths when the mental model or risk differs.
- Treat responsive behavior, localization, keyboard access, screen-reader access, loading, partial data, permission, and recovery as the same experience.
- Design with realistic content and adverse conditions rather than assuming perfect setup, complete data, prior training, and uninterrupted attention.

### We avoid

- Designing only the polished desktop happy path.
- Calling someone “the user” while leaving the situation undefined.
- Mechanically shrinking desktop geometry instead of changing representation.
- Treating accessibility, internationalization, and failure as cleanup.
- Blaming people for conditions the product could anticipate or explain.

### Review questions

- What happened five minutes before this interaction, and what must happen five minutes after it?
- What is the most difficult plausible environment in which the task must still work?
- Which assumptions are we making about knowledge, permission, data, connectivity, or device?
- Does the smallest supported representation preserve the task or merely preserve the desktop arrangement?

### Evidence

- Named scenarios and roles.
- A state-and-constraints matrix covering widths, input modes, data states, permissions, and failures.
- Realistic fixtures.
- Explicit responsive transformations and accessibility acceptance criteria.

## 2. Make capability feel attainable

Power should increase confidence, not intimidation.

### We do

- Make the primary task obvious without blocking less common or expert work.
- Hide incidental complexity while preserving inspection, customization, override, and automation.
- Reveal depth through a measured ladder: concise summary → quick preview → inspector or split view → full detail → dedicated editing.
- Support recognition and command: visible paths for learning plus shortcuts, search, bulk actions, saved views, and automation for repeated work.
- Keep novice and expert workflows inside one coherent product model.
- Let people constrain, pause, inspect, redirect, or take over consequential automation.

### We avoid

- Decorative minimalism that removes useful capability.
- Giant toolbars that expose every possible action.
- Vague containers such as “More,” “Manage,” or “Advanced” when a specific label is possible.
- Using a command palette as permission to make the visible interface unintelligible.
- Automation that completes work while leaving the person unable to understand or control it.

### Review questions

- Can a first-time person complete the primary task without sacrificing expert speed?
- Is everything important within reach, or are people left wandering?
- Can defaults and automation be inspected and overridden?
- Which complexity is essential to the work, and which belongs to the system?

### Evidence

- A documented progressive-disclosure ladder.
- Complete keyboard and command paths.
- Advanced entry points, bulk actions, saved views, and inspectable settings where appropriate.
- Scenario checks for both unfamiliar and experienced people.

## 3. Compose complexity into calm

Calmness comes from structure, not from removing capability or adding empty space.

### We do

- Keep location and object context stable while the work changes representation.
- Place controls according to scope: application-wide, object-level, representation-level, module-level, metadata, or temporary.
- Balance structure, discovery, and capability; no one compensates for a missing other.
- Zone density by task. Comparison, triage, scheduling, and monitoring may be dense; reading, onboarding, configuration, and focused decisions should breathe.
- Update the smallest region capable of expressing a change and preserve selection, filters, ordering, scroll, and open context.
- Use alignment, repetition, typography, tonal layers, and borders before adding shadows or containers.

### We avoid

- Dashboards made entirely from equally weighted cards.
- Global reflow for local actions.
- Detached toolbars, detached footers, and nested floating surfaces that fragment one task.
- One density level for every screen.
- Soft dividers paired with weak baselines, widths, and metadata zones.
- Full-width narrative copy or narrow operational data.

### Review questions

- Can a person tell where they are, which object and representation are active, and what each action affects?
- If all shadows disappeared, would hierarchy remain understandable?
- Is density concentrated where comparison and throughput require it?
- Which region owns scrolling, selection, navigation, and status?

### Evidence

- A named shell and body archetype.
- A map of regions, scroll owners, control scopes, and responsive transformations.
- Stable geometry across realistic states.
- No duplicated global navigation.

## 4. Craft the whole path

Quality is the complete experience, including states, behavior, language, and implementation.

### We do

- Author default, hover, focus, active, selected, disabled, pending, empty, partial, error, offline, permission, overflow, and completion states where relevant.
- Test long labels, long identifiers, missing values, dense data, localization, zoom, and constrained widths.
- Use semantics, keyboard behavior, focus, announcements, contrast, and non-color cues as component requirements.
- Make content direct and specific: concrete titles, verb-first actions, plain-language status, and recovery-oriented errors.
- Keep visual polish, behavior, accessibility, runtime correctness, tests, and source implementation in one definition of quality.
- Inspect the running product and realistic flows rather than accepting a static screenshot as completion.

### We avoid

- Polishing the ideal state while leaving loading, failure, and permission unfinished.
- Placeholder controls, inert buttons, and speculative component APIs.
- Hiding essential instructions in tooltips or low-contrast metadata.
- Creating a visual specification that drifts from code.
- Trading keyboard or accessibility behavior for polish.

### Review questions

- Which state is least designed, and what happens there?
- Does every control remain understandable without hover?
- Can a person recover without losing work?
- What evidence proves the implementation, not only the mockup, is correct?

### Evidence

- State fixtures, component stories, browser flows, accessibility checks, and visual baselines.
- Runtime console and network review for affected flows.
- Long-content and constrained-width tests.
- Current source mappings for shared tokens and components.

## 5. Protect momentum

Preserve context, reduce repetition, and make recovery fast.

### We do

- Keep location, selected objects, filters, ordering, tabs, panels, drafts, and scroll state when the task model expects continuity.
- Update the smallest meaningful region rather than forcing full-page reloads.
- Use inline editing, batch operations, commands, saved views, defaults, templates, history, and automation where repetition justifies them.
- Provide optimistic behavior only when rollback and honest pending state are credible.
- Match protective friction to consequence: routine actions are fast; risky actions gain preview, review, approval, or confirmation.
- Let people undo, retry, resume, compare, or take over without reconstructing context.

### We avoid

- Navigation that destroys work state.
- Confirmation dialogs for every harmless action.
- Silent irreversible operations.
- Repeating the same manual edit across many objects when a scoped bulk path is possible.
- Blocking the entire product while one local region updates.

### Review questions

- What context is lost after navigation, error, refresh, or representation change?
- Which repeated action should become a command, batch operation, saved view, or automation?
- Is the interface adding friction because of real risk or because implementation is incomplete?
- Can a person stop and recover without starting over?

### Evidence

- Preserved state and drafts.
- Local pending and error behavior.
- Undo, rollback, history, retry, resume, and takeover paths.
- Measured reduction in repeated work.

## 6. Make trust tangible

Trust is built through accurate state, visible consequence, proportional control, and reliable recovery.

### We do

- State clearly what the product can do, cannot do, has done, is doing, and remains uncertain about.
- Show scope, side effects, permissions, provenance, environment, and affected objects before consequential actions.
- Distinguish proposal, preview, pending operation, verified result, accepted result, and deployed result.
- Make safe and positive actions easy while adding control and explanation as risk increases.
- Preserve entered data on failure and provide a concrete recovery path.
- Provide undo, rollback, version history, checkpoints, or compensating actions where the domain permits.
- Use evidence appropriate to the claim: tests, source revisions, screenshots, traces, logs, approvals, or domain records.

### We avoid

- Vague success messages or progress indicators that imply more than was verified.
- Hidden side effects, permissions, destructive controls, or stale evidence.
- “Magic” automation with no inspection, scope, or override.
- Auto-merging, deploying, sharing credentials, or changing production merely because an agent recommended it.
- Using chat prose as the only durable record of state or work.

### Review questions

- What changed, where, by whom or what, against which version, and with what evidence?
- Can the consequence be understood before commitment?
- Can the action be reversed, and is that reversal credible?
- Does every status label correspond to a real underlying state?

### Evidence

- Previews, diffs, affected-scope summaries, approvals, and recovery paths.
- Durable timestamps, versions, environments, provenance, and audit events.
- Fresh verification tied to the exact candidate or revision.
- Clear permission and credential boundaries.

## 7. Start familiar; become unmistakable

Use established patterns for basic understanding, then express identity through the domain, information model, and one or two meaningful signatures.

### We do

- Preserve native platform behavior for links, buttons, focus, keyboard, navigation, selection, and system conventions.
- Integrate additions into the product architecture rather than creating a separate mini-application.
- Derive vocabulary, hierarchy, color, data presentation, and interaction from the product’s actual world.
- Define a signature visual, structural, or interaction idea that could only belong to this product.
- Use consistent patterns where the mental model is shared and contextual variation where the task genuinely differs.
- Let typography and information structure carry identity before decorative effects.

### We avoid

- Replacing familiar controls with novelty for its own sake.
- Generic blue-gray SaaS styling or interchangeable card grids.
- Identity expressed mainly through gradients, oversized radii, glass, glow, or ornamental motion.
- Copying another company’s visual language without translating it to the current domain.
- Uniformity that erases meaningful contextual differences.

### Review questions

- Without the logo and name, could someone still tell what the product is for?
- Which interactions should remain completely familiar?
- What is the signature, and does it clarify the work rather than decorate it?
- Is consistency serving a shared mental model or merely convenient reuse?

### Evidence

- Documented domain concepts, vocabulary, color world, and signature.
- Three generic defaults explicitly rejected and replaced.
- Platform-correct semantics and interaction behavior.
- Swap, squint, signature, and token tests.

## 8. Grow without drift

A living system improves through evidence and deliberate decisions rather than accumulating exceptions.

### We do

- Create a shared rule only when a pattern recurs, needs a shared primitive or token, resolves conflicting guidance, or changes future decisions.
- Keep one-off needs local until repetition proves they belong in the system.
- Update rationale, guidance, tokens, primitives, examples, migrations, tests, and changelog together.
- Deprecate superseded guidance explicitly.
- Test systemic changes in at least two representative layouts or workflows.
- Evolve without needlessly breaking learned behavior, deep links, automation, or accessibility.

### We avoid

- One-off tokens, duplicated primitives, undocumented exceptions, and accidental variants.
- Redesigns that discard learned behavior without a clear benefit and migration path.
- Declaring the system complete because components exist.
- Measuring success by component count or visual consistency alone.
- Treating novelty as improvement.

### Review questions

- Is this need local, recurring, or systemic?
- Which existing rule does it extend, qualify, replace, or deprecate?
- What migration or compatibility work is required?
- Has it been verified in more than one context?
- Which person or product outcome will show that the change is better?

### Evidence

- Versioned decisions, migrations, changelog entries, and deprecations.
- Shared tokens and primitives adopted by real surfaces.
- Representative fixtures and regression tests.
- Clear ownership and an active research backlog.

# 2. Tensions to resolve deliberately

Good design does not maximize one value. It resolves tensions in context.

| Tension | Required resolution |
| --- | --- |
| Calm vs. capability | Reduce visual competition while keeping professional power discoverable and reachable. |
| Familiar vs. distinctive | Keep foundational interaction conventional; place identity in domain, information model, typography, and signature. |
| Efficient vs. safe | Remove routine friction; add proportional friction around irreversible, expensive, private, or production-changing actions. |
| Compact vs. accessible | Keep visual controls compact while engineering focus, hit areas, spacing, labels, zoom, and keyboard access. |
| Consistent vs. contextual | Reuse patterns when the mental model is shared; vary them when the task or consequence genuinely differs. |
| Warm vs. precise | Use humane language and surfaces without weakening hierarchy, density, or operational clarity. |
| Automation vs. authority | Let the system perform repeatable work while keeping scope, evidence, permission, steering, and takeover visible. |
| Speed vs. certainty | Optimize the common path while distinguishing optimistic, pending, verified, accepted, and irreversible states. |
| Flat vs. dimensional | Keep persistent structure planar; use tactile depth for controls and stronger elevation only for transient layers. |
| Dense vs. spacious | Zone density by task rather than forcing one spacing ideology across the product. |
| Cards vs. flat regions | Use cards for coherent independent modules; use documents, lists, tables, boards, timelines, and integrated regions when they scan better. |
| Chat vs. structured work | Conversation may direct and clarify, but durable objects, evidence, decisions, and status remain structured and visible. |

# 3. Current default visual expression

The current default is **Warm Paper Workbench**, not a universal requirement for every future product.

- Warm cream canvas and warm-white paper surfaces.
- Near-black warm ink, quiet secondary text, and one restrained project accent.
- Typography-led hierarchy using Inter or a strong native-system sans.
- Compact 28/32/36px desktop controls with engineered accessibility.
- Very soft internal borders and stronger structural edges only where needed.
- Shallow tactile control depth and restrained paper lift on meaningful surfaces.
- Strong local geometry, repeated baselines, predictable metadata zones, and minimal ornamental noise.
- Stable shell, contextual work surfaces, progressive disclosure, and command access.

Exact values and component rules belong to [`../DESIGN.md`](../DESIGN.md) and [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md), not this principles layer.

# 4. Interface quality floor

Every shipped interface must meet these categories. The complete file-and-line review rubric is in [`review/UI_REVIEW_GUIDELINES.md`](review/UI_REVIEW_GUIDELINES.md).

## Semantics and access

- Native interactive elements first.
- Persistent labels and accessible names.
- Visible focus and logical keyboard order.
- Correct dialog, menu, tab, tree, list, and grid behavior.
- Semantic headings and landmarks.
- State never relies on color, hover, position, or motion alone.
- Zoom, reflow, screen reader, contrast, reduced motion, and touch are tested.

## State and feedback

- Feedback appears near its cause.
- Optimistic operations expose pending state and rollback.
- Loading, empty, partial, stale, error, offline, permission, overflow, and completion are authored where relevant.
- Local mutations do not force global reload without reason.
- Errors state what happened, impact, and next step.
- Destructive friction is proportional to consequence.

## Layout, content, and data

- A named shell, body archetype, region map, and scroll model are explicit.
- Density matches task frequency and comparison need.
- Cards are not universal wrappers.
- Long content, localization, and data scale are tested.
- Copy is direct, specific, sentence case, and recovery-oriented.
- Tables support exact comparison; charts support shape, trend, distribution, or relationship.
- Scale, unit, time range, source, and freshness are visible when needed.

## Motion and performance

- Motion has a named purpose and matches interaction frequency.
- High-frequency and keyboard work remains immediate.
- Direct manipulation tracks input, preserves origin, remains interruptible, and hands off useful velocity.
- Shared UI avoids `transition: all`; approved tokens govern duration and easing.
- Reduced motion preserves feedback without unnecessary spatial movement.
- Images have dimensions, large lists scale, input remains responsive, and runtime errors are absent.

## AI-assisted and agentic work

- Generated, retrieved, user-authored, and verified content are distinguishable.
- Source, scope, permission, environment, side effect, and evidence are visible when material.
- Work occurs in an appropriate isolation boundary.
- Plans, diffs, evidence, approval, acceptance, and deployment remain distinct states.
- People can stop, retry, edit, compare, revert, redirect, and take over.
- Chat is not the sole durable representation of work.
- High-impact actions require explicit human review before execution.

# 5. Required project brief

Before a new product surface or substantial redesign, record:

```text
Product / feature:
Human and moment:
Primary outcome:
Key constraints:
Desired feeling:
Domain concepts:
Natural color world:
Signature:
Three generic defaults rejected:
Shell and body archetype:
Regions and scroll owners:
Control scopes:
Progressive-disclosure ladder:
Critical states:
Risk and recovery:
Responsive transformation:
Accessibility risks:
Performance risks:
Evidence and verification:
Intentional departures:
```

# 6. Agent implementation contract

A design or coding agent must:

1. Read this document, `DESIGN.md`, the living system, accepted decisions, and task-specific motion or review material.
2. Inspect the existing repository, shell, components, tokens, behavior, tests, responsive model, and accessibility conventions.
3. Name the person, task, shell, body archetype, regions, scroll owners, control scopes, and critical states before implementation.
4. Reuse sound primitives and semantic tokens before introducing new values or components.
5. Preserve behavior, source-of-truth boundaries, keyboard access, and tests.
6. Implement responsive transformations and state behavior, not only static appearance.
7. Verify realistic content, wide and constrained viewports, keyboard, focus, screen reader, zoom, contrast, reduced motion, loading, failure, permission, and recovery.
8. Run available formatting, linting, type, test, browser, accessibility, and visual checks.
9. Record intentional deviations, new shared rules, migration needs, and evidence.

When a needed primitive is missing, propose a design-system addition or bounded exception rather than improvising a page-local substitute.

# 7. Failure patterns

Reject or correct:

- A generic grid of equal KPI or feature cards.
- A separate rounded toolbar floating over a separate rounded body.
- Pure-white or cool-gray surfaces with no intentional project world.
- Oversized routine desktop controls.
- Shadows on every nested component.
- Full-width narrative copy.
- Boards and timelines compressed to avoid useful horizontal scrolling.
- Many competing accent colors.
- Glass, gradient, glow, or decorative motion used as structural substitutes.
- Feature-poor “minimalism.”
- Chat used as the only durable project state.
- Automation without scope, evidence, interruption, or authority.
- Vague success, stale proof, and hidden side effects.
- Motion that blocks input, cannot be interrupted, or lacks a reduced path.
- Inaccessible custom controls, hover-only actions, hidden focus, and unlabeled inputs.
- Local errors or confirmations sent only to global toasts.
- A design specification that is not reflected in source, tests, and rendered behavior.

# 8. Definition of done

- [ ] The actual person, outcome, context, constraints, and risk are explicit.
- [ ] The primary task is clear and advanced capability remains reachable.
- [ ] The shell, body archetype, regions, scroll owners, and control scopes are correct.
- [ ] Realistic, long, empty, loading, partial, error, offline, permission, and completion states work.
- [ ] Relevant location, selection, filters, scroll, panels, and entered work persist.
- [ ] Keyboard, focus, semantics, announcements, zoom, contrast, touch, and non-color cues are verified.
- [ ] Responsive transformations preserve the task rather than only the desktop arrangement.
- [ ] Motion is purposeful, interruptible, performant, and reduced-motion compatible.
- [ ] Copy is direct, specific, sentence case, and recovery-oriented.
- [ ] Destructive and high-impact actions use proportional confirmation, approval, undo, rollback, or compensation.
- [ ] Every claim of completion or verification is backed by appropriate fresh evidence.
- [ ] Agentic changes are source-backed, scoped, isolated, reviewable, and subject to human authority where required.
- [ ] Shared tokens and primitives replace duplicated one-off values.
- [ ] Intentional deviations and new system decisions are recorded.
- [ ] Formatters, linters, type checks, tests, browser flows, accessibility checks, and visual review pass where available.

# 9. Governance

Create or revise a shared rule when at least one is true:

- It solves a recurring problem in more than one surface or product.
- It requires a shared token, primitive, state model, or responsive rule.
- Existing guidance is contradictory or repeatedly produces weak results.
- It changes how future work should be classified, implemented, or reviewed.
- It establishes a source-of-truth, accessibility, trust, or compatibility boundary.

Keep one-off preferences local. Replace, qualify, or deprecate old guidance explicitly instead of leaving contradictions.

## Decision template

```text
Date:
Decision ID:
Status: proposed / experimental / accepted / superseded / deprecated
Problem:
Decision:
Principles affected:
Alternatives considered:
Rationale:
User and product evidence:
Affected tokens / components / layouts / workflows:
Accessibility and responsive impact:
Compatibility and migration notes:
Verification plan:
Owner:
```

## Versioning

- **Patch:** clarification, correction, or nonbreaking review detail.
- **Minor:** new principle behavior, quality category, decision, or compatible operating rule.
- **Major:** changed values, authority hierarchy, visual default, or incompatible governance model.

# 10. Source lineage

This is an independent synthesis. [`INFLUENCES.md`](INFLUENCES.md) maps the Shopify and Vercel core, supporting product-design sources, Apple and Emil motion sources, internal lineage, adaptations, and intentional departures.

## One-page review

```text
CONTEXT
[ ] Human, task, before/after moment, constraints, and realistic adverse conditions are explicit.

STRUCTURE
[ ] Location, hierarchy, scope, regions, and scroll ownership are clear.
[ ] Structure, discovery, capability, and density are balanced.

CAPABILITY
[ ] Primary work is obvious; advanced work remains reachable.
[ ] Keyboard, bulk, automation, inspection, and takeover paths are appropriate.

CRAFT
[ ] Relevant states, long content, and recovery paths are authored.
[ ] Semantics, focus, copy, type, motion, and visual details are coherent.

MOMENTUM
[ ] Context and entered work persist.
[ ] Routine repetition is removed; protective friction is proportional.

TRUST
[ ] State, scope, consequence, permissions, evidence, and recovery are visible.
[ ] No claim exceeds what the system actually verified.

IDENTITY
[ ] Domain, color world, signature, and rejected defaults are explicit.
[ ] Familiar foundations remain intact.

QUALITY
[ ] Accessibility, responsive behavior, localization, performance, and resilience pass.
[ ] Shared tokens and primitives are used.
[ ] Tests, browser flows, and visual review provide current evidence.
```

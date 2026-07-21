---
name: Calm Capability Motion Principles
document_type: motion-design-contract
version: 0.1.0
status: living-draft
last_updated: 2026-07-21
applies_to:
  - product applications
  - developer tools
  - workbenches and operational software
  - gesture-driven web interfaces
  - AI-assisted and agentic products
---

# Motion Principles

Motion should make an interface feel more immediate, legible, and physically coherent. It must not make repeated work slower or turn polish into theater.

> **Motion contract:** Respond at the moment of intent. Preserve spatial causality. Continue from what is actually on screen. Let people interrupt, reverse, and reduce motion. Use the least motion that fully explains the change.

This document specializes [`DESIGN_PRINCIPLES.md`](../DESIGN_PRINCIPLES.md), [`DESIGN.md`](../../DESIGN.md), and [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md). The audit workflow in [`.agents/skills/improve-animations/`](../../.agents/skills/improve-animations/) converts these principles into codebase findings and implementation plans.

## 1. Decide whether motion belongs

Before choosing duration or easing, name the purpose:

- **Immediate feedback:** acknowledge press, selection, drag, resize, or command receipt.
- **Continuity:** show that one state became another rather than appearing unrelated.
- **Spatial explanation:** connect a trigger, object, panel, route, or hierarchy to its destination.
- **Progress:** make pending work visible without implying completion.
- **Attention:** direct focus to a material change, warning, or result.
- **Rare delight:** reward an infrequent moment without obstructing work.

Do not animate merely because a component entered the DOM. When the state change is already obvious, instantaneous is often correct.

### Frequency rule

| Frequency | Default posture |
| --- | --- |
| Hundreds of times per day | No spatial entrance motion. Immediate state feedback only. |
| Repeated operational action | Brief, restrained feedback; normally 100–160ms. |
| Occasional navigation or disclosure | Spatial transition may clarify continuity; normally 140–240ms. |
| Rare setup, onboarding, celebration, or demonstration | More expressive motion may be considered when non-blocking and accessible. |

Keyboard-initiated actions should not be delayed by decorative motion. A shortcut may update selection, focus, opacity, or local state immediately, but it should not force the person to wait for an entrance sequence.

## 2. Respond at the moment of intent

- A button acknowledges pointer-down or key activation immediately.
- Dragged content follows the pointer continuously rather than jumping after release.
- Selection, resize, and insertion feedback remain attached to the affected object.
- Loading and optimistic states begin close to their cause.
- Artificial delays, chained transitions, and animation locks on the input path are defects unless they prevent accidental activation.

A press state may use a subtle one-pixel translation, inset depth change, or small scale adjustment. Compact professional controls do not need a bounce.

## 3. Preserve spatial causality

- A menu, popover, preview, or sheet originates from the control or edge that produced it.
- Enter and exit use the same spatial path unless the information architecture establishes a different destination.
- Transform origin reflects the source of the interaction rather than defaulting to the element center.
- A local action updates the smallest meaningful region; motion does not cause global reflow for a local change.
- Layering, dimming, scale, and translucency communicate modality and depth only when those relationships are real.
- Related elements may move as a coordinated system; unrelated regions should remain stable.

Motion is part of wayfinding. A person should be able to infer where an object came from, where it went, and how to recover it.

## 4. Make motion interruptible

The person’s newest intent outranks the current animation.

- Do not disable input merely because a transition is running.
- Retarget from the live presentation value, not the stale start or logical target.
- Opening, closing, dragging, expanding, and collapsing remain reversible without a visible jump.
- CSS transitions are acceptable when the browser can smoothly retarget them. Gesture-driven and velocity-sensitive motion should use a system that exposes live values and interruption.
- Separate X and Y motion when their velocities or destinations differ.
- Preserve focus and state while visual movement is interrupted.

An animation that must finish before the interface listens again is usually an animation-shaped modal blocker.

## 5. Hand off gesture velocity and momentum

Direct manipulation should not have a seam between the gesture and the settling animation.

- Capture a short history of pointer positions and timestamps.
- On release, start from the exact on-screen value.
- Preserve useful release velocity when the object should continue naturally.
- Use projected momentum to choose a snap point when a flick should carry farther than the release coordinate.
- Use velocity direction as evidence of intent; do not rely only on which side of a midpoint the pointer stopped.
- Apply progressive resistance beyond a boundary instead of a hard visual stop, then return to a valid state.
- Respect the original grab offset so the object does not jump under the pointer.

Springs are preferred for physical, interruptible, directly manipulated objects. Routine menus, tooltips, and repeated controls normally use short deterministic transitions.

## 6. Timing and easing

Repository tokens take precedence. The Warm Paper Workbench starting ranges are:

| Interaction | Starting range | Notes |
| --- | ---: | --- |
| Press, hover, local emphasis | 100–140ms | Immediate and restrained. |
| Menu, tooltip, compact popover | 120–180ms | Start fast; do not make discovery wait. |
| Inspector, drawer, contextual panel | 160–220ms | Preserve origin and surrounding context. |
| View or representation transition | 150–240ms | Keep stable shell regions still. |
| Rare larger spatial transition | 220–300ms | Use only when distance and hierarchy justify it. |

Most product UI motion should remain below 300ms. Larger distance may justify a longer response, but routine work must not feel scheduled around animation.

### Easing decisions

- **Entering or revealing:** ease out; response is fast at the start and settles near the destination.
- **Exiting:** often slightly faster than entrance; do not accelerate so sharply that the element appears pulled away.
- **Moving or morphing on screen:** ease in-out when both departure and arrival need continuity.
- **Hover and press:** short standard/ease-out response.
- **Constant repeated motion:** linear only when constant velocity represents the phenomenon.
- **Direct manipulation:** follow input 1:1; easing begins only after release.
- **Physical settling:** critically damped spring by default. Add overshoot only when the preceding gesture carried momentum or the product’s character explicitly supports it.

The current general-purpose Warm Paper Workbench easing is `cubic-bezier(0.2, 0, 0, 1)`. Treat additional curves as named tokens, not local inventions.

## 7. Performance is part of feel

- Prefer `transform` and `opacity` for frequent motion.
- List transition properties explicitly; never use `transition: all` in shared UI.
- Avoid animating layout, paint-heavy blur, large shadow, or full-page backdrop effects when a compositor-friendly representation works.
- CSS animations, CSS transitions, or WAAPI are useful when main-thread work could interrupt `requestAnimationFrame`-driven motion.
- Batch DOM reads and writes. Do not measure layout repeatedly during render.
- Keep controlled input, scroll, drag, and resize handlers cheap.
- Pause or unmount offscreen loops.
- Provide stable geometry during loading, streaming, validation, and optimistic updates.
- Test with realistic data and CPU pressure rather than only an isolated animation playground.

A visually attractive animation that drops frames, delays input, or shifts layout is not crafted.

## 8. Accessibility and sensory control

Reduced motion preserves meaning while removing unnecessary spatial movement.

- Under `prefers-reduced-motion: reduce`, replace large translations, zoom, parallax, elastic overshoot, and depth movement with short fades, immediate state changes, or static alternatives.
- Keep feedback that aids comprehension, such as color, opacity, outline, text, and status changes.
- Do not communicate state or direction through motion alone.
- Avoid full-viewport moving backgrounds, slow repetitive oscillation, flashing, and abrupt brightness changes.
- Where supported, `prefers-reduced-transparency: reduce` receives more opaque surfaces and less blur.
- Where supported, `prefers-contrast: more` receives stronger boundaries and more solid materials.
- Haptic or audio feedback must be causal, synchronized, and useful; it is never the sole signal.
- Motion testing includes keyboard, screen reader, zoom, reduced motion, contrast, and touch input.

## 9. Product-specific patterns

### Buttons and compact controls

- Immediate press feedback.
- 100–140ms.
- No bounce for routine controls.
- Do not change font weight or geometry in a way that shifts neighboring content.

### Menus, popovers, and previews

- Originate from the trigger.
- Use a short opacity plus small positional or scale change when spatial explanation helps.
- Restore focus to the trigger on close.
- Subsequent related tooltips or menus should not repeat a long initial delay.

### Drawers, sheets, and inspectors

- Maintain an anchored edge or trigger relationship.
- Remain interruptible.
- Scrims indicate modality; nonmodal utility panels should not dim the whole workspace.
- Gesture dismissal preserves velocity and returns along the entry path.

### Lists, tables, boards, and timelines

- Keep keyboard and repeated actions immediate.
- Animate reordering only when it helps track identity.
- Preserve row, column, and semantic-pane geometry.
- Do not stagger large operational lists.

### Toasts and notices

- Enter from and exit toward a consistent origin.
- Avoid long stacking choreography.
- Preserve readable time and support pause or dismissal where needed.
- Local feedback belongs near the local action rather than being animated into a global toast.

### Route and view changes

- Keep global shell and location stable.
- Animate only the region whose representation changed.
- Preserve selection, filters, scroll, and focus.
- Avoid whole-page fades that conceal state loss or make navigation feel slower.

### Agentic work

- Progress motion does not imply verification or completion.
- Streaming output avoids unstable auto-scroll and excessive layout movement.
- Plans, diffs, evidence, approval, and deployment states remain distinguishable without relying on animation.
- A person can pause, redirect, inspect, or take over while work is in motion.

## 10. Review questions

- What is the animation’s purpose?
- How often will a person encounter it?
- Does feedback begin with the causal input?
- Can the person interrupt or reverse it immediately?
- Does it begin from the live on-screen state?
- Is the origin and destination spatially clear?
- Does gesture velocity carry through naturally?
- Is the duration appropriate to size, distance, and frequency?
- Does it remain smooth under realistic load?
- Is there a reduced-motion equivalent that preserves meaning?
- Would the interface be clearer or faster with no animation?

## 11. Definition of done

- [ ] Every motion behavior has a named purpose.
- [ ] High-frequency and keyboard paths are not delayed by decorative motion.
- [ ] Press, drag, selection, and resize feedback begins immediately.
- [ ] Enter, exit, origin, and destination are spatially coherent.
- [ ] Interactive motion can be interrupted and reversed without jumps.
- [ ] Gesture handoff starts from the live value and uses velocity or momentum where appropriate.
- [ ] Timing and easing use approved tokens or a documented exception.
- [ ] Shared UI does not use `transition: all`.
- [ ] Performance is verified under realistic load.
- [ ] Reduced motion, transparency, contrast, keyboard, touch, and screen-reader behavior are verified.
- [ ] Motion does not overstate progress, verification, or completion.

## Source lineage

This is an independent web-oriented synthesis. See [`INFLUENCES.md`](../INFLUENCES.md) and the detailed non-brand-imitation reference in [`APPLE_FLUID_INTERACTION.md`](APPLE_FLUID_INTERACTION.md).

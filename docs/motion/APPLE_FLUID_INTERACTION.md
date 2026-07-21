---
name: apple-fluid-interaction
description: Fluid, physical interface-motion principles translated to web implementation. Use for gestures, springs, drag and swipe interactions, sheets, momentum, interruptibility, materials, typography, reduced motion, and interaction review.
---

# Fluid Interaction and Apple-Inspired Motion

The central principle is simple: an interface feels alive when motion starts from the current on-screen value, inherits the user's velocity, projects momentum forward, and can be grabbed and reversed at any instant.

This document adapts concepts associated with Apple's fluid-interface work to Warm Paper Workbench. It is a motion and interaction reference, not a requirement to imitate Apple visually. The static system remains warm, paper-like, compact, and restrained.

## Human goals

Motion and interaction should support four needs:

- **Safety and predictability:** people understand what will happen and can recover.
- **Understanding:** state changes and spatial relationships remain clear.
- **Achievement:** the interface responds quickly and helps people complete work.
- **Joy:** craft and continuity make the product satisfying without becoming distracting.

## 1. Response: remove latency

Directness begins with immediate response.

- Show pressed feedback on pointer-down, not only after click or release.
- Audit debounce, artificial timers, sequential waits, and delayed visual state on the input path.
- Continuous interactions must update throughout the gesture rather than animating only after completion.
- High-frequency controls should be especially quiet and immediate.

```css
.button:active {
  transform: translateY(1px) scale(0.985);
  transition: transform 100ms ease-out;
}
```

## 2. Direct manipulation: track 1:1

Dragged content should stay attached to the pointer and preserve the exact place where it was grabbed.

- Use Pointer Events and `setPointerCapture` so tracking continues outside the original bounds.
- Preserve the grab offset instead of snapping the object center to the pointer.
- Maintain a short history of position and time samples so release velocity can be calculated reliably.
- Keep a keyboard alternative for drag-and-drop and resize operations.

```js
el.addEventListener('pointerdown', (event) => {
  el.setPointerCapture(event.pointerId);
  const grabOffset = event.clientY - el.getBoundingClientRect().top;
  // Record pointer position and timestamp samples while moving.
});
```

## 3. Interruptibility

Gesture-driven animations must remain interruptible and redirectable.

- Never lock input until an animation finishes.
- Start a new animation from the current presentation value, not from a stale logical target.
- A closing sheet, moving card, or snapping panel can be grabbed and reversed immediately.
- Carry existing velocity into the new target rather than hard-cutting it.
- Use independent X and Y springs when the axes have different velocities.
- Prefer a spring-capable library over fixed keyframes for user-controlled motion.

Interruptibility is the strongest dividing line between motion that feels alive and motion that feels pre-recorded.

## 4. Springs: behavior over fixed animation

Use springs for physical, redirectable motion.

Think in designer-oriented terms:

- **Damping ratio:** `1.0` is critically damped with no overshoot. Values below `1.0` introduce bounce.
- **Response:** approximate time to react and settle. A typical professional UI target is `0.3–0.4s`.

Recommended starting points:

| Interaction | Damping character | Response |
| --- | --- | --- |
| Normal repositioning | Critically damped; no bounce | `0.4s` |
| Drawer or sheet after a gesture | Modest under-damping | `0.3s` |
| Rotation or flick landing | Modest under-damping | `0.4s` |
| Menu or non-physical appearance | No bounce; use short easing or cross-fade | `120–180ms` |

Use bounce only when the preceding action carried momentum. A flick may overshoot slightly; a menu that simply opens should not.

```js
import { animate } from 'motion';

animate(element, { y: 0 }, {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
});
```

## 5. Velocity handoff

At release, settling motion should continue at the pointer's actual velocity. Otherwise the transition between dragging and animation becomes visible.

Some spring APIs accept absolute velocity. APIs that use relative velocity may require:

```text
relativeVelocity = gestureVelocity / (targetValue - currentValue)
```

Always check the library's units. Preserve direction and avoid normalizing away meaningful speed.

## 6. Momentum projection

For flickable objects, choose the landing target from the projected endpoint rather than only the release position.

```js
function project(initialVelocity, decelerationRate = 0.998) {
  return (initialVelocity / 1000) *
    decelerationRate / (1 - decelerationRate);
}

const projectedEndpoint = currentPosition + project(releaseVelocity);
const target = nearestSnapPoint(projectedEndpoint);
animateSpringTo(target, { velocity: releaseVelocity });
```

Use a lower deceleration rate such as `0.99` for a shorter, snappier projection. Tune against real devices and actual gesture speeds.

## 7. Spatial consistency

Motion should preserve the spatial model of the interface.

- Enter and exit along the same path.
- A panel entering from the right dismisses to the right.
- Menus and popovers originate from the control that triggered them.
- Set `transform-origin` to the source rather than scaling every surface from its center.
- Mirror easing on reversible transitions when using curves instead of springs.
- Intermediate frames should hint toward the final state rather than moving through an arbitrary path.

## 8. Soft boundaries and rubber-banding

When appropriate, progressive resistance communicates that the interface is still responsive even though the user has reached a limit.

```js
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot));
}
```

Do not use rubber-banding everywhere. It fits sheets, carousels, draggable objects, and direct-manipulation boundaries. Data-entry and precision controls may need firm limits.

## 9. Gesture details

- **Tap:** show feedback on down, commit on up, and allow cancel-by-dragging-away.
- **Hysteresis:** permit approximately 10px of movement before committing a tap or directional drag.
- **Drag or swipe:** detect plausible gestures in parallel, then cancel alternatives once intent is clear.
- **Double-tap:** accept its single-tap delay only where double-tap provides real value.
- **Hit areas:** compact visual controls may use larger invisible targets.
- **Resizing:** preserve useful minimums and maximums and provide a keyboard path.

## 10. Frame-level smoothness

Smoothness depends on frame content, not only nominal frame rate.

- Prefer `transform` and `opacity` on continuous paths.
- Use `requestAnimationFrame` or a display-synchronized motion library for pointer-driven work.
- Avoid layout-triggering properties while dragging.
- Scope `will-change` to imminent motion rather than applying it globally.
- Inspect slow motion and frame-by-frame captures for jumps, strobing, or velocity discontinuities.
- A subtle stretch or blur may clarify unusually fast movement, but should be rare in a compact professional tool.

## 11. Materials and depth

Warm Paper Workbench is primarily opaque, but translucent material may be useful for floating functional layers.

- Use transparency for temporary chrome, sheets, or floating bars when content moving underneath reinforces spatial continuity.
- Do not stack translucent surfaces; legibility collapses quickly.
- Larger floating surfaces may use stronger blur and shadow than small controls.
- Use a dimming scrim for a blocking modal task. A parallel inspector or non-blocking panel should not unnecessarily interrupt flow.
- Text over translucent material needs higher contrast and may require slightly more weight or tracking.
- Where a sticky floating surface overlaps scrolling content, a subtle edge fade can be calmer than a hard divider.
- If a material enters, animate blur, opacity, and subtle scale together so it materializes instead of merely fading.
- Respect `prefers-reduced-transparency` by increasing opacity and removing blur.

Persistent page structure must remain understandable if all transparency is removed.

## 12. Multimodal feedback

Motion, sound, and haptics should follow three rules:

1. **Causality:** feedback occurs on the event that caused it.
2. **Harmony:** visual, audio, and haptic feedback align in time.
3. **Utility:** reserve extra feedback for meaningful success, error, commit, and snap moments.

Excess feedback trains people to ignore the system.

## 13. Reduced motion and accessibility

Reduced motion does not mean no feedback. It means a non-vestibular equivalent.

- Under `prefers-reduced-motion: reduce`, replace large slides, springs, overshoot, and parallax with short cross-fades or immediate changes.
- Retain opacity, color, and local state feedback that improves comprehension.
- Under reduced transparency, use a more solid warm paper surface and remove blur.
- Under increased contrast, strengthen essential borders and foreground contrast.
- Avoid full-viewport moving backgrounds, slow looping oscillations, and abrupt brightness changes.
- Do not communicate critical state only through movement.

```css
@media (prefers-reduced-motion: reduce) {
  .sheet {
    transform: none !important;
    transition: opacity 150ms ease-out;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .floating-toolbar {
    background: var(--ui-paper);
    backdrop-filter: none;
  }
}
```

## 14. Typography as a responsive material

Typography changes optically with size.

- Large headings need tighter tracking; body text remains near neutral; very small labels may need slight positive tracking.
- Leading should be tighter for large headings and more open for narrative body text.
- Build hierarchy from size, weight, and line-height together.
- Prefer the platform stack or a highly legible UI sans. Warm Paper Workbench uses Inter with system fallbacks.
- Enable optical sizing when the font supports it.
- Respect user text-size preferences and test layout expansion rather than assuming fixed pixel dimensions will hold.
- Use tabular numerals for dates, counts, percentages, and operational metrics.

## 15. Design foundations

Use these principles when motion or visual rules conflict:

1. **Purpose:** every feature and effect earns its attention cost.
2. **Agency:** keep people in control and favor undo over unnecessary confirmation.
3. **Responsibility:** protect privacy, safety, and trust; disclose AI and irreversible consequences clearly.
4. **Familiarity:** use predictable locations, metaphors, and behavior unless testing proves a change is better.
5. **Flexibility:** adapt to platform, input method, ability, language, expertise, and personalization needs.
6. **Simplicity, not minimalism:** show the common path clearly and keep advanced options one level deeper.
7. **Craft:** spacing, type, timing, alignment, and responsive behavior are deliberate and tested.
8. **Delight:** emerges from the other principles; it is not decoration attached afterward.

Supporting rules:

- Provide feedback for status, completion, warning, and error.
- Every screen should answer where the user is, where they can go, what is present, and how to leave.
- Place a control near what it affects and map its arrangement to the thing it changes.
- Prefer direct labels such as “Progress” or “Library” over vague containers such as “Manage.”

## 16. Process

- Prototype interactions, not only static screens.
- Design visual hierarchy and motion together.
- Test with realistic content, real devices, constrained widths, keyboard input, and assistive preferences.
- Review motion in slow motion and frame by frame.
- Treat feel that cannot be determined from source code alone as a test requirement, not an invitation to guess.

## Quick reference

| Need | Technique | Starting value |
| --- | --- | --- |
| Default physical motion | Critically damped spring | response `0.3–0.4s`, no bounce |
| Momentum motion | Modest under-damping | response `0.3–0.4s` |
| Gesture to spring | Hand off release velocity | use library-native units |
| Flick landing | Project momentum, then snap | deceleration rate around `0.998` |
| Clean interruption | Start from current presentation value | never from stale target state |
| Reversal | Carry current velocity | avoid a hard velocity cut |
| Reversible curve | Mirror the easing path | or use a spring |
| Direct drag | Pointer capture plus grab offset | track 1:1 |
| Feedback | Begin on pointer-down | remain continuous |
| Boundary | Progressive resistance | rubber-band selectively |
| Translucent chrome | Floating functional layer | never stack glass surfaces |
| Type tracking | Size-specific | headings near `-0.02em`, body near `0` |
| Reduced motion | Cross-fade or immediate state | retain comprehension feedback |

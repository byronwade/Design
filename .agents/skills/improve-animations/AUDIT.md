# Animation Audit Catalog

Use this catalog with [`SKILL.md`](SKILL.md). Repository motion tokens and documented product decisions take precedence; the values below are the Warm Paper Workbench starting point.

## Severity

- **HIGH** — feel-breaking or exclusionary: wrong easing on core UI, animation on repeated keyboard actions, non-interruptible gesture UI, `scale(0)` on major content, dropped frames, inaccessible motion, or motion that misrepresents state.
- **MEDIUM** — noticeably weak: wrong origin, overlong timing, missing reduced-motion behavior, inconsistent paths, layout animation with visible shift, or local token drift.
- **LOW** — polish and maintainability: small cohesion gaps, missed continuity, noncritical token consolidation, or a rare opportunity for restrained delight.

## Baseline values

Follow existing tokens first. When the repository has no motion system, propose named tokens instead of repeating raw values.

| Use | Range / value |
| --- | --- |
| Press and hover | `100–140ms` |
| Menu, tooltip, compact popover | `120–180ms` |
| Inspector, drawer, contextual panel | `160–220ms` |
| View or representation change | `150–240ms` |
| Rare large spatial transition | `220–300ms` maximum by default |
| General Warm Paper easing | `cubic-bezier(0.2, 0, 0, 1)` |
| Gesture-following phase | `1:1`, no easing |
| Physical settle | critically damped spring by default; overshoot only after momentum or explicit product direction |

Rules:

- Product UI motion should normally remain below `300ms`.
- Exit can be approximately `10–20%` faster than entrance when that does not break spatial continuity.
- Longer travel and larger objects may justify longer response, but frequency and task urgency take precedence.
- Keyboard and high-frequency commands normally receive immediate state feedback without a spatial entrance animation.
- Never use `transition: all` in shared UI.

## 1. Purpose and frequency

For every animation, identify its purpose and how often people encounter it.

Check:

- Does it provide immediate feedback, continuity, spatial explanation, progress, attention, or rare delight?
- Would the state change be equally clear without motion?
- Does the person have a defined task that the motion supports?
- Is the interaction repeated dozens or hundreds of times per day?
- Is an onboarding or marketing treatment leaking into operational work?
- Does the animation delay a keyboard action, command palette, list selection, or routine navigation?
- Is a rare expressive moment repeated until it becomes friction?
- Does an animated loading or success state imply more completion than the system verified?

HIGH examples:

- A command palette waits through an entrance animation on every invocation.
- A keyboard selection triggers staggered row motion.
- A deployment animation shows “done” before verification completes.

## 2. Easing and duration

Choose easing from the movement’s role.

Decision flow:

```text
Is it direct manipulation?
├── Yes → follow input 1:1; settle after release with a retargetable spring or approved inertia.
└── No
    ├── Is it entering or revealing? → ease-out / standard response.
    ├── Is it exiting? → slightly faster exit curve.
    ├── Is it moving or morphing while remaining visible? → ease-in-out.
    ├── Is it hover or press feedback? → short standard/ease-out.
    ├── Is it constant physical motion? → linear only when constant velocity is meaningful.
    └── Otherwise → default to the system standard or no animation.
```

Check:

- Raw durations or cubic-beziers duplicated instead of named tokens.
- `ease-in` on entrances, which can make UI feel slow to respond.
- `500ms+` routine product transitions.
- Large and small elements using one duration despite different distances.
- Entry and exit using unrelated curves or paths.
- Bounce on routine menus, compact buttons, or professional list interactions.
- Inconsistent motion character across components from different libraries.

## 3. Physicality and origin

Motion should communicate where an object came from and how it relates to nearby elements.

Check:

- Transform origin matches the trigger or anchored edge.
- Entry and exit use the same path.
- A drawer returns to the edge it came from.
- A popover or preview grows from its source rather than the viewport center.
- Dragging respects the grab offset.
- Beyond-boundary motion uses progressive resistance rather than a hard visual stop.
- Dimming and scale reflect real modality or depth.
- Parent and child surfaces do not animate as unrelated layers.
- Large layout changes preserve object identity.
- Reordering shows a clear insertion target and stable surrounding geometry.

HIGH examples:

- A grabbed card jumps so its center snaps under the pointer.
- A sheet enters from the bottom and exits sideways.
- A modal scales from `0` at the page center despite being triggered by a local object.

## 4. Interruptibility

The newest user intent must be able to take control immediately.

Check:

- Input is not disabled while motion runs.
- A reversing animation begins from the live presentation value.
- CSS keyframes do not trap gesture-driven state in an uninterruptible sequence.
- Opening and closing can be retargeted without a jump.
- A drag can grab an object while it is settling.
- Velocity is blended or preserved on retarget rather than cut to zero.
- X and Y axes are independent when their motion differs.
- Rapid repeated clicks, Escape, route changes, and gesture reversals are tested.
- Focus and semantic state remain correct during interruption.

HIGH examples:

- A closing drawer must finish before it can reopen.
- A toast queue restarts from its original keyframe when dismissed mid-flight.
- A gesture release snaps to the target and then starts a separate animation.

## 5. Performance

A smooth frame and responsive input are part of the motion design.

Check:

- Prefer `transform` and `opacity` for frequent motion.
- Avoid animating width, height, top, left, margin, padding, large blur, or large shadow when an equivalent transform exists.
- Layout reads and writes are batched.
- `requestAnimationFrame` loops do not run when idle or offscreen.
- CSS or WAAPI is considered when main-thread work would interrupt the animation.
- Large lists do not animate every row or mount.
- Offscreen loops pause or unmount.
- Drag and scroll handlers are cheap and avoid synchronous layout thrashing.
- Images and media have fixed dimensions so motion does not coincide with layout shift.
- Slow CPU, large data, and real network/loading states are tested.

Verification:

- Record performance with realistic content.
- Inspect main-thread tasks, layout, paint, composite, and dropped frames.
- Test while the application is doing the work that normally accompanies the transition.

## 6. Accessibility

Motion must not be required to understand or operate the interface.

Check:

- `prefers-reduced-motion: reduce` exists for nontrivial motion.
- Reduced motion removes large translation, zoom, parallax, z-depth changes, elastic overshoot, and repetitive loops.
- The alternative preserves feedback through short fades, immediate state, text, outline, or color changes.
- Meaning is not carried by motion alone.
- Full-viewport movement, slow oscillation, flashing, and abrupt brightness changes are absent.
- Drag and gesture interactions have keyboard or direct-control alternatives.
- Focus does not move unpredictably with animation.
- Screen-reader announcements reflect real state, not animation progress.
- Reduced transparency and increased contrast are handled where supported.
- Autoplay motion can be paused when it is not essential.

HIGH examples:

- A required state change is visible only through movement.
- A large parallax transition remains unchanged under reduced motion.
- A dismiss gesture has no button or keyboard equivalent.

## 7. Cohesion and tokens

Motion should feel as though one product authored it.

Check:

- Durations, easing, spring, distance, opacity, and origin use named tokens or documented patterns.
- Different component libraries do not introduce competing motion personalities.
- Frequent UI is fast and restrained; rare expressive surfaces remain compatible with the product character.
- Enter/exit, menu, dialog, sheet, toast, and route patterns are consistent.
- Motion tokens live with the design system and are versioned with component behavior.
- Dark mode and theme changes do not animate the entire interface.
- A local custom value has a documented reason and scope.
- The same semantic action does not animate differently across routes without a task reason.

## 8. Missed opportunities

Report these separately from defects. Add motion only where it improves comprehension or continuity.

Look for:

- A jarring instant replacement where object identity should persist.
- A local state update that causes a full-page flash or reflow.
- A drag, reorder, or resize interaction with no destination feedback.
- A modal or popover that appears detached from its trigger.
- A progress transition that could preserve geometry and clarify pending state.
- A rare completion moment that could acknowledge success without confetti or delay.
- A before/after comparison that would benefit from a direct manipulation control.

Do not propose motion merely to fill an empty screen or decorate a routine action.

## Finding evidence

Every finding must contain:

- exact `file:line`
- current code excerpt
- observed or inferable behavior
- category and severity
- frequency estimate
- product/task impact
- smallest useful correction
- uncertainty or feel-check requirement

Reject a finding when the code or a design decision shows that the behavior is deliberate and appropriate.

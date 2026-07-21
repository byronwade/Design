# Animation audit catalog

This companion turns the supplied Calm/Warm Paper and Apple interaction guidance into a repeatable motion-audit rubric. Repository-specific motion tokens and documented product decisions take precedence over fallback values here.

## Evidence standard

Every finding must include an exact file path and line or symbol, the current implementation, the user-visible consequence, frequency of exposure, and why the behavior conflicts with an established token, platform expectation, accessibility requirement, or physical model. Do not report a preference as a defect without evidence.

## 1. Purpose and frequency

Ask whether motion communicates state, continuity, hierarchy, causality, or spatial relationship. Remove motion that exists only to make a screen feel active.

- High-frequency keyboard, command-palette, row-hover, and repeated navigation actions should be immediate or nearly immediate.
- Rare transitions may carry more character than actions repeated hundreds of times per day.
- Do not animate layout after routine local mutations when a static update is clearer.
- Do not add bounce to non-physical entrances such as menus, tooltips, or validation messages.

## 2. Easing and timing

Prefer repository tokens. When no token exists, start with these Calm Paper ranges:

| Interaction | Default range |
| --- | ---: |
| Press or hover feedback | 100–140ms |
| Menu or popover | 120–180ms |
| Inspector or side panel | 160–220ms |
| View transition | 150–240ms |
| Reduced-motion cross-fade | about 200ms |

For gesture-driven motion, prefer springs rather than fixed-duration CSS transitions:

- Default UI spring: critically damped, no overshoot; damping ratio `1.0`, response `0.3–0.4s`.
- Momentum-driven spring: slight overshoot only after a flick, throw, or drag release; damping ratio around `0.8`, response `0.3–0.4s`.
- Never use `transition: all` in an interactive surface.
- Avoid `ease-in` for UI entrances and direct responses; it delays visible feedback.

## 3. Physicality and origin

- Enter and exit along the same spatial path.
- Anchor menus, popovers, sheets, and expanding controls to the element that caused them.
- Respect the point where a draggable object was grabbed; do not snap its center to the pointer.
- Use progressive rubber-banding at boundaries instead of a hard stop.
- Preserve scale, blur, opacity, and shadow relationships when a material surface appears or disappears.
- Avoid `scale(0)` entrances; they collapse the object into an implausible singularity and often read as a pop.

## 4. Interruptibility and velocity

- Never lock input until an animation completes.
- Start a retargeted animation from the current presentation value, not the previous logical target.
- Carry velocity through interruption and reversal; avoid a visible velocity discontinuity.
- Hand release velocity from drag to spring.
- Project momentum before choosing a snap point: `current + (velocity / 1000) × rate / (1 − rate)`, with a normal deceleration rate near `0.998` unless the product intentionally uses a faster model.
- Use independent X and Y motion values when their velocities differ.

## 5. Performance

- Animate compositor-friendly `transform` and `opacity` whenever possible.
- Avoid per-frame layout reads followed by writes without batching.
- Audit long main-thread tasks, oversized blur regions, large box-shadow repaints, and unnecessary continuously running loops.
- Use `requestAnimationFrame` for pointer-coupled updates.
- Apply `will-change` only shortly before motion; do not leave it on large surfaces indefinitely.
- Verify actual frame behavior on a representative device, not only in code review.

## 6. Accessibility

- Implement `prefers-reduced-motion: reduce` with static changes or short cross-fades; remove parallax, large slides, elastic overshoot, and non-essential loops.
- Where supported, honor reduced transparency and increased contrast by replacing blur with a more opaque surface and defined boundary.
- Never make motion the only indication of status or completion.
- Avoid full-viewport moving backgrounds, abrupt brightness changes, and slow repetitive oscillations.
- Keep focus visible and logically ordered during animated overlays.
- Preserve a keyboard alternative for drag, reorder, resize, and swipe actions.

## 7. Cohesion and tokens

- Inventory duration, easing, spring, opacity, blur, and distance values before proposing new ones.
- Consolidate repeated values into semantic tokens rather than adding a parallel scale.
- Use the same motion for components that share role and geometry.
- Keep high-frequency controls quiet; reserve stronger motion for meaningful state changes.
- Ensure motion matches Calm Paper depth: planar persistent structure, tactile controls, restrained paper lift, and floating temporary layers.

## 8. Missed opportunities

Report additive opportunities separately from defects. Good candidates include:

- a jarring state replacement that needs continuity;
- a drag or resize operation without continuous feedback;
- a local save, completion, or error that lacks causal confirmation;
- a rare onboarding or success moment where restrained delight would reinforce understanding;
- an overlay whose source relationship is unclear without an anchored transition.

## Severity

- **HIGH:** repeated feel-breaking behavior, blocked input, incorrect gesture physics, dropped frames, missing essential reduced-motion handling, or motion that impairs keyboard use.
- **MEDIUM:** wrong origin or direction, non-interruptible dynamic UI, inconsistent token use, excessive duration, or unclear hierarchy.
- **LOW:** polish, token consolidation, subtle continuity, or rare delight opportunities.

Order findings by leverage: user impact multiplied by frequency, divided by implementation cost and regression risk.

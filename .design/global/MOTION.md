---
id: global.motion
kind: global
version: 1.1.0
status: normative
extends: []
---

# Global motion contract

Motion explains response, continuity, spatial relationship, causality, or rare meaningful acknowledgement. It is not a decorative tax on frequent work.

## Motion roles

| Role | Default | Use |
| --- | --- | --- |
| `instant` | 0–80ms | direct state acknowledgement and high-frequency keyboard commands |
| `fast` | 100–160ms | hover, press, selection, compact disclosure |
| `standard` | 120–180ms | menus, popovers, tooltips, and route-local transitions |
| `spatial` | 150–240ms or an interruptible spring | sheets, panes, navigation hierarchy, direct-manipulation completion |
| `celebratory` | exceptional and optional | rare acknowledgement that never blocks work |

Durations are ranges, not a reason to create one-off values. Products bind these roles to executable tokens or native system motion. Native platforms should use their standard motion systems when those preserve familiarity and accessibility.

## Direct manipulation

Dragged or scrubbed content tracks input continuously, preserves the original grab offset, and can be redirected at any moment. Gesture completion starts from the presented value and inherits release velocity when physical continuity matters. Do not lock input while a user-driven transition finishes.

## Easing and springs

Use decelerating curves for entry and accelerating curves for exit only when the relationship remains clear. Mirror reversible paths. Use critically damped or near-critically damped springs for directly manipulated UI; reserve visible bounce for momentum-driven physical interactions. A spring is selected for interruptibility and velocity continuity, not novelty.

## Frequency

High-frequency actions favor immediate change. Menus, command palettes, list selection, keyboard navigation, drag targets, and routine state changes must not become slower through ornamental sequencing. Marketing may use more expressive motion only when reading and conversion remain immediate.

## Performance

Animate compositor-friendly properties where possible, bound layout work, avoid `transition: all`, and test with realistic content and low-powered devices. Motion must not create layout shift, delay input, hide incomplete work, or consume sustained resources after it is no longer visible.

## Reduced motion

When reduced motion is requested, preserve feedback and hierarchy with direct change or a short cross-fade. Remove parallax, large translation, zoom, spring overshoot, auto-play spatial movement, and decorative sequencing. Reduced transparency and high-contrast settings may also require replacing materials or blur.

## Audit workflow

The read-only audit process lives in `../sources/ANIMATION-AUDIT.md` and the canonical `motion-audit` Skill. Audits separate evidence, findings, missed opportunities, and executor-ready plans; they do not mutate product source.

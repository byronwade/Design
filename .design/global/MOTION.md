---
id: global.motion
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global motion contract

Motion explains response, continuity, spatial relationship, causality, or rare meaningful acknowledgement. It is not a decorative tax on frequent work.

## Principles

1. Feedback begins immediately.
2. Direct manipulation tracks input continuously.
3. User-driven transitions remain interruptible.
4. Velocity carries across the seam between gesture and animation when appropriate.
5. Entry and exit preserve spatial origin and use symmetric paths unless a changed relationship requires otherwise.
6. High-frequency keyboard actions favor immediate state change over flourish.
7. Animate compositor-friendly properties and keep layout work bounded.
8. One motion language is shared through semantic duration, easing, and spring roles.

## Motion roles

- **instant:** state acknowledgment and high-frequency commands
- **fast:** hover, press, compact disclosure, selection
- **standard:** menus, popovers, route-local transitions
- **spatial:** sheets, panes, navigation hierarchy, direct manipulation completion
- **celebratory:** rare, optional, and never blocks task completion

Native platforms should use their standard motion systems and springs when those preserve familiarity and accessibility. Web motion should not imitate physical behavior it cannot make interruptible.

## Reduced motion

When reduced motion is requested, preserve state and hierarchy with direct change or short cross-fade. Remove parallax, large translation, zoom, spring overshoot, and decorative sequencing. Never disable essential feedback.

## Audit workflow

The read-only audit process lives in `../sources/ANIMATION-AUDIT.md` and the canonical `motion-audit` Skill. Audits separate evidence, findings, missed opportunities, and executor-ready plans; they do not mutate product source.

---
name: motion-audit
description: Perform a read-only, evidence-based audit of animation and interaction motion, then write self-contained implementation plans. Do not modify product source code.
---

# Motion Audit

1. Read `.design/global/MOTION.md`, the selected target contract, and `.design/sources/ANIMATION-AUDIT.md`.
2. Map the stack, motion libraries, token conventions, gesture handlers, animation frequency, and reduced-motion behavior.
3. Audit purpose, frequency, easing, duration, origin, physicality, interruptibility, performance, accessibility, cohesion, and missed opportunities.
4. Re-read every cited location and remove speculative or intentional findings.
5. Rank findings by user impact divided by implementation effort.
6. Create self-contained plans only under `plans/` or `animation-plans/`; include exact paths, current evidence, target values, steps, boundaries, and verification.
7. Do not install dependencies, mutate product source, run formatters, commit, or push while performing the audit.

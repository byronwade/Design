### Responsive and accessibility

- **Do:** Change representation at breakpoints rather than mechanically shrinking desktop geometry.
- **Do:** Keep a docked sidebar and optional rails at 1280px and above.
- **Do:** Overlay or hide rails from 1024–1279px when primary content would become too narrow.
- **Do:** Use a drawer sidebar and overlay rails from 768–1023px.
- **Do:** Use one primary column below 768px and preserve horizontal operational scrolling.
- **Do:** Increase effective touch targets without visually inflating every control.
- **Do:** Maintain WCAG AA text contrast and visible non-text boundaries.
- **Do:** Provide complete keyboard focus order and operation.
- **Do:** Support 200%+ zoom, reduced motion, high contrast, and screen-reader equivalents.
- **Do:** Provide textual equivalents for spatial presence, charts, visual diffs, and status.
- **Do:** Keep pointer targets at least 24×24 CSS pixels with sufficient spacing.
- **Don't:** Remove keyboard access because a control is visually compact.
- **Don't:** Rely on color alone for status, selection, or error.
- **Don't:** Hide focus outlines or replace them with imperceptible shadows.
- **Don't:** Squeeze boards, timelines, and tables into unusable single-column approximations.
- **Don't:** Trap focus in overlays or fail to restore it to the trigger.
- **Don't:** Auto-play non-essential motion without reduced-motion support.
- **Don't:** Use inaccessible icon-only controls without names.

### Marketing and dashboards

- **Do:** Use a clear public header with real product categories and one primary CTA.
- **Do:** Use a specific hero headline, concise mechanism, product proof, and restrained visual.
- **Do:** Organize marketing sections around outcomes and narrative flow.
- **Do:** Use subtle animation to clarify product behavior.
- **Do:** Use application homes to surface current work, attention, and meaningful progress.
- **Do:** Use dashboards only when several independent signals support a recurring decision.
- **Do:** Prefer a strong list, table, or queue over a generic grid of equal cards.
- **Don't:** Make marketing pages imitate the dense authenticated application.
- **Don't:** Hide useful public navigation behind an overly minimal header.
- **Don't:** Use generic gradient blobs and stock illustrations as primary product evidence.
- **Don't:** Create twelve equal feature cards with icons and one-line claims.
- **Don't:** Use a dashboard as a default landing page merely because the product has data.
- **Don't:** Repeat the same metric in giant KPI cards and again in the main table.

### Quality and implementation

- **Do:** Inspect the existing repository, shell, components, tokens, and responsive behavior before redesigning.
- **Do:** Reuse sound primitives before adding new ones.
- **Do:** Add shared tokens and components before scattering one-off CSS.
- **Do:** Preserve behavior, accessibility conventions, and tests.
- **Do:** Verify wide and constrained viewport behavior.
- **Do:** Test keyboard, screen reader, focus, zoom, contrast, reduced motion, loading, empty, error, and permission states.
- **Do:** Check runtime console/network behavior and visual regressions for user-facing changes.
- **Do:** Document exceptions with rationale and scope.
- **Don't:** Create a separate visual specification that can drift indefinitely from code.
- **Don't:** Introduce one-off colors, spacing, radius, or shadows without token review.
- **Don't:** Ship placeholder controls that do not work.
- **Don't:** Declare a visual change complete based only on a static screenshot.
- **Don't:** Use a new component library merely to avoid understanding the existing system.
- **Don't:** Trade keyboard or accessibility behavior for visual polish.

## Design review scorecard

Score 0–4 for location stability, primary path, density fit, control hierarchy, component economy, typography, spacing, color, depth, interaction scope, keyboard, accessibility, responsive behavior, state completeness, content quality, and implementation integrity.

Production-ready work should normally score at least 3 in every category and have no accessibility or functional blocker.

## Companion files

- `calm-paper-workbench.tokens.json` — canonical token bundle.
- `calm-paper-workbench.css` — starter shell and component CSS.
- `calm-paper-workbench-review-checklist.md` — portable review checklist.

## Reusable brief

Design a calm, professional, feature-rich application using the Calm Paper Workbench system. Choose an approved shell profile, keep location stable, compress operational work, relax navigation, use warm paper surfaces, compact 28/32/36px controls, one restrained accent, soft borders, role-based elevation, progressive disclosure, keyboard/command access, smallest-region updates, responsive representation changes, and complete accessibility/state verification. Do not create generic equal-card dashboards, giant controls, duplicated navigation, nested floating cards, heavy glass/gradients, or decorative filler.

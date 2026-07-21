# Archived v1 preference profile

Status: superseded source summary. The canonical Calm Paper Workbench specification and tokens take precedence.

This file preserves high-confidence concepts from the earlier source-backed UI/UX specification that are not always stated as explicitly in the current canonical document.

## Evidence discipline

Historical design guidance should distinguish:

- **Confirmed:** directly stated as a target, standing rule, or non-negotiable.
- **Repeated pattern:** implemented or repeated across multiple sources.
- **Extrapolated:** applied to a context, such as public marketing, where direct historical evidence is incomplete.
- **Open:** conflicting or unrecoverable; validate rather than silently standardizing.

Authoritative product direction should override prototype code when the two disagree. Implementation is evidence of taste, not permission to preserve a superseded pattern. Design decisions should resolve to source, shared tokens, components, tests, and accepted decision records rather than a browser-only visual treatment.

## Earlier preference character

- Calm, compact, artifact-first, light-first, professional, high-control, and low-chrome.
- One primary artifact or task owns the visual hierarchy at a time.
- Headers, rails, tabs, and status surfaces remain compact; secondary tools appear contextually.
- Warm white and neutral grays are the quality benchmark. Dark mode should be complete but should not drive the primary visual language.
- Application controls generally remain within a 24–36px range.
- Primary actions may use restrained near-black or the current warm accent treatment; brand color should not become permanent decoration.
- Typography, spacing, tonal surfaces, and alignment establish hierarchy before border or shadow.
- A sidebar exists only for durable hierarchy or an intentional vertical-tab model, not merely because the product is complex.
- Every important action is keyboard reachable and mouse complete.
- Cards are reserved for genuine objects, decisions, comparisons, or floating focus surfaces; inline facts, rows, and hairlines are preferred for routine grouping.

## Artifact-first and AI-specific behavior

- The artifact, task, or content remains primary; navigation, chat, agents, and controls are subordinate.
- Do not make a permanent chat transcript, composer, or vague status prose the core product model.
- Show real scope, work, evidence, decisions, ownership, and state. Avoid fake typing, glowing-agent theater, or animations that impersonate intelligence or progress.
- Keep audit history available when useful, but do not allow it to displace the primary work surface.
- Loading and progress must represent actual behavior. Do not ship dead controls or simulated production claims.

## Shell and navigation implications

- Use a quiet product top bar rather than public-site mega-navigation inside an application.
- Header and sidebar may coexist only when they represent different scopes.
- Do not duplicate destinations between header, sidebar, local tabs, and dock.
- Use contextual drawers, overlays, inspectors, and bottom panels without shifting the main content when temporary UI appears.
- Escape closes the topmost temporary layer, restores focus to its invoker, and never discards unsaved work without proportional confirmation.

## No-content-shift rule

Temporary UI should overlay, dock within reserved space, or animate without unexpectedly moving the primary artifact. Verify before-and-after geometry for popovers, inspectors, drawers, toasts, banners, validation, loading, and agent/status surfaces. Preserve scroll, selection, and focus wherever the underlying task has not changed.

## Quality gates retained from v1

- Test full keyboard completion, visible focus, predictable Escape, contrast, names, roles, states, and reduced motion.
- Review default, hover, active, focus, disabled, loading, success, error, empty, overflow, offline, and permission states.
- Capture wide and constrained responsive views, including representative mobile, tablet, laptop, desktop, and large-desktop widths.
- Use a source-backed review score that gives substantial weight to primary hierarchy, restraint, navigation clarity, responsive behavior, and accessibility.
- Do not declare a design complete from a static screenshot alone; verify actual behavior and runtime state.

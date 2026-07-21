---
id: quality.review
kind: quality
version: 1.0.0
status: normative
extends:
  - quality.index
---

# Design and implementation review

## Severity

- **Blocker:** exclusion, data loss, privacy/security exposure, misleading state, irreversible unintended action, broken primary navigation, inaccessible core work, or false evidence.
- **Issue:** material failure in comprehension, efficiency, consistency, responsive behavior, state handling, performance, or system coherence.
- **Suggestion:** craft, distinctiveness, or maintainability improvement that does not block the task.

Report location, severity, violated rule or principle, evidence, and the smallest credible correction.

## Review sequence and scorecard

Score each applicable category from 0–4. A production-ready change normally scores at least 3 in every category and has no accessibility or functional blocker.

| Category | Review question |
| --- | --- |
| Situation | Are the actual person, moment, environment, permissions, data, and adverse conditions represented? |
| Location stability | Can the person explain where they are, what changed, and how to return? |
| Primary path | Is the principal outcome obvious without hiding necessary capability? |
| Density fit | Does each region’s density support reading, comparison, or throughput? |
| Control scope | Does placement reveal global, object, view, local, metadata, or temporary effect? |
| Component economy | Are approved primitives reused without card or variant proliferation? |
| Typography and content | Are hierarchy, terminology, labels, status, and recovery specific and legible? |
| Spacing, color, depth | Do semantic roles and integrated surfaces create calm hierarchy without decorative noise? |
| Interaction and keyboard | Are commands, focus, shortcuts, gestures, drag, escape, and restoration complete? |
| Accessibility | Do semantics, screen reader, zoom/scaling, contrast, targets, reduced motion, and alternatives work? |
| Responsive/platform | Does representation adapt to content and platform conventions rather than shrink? |
| State completeness | Do realistic, long, empty, loading, partial, stale, error, permission, offline, and conflict states work? |
| Momentum | Are context, drafts, selection, scroll, saved views, bulk work, and recovery preserved? |
| Trust | Are state, scope, permission, evidence, uncertainty, consequence, and authority truthful? |
| Identity | Is the result shaped by the domain rather than generic software styling? |
| Performance/resilience | Is response immediate, layout stable, large data usable, and failure locally recoverable? |
| Implementation integrity | Do source, component mapping, tests, fixtures, rendered output, and documentation agree? |

## Definition of done

- [ ] The human, outcome, context, domain, desired feeling, signature, and rejected defaults are explicit.
- [ ] Target profile, shell, layout archetype, page/flow, regions, and scroll owners are documented.
- [ ] Project component mappings and golden references were inspected.
- [ ] Controls are placed according to scope and one dominant action exists per action region.
- [ ] Advanced capability remains discoverable through context, commands, inspectors, or progressive disclosure.
- [ ] Realistic and adverse states preserve useful context and expose recovery.
- [ ] Keyboard, semantics, focus, announcements, zoom/scaling, contrast, touch, drag alternatives, and non-color cues are verified.
- [ ] Responsive transformations and native platform conventions preserve the task.
- [ ] Motion is purposeful, interruptible where user-driven, performant, and reduced-motion compatible.
- [ ] Performance, large data, connectivity, localization, privacy, and security risks were tested where applicable.
- [ ] Consequential actions expose scope, evidence, approval, undo, rollback, or compensation.
- [ ] Every completion or verification claim is backed by fresh evidence tied to the exact revision/environment.
- [ ] Shared tokens and production components replace duplicated one-off values.
- [ ] Intentional departures, new system decisions, and baseline changes are recorded.
- [ ] Static contract validation, repository checks, runtime checks, accessibility checks, and visual review pass.

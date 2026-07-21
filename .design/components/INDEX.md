---
id: components.registry
kind: components
version: 1.1.0
status: normative
extends: []
---

# Component intent registry

Select a component by user intent, scope, risk, frequency, state, input mode, and platform—not by visual resemblance.

## Decision sequence

1. What outcome does the person need?
2. What scope will change?
3. Is the interaction navigation, command, selection, input, disclosure, feedback, collaboration, visualization, or automation?
4. What is the risk, reversibility, permission, and evidence requirement?
5. How frequently is it used and with which input modes?
6. Which approved production component represents that intent on the selected platform?
7. Which variant and state are valid?
8. How does it transform at constrained space, large text, or another input mode?

## Registries

- `ACTIONS.md`: buttons, command items, links, toggles, destructive actions
- `FORMS.md`: fields, choices, validation, search inputs, editors, composers
- `NAVIGATION.md`: global and local navigation, tabs, bars, breadcrumbs, menus
- `COMMANDS-SEARCH.md`: command graph, quick access, search, filters, saved views, bulk actions
- `DATA-DISPLAY.md`: lists, tables, boards, timelines, cards, inspectors
- `VISUALIZATION.md`: metrics, charts, distributions, progress, textual equivalents
- `FEEDBACK-OVERLAYS.md`: status, alerts, toasts, progress, dialogs, sheets, popovers
- `COLLABORATION.md`: comments, threads, mentions, presence, activity, notifications
- `AGENTIC.md`: intent, plans, scope previews, work status, evidence, review, takeover
- `WORKBENCH.md`: editor tabs, splits, panels, inspectors, resizers, auxiliary windows

A platform overlay may substitute a native primitive. It must preserve intent, state, consequence, evidence, and accessibility. The production registry in `../project/COMPONENTS.md` identifies the actual implementation to use.

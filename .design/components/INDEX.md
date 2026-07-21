---
id: components.registry
kind: components
version: 1.0.0
status: normative
extends: []
---

# Component intent registry

Select a component by user intent, scope, risk, frequency, state, and input mode—not by visual resemblance.

## Decision sequence

1. What outcome does the person need?
2. What scope will change?
3. Is the action navigation, command, selection, input, disclosure, or feedback?
4. What is the risk and reversibility?
5. How frequently is it used?
6. Which approved component represents that intent on the selected platform?
7. Which variant and state are valid?
8. How does it transform at constrained space or another input mode?

## Registries

- `ACTIONS.md`: buttons, command items, links, toggles, destructive actions
- `FORMS.md`: fields, choices, validation, search, editors, composers
- `NAVIGATION.md`: global and local navigation, tabs, bars, breadcrumbs, menus
- `DATA-DISPLAY.md`: lists, tables, boards, timelines, cards, inspectors
- `FEEDBACK-OVERLAYS.md`: status, alerts, toasts, progress, dialogs, sheets, popovers

A platform overlay may substitute a native primitive. It must preserve the intent, state, consequence, and accessibility contract.

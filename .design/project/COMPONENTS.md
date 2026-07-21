---
id: project.components
kind: project
version: 1.0.0
status: project-owned
---

# Production component and pattern registry

This is the bridge from design intent to shipped implementation. Keep it synchronized with code, stories, tests, design-library assets, and migrations. An empty mapping is a visible system gap.

## Source hierarchy

1. compliant production component API, tests, and stories
2. approved design-library component and variables
3. golden rendered reference
4. documented pattern contract
5. model-generated approximation only as a proposal

## Components

| Intent ID | Production component/API | Approved variants | Story or example | Design mapping | Profiles | Status/owner |
| --- | --- | --- | --- | --- | --- | --- |
| `action.button` |  |  |  |  |  | gap |
| `form.text-field` |  |  |  |  |  | gap |
| `navigation.global` |  |  |  |  |  | gap |
| `feedback.dialog` |  |  |  |  |  | gap |

## Shells and patterns

| Contract | Production implementation | Reference route/story | Profiles | Status/owner |
| --- | --- | --- | --- | --- |
| standard application shell |  |  |  | gap |
| deep workbench shell |  |  |  | gap |
| collection page |  |  |  | gap |
| object detail page |  |  |  | gap |

## Commands

| Command ID | Scope | Surfaces | Shortcut | Permission/evidence | Implementation |
| --- | --- | --- | --- | --- | --- |
|  |  | button/menu/palette |  |  |  |

## Registry rules

- use stable semantic intent IDs rather than framework component names
- map one command implementation to all of its surfaces
- list deprecated and replacement APIs during migration
- do not mark a component approved without applicable states, accessibility, responsive behavior, examples, and tests
- record a design-system gap when a required intent has no approved mapping

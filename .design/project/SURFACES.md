---
id: project.surfaces
kind: project
version: 1.0.0
status: project-owned
---

# Product surface and layout registry

Every durable route, native screen, window, major modal flow, and public page has one structural record. This prevents each agent or feature team from inventing a new shell and page grammar.

| Surface ID | Target/root | Person and primary outcome | Shell | Layout archetype | Page/flow pattern | Regions and scroll owners | Critical states | Production route/view | Golden reference | Status/owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  | gap |

## Surface contract

For each adopted surface, document:

- object identity, global destination, representation, and mode
- global, object, view, local, metadata, and temporary control ownership
- primary and nested scroll owners
- minimum useful dimensions and responsive transformation sequence
- supported input modes and platform-specific replacements
- loading, empty, partial, stale, error, permission, offline, conflict, and destructive states
- preserved URL/navigation/window state, drafts, selection, filters, open tools, and return path
- production implementation, fixtures, tests, component mappings, and reference evidence

## New surfaces

A new route does not automatically require a new page pattern. Select an existing shell, layout archetype, and page/flow first. Propose a shared pattern gap only when repeated structural responsibility cannot be represented safely by the existing registry.

---
id: patterns.shells
kind: patterns
version: 1.1.0
status: normative
extends: []
---

# Application shell patterns

Choose a shell before composing page components. A shell owns global navigation, window or browser chrome integration, persistent utilities, major regions, viewport behavior, and layout restoration. A layout archetype then defines the task body.

## Selection algorithm

1. Authenticated multi-destination product with recurring operational work → **standard application shell**.
2. Editors, browsers, canvases, terminals, inspectors, dockable tools, or multiple simultaneous artifacts → **deep workbench shell**.
3. One artifact temporarily dominates and secondary navigation would distract → enter **focus mode** within the current shell.
4. Public marketing, authentication, onboarding, embedded tool, or genuinely narrow one-off workflow → **header-first or minimal shell**.
5. When both a full header and sidebar would repeat the same destinations, choose one global navigation owner.

## Standard application shell

```text
product environment
├── global navigation
├── inset work surface
│   ├── optional object/location region
│   ├── optional view-control region
│   └── task body
└── optional global utility region
```

The Warm Paper desktop reference uses a 240px global navigation region, 8px work-surface inset, 12px outer radius, 44px location/view bars, and an optional 36px utility strip. Native overlays replace literal geometry when platform chrome or adaptive navigation requires it.

Use the location region for current-object identity and stable object actions. Use the view-control region only for representation, filters, grouping, display, and inspector controls. Omit either region when it has no semantic responsibility.

## Deep workbench shell

```text
window or browser frame
├── activity rail or global command owner
├── contextual navigator
├── editor or artifact groups
├── optional inspector
├── optional bottom panel
├── status region
└── optional auxiliary windows
```

The workbench is one application frame, not a collection of separately rounded tools. Regions dock, resize, collapse, restore, and maintain active ownership. Commands, shortcuts, open objects, layout state, and dirty state survive representation changes.

## Focus mode

Focus mode is a reversible state of another shell. Keep artifact identity, active work, critical status, and essential local actions. Hide, collapse, or overlay global navigation, inspector, bottom panel, secondary tabs, and low-priority status. Command access, keyboard shortcuts, edge reveal, explicit region toggles, and saved-layout restoration remain available. Exiting restores prior layout, selection, open tools, and scroll.

## Header-first or minimal shell

Use for public marketing, authentication, focused setup, embedded tools, or narrow workflows. A public header may own brand, product categories, resources, pricing, sign-in, and one primary conversion. Authentication and setup normally use minimal brand and help. An embedded tool does not duplicate navigation already owned by its host.

Do not apply this shell to an authenticated multi-destination application when a persistent navigation owner would materially improve orientation.

## Shell evidence

State the selected shell, global navigation owner, persistent regions, viewport owner, scroll owners, command location, object identity location, responsive transformation, platform replacement, focus-mode behavior, and restoration behavior.

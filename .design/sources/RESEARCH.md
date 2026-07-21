# Research basis

Verified on 2026-07-21. These are supporting sources; the operational contract records the adopted rules and remains the source used in product work.

## Google DESIGN.md

- Repository and specification: https://github.com/google-labs-code/design.md
- CLI package reviewed and pinned: `@google/design.md` `0.3.0`
- Status: `alpha`
- Portable model: YAML token front matter plus Markdown rationale
- Current top-level keys used here: `version`, `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`
- Canonical Markdown order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do’s and Don’ts
- Commands used by this project: `lint`, `diff`, `export`, and `spec`
- Cross-platform executable alias: `designmd`
- DTCG export is used for interoperable token output

Adoption: `.design/DESIGN.md` stays within Google’s schema and root `DESIGN.md` is an exact verified mirror. Inheritance, profiles, source authority, project mappings, quality rules, and richer contracts live outside the YAML front matter.

## Design-token interoperability

- DTCG Design Tokens Format Module: https://www.designtokens.org/TR/2025.10/format/

Adoption: semantic token roles remain canonical; generated platform outputs must not become competing token sources.

## Agent Skills and progressive disclosure

- Agent Skills specification: https://agentskills.io/specification
- Google Stitch Skills reference: https://github.com/google-labs-code/stitch-skills

Adoption: canonical Skills use a small `SKILL.md`, target-specific generated context, and references loaded only when required. Agent-specific installation creates thin adapters rather than duplicated full systems.

## Apple platforms

- Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Navigation and search: https://developer.apple.com/design/human-interface-guidelines/navigation-and-search
- Toolbars: https://developer.apple.com/design/human-interface-guidelines/toolbars
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- Adopting current materials/navigation behavior: https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass

Adoption: Apple has a shared mobile/tablet base with separate iPhone and iPadOS overlays. Tab bars remain navigation-only; toolbars express current-view actions; iPadOS is resizable and multi-input; macOS integrates menu commands, title bars, toolbars, windows, and restoration. Direct manipulation remains immediate, interruptible, and velocity-aware.

## Android

- Adaptive app quality: https://developer.android.com/docs/quality-guidelines/adaptive-app-quality
- Adaptive layouts: https://developer.android.com/develop/ui/compose/layouts/adaptive
- List-detail navigation: https://developer.android.com/develop/ui/compose/layouts/adaptive/list-detail
- Accessibility: https://developer.android.com/guide/topics/ui/accessibility

Adoption: actual window size, posture, insets, and input modes drive navigation and pane composition. Canonical list-detail, feed, supporting-pane, predictive-back, edge-to-edge, and multi-window behavior are first-class.

## Windows

- Windows app design: https://learn.microsoft.com/windows/apps/design/
- NavigationView: https://learn.microsoft.com/windows/apps/design/controls/navigationview
- Title bar: https://learn.microsoft.com/windows/apps/develop/title-bar
- Motion: https://learn.microsoft.com/windows/apps/design/motion/
- Accessibility: https://learn.microsoft.com/windows/apps/design/accessibility/accessibility

Adoption: system title-bar behavior, adaptive NavigationView, command surfaces, keyboard/access keys, pointer and touch input, high contrast, and WinUI motion remain native.

## Linux desktop

- GNOME HIG: https://developer.gnome.org/hig/
- GNOME navigation: https://developer.gnome.org/hig/patterns/nav/index.html
- GNOME adaptiveness: https://developer.gnome.org/hig/guidelines/adaptive.html
- KDE HIG: https://develop.kde.org/hig/
- KDE accessibility: https://develop.kde.org/hig/accessibility/

Adoption: Linux uses a shared integration base plus explicit GNOME and KDE Plasma overlays rather than a generic visual compromise.

## Web semantics, accessibility, and performance

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- HTML Living Standard: https://html.spec.whatwg.org/
- Web performance guidance: https://web.dev/learn/performance/

Adoption: semantic HTML, browser history/zoom/selection, WCAG 2.2 AA, established composite-widget keyboard patterns, responsive reflow, stable layout, progressive enhancement, and measured interaction performance are the web baseline.

## Project sources

- `PRIMARY.md` and its ordered parts preserve the Warm Paper Workbench system.
- `DESIGN-PRINCIPLES.md` preserves Calm Capability product judgment and review criteria.
- `APPLE-DESIGN.md` and its ordered parts preserve the Apple-oriented design and fluid-interaction source.
- `ANIMATION-AUDIT.md` preserves the specialized read-only motion-advisor workflow.
- `COVERAGE.md` traces durable source requirements to operational owners.

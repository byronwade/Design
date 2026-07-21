# Research basis

Verified on 2026-07-21. These are supporting sources; the operational contract records the adopted rules.

## Google DESIGN.md

- Repository and specification: https://github.com/google-labs-code/design.md
- Current CLI package reviewed: `@google/design.md` `0.3.0`
- Status: `alpha`
- Portable file model: YAML token front matter plus Markdown rationale
- Current top-level keys: `version`, `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`
- Canonical Markdown order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do’s and Don’ts
- Commands used by this project: `lint`, `diff`, `export`, and `spec`
- Cross-platform executable alias: `designmd`

Adoption: `.design/DESIGN.md` stays within that schema. This project’s inheritance graph, profile selection, source authority, and richer contracts remain outside the YAML front matter.

## Agent Skills

- Specification: https://agentskills.io/specification
- Google Stitch Skills reference: https://github.com/google-labs-code/stitch-skills

Adoption: canonical Skills use a small `SKILL.md` and progressive disclosure through references. Agent-specific installation creates thin adapters rather than full duplicated Skills.

## Apple platforms

- Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Toolbars: https://developer.apple.com/design/human-interface-guidelines/toolbars
- Navigation and Liquid Glass guidance: https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass

Adoption: tab bars remain navigation-only; toolbars express current-view actions; macOS toolbars integrate with title bars and menu commands; Apple motion remains direct, interruptible, and velocity-aware.

## Android

- Adaptive app quality: https://developer.android.com/docs/quality-guidelines/adaptive-app-quality
- Material 3 adaptive layouts: https://developer.android.com/develop/ui/compose/layouts/adaptive
- List-detail navigation: https://developer.android.com/develop/ui/compose/layouts/adaptive/list-detail

Adoption: window size and posture drive navigation and pane composition; canonical list-detail/feed/supporting-pane layouts and predictive back are first-class.

## Windows

- Windows app design: https://learn.microsoft.com/windows/apps/design/
- NavigationView: https://learn.microsoft.com/windows/apps/design/controls/navigationview
- Title bar: https://learn.microsoft.com/windows/apps/develop/title-bar
- Motion: https://learn.microsoft.com/windows/apps/design/motion/

Adoption: system title-bar behavior, adaptive NavigationView, command surfaces, input modes, high contrast, and WinUI motion remain native.

## Linux desktop

- GNOME HIG: https://developer.gnome.org/hig/
- GNOME navigation: https://developer.gnome.org/hig/patterns/nav/index.html
- GNOME adaptiveness: https://developer.gnome.org/hig/guidelines/adaptive.html
- KDE HIG: https://develop.kde.org/hig/

Adoption: Linux is split into a shared integration base plus GNOME and KDE Plasma overlays.

## Web accessibility and interaction

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

Adoption: semantic HTML, browser behavior, WCAG 2.2 AA, and established composite-widget keyboard patterns are the web baseline.

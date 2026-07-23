# Source coverage and traceability

This map confirms that durable requirements from the governing sources have an operational home. Source archives preserve provenance; the owners below are the contracts agents and humans use in ordinary work.

| Source concern | Operational owner |
| --- | --- |
| Warm Paper visual identity, token values, compact control scale | `DESIGN.md`, `global/FOUNDATIONS.md`, `components/ACTIONS.md` |
| calm capability, situation, momentum, trust, identity, coherence | `global/PRINCIPLES.md`, `global/TRUST.md`, `quality/REVIEW.md` |
| global shell, location/view bars, stable context | `global/LAYOUT.md`, `global/INFORMATION-ARCHITECTURE.md`, `patterns/SHELLS.md` |
| standard SaaS, deep workbench, focus mode, header-first | `patterns/SHELLS.md`, `components/WORKBENCH.md` |
| centered, document/rail, operational, feed, settings layouts | `patterns/LAYOUTS.md` |
| list, detail, form, dashboard, marketing, onboarding pages | `patterns/PAGES.md` |
| loading, empty, error, permission, offline, conflict, long content | `patterns/STATES.md` |
| creation, destructive, bulk, permission, long-running, agent flows | `patterns/FLOWS.md` |
| command palette, global/local search, filters, saved views | `components/COMMANDS-SEARCH.md`, `global/INFORMATION-ARCHITECTURE.md` |
| forms, navigation, data, overlays, charts | corresponding documents under `components/` |
| comments, mentions, presence, concurrent work | `components/COLLABORATION.md` |
| agent plans, scope, evidence, review, takeover | `components/AGENTIC.md`, `global/TRUST.md` |
| Apple fluid interaction and platform behavior | `global/INTERACTION.md`, `global/MOTION.md`, Apple/iOS/iPadOS/macOS overlays |
| Android adaptive behavior | `verticals/mobile/ANDROID.md` |
| Windows, GNOME, KDE desktop conventions | corresponding desktop overlays |
| web application versus marketing behavior | `verticals/web/APP.md`, `verticals/web/MARKETING.md` |
| Electron/Tauri/native-host behavior | `verticals/hybrid/DESKTOP-WEBVIEW.md` plus host overlay |
| accessibility and responsive release gates | `global/ACCESSIBILITY.md`, verticals, `quality/REVIEW.md`, `quality/RULES.json` |
| performance, resilience, fresh evidence | `global/PERFORMANCE.md`, `quality/EVIDENCE.md` |
| design lint rules and review scorecard | `quality/RULES.json`, `quality/REVIEW.md` |
| project-specific product, surfaces, themes, assets, terminology, trust states | consuming `design/PROJECT.md` |
| production components, patterns, stories, tests, design mappings, golden screens | consuming `design/COMPONENTS.md` and `design/REFERENCES.md` |
| project decisions, exceptions, gaps, migrations, and baseline approvals | consuming `design/DECISIONS.md` |
| optional component source, reusable blocks, app types, visual-reference policy, and AI composition policy | consuming `design/COMPOSITION.json` |
| package-engine governance and change history | `governance/DECISIONS.md`, `governance/CHANGELOG.md` |

When a governing source introduces a durable requirement with no operational owner, add the owner and update this map in the same change.

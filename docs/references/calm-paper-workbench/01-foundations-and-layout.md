# Personal UI/UX Design System: Calm Paper Workbench

Version 1.0.0 · Living specification · 21 July 2026

> **Core rule:** Keep location stable. Let the work change shape. Reveal depth beside the work without allowing it to dominate.

## Purpose

This document consolidates recurring UI/UX preferences into an implementation-ready system for professional SaaS, operational, project, admin, developer-tool, and agent-facing interfaces. It separates durable preferences from contextual shell decisions and proposed defaults.

## Executive DNA

- Build a calm professional instrument: visually minimal, operationally dense, and deeply capable.
- Use a warm cream canvas and warm-white paper surfaces, compact typography, restrained color, thin warm borders, tactile controls, and progressive disclosure.
- Use 28px compact, 32px normal, and 36px high-emphasis controls.
- Keep navigation stable. Use a 240px sidebar for standard SaaS apps, a slim rail plus contextual navigator for deep workbenches, and a collapsible-to-zero focus mode.
- Do not duplicate the same global navigation in both a full header and a full sidebar.
- Compress lists, boards, tables, timelines, queues, and triage. Relax documents, settings, onboarding, authentication, and empty states.
- Prefer documents, lists, tables, boards, timelines, and flat regions over generic equal-card dashboards.
- Make every meaningful action keyboard operable and command reachable.
- Update the smallest region capable of expressing a state change.
- Treat responsive behavior, accessibility, runtime correctness, and state completeness as design requirements.

## Shell profiles

### 1. Standard SaaS shell

```text
Outer warm canvas
├── Global sidebar: 240px
├── Inset workspace surface: 8px inset, 12px radius
│   ├── Optional location bar: 44px
│   ├── Optional view bar: 44px
│   └── Task-specific body
└── Optional global utility strip: 36px
```

Use for authenticated multi-destination applications. Sidebar rows are 28px. Inactive items are unboxed; active items use a warm neutral selected fill.

### 2. Deep workbench shell

Use a slim activity rail, a 220–280px contextual navigator, flexible editor/browser/workbench groups, a 320/384px inspector, a resizable bottom panel, and optional status/command layers. Regions may hide, move, resize, split, and restore.

### 3. Focus mode

Collapse global navigation, inspector, bottom panel, and low-priority chrome to zero or overlays. Preserve the current artifact, selection, scroll, and restoration state.

### 4. Header-first / header-only exception

Use for public marketing, authentication, embedded tools, or genuinely narrow workflows. Do not use a full public-style global header above a dense authenticated sidebar application.

## Layout archetypes

### Centered action canvas

- Authentication: 320px.
- Settings/focused configuration: 620–680px; 640px target.
- Agent welcome/focused task: 712px.
- Use deliberate negative space. Do not stretch a single action across the workspace.

### Document plus rail

- Reading column: 720–800px; 760px target.
- Compact inspector: 320px.
- Rich rail: 384px.
- Convert rail to an overlay before reading width falls below about 640px.
- Keep title, summary, description, and narrative mostly unboxed. Box independent stateful modules.

### Full operational canvas

- Use most of the available width for lists, tables, boards, timelines, queues, and analytics.
- List anatomy: `status | identifier | title | flexible space | metadata | owner | date`.
- Board columns: 320px target; never below 280px just to avoid horizontal scroll.
- Timeline semantic pane: 304px target; time scrolls independently.

### Settings

Use persistent category navigation and a centered 620–680px column. Avoid full-width forms and unnecessary card grids.

## Foundation tokens

### Canonical colors

| Token | Value | Use |
|---|---:|---|
| Canvas | `#F3EEE5` | Application background, global sidebar field, outer utility regions |
| Paper | `#FFFDF8` | Inset workspace, documents, panels, inputs, menus |
| Paper subtle | `#FAF5EC` | Integrated toolbars/footers, quiet grouped regions |
| Paper hover | `#F5EEE3` | Hover surfaces and low-emphasis interactive feedback |
| Paper selected | `#EDE3D5` | Active navigation, selected rows, selected segments |
| Ink | `#2B2723` | Primary text, headings, identity, high-contrast icons |
| Ink secondary | `#675F57` | Navigation, metadata, secondary actions |
| Ink muted | `#766E65` | Timestamps, captions, placeholders; not essential instructions |
| Border soft | `rgba(67,52,38,.10)` | Internal dividers, card boundaries, quiet structure |
| Border | `rgba(67,52,38,.15)` | Controls, panels, paper shells |
| Border edge | `rgba(67,52,38,.22)` | App-frame edges, inspectors, resizers, selected structural boundaries |
| Accent | `#9B4F32` | Primary action, focus-supporting interaction, selected emphasis |
| Accent hover | `#7A3F2A` | Primary-action hover |
| Accent soft | `#F4E5DB` | Compact highlighted state; never a page-size wash |
| Focus | `#7D4936` | Focus-visible outline |
| Success | `#356548` | Confirmed or healthy state |
| Warning | `#7A5417` | Attention or risk |
| Danger | `#9C3C32` | Destructive action or failure |
| Info | `#3E6670` | Informational state |

### Canonical dimensions

| Token | Value |
|---|---:|
| Workspace inset | 8px |
| Sidebar | 240px |
| Utility strip | 36px |
| Location bar | 44px |
| View bar | 44px |
| Navigation row | 28px |
| Compact control | 28px |
| Normal control | 32px |
| Emphasis control | 36px |
| Chip | 24px |
| List row | 44px |
| Reading column | 760px |
| Settings column | 640px |
| Focused canvas | 712px |
| Auth column | 320px |
| Compact inspector | 320px |
| Rich rail | 384px |
| Board column | 320px |
| Timeline semantic pane | 304px |

### Typography

- Metadata and dense labels: 12–13px.
- Controls and operational rows: 13–14px.
- Application copy: 14–15px.
- Narrative copy: 15–16px with 1.45–1.55 line height.
- Section titles: 18–22px.
- Page titles: 22–28px, semibold.
- Use tabular numerals for dates, counts, currency, percentages, and metrics.

### Spacing

`4, 8, 12, 16, 24, 32, 48, 64px`.

### Radius

`4, 6, 8, 10, 12px`, plus full radius for intentional pills and avatars. Avoid routine radii over 16px.

### Elevation

- Tactile controls: inset bevel shadow.
- Primary controls: stronger inset edge.
- Persistent independent modules: restrained paper lift.
- Hoverable cards: maximum 1px lift.
- Menus, popovers, dialogs, and previews: strongest float shadow.
- Rows, navigation, board columns, and timeline tracks: normally no external shadow.
- Never stack paper shadows through nested cards.


---
version: alpha
name: Warm Paper Workbench
description: A calm, warm, compact visual system for capable professional products across native and web surfaces.
colors:
  primary: "#9B4F32"
  primary-hover: "#7A3F2A"
  primary-soft: "#F4E5DB"
  on-primary: "#FFFFFF"
  canvas: "#F3EEE5"
  surface: "#FFFDF8"
  surface-subtle: "#FAF5EC"
  surface-hover: "#F5EEE3"
  surface-selected: "#EDE3D5"
  on-surface: "#2B2723"
  on-surface-secondary: "#675F57"
  on-surface-muted: "#766E65"
  border-soft: "rgba(67, 52, 38, 0.10)"
  border: "rgba(67, 52, 38, 0.15)"
  border-strong: "rgba(67, 52, 38, 0.22)"
  focus: "#7D4936"
  success: "#356548"
  success-soft: "#E8F2E7"
  warning: "#7A5417"
  warning-soft: "#FFF1D6"
  error: "#9C3C32"
  error-soft: "#F9E4E0"
  info: "#3E6670"
  info-soft: "#E5F0F1"
typography:
  headline-display:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline-lg:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  headline-md:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  label-lg:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
  label-md:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  12: 48px
  16: 64px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
  shell: 12px
  full: 999px
components:
  application-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
  paper-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.4}"
  paper-surface-subtle:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.on-surface-secondary}"
  row-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.on-surface}"
  row-selected:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.on-surface}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: 32px
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: 32px
    padding: 12px
  accent-soft:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-hover}"
  text-secondary:
    textColor: "{colors.on-surface-secondary}"
  text-muted:
    textColor: "{colors.on-surface-muted}"
  divider-soft:
    backgroundColor: "{colors.border-soft}"
    height: 1px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  focus-indicator:
    backgroundColor: "{colors.focus}"
    size: 2px
  status-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
  status-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
  status-error:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error}"
  status-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info}"
---

## Overview

Warm Paper Workbench is calm, warm, tactile, precise, compact, capable, legible, deliberate, and trustworthy. It supports professional depth without presenting every capability at once. The product should feel like one precision-made sheet of warm paper rather than a stack of unrelated cards.

In a consuming project, this root file is the single editable design grammar. Generated instructions, compiled packets, schemas, caches, fingerprints, receipts, and agent adapters exist to enforce this file; they do not become competing design truth. Optional screenshots, photos, golden states, and Mobbin-style notes live under `design/references/` when the project owner adds them.

Use the universal Design Skill before UI work. The Skill calls the same resolver, checker, and verifier as other agents: understand the request, resolve a bounded task packet, build with mapped components and semantic tokens, check source independently, then verify rendered evidence with a receipt. Mobbin-style pattern references may guide surface, flow, pattern, interaction, and state research, but references guide cohesion; they do not override tokens, accessibility, platform behavior, trust, or production mappings.

The package repository keeps `.design/DESIGN.md` only as a verified internal mirror. Installed projects must not create a second editable `DESIGN.md`.

## Product Grammar

Define the product by durable nouns, verbs, roles, surfaces, and consequences rather than by a catalog of screens. A new feature should be inferable from the grammar even when no matching page exists yet.

- **Product:** capable professional workbench for reviewing, composing, approving, and recovering high-trust interface work.
- **Primary users:** product owners, designers, frontend implementers, AI agents, and reviewers.
- **Primary objects:** design contract, task packet, component mapping, visual reference, state, exception, receipt, and baseline.
- **Core verbs:** understand, resolve, build, check, verify, approve, migrate, and recover.
- **Target qualities:** calm, warm, precise, compact, legible, tactile, coherent, keyboard-capable, and evidence-backed.
- **Novel-feature rule:** when a requested feature has no exact precedent, preserve the product nouns, state model, trust language, component intent, tokens, and reference constraints before inventing local structure.

## Invariant Guidance

- Accessibility, safety, legal, privacy, security, and platform requirements cannot be weakened locally.
- One region has at most one dominant primary action.
- Links navigate; buttons issue commands; selection controls expose current value.
- Raw one-off colors, spacing, radius, shadow, typography, and arbitrary utility values are prohibited unless this file records an accepted exception.
- Component packages are optional adapters. shadcn/ui may be referenced for behavior and vocabulary, but it is not required and never owns product identity.
- Visual references are optional and project-owned. Do not bundle bulk screenshot or photo sets with the package.
- Completion, verification, publication, synchronization, collaboration, and deployment claims require revision-bound evidence.
- Expired exceptions, stale context, missing release evidence categories, unapproved baseline changes, and failed error rules block acceptance.

## Preferred Guidance

- Prefer compact, integrated work surfaces over separate cards for every section.
- Prefer semantic tokens and production component variants before creating new primitives.
- Prefer small approved reference sets that match the surface over broad mood boards.
- Prefer preserving task context, selection, draft input, filters, and scroll during local mutations.
- Prefer command paths that can be reached by keyboard, menus, and pointer without duplicating behavior.
- Prefer direct, verb-first action copy that names the object and result.
- Prefer low-contrast structure, warm paper surfaces, and scarce clay accent for meaningful commitment.

## Open Guidance

- Local layout composition may be invented when the task is new and all invariant rules remain true.
- Preferred guidance may change with a recorded reason when a surface has different density, risk, input mode, or audience.
- New components, recipes, visual-reference families, or tokens may be proposed when existing mappings cannot represent the intent.
- Screenshots and photos may influence mood, structure, material, and state treatment after their provenance and applicability are recorded.

## Targets and Sources

The default browser target is `web-app`; other profiles may be generated from package-owned engine layers when a project actually ships on those surfaces. Responsive web on a phone remains a web target unless the product ships native mobile behavior.

Semantic token authority lives in this file. Production component authority lives in the consuming product implementation and the mappings recorded in this file. Generated packets under `.design/generated/` are scoped context, not source material for editing.

## Tokens and Component Sources

Use the color, type, spacing, radius, and component roles in the front matter as semantic values. Component libraries may provide accessible behavior, primitives, and examples, but every used component must be restyled and constrained by this grammar.

Allowed component-source states:

- **none:** project owns all primitives and mappings.
- **custom:** project declares local production components.
- **shadcn reference:** project may inspect shadcn/ui for primitive behavior, not install it as a package requirement unless explicitly declared.

## Layout and Navigation

Application structure is one coherent workbench frame. Global navigation owns product destinations. Object headers own identity and object actions. View bars own sorting, filtering, representation, and saved views. Local modules own local actions. Metadata and secondary evidence belong in inspectors or supporting regions.

Responsive behavior changes representation and priority before content becomes cramped. Do not shrink an operational desktop layout until it technically fits; change the structure, hierarchy, or route shape.

## States and Interaction

Every meaningful surface accounts for default, loading, empty, error, permission, unavailable, disabled, focus-visible, hover, selected, dirty, saving, saved, conflict, and recovery states when applicable. State changes preserve valid work and name what happened.

## Accessibility

Keyboard path, semantic roles, accessible names, visible focus, contrast, zoom/scaling, reduced motion, and non-pointer alternatives are part of the design definition. Icon-only controls require accessible names and a non-hover path.

## Content and Terminology

Use sentence case, specific nouns, and verb-first action labels. Avoid vague completion claims. Errors and destructive actions name the object, consequence, retained state, and recovery path.

## Trust and Acceptance

Acceptance requires a design receipt with source revision, contract fingerprint, task model, checked rules, rendered surfaces, results, warnings, exceptions, and visual changes. `design verify --mode release` must collect or inspect rendered evidence for accessibility, responsiveness, keyboard/focus behavior, overflow, resolved state-matrix coverage, browser screenshot or static capture evidence, and approved baseline comparison when baselines exist. CI must block stale context, failed error rules, missing evidence categories, missing resolved states, unapproved baseline changes, and expired exceptions.

## References

Approved references live under `design/references/` and may include screenshots, photos, golden states, and pattern notes. Register why each reference matters, where it applies, what to preserve, and what not to copy. External observations and ContextDS-style extraction may provide drift evidence, but they never replace this file automatically.

## Colors

Warm cream canvas and warm-white paper replace cool blue-gray application backgrounds. Deep brown-black ink carries hierarchy. The clay accent is scarce and semantic: principal action, current focus, or meaningful selection—not decoration.

Status color is paired with text, iconography, and clear language. Large saturated status regions are prohibited. Platform profiles may map these semantic roles to native dynamic colors while preserving contrast and intent.

## Typography

Use the platform’s high-quality system sans when Inter is unavailable or inappropriate. Preserve the role, hierarchy, optical size, weight, leading, and measure rather than forcing identical glyph metrics across platforms.

Use sentence case. Keep long-form reading columns near 720–800px. Use tabular numerals for dates, counts, progress, and metrics. Avoid tiny muted text, decorative display type, and excessive boldness.

## Layout

Use a 4px fine grid and an 8px dominant rhythm. Compress repeated operational work; relax navigation and reading. Repeated baselines, widths, and metadata zones are strict even when borders are soft.

A control’s placement communicates scope. Application controls live in global navigation; object actions live beside object identity; representation controls live in a view bar; local actions live in their module; metadata lives in an inspector; temporary choice lives in an overlay.

## Elevation & Depth

Persistent structure stays planar. Meaningful paper surfaces receive a subtle warm paper shadow. Tactile controls may use a shallow bevel. Menus, previews, sheets, and dialogs receive the strongest—but still restrained—floating depth.

A shadow belongs to the highest meaningful surface in a local stack. Nested cards must not each create another elevation layer.

## Shapes

Radii communicate scale: 4px for micro elements, 6px for compact controls, 8px for standard components, 10px for paper surfaces, and 12px for application shells. Full rounding is reserved for pills, avatars, and controls whose behavior is inherently capsule-shaped.

Integrated toolbar, body, and footer regions share one outer clipping, border, radius, and shadow owner. Internal corners remain square.

## Components

Primary buttons commit or advance the principal task of one region. A region has at most one primary action. Repeated rows and cards do not each receive a primary button. Secondary, tertiary, ghost, icon, danger, and link variants are selected by intent, scope, risk, and frequency—not visual preference.

Rows, boards, timelines, inspectors, forms, menus, previews, and overlays follow the component and pattern contracts compiled into the selected target. `DESIGN.md` maps those intents to actual production APIs, variants, stories, tests, and approved design references. Native profiles may replace a visual primitive with the platform-standard control while preserving semantic role and product identity.

Component libraries are optional adapters. shadcn/ui may be used as an approved starter vocabulary when a project declares it, but the design contract must also work with custom components, another library, native platform controls, or no component package.

## Do's and Don'ts

**Do:** preserve context; use progressive disclosure; keep one dominant action per region; make state and consequence explicit; align repeated information; provide keyboard and assistive-technology access; transform representations at constrained widths; use applicable approved visual references; use the universal Design Skill; test realistic content and failure states; resolve, check, and verify after authored design changes.

**Don't:** use gradients decoratively; create a card for every section; combine every control scope into one toolbar; invent one-off spacing or radius values; require shadcn/ui or any component package unless the project declares it; bundle bulk photo sets with the contract; center operational forms; use accent color as decoration; imitate native chrome in a browser; shrink desktop layouts until they technically fit; hide destructive consequence; animate high-frequency keyboard actions merely for flourish; edit `.design/generated/` directly.

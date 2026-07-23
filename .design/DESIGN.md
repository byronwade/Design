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

In a consuming project, this root file is the single editable visual contract. Read `AGENTS.md` before UI work. Product-specific context, production mappings, and decisions live in `design/`. The selected platform profile is compiled from the versioned engine through `.design/config.json` into `.design/generated/<target>.md`.

Skills and visual references are part of the design workflow, not decoration. Use the installed design-system Skills before UI work, and inspect applicable approved references from `design/REFERENCES.md` when a surface needs visual continuity. Mobbin-style pattern references may guide surface, flow, pattern, interaction, and state research, but references guide cohesion; they do not override tokens, accessibility, platform behavior, or production mappings.

The package repository keeps `.design/DESIGN.md` only as a verified internal mirror. Installed projects must not create a second editable `DESIGN.md`.

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

Rows, boards, timelines, inspectors, forms, menus, previews, and overlays follow the component and pattern contracts compiled into the selected target. `design/COMPONENTS.md` maps those intents to actual production APIs, variants, stories, tests, and approved design references. Native profiles may replace a visual primitive with the platform-standard control while preserving semantic role and product identity.

Component libraries are optional adapters. shadcn/ui may be used as an approved starter vocabulary when a project declares it, but the design contract must also work with custom components, another library, native platform controls, or no component package.

## Do's and Don'ts

**Do:** preserve context; use progressive disclosure; keep one dominant action per region; make state and consequence explicit; align repeated information; provide keyboard and assistive-technology access; transform representations at constrained widths; use applicable approved visual references; use the installed design-system Skills; test realistic content and failure states; recompile context after authored design changes.

**Don't:** use gradients decoratively; create a card for every section; combine every control scope into one toolbar; invent one-off spacing or radius values; require shadcn/ui or any component package unless the project declares it; bundle bulk photo sets with the contract; center operational forms; use accent color as decoration; imitate native chrome in a browser; shrink desktop layouts until they technically fit; hide destructive consequence; animate high-frequency keyboard actions merely for flourish; edit `.design/generated/` directly.

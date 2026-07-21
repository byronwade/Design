---
id: global.foundations
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global visual foundations

`../DESIGN.md` owns exact portable token values. This document owns their application.

## Color roles

- **Canvas:** product environment and quiet separation between major surfaces.
- **Surface:** primary work, reading, forms, and integrated paper containers.
- **Subtle surface:** secondary grouping without another card or elevation level.
- **Ink:** primary information and controls.
- **Secondary and muted ink:** supporting content only; never hide essential state.
- **Primary accent:** principal action, focus, active selection, or meaningful emphasis.
- **Status roles:** semantic feedback paired with language and iconography.

Native platforms may map these roles to dynamic system colors for appearance modes, contrast settings, and materials. The role and contrast remain normative.

## Typography

Preserve role and reading quality across type systems:

- page identity: 22–28px equivalent, semibold
- section identity: 18–22px equivalent, semibold
- operational body: 13–15px equivalent
- narrative body: 15–16px equivalent with 1.45–1.55 leading
- metadata: 12–13px equivalent

Use system text styles where native scaling requires them. Do not freeze native text to web pixel values. Long-form content stays within a readable measure.

## Spacing

The fine grid is 4px; the dominant rhythm is 8px. Prefer 4, 8, 12, 16, 24, 32, 48, and 64. Platform-specific safe areas, density metrics, touch targets, title bars, and system bars override literal spacing where required.

Spacing describes relationships:

- 4–8: tightly coupled label/icon/state
- 12–16: component interior and related controls
- 24–32: sections and local modules
- 48–64: major narrative or marketing transitions

## Shape

Use small radii for compact controls and larger radii only for meaningful outer surfaces. Pills are reserved for tags, filters, statuses, avatars, and inherently capsule-shaped actions.

## Depth

- level 0: canvas and persistent operational regions
- level 1: meaningful paper surface
- level 2: tactile control
- level 3: temporary overlay

Do not stack elevation through nested containers. Native materials replace custom shadows when the platform provides a more legible and accessible hierarchy.

## Iconography and assets

Use one coherent icon family per product surface and the platform’s standard symbols when they carry established meaning. Icons supplement labels; unfamiliar or destructive actions require text. Asset treatment preserves natural aspect ratio, sharpness, contrast, and truthful content.

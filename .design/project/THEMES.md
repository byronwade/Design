---
id: project.themes
kind: project
version: 1.0.0
status: project-owned
---

# Appearance and theme registry

`.design/DESIGN.md` defines the canonical Warm Paper visual core. This registry maps every shipped appearance to executable tokens, design variables, supported targets, accessibility settings, and visual evidence.

| Theme ID | Purpose | Targets | Runtime token source | Design-variable mapping | Appearance/contrast modes | Golden references | Status/owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `warm-paper-light` | canonical product expression |  |  |  | light |  | gap |

## Required semantic roles

Every theme maps canvas, surface, subtle surface, elevated/temporary surface, primary/secondary/muted ink, boundary, focus, interactive, selected, disabled, and success/warning/error/information roles. It also defines typography, shape, depth, icon treatment, data-visualization roles, system materials, and native dynamic-color adaptation where applicable.

## Validation

Verify representative screens and components in every supported appearance, including high contrast, forced colors, reduced transparency, dark appearance if shipped, long content, disabled controls, focus, selection, charts, and status. Do not derive dark or branded themes through automatic inversion or a broad CSS filter.

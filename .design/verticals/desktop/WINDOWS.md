---
id: vertical.desktop.windows
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.desktop.base
applies_to:
  platforms: ["windows"]
---

# Windows overlay

## Window chrome

Use the Windows title bar to identify, move, minimize, maximize, restore, and close the window. When extending content into the title bar, preserve caption buttons, draggable regions, active/inactive states, high contrast, and snap behavior.

## Navigation

Use NavigationView or an equivalent native structure for high-level destinations. It adapts between expanded left navigation, compact modes, and top navigation according to window width and product structure. Avoid deep nesting; show current location and preserve selection.

## Commands

Use command bars, menus, context menus, keyboard shortcuts, access keys, and standard dialogs. Primary commands remain visible; secondary commands move into overflow predictably. Menu and command enablement reflects selection and permission.

## Materials and motion

Use system Mica, Acrylic, elevation, and motion where they improve hierarchy and performance. Motion remains connected, consistent, responsive, delightful, and resourceful; existing WinUI controls are preferred over bespoke animation.

## Input and accessibility

Support mouse, keyboard, touch, pen where relevant, Narrator, high contrast themes, text scaling, focus visuals, and system settings. Do not encode essential state only in a subtle material or color difference.

## Prohibitions

Do not draw fake caption buttons, obscure window drag regions, use a macOS-style menu model, hide frequent commands in hover-only controls, or treat a fixed desktop width as the only window state.

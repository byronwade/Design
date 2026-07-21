---
id: vertical.desktop.linux
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.desktop.base
applies_to:
  platforms: ["linux"]
---

# Linux desktop base overlay

Linux is not one visual platform. Select a toolkit and desktop-environment overlay—GNOME or KDE Plasma—rather than averaging incompatible conventions.

## System integration

Use the toolkit’s native controls, text metrics, theming, file chooser, notifications, portals, clipboard, drag-and-drop, accessibility APIs, input methods, fractional scaling, and Wayland/X11 behavior. Respect user themes without making contrast or layout fragile.

## Commands and navigation

Support standard desktop shortcuts and expose application commands in the environment’s expected menus, header bars, toolbars, or global drawers. Avoid platform-neutral custom chrome that behaves like neither GNOME nor KDE.

## Windowing

Work with tiling, multiple workspaces, resizable windows, server/client decorations, high DPI, and varied compositor behavior. Do not assume one title-bar height or one system font.

## Accessibility

Use toolkit semantics and focus handling, keyboard access, screen reader support, high contrast, text scaling, and reduced animation where available. Verify on the chosen desktop environment and compositor.

## Distribution realities

Design installation, permissions, sandbox portals, file access, updates, and system integration for the actual packaging model. Error and permission flows must explain the environment-specific next step.

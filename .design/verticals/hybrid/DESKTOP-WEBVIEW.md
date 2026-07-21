---
id: vertical.hybrid.desktop-webview
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.web.app
applies_to:
  families: ["hybrid"]
  surfaces: ["desktop-webview"]
---

# Desktop webview application overlay

This overlay applies to Electron, Tauri, and comparable desktop products whose primary UI is web technology inside a native host.

## Dual contract

Preserve web semantics, focus, zoom, selection, text editing, URL/history where exposed, and browser-engine accessibility. At the same time, integrate with the host operating system’s windowing, menus, shortcuts, file dialogs, notifications, drag regions, appearance, and accessibility conventions. The host platform overlay resolves last.

## Window chrome

Do not draw fake native controls. If extending content into a title bar, declare draggable and interactive regions, preserve caption controls, support active/inactive appearance, high contrast, snap/full screen, and platform-specific spacing. A web header does not duplicate the native menu or application command model.

## Commands and shortcuts

Use one command graph across visible buttons, web menus, native menus, command palette, context menus, and shortcuts. Resolve collisions with browser editing and operating-system conventions explicitly. Menu enablement, permission, selection, and undo state remain synchronized.

## Resilience and updates

Design startup, update, restart, offline, local-file permission, protocol handling, crash recovery, and multi-window state. Distinguish renderer, host, network, and external-process failure when the recovery action differs.

## Security and trust

Treat external content, links, file access, clipboard, protocol invocation, downloads, and webview boundaries as explicit trust zones. Never imitate a system prompt or hide when an action leaves the application.

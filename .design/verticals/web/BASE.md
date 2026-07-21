---
id: vertical.web.base
kind: vertical
version: 1.0.0
status: normative
extends: []
applies_to:
  families: ["web"]
---

# Web family overlay

The web is URL-addressable, document-based, browser-controlled, multi-input, and embedded in user expectations for history, links, zoom, selection, and responsive reflow.

## Semantics and navigation

Use semantic HTML and native controls before ARIA or custom widgets. Meaningful locations have stable URLs. Back, forward, refresh, open in new tab, copy link, and deep linking preserve expected behavior. Do not hijack browser shortcuts or selection.

## Responsive behavior

Design from content constraints rather than named devices. Reflow without loss of task at zoom and narrow widths. Touch, pointer, keyboard, and assistive technology may all be present on the same device.

## Interaction

Hover is enhancement only. Focus is visible. Custom composite widgets follow established keyboard patterns. Drag-and-drop has non-drag alternatives. Browser-native form, autofill, password manager, and input behavior are preserved unless a tested need requires replacement.

## Performance and resilience

Prioritize fast first response, stable layout, progressive enhancement, route-level error recovery, offline/poor-network states where relevant, and restrained client work. Animation cannot delay interaction or cause layout instability.

## Platform honesty

Do not imitate native title bars, system permission dialogs, tab bars, or settings chrome. A web product may feel at home on a platform while remaining recognizably and accessibly web-based.

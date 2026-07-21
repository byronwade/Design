---
id: vertical.mobile.ipados
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.mobile.apple
applies_to:
  platforms: ["ipados"]
---

# iPadOS overlay

iPadOS is a resizable, multi-input environment, not a stretched iPhone layout.

## Adaptive structure

Use sidebars, split views, inspectors, toolbars, and multiple columns when simultaneous context improves the task. Collapse through content-driven size classes and window space, not device-name assumptions. Every column has a distinct navigation or information responsibility and a useful minimum.

## Windowing and multitasking

Support resizing, Stage Manager or equivalent multitasking, multiple windows and scenes where the product model benefits, restoration, external displays, and safe title/toolbar regions. Do not assume full-screen landscape.

## Input

Support touch, keyboard, trackpad, pointer hover, drag and drop, context menus, selection, and platform shortcuts. Pointer affordances supplement rather than replace touch and keyboard paths. Tooltips and hover effects never carry essential meaning alone.

## Popovers and sheets

Use anchored popovers when source relationship and space permit; adapt to sheets at constrained widths. Inspectors may remain beside the primary artifact or transform into a sheet/route. Preserve source, selection, and unsaved input.

## Prohibitions

Do not stretch a single iPhone stack across a wide window, hard-code landscape breakpoints, hide desktop-class commands from keyboard users, or keep every pane visible after the primary content becomes unusable.

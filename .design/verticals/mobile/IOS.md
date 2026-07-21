---
id: vertical.mobile.ios
kind: vertical
version: 1.0.0
status: normative
extends:
  - vertical.mobile.base
applies_to:
  platforms: ["ios", "ipados"]
---

# iOS and iPadOS overlay

This overlay applies Apple familiarity, agency, direct manipulation, and platform accessibility while preserving Warm Paper identity.

## Navigation and chrome

- Use a tab bar for a small set of top-level destinations; it contains navigation, not creation or destructive commands.
- Use navigation bars for hierarchy, title, back, and a small number of contextual actions.
- Large titles establish major destinations and collapse through standard scrolling behavior.
- Toolbars group current-view actions and may move to the bottom where reach and platform convention support it.
- On iPad, use split views, sidebars, inspectors, and adaptive columns rather than stretching an iPhone stack.

## Interaction

Use standard back and edge gestures, selection behavior, context menus, drag and drop, sheets, popovers, and keyboard shortcuts. User-driven motion tracks touch, remains interruptible, and carries velocity. Haptics reinforce meaningful state changes; they do not decorate every tap.

## Sheets and dialogs

Prefer sheets for temporary focused work and progressive disclosure. Preserve unsaved input, provide explicit completion when needed, and do not rely only on swipe dismissal for consequential tasks. Alerts remain concise and reserved for decisions requiring interruption.

## Typography and materials

Use Dynamic Type text styles, optical sizing, and system materials where they improve hierarchy and adapt to appearance, contrast, transparency, and wallpaper. Product color remains semantic and restrained; custom blur must not reduce readability.

## Accessibility

Support VoiceOver, Full Keyboard Access, Switch Control, Dynamic Type, Increase Contrast, Reduce Motion, Reduce Transparency, and sufficient target size. Custom controls expose standard traits and actions.

## Prohibitions

Do not imitate a web sidebar on iPhone, place arbitrary controls beside system window controls, override the back gesture, use a tab item as a button, or freeze text and controls to a single size class.

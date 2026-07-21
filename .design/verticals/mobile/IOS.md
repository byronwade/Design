---
id: vertical.mobile.ios
kind: vertical
version: 1.1.0
status: normative
extends:
  - vertical.mobile.apple
applies_to:
  platforms: ["ios"]
---

# iPhone overlay

## Navigation

Use a tab bar for a small set of stable top-level destinations, a navigation stack for hierarchy, and large titles for major destinations when content and scrolling support them. Keep the primary task focused in one view. Do not imitate a desktop sidebar or place creation/destructive commands in the tab bar.

## Reach and constrained space

Prioritize the current object and principal action. Move supporting content into drill-in routes, sheets, disclosures, or context menus. Bottom placement may improve reach for current-view actions when it follows system convention. Avoid custom controls near system-edge gestures and the home indicator.

## Sheets and alerts

Use sheets for temporary focused work and progressive disclosure. Preserve unsaved input, provide explicit completion when needed, and do not rely only on swipe dismissal for consequential tasks. Alerts remain concise and reserved for decisions requiring interruption.

## Input and interruption

Choose appropriate keyboard and content types, keep focused controls visible, preserve drafts through backgrounding, and handle calls, permission flows, and connectivity changes without resetting the task.

## Prohibitions

Do not use iPad multi-column assumptions on iPhone, override the interactive back gesture, freeze text and controls to one size, imitate web hover, or require precision drag without an alternative.

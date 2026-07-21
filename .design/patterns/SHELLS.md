---
id: patterns.shells
kind: patterns
version: 1.0.0
status: normative
extends: []
---

# Application shell patterns

Choose a shell before composing page components. A shell owns global navigation, persistent utilities, major regions, and viewport behavior.

## Standard application shell

```text
product environment
├── global navigation
├── work surface
│   ├── optional object/location region
│   ├── optional view-control region
│   └── task body
└── optional global utility region
```

The Warm Paper desktop reference uses a 240px global navigation region, 8px work-surface inset, 12px outer radius, 44px location/view bars, and an optional 36px utility strip. Native overlays replace literal geometry when platform chrome or adaptive navigation requires it.

## Centered canvas

Use for authentication, onboarding, focused setup, and agent welcome. Keep the action stack narrow and do not stretch it to fill the work surface.

## Document plus supporting pane

Use a centered 720–800px reading column with an optional 320–384px inspector or a compact utility pane. The supporting pane transforms before the reading column becomes unusable.

## Operational canvas

Use for dense lists, queues, boards, timelines, canvases, and monitoring. The task body owns the necessary scrolling and keeps identity, headers, and controls stable.

## Feed or conversation

Use when chronological activity is primary. The composer lives where new content enters the sequence and drafts survive transient state changes.

## Settings

Use persistent category navigation and a centered 620–680px form column on desktop. Constrained layouts turn category selection into navigation rather than compressing the form.

## Shell selection evidence

State the shell, persistent regions, viewport owner, scroll owners, global command location, object identity location, responsive transformation, and selected platform replacement.

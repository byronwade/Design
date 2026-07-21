---
id: global.accessibility
kind: global
version: 1.1.0
status: normative
extends: []
---

# Global accessibility contract

Accessibility, safety, legal, and platform-enforced requirements outrank every aesthetic rule. Conformance is a floor; equivalent task completion, dignity, and control are the objective.

## Required capabilities

- complete keyboard, switch, voice, touch, pointer, and assistive-technology paths appropriate to the platform
- visible focus with sufficient contrast, area, and persistence
- programmatic name, role, value, state, relationship, instruction, and error
- meaningful headings, landmarks, panes, groups, and document structure
- logical reading, focus, selection, and announcement order
- text scaling and zoom without loss of task, content, or orientation
- sufficient text and non-text contrast in every supported appearance
- non-color and non-motion state cues
- target size and separation appropriate to platform and input
- captions, transcripts, descriptions, alternatives, and accessible media controls
- reduced-motion behavior and no essential information conveyed only through animation or spatial trajectory
- reduced-transparency, high-contrast, forced-colors, and inversion compatibility where offered
- focus containment and restoration for temporary layers, routes, panes, and consequential operations
- error identification, explanation, and recovery near the affected field or action
- no unexpected time limit, auto-advance, focus movement, or content change without control
- accessible authentication, including alternatives to memory, transcription, puzzle, or single-biometric requirements where applicable

## Web baseline

Web output targets WCAG 2.2 AA and uses native HTML semantics before ARIA. Custom composite widgets follow established keyboard patterns. URL and history, browser zoom through at least 400%, reflow, text spacing, user styles, forced colors, reduced motion, and browser find remain functional where relevant. ARIA never changes visual or keyboard behavior by itself; implementation must supply the full interaction model.

## Native baseline

Use native accessibility APIs, dynamic text scaling, platform focus behavior, rotor or navigation grouping, custom actions, system contrast modes, and standard control semantics. A custom visual control exposes behavior equivalent to the native primitive it replaces. Preserve OS-level font, display, input, motion, transparency, audio, and haptic settings.

## Spatial, chart, canvas, and drag alternatives

Charts expose a concise insight and underlying values. Canvas, editor, diagram, map, timeline, and drag interactions expose semantic objects, navigation, selection, actions, and non-spatial alternatives. Do not hide core work inside an inaccessible bitmap or pointer-only surface.

## Content and cognition

Use stable terminology, concise instructions, explicit consequence, tolerant input, preserved state, and predictable placement. Avoid unnecessary time pressure, surprise, dense unstructured prose, or error recovery that requires remembering vanished information.

## Verification

Test automated semantics and contrast, then manually test keyboard, screen reader, voice or switch where relevant, 200–400% web zoom or native largest text, constrained width, localization/RTL, high contrast, reduced motion, reduced transparency, touch, pointer, drag alternatives, error recovery, and realistic dynamic updates. Test the actual supported platform/browser/device matrix; one desktop browser is not sufficient evidence.

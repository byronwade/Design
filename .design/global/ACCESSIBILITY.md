---
id: global.accessibility
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global accessibility contract

Accessibility, safety, legal, and platform-enforced requirements outrank every aesthetic rule.

## Required capabilities

- complete keyboard or switch access where the platform supports it
- visible focus with sufficient contrast and area
- programmatic name, role, value, state, and relationship
- meaningful heading and landmark structure
- logical reading and focus order
- text scaling and zoom without loss of task or content
- sufficient text and non-text contrast
- non-color state cues
- target size appropriate to the platform and input
- captions, transcripts, alternatives, and accessible media controls
- reduced-motion behavior and no essential information conveyed only by motion
- reduced-transparency and high-contrast compatibility where offered
- focus restoration after dialogs, sheets, routes, and destructive operations
- error identification, explanation, and recovery near the affected field or action

## Web baseline

Web output targets WCAG 2.2 AA and uses native HTML semantics before ARIA. Custom composite widgets follow established keyboard patterns. URL, history, browser zoom, reflow, and user styles remain functional.

## Native baseline

Use native accessibility APIs, dynamic type/text scaling, platform focus behavior, system contrast modes, and standard control semantics. A custom visual control must expose behavior equivalent to the native primitive it replaces.

## Verification

Test with keyboard, screen reader, 200–400% zoom or native largest text, constrained width, high contrast, reduced motion, reduced transparency where applicable, touch, pointer, and realistic error states. Automated checks supplement but do not replace manual interaction testing.

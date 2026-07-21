---
id: global.principles
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global design principles

These principles bind every profile. Platform overlays determine expression, not whether the principles apply.

## 1. Carry complexity for the person

The system may be sophisticated internally. The person should see a clear next step, relevant context, understandable consequence, and a reliable path back. Simplicity means reduced cognitive burden, not reduced capability.

**Decision test:** What complexity is the interface asking the person to hold that the system could hold instead?

## 2. Calm density

Dense operational content is legitimate. Navigation, wayfinding, and surrounding chrome remain quieter so the work can be scanned. Density is assigned by task and frequency, not applied uniformly.

**Decision test:** Is this region dense because the task benefits from comparison, or because hierarchy has not been designed?

## 3. Stable context

Keep location, object identity, selection, draft input, and scroll position stable while representation or local state changes. Do not reload or replace a larger region than necessary.

**Decision test:** After this action, can the person still explain where they are and what changed?

## 4. Scope determines placement

Global, object, view, local, metadata, and temporary controls live in different regions. Position must reveal effect.

**Decision test:** Can the person infer what this control affects from where it lives?

## 5. Agency and reversibility

Feedback begins immediately. User-driven motion tracks input directly, remains interruptible, and carries velocity when appropriate. Risky actions disclose consequence, support cancellation before commitment, and offer undo or recovery when feasible.

**Decision test:** Can the person stop, redirect, undo, or recover without losing unrelated work?

## 6. Familiarity before novelty

Use the selected platform’s familiar navigation, windowing, command, input, and accessibility conventions. Product distinction comes from identity, craft, content, and useful capability—not surprising basic controls.

**Decision test:** Is novelty improving the task, or making a familiar action harder to recognize?

## 7. Progressive disclosure

Rows and cards summarize. Inspectors, previews, menus, sheets, and detail pages reveal depth at the moment it becomes useful. Do not expose advanced controls merely because they exist.

**Decision test:** Is this information needed to decide now, or only after the person chooses to inspect or act?

## 8. Semantic hierarchy before decoration

Use content order, typography, alignment, spacing, grouping, and platform structure before color, shadow, or animation. Decoration may reinforce hierarchy but cannot substitute for it.

## 9. One dominant action per region

A region may have many available actions but only one visually dominant next step. Destructive actions are not promoted by default.

## 10. Accessibility is architecture

Keyboard, switch, touch, pointer, screen reader, zoom, text scaling, high contrast, reduced motion, and reduced transparency behavior are designed with the structure—not retrofitted after visual approval.

## 11. Reuse before invention

Select from approved components, patterns, and templates. A missing intent becomes a shared design-system gap with evidence, API, states, and tests.

## 12. Craft every state

Loading, empty, partial, error, permission, offline, stale, destructive, and recovery states receive the same hierarchy and platform fidelity as the ideal populated state.

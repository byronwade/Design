---
id: global.principles
kind: global
version: 1.1.0
status: normative
extends: []
---

# Global design principles

These principles bind every profile. Platform overlays determine expression, not whether the principles apply.

## 1. Consider the whole situation

Design for the real person, preceding context, environment, permissions, data, interruption, and next task—not an idealized happy path.

**Decision test:** What changes when the person is rushed, uncertain, offline, zoomed, localized, or lacking permission?

## 2. Carry complexity for the person

The system may be sophisticated internally. The person should see a clear next step, relevant context, understandable consequence, and a reliable path back. Simplicity means reduced cognitive burden, not reduced capability.

**Decision test:** What complexity is the interface asking the person to hold that the system could hold instead?

## 3. Calm density

Dense operational content is legitimate. Navigation, wayfinding, and surrounding chrome remain quieter so the work can be scanned. Density is assigned by task and frequency, not applied uniformly.

**Decision test:** Is this region dense because comparison benefits the task, or because hierarchy has not been designed?

## 4. Stable context

Keep location, object identity, selection, draft input, filters, and scroll stable while representation or local state changes. Do not replace a larger region than necessary.

**Decision test:** After this action, can the person still explain where they are and what changed?

## 5. Scope determines placement

Global, object, view, local, metadata, and temporary controls live in different regions. Position must reveal effect.

**Decision test:** Can the person infer what this control affects from where it lives?

## 6. Preserve momentum

Remember safe preferences, support bulk work, expose shortcuts and commands, preserve resumable state, and avoid asking for the same information twice. Add friction only where consequence warrants it.

**Decision test:** What repeated work can be remembered, batched, automated, or made keyboard-reachable?

## 7. Agency and reversibility

Feedback begins immediately. User-driven motion remains interruptible. Risky actions disclose consequence, preserve human authority, and offer cancellation, undo, rollback, or compensation when feasible.

**Decision test:** Can the person stop, redirect, inspect, undo, or recover without losing unrelated work?

## 8. Make trust tangible

Status, scope, permissions, provenance, freshness, side effects, and evidence are visible. The interface never claims more than the underlying system has verified.

**Decision test:** What exact evidence supports this status or claim, and how old is it?

## 9. Familiarity before novelty

Use the selected platform’s familiar navigation, windowing, command, input, and accessibility conventions. Product distinction comes from identity, craft, content, and useful capability—not surprising fundamentals.

**Decision test:** Is novelty improving the task, or making a familiar action harder to recognize?

## 10. Progressive disclosure

Rows and cards summarize. Inspectors, previews, menus, sheets, and detail pages reveal depth when it becomes useful. Advanced controls remain reachable without being permanently visible.

**Decision test:** Is this information needed to decide now, or only after the person chooses to inspect or act?

## 11. Semantic hierarchy before decoration

Use content order, typography, alignment, spacing, grouping, and platform structure before color, shadow, or animation. Decoration may reinforce hierarchy but cannot substitute for it.

## 12. One dominant action per region

A region may have many available actions but only one visually dominant next step. Destructive actions are not promoted by default.

## 13. Accessibility is architecture

Keyboard, switch, touch, pointer, screen reader, zoom, text scaling, high contrast, reduced motion, and reduced transparency behavior are designed with the structure—not retrofitted after visual approval.

## 14. Shape the product from its domain

Use domain objects, vocabulary, workflows, evidence, and a defensible signature. Do not produce an interchangeable SaaS surface whose identity depends only on logo or accent color.

## 15. Reuse before invention

Select approved components, patterns, and templates. A missing intent becomes a shared design-system gap with evidence, API, states, and tests.

## 16. Craft every state

Loading, empty, partial, error, permission, offline, stale, destructive, collaboration, automation, and recovery states receive the same hierarchy and platform fidelity as the ideal populated state.

---
id: components.actions
kind: components
version: 1.1.0
status: normative
extends:
  - components.registry
---

# Actions and command hierarchy

Buttons perform commands. Links navigate. Selection controls change a value. Do not choose among them by appearance.

## Primary action algorithm

Use a primary button only when all are true:

1. it advances or commits the region’s principal task
2. it is the most likely next step
3. it is not merely navigation
4. the region has no other primary action
5. its emphasis does not make a destructive outcome easier to trigger accidentally

Repeated rows, cards, table cells, and dashboard modules do not each contain a primary button.

## Variants

| Variant | Intent |
| --- | --- |
| `primary` | principal safe commitment for one region |
| `secondary` | important alternative or strongest action when no commitment dominates |
| `tertiary` | lower-emphasis contextual command in content |
| `ghost` | chrome-local or contextual command on a stable surface |
| `icon` | familiar compact command with an accessible name and engineered hit area |
| `danger` | destructive commitment; prominence follows consequence, not urgency alone |
| `link` | navigation or disclosure expressed in text flow |

## Control tiers

Desktop pointer-first surfaces use 28px compact, 32px routine, and 36px emphasis controls. Touch profiles use platform target metrics or a larger effective wrapper without visually inflating every control. Search or command input may use 40–44px only when it is itself the primary task.

## Selection and toggles

A switch changes a persistent boolean setting and exposes current state. A checkbox selects one or more items or consents to a proposition. A radio group chooses one mutually exclusive option. A segmented control changes a small peer representation; it does not replace global navigation.

## Command placement

Global commands belong in platform-standard menus, command surfaces, or global navigation. Object commands belong with object identity. View commands belong with representation controls. Row actions are contextual and remain reachable without hover. Broad changes use a selection action region with count, scope, preview, and recovery.

## Content and consequence

Use specific verb-first labels. Name the result when known. Separate destructive commands from routine actions and identify the object, scope, retention, and recovery. Do not report success until the underlying system has the evidence required by the operation.

## States

Every action defines default, hover where applicable, focus, pressed, disabled, pending, success/failure feedback, and destructive consequence. Pending state prevents duplicate commitment without making supported cancellation impossible. Disabled state is used only when the person can understand how to enable the action; otherwise validate on activation and explain the problem.

## Lintable assertions

- no more than one primary action per declared action region
- icon-only actions have an accessible name and non-hover path
- navigation uses link or native destination semantics
- destructive commitment exposes consequence and recovery
- feature code does not override approved action color, type, height, radius, or state behavior

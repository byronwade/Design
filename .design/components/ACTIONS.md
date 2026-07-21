---
id: components.actions
kind: components
version: 1.0.0
status: normative
extends: []
---

# Actions and command hierarchy

## Primary action algorithm

Use a primary button only when all are true:

1. it advances or commits the region’s principal task
2. it is the most likely next step
3. it is not merely navigation
4. the region has no other primary action
5. its emphasis does not make a destructive outcome easier to trigger accidentally

Repeated rows, cards, and table cells do not each contain a primary button.

## Variants

- **primary:** principal safe commitment for one region
- **secondary:** important alternative or adjacent action
- **tertiary:** lower-emphasis command that remains visible
- **ghost:** chrome-local or contextual command on a stable surface
- **icon:** familiar compact command with accessible name and target
- **danger:** destructive commitment; prominence follows risk, not urgency alone
- **link:** navigation or disclosure expressed in text flow

## Selection and toggles

A toggle changes a persistent boolean setting and exposes current state. A checkbox selects one or more items or consents to a proposition. A radio group chooses one mutually exclusive option. A segmented control changes a small peer representation, not global navigation.

## Command placement

Global commands belong in platform-standard menus, command surfaces, or global navigation. Object commands belong with identity. View commands belong with representation controls. Row actions are contextual and remain reachable without hover.

## States

Every action defines default, hover where applicable, focus, pressed, disabled, pending, success/failure feedback, and destructive consequence. Pending state prevents duplicate commitment without making cancellation impossible when cancellation is supported.

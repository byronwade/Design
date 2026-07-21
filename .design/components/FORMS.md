---
id: components.forms
kind: components
version: 1.1.0
status: normative
extends:
  - components.registry
---

# Forms, fields, and composers

## Structure

Use a concrete title, optional concise explanation, grouped fields, and a stable action region. Keep operational forms within a readable width. Prefer one clear vertical reading path; use columns only for closely related short fields or meaningful comparison. Do not put every field in a separate card.

## Fields

- labels remain visible; placeholders are examples or formatting hints
- required and optional expectations are explicit and programmatic
- helper text explains format, scope, or consequence rather than repeating the label
- validation occurs at a useful moment and never destroys input
- errors identify the field, problem, and correction near the affected control
- units, prefixes, suffixes, formats, and time zones are programmatically associated
- native input types, autofill, password managers, content types, and platform pickers are preferred when behavior is standard
- success decoration appears only when confirmation matters

## Choice controls

Use a switch for immediate persistent boolean settings, a checkbox for independent selection or consent, radio buttons for one choice from a small visible set, and a select/combobox when the set is larger. Searchable choice controls reveal selected identity, loading, empty, error, and permission state.

## Search and filters

Search is a query action, not a generic text field. Preserve the query, expose scope, support clear, show progress and no-results states, and keep focus predictable. Complex filters use the command and search contract rather than inventing ad hoc chips.

## Editors and composers

Place a composer where its output enters the information sequence: chat at the bottom of the conversation, a comment at its semantic object, an update before update history, and an intent composer beside visible scope. Preserve drafts through navigation, interruption, conflict, and transient failure when feasible. A pinned composer must not conceal unread content.

## Submission

The primary action names the outcome. Dirty, saving, saved, queued, offline, validation-failed, permission-failed, conflict, and stale-source states are distinguishable. Long forms may use a stable or sticky commitment region with unsaved-state communication. Disable submission only when no valid outcome can be produced; explain the reason when it is not self-evident.

## Sensitive and high-risk input

Explain why sensitive information is needed, how it will be used, and its visibility. High-impact changes expose affected scope and provide review before commitment. Never echo secrets unnecessarily or rely on a generic confirmation after the consequence has become irreversible.

---
id: components.forms
kind: components
version: 1.0.0
status: normative
extends: []
---

# Forms, fields, and composers

## Structure

Use a clear title, optional concise explanation, grouped fields, and a stable action region. Keep operational forms within a readable width rather than stretching inputs across the viewport.

## Fields

- labels remain visible; placeholders are examples or formatting hints
- required and optional expectations are explicit
- help text precedes error text in hierarchy
- validation occurs at a useful moment and never destroys input
- errors identify the field, problem, and correction
- units, prefixes, suffixes, and formats are programmatically associated
- native input types and platform pickers are preferred when behavior is standard

## Search

Search is a query action, not a generic text field. Preserve the query, expose scope, support clear, show progress and no-results states, and keep keyboard focus behavior predictable.

## Editors and composers

Place a composer where its output enters the information sequence: chat at the bottom of the conversation, issue reply after activity, project update before update history. Preserve drafts through navigation and transient failure when feasible.

## Submission

The primary action names the outcome. Dirty, saving, saved, queued, offline, validation-failed, permission-failed, and conflict states are distinguishable. Disable submission only when the action cannot produce a valid outcome; explain why when the reason is not evident.

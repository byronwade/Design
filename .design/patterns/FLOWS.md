---
id: patterns.flows
kind: patterns
version: 1.0.0
status: normative
extends: []
---

# Cross-screen and consequential flows

## Progressive disclosure ladder

Prefer, in order: inline summary → local disclosure or popover → inspector or preview → sheet or dedicated route → full-screen focused flow. Move to a deeper layer only when content, risk, or task duration requires it. Preserve origin and return state.

## Creation

Start with the minimum information needed for a valid object. Expose advanced settings progressively. Name the result, preserve drafts, and distinguish local creation, synchronization, publication, and downstream processing.

## Destructive and high-impact change

Show affected objects, environment, permissions, side effects, retention, and recovery before commitment. Reversible low-risk actions favor undo. Irreversible or broad actions use explicit review and proportional confirmation. Never place a high-impact command in a tiny unlabeled row control.

## Bulk operations

Expose selection count and scope, excluded or ineligible items, permission, preview, progress, cancellation, partial failure, and retry. Preserve successful results while making failures individually actionable.

## Permission and external connection

Use the platform or provider’s expected authorization flow. Explain requested access before leaving context, preserve state on return, handle denial and expiration, and never imitate a system permission dialog in custom chrome.

## Import, export, and long-running work

Show source/destination, format, scope, validation, expected duration, background behavior, progress, partial result, failure, and where the durable output will live. Completion language follows verified output creation, not job submission.

## Agent-assisted execution

Intent → inspectable plan → scope and permission preview → approval when required → isolated execution → live status → evidence-backed review → accept, edit, retry, rollback, or takeover. Conversation may accompany the flow but does not replace its structured state.

## Recovery and resumption

Define how the person returns after interruption, refresh, device change, crash, offline work, or expired authentication. Restore the safest meaningful checkpoint without repeating completed consequential work.

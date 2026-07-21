---
id: global.content
kind: global
version: 1.1.0
status: normative
extends: []
---

# Global content and language

## Voice

Direct, specific, calm, respectful, and truthful. Prefer concrete domain language over vague product language. Describe what happened, what it affects, what remains uncertain, and what the person can do next. Do not use personality to obscure system state or responsibility.

## Labels

- use sentence case unless a platform or proper name requires otherwise
- start commands with clear verbs and name the result
- name navigation for its destination, not a generic umbrella
- keep the same concept named the same way across UI, search, notifications, help, and APIs
- distinguish save, synchronize, publish, submit, send, archive, remove, revoke, and delete
- avoid “OK,” “Done,” “Continue,” “Magic,” or “Fix” when the outcome can be named
- pair icon-only commands with accessible names and discoverable explanations when unfamiliar

## Instructions and progressive disclosure

Put the minimum instruction beside the decision it supports. Move detailed explanation, examples, policy, or diagnostics into help, disclosure, preview, or documentation without making essential constraints invisible. Do not repeat labels as helper text.

## Status and errors

Do not report success before the system has the required evidence. Distinguish proposal, queued, processing, locally saved, synchronized, published, verified, partial, failed, stale, offline, and conflicted. Error messages identify the problem, affected scope, retained state, and a specific next step; include a diagnostic reference only when it helps support or recovery.

## Empty and first-run states

Explain why the region is empty, whether the state is expected, what filters or permissions apply, and the most relevant next action. Distinguish first use, filtered empty, permission denial, unavailable dependency, and true no-data. Do not fill empty states with generic illustration or multiple competing calls to action.

## Destructive and consequential language

Name the object, environment, audience, side effect, and retention. Avoid euphemism and generic “Are you sure?” copy. State whether undo, rollback, version history, or support recovery exists.

## AI and automation language

Use generated, proposed, planned, running, blocked, reviewed, accepted, and verified according to the underlying state. State sources, assumptions, uncertainty, permission boundary, and evidence. Do not imply human review, collaboration, deployment, or factual certainty that did not occur.

## Localization and formatting

Design for expansion, contraction, variable word order, right-to-left layout, pluralization, gender/grammar differences, mixed scripts, locale-specific names, addresses, dates, times, numbers, units, currency, sorting, and input. Do not concatenate translated fragments or encode meaning in word position, punctuation, color, or icon direction alone. User content and identifiers may require safe truncation with access to the full value.

## Inclusive and privacy-aware content

Use people’s chosen names and pronouns where relevant, avoid assumptions about identity or ability, and do not expose sensitive information in examples, previews, notifications, recents, URLs, analytics, logs, or screenshots without need and permission.

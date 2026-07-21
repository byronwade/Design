---
id: components.collaboration
kind: components
version: 1.0.0
status: normative
extends:
  - components.registry
---

# Collaboration and shared state

## Comments and threads

Attach discussion to the semantic object, range, revision, or evidence it concerns. Preserve context when navigating from a notification. Threads expose author, time, edit state, resolution, permission, and durable link. A comment composer preserves drafts and names the audience.

## Mentions and assignments

Mention suggestions reveal identity and access. Do not imply that a person was notified, assigned, or granted access until the underlying system confirms it. Assignment changes expose current owner, scope, and audit history when material.

## Presence

Presence is truthful, privacy-aware, and secondary to the work. Distinguish currently viewing, actively editing, following, and historically involved. Decorative cursors or avatars must correspond to real state and remain nonessential to comprehension.

## Concurrent editing and conflict

Show which state is local, shared, pending, conflicted, or superseded. Preserve both sides of a conflict, explain what changed, and provide merge, compare, retry, or restore paths. Do not silently overwrite another person’s work.

## Activity and notifications

Activity records durable events with actor, object, action, environment, and time. Notifications are grouped, deduplicated, prioritized by consequence, and linked to the relevant object. Escalate only material events; do not make a disappearing toast the sole record.

## Accessibility and input

Comments, mentions, presence, selection, and live updates have semantic labels, keyboard paths, announcements, and non-color cues. Collaboration remains usable without hover, animation, or spatial cursors.

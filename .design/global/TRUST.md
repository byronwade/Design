---
id: global.trust
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global trust, consequence, privacy, and automation

## State must be real

Distinguish proposal, preview, draft, queued, running, locally saved, synchronized, verified, accepted, published, deployed, failed, stale, canceled, rolled back, and partially complete. A successful request or tool call is not automatically an accepted or verified result.

## Consequence before commitment

For material actions, show the affected objects, environment, permissions, side effects, irreversible boundaries, and expected evidence before commitment. Protective friction scales with risk; routine reversible actions favor undo over repeated confirmation.

## Evidence and provenance

Evidence is tied to the exact source revision, environment, inputs, actor, time, and claim. Screenshots, tests, traces, logs, approvals, and domain records are not interchangeable. Stale evidence is visibly invalidated.

## Human authority

People can inspect, pause, redirect, narrow, revoke, approve, reject, or take over automated work. Protected actions, unresolved tradeoffs, credential sharing, production changes, and policy exceptions preserve explicit human authority.

## Privacy and permissions

Ask for sensitive access at the moment it becomes necessary, explain why it is needed, request the narrowest scope, and show how to change or revoke it. Do not expose secrets, private history, hidden collaborators, or sensitive data through previews, recents, logs, or generated examples.

## Recovery

Know the recovery path before high-impact execution. Preserve user input, isolate parallel work, prevent unrelated state loss, and provide undo, rollback, version history, checkpoints, or compensating action where the domain permits.

## Agentic and AI behavior

Chat may direct, clarify, and summarize work, but durable objects, plans, approvals, evidence, decisions, and status remain structured and inspectable. AI uncertainty, source limits, simulated output, and unverified assumptions are labeled. Provider-specific implementation details do not become the durable product model unless the product explicitly depends on them.

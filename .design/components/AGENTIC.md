---
id: components.agentic
kind: components
version: 1.0.0
status: normative
extends:
  - components.registry
---

# Agentic and AI-assisted interfaces

## Canonical pieces

- **Intent composer:** what the person is asking, with visible context and optional attachments.
- **Plan:** ordered proposed work, assumptions, dependencies, and approval points.
- **Scope preview:** affected objects, files, environments, permissions, budget, and side effects.
- **Work status:** queued, running, waiting, blocked, paused, canceled, failed, complete, or partially complete.
- **Evidence:** source revision, tests, traces, screenshots, logs, approvals, or domain records tied to each claim.
- **Review:** diff, result, unresolved tradeoffs, risk, and acceptance controls.
- **Takeover:** pause, redirect, narrow, revoke, edit, or complete work manually without losing isolated progress.

## Proposal and execution are different states

A generated suggestion, canvas mutation, browser preview, or simulated result remains a proposal until it creates durable source or data and receives the evidence required for acceptance. Do not use completion language for a plan, tool call, or unverified output.

## Human authority and permissions

Show the agent’s available tools, permission boundary, environment, and consequential approval points. Credentials, production changes, destructive actions, external communication, purchases, and policy exceptions require proportional authority and confirmation.

## Structured state over transcript

Conversation can direct and explain, but plans, objects, changes, evidence, approvals, errors, and history must also exist as structured durable state. The interface remains understandable when the transcript is collapsed or unavailable.

## Uncertainty and sources

Label assumptions, confidence limits, missing inputs, stale context, and source boundaries. Provide inspection paths. Do not present generated prose as evidence.

## Failure and recovery

Preserve completed isolated work, identify the failed step, explain what remains valid, and offer retry, edit, rollback, or manual takeover. Never hide partial failure behind a generic success state.

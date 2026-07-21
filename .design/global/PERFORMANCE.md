---
id: global.performance
kind: global
version: 1.0.0
status: normative
extends: []
---

# Global performance and resilience

Performance is part of interaction quality. Optimize the person’s task, not only isolated benchmark numbers.

## Response and continuity

- acknowledge input immediately
- keep shell, geometry, and existing content stable during local work
- update the smallest capable region
- use optimistic behavior only when failure is uncommon, visible, and safely recoverable
- distinguish initial load from background refresh
- never use animation to disguise unresponsive work

## Large data

Lists, tables, boards, timelines, search, and command surfaces define behavior for realistic upper-bound data. Use pagination, continuation, incremental loading, virtualization, aggregation, or progressive disclosure without breaking keyboard navigation, selection, accessibility relationships, or scroll restoration.

## Visual stability

Reserve space for asynchronous content, images, fonts, validation, status, and controls. Skeletons match final geometry and are not decorative shimmer. Loading indicators do not cause layout shift or erase known content.

## Network and device resilience

Design slow, intermittent, offline, resumed, backgrounded, low-memory, thermal, and low-power behavior where applicable. Preserve drafts and explain synchronization or retry behavior. Do not block an entire application when one dependency or region fails.

## Delivery quality

Web surfaces define budgets for interaction latency, layout stability, JavaScript, images, fonts, hydration, and route transitions. Native products define launch, memory, frame, battery, and background-work expectations appropriate to the platform.

## Evidence

Completion evidence includes representative device/window sizes, realistic data volume, cold and warm paths, poor-network behavior, runtime console or logs, and measured or reasoned budgets. A visually correct screenshot is not performance evidence.

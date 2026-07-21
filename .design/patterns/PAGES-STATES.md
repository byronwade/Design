---
id: patterns.pages-states
kind: patterns
version: 1.0.0
status: normative
extends: []
---

# Page patterns and system states

## Page patterns

### List page

Identity → view controls → collection → selection/bulk state → pagination or continuation. Filters, sort, display mode, empty state, and loading do not move the person to an unrelated shell.

### Detail page

Object identity and object actions remain stable while the body exposes summary, sections, related activity, and optional inspector. Preserve return location and selection.

### Form page

Title and consequence → grouped fields → validation → stable commitment region. On constrained layouts, keep labels and inputs readable rather than preserving a desktop two-column arrangement.

### Dashboard

Every module answers a question or supports an action. Avoid decorative metric grids. Provide time range, freshness, loading, partial failure, and drill-down behavior.

### Marketing page

Narrative hierarchy → evidence → benefits/capabilities → trust → conversion. Use the web-marketing overlay rather than application density and shell conventions.

## System states

Every applicable region defines:

- initial loading and subsequent refresh
- empty expected and empty due to filters
- first run
- populated and partial data
- stale, offline, queued, and synchronizing
- permission, authentication, and entitlement limits
- recoverable and unrecoverable error
- destructive confirmation and post-action recovery
- disabled, read-only, and unavailable
- long content, localization, and overflow

A state changes the smallest capable region, keeps the person oriented, preserves valid input, and exposes the next recovery action.

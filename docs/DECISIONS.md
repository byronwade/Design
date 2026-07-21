# Design decisions

Accepted decisions are normative. Proposed or experimental decisions do not override `docs/DESIGN_PRINCIPLES.md`, `DESIGN.md`, or accepted decisions until accepted.

## Accepted

### D-001 — System name

- **Status:** accepted
- **Decision:** Use “Warm Paper Workbench” as the design-system name.
- **Rationale:** It captures the warm surface model, compact professional-tool character, and integrated paper-container metaphor.

### D-002 — Spacing rhythm

- **Status:** accepted
- **Decision:** Use a 4px fine grid with an 8px dominant macro rhythm.
- **Rationale:** Compact professional controls need 4px granularity, while larger composition remains predictable on an 8px rhythm.

### D-003 — Warm tactile depth

- **Status:** accepted
- **Decision:** Use warm Shopify-derived inset shadows on compact controls and restrained paper shadows on meaningful cards and panels.
- **Rationale:** The system should not be visually flat, but depth must remain quiet and functional.

### D-004 — Integrated paper containers

- **Status:** accepted
- **Decision:** A toolbar, body, and footer within one container are one paper object with one outer border, radius, clipping owner, and shadow.
- **Rationale:** Separate floating chrome fragments the interface and weakens the single-work-surface model.

### D-005 — Stable shell and task-specific bodies

- **Status:** accepted
- **Decision:** Use a stable application shell, scope-based control placement, and task-specific body archetypes.
- **Rationale:** Location should remain predictable while lists, boards, timelines, documents, settings, and conversations change representation.

### D-006 — Warm neutral foundation

- **Status:** accepted
- **Decision:** Use a cream canvas, warm-white paper, warm translucent borders, dark brown-black text, and a restrained terracotta accent.
- **Rationale:** This creates a softer, more tactile alternative to cool enterprise gray without reducing clarity.

### D-007 — Compact control sizing

- **Status:** accepted
- **Decision:** Use 28px compact, 32px default, and 36px emphasis controls on desktop.
- **Rationale:** The product is feature rich and operationally dense; compact controls preserve workspace without sacrificing target size when hit areas are designed correctly.

### D-008 — Fluid, interruptible interaction

- **Status:** accepted
- **Decision:** Gesture-driven motion must respond immediately, track directly, remain interruptible, preserve velocity, and provide reduced-motion equivalents.
- **Rationale:** Motion should strengthen agency and spatial understanding rather than become a decorative wait state.

### D-009 — Minimalism means low noise, not low capability

- **Status:** accepted
- **Decision:** Advanced features should remain available through saved views, inspectors, contextual menus, command surfaces, previews, and progressive disclosure.
- **Rationale:** Removing useful controls is not simplicity; the common path should be clear while advanced paths stay nearby.

### D-010 — Supporting preference reference

- **Status:** accepted
- **Decision:** Preserve the comprehensive “Calm Paper Workbench” preference synthesis as a supporting reference while keeping Warm Paper Workbench, `DESIGN.md`, accepted decisions, and canonical executable tokens normative.
- **Rationale:** The reference contains detailed shell variants, product and marketing patterns, explicit do/don’t guidance, and review criteria that should remain searchable without creating a competing canonical system.

### D-011 — Calm Capability principles layer

- **Status:** accepted
- **Decision:** Use `docs/DESIGN_PRINCIPLES.md`, under the working name “Calm Capability,” as the judgment layer above Warm Paper Workbench.
- **Rationale:** Enduring product values, tradeoffs, trust requirements, critique questions, and the quality floor should remain distinct from one visual expression and its component tokens.

### D-012 — Shopify and Vercel as the core structural influences

- **Status:** accepted
- **Decision:** Use Shopify’s observable experience-value structure and Vercel’s executable interface-quality posture as the two primary external models, with other sources serving as supporting inputs rather than visual templates.
- **Rationale:** The combination connects humane experience qualities to concrete review behavior without copying another company’s brand language.

### D-013 — Normative motion contract

- **Status:** accepted
- **Decision:** Use `docs/motion/MOTION_PRINCIPLES.md` as the normative motion layer. Decide purpose and frequency before timing; require immediate response, spatial causality, interruption, reduced-motion support, and performance; use velocity and momentum only when direct manipulation warrants them.
- **Rationale:** Motion should protect agency and understanding while remaining restrained in repeated professional work.

### D-014 — Normative and reference separation

- **Status:** accepted
- **Decision:** Treat `docs/DESIGN_PRINCIPLES.md`, `DESIGN.md`, accepted decisions, `docs/DESIGN_SYSTEM.md`, `docs/motion/MOTION_PRINCIPLES.md`, and executable tokens as normative. Treat `docs/INFLUENCES.md`, detailed source research, and comprehensive preference references as provenance or supporting material.
- **Rationale:** Separating authority from research preserves detail without creating contradictory sources of truth.

### D-015 — Executable UI review contract

- **Status:** accepted
- **Decision:** Use `docs/review/UI_REVIEW_GUIDELINES.md` for file-and-line interface review across product fit, semantics, access, state, visual system, data, motion, performance, resilience, and agentic trust.
- **Rationale:** Principles improve outcomes only when they can be applied consistently to implementation evidence.

### D-016 — Agentic trust is a design concern

- **Status:** accepted
- **Decision:** AI-assisted and autonomous work must expose source, scope, permission, environment, evidence, uncertainty, side effects, interruption, approval, and recovery in proportion to consequence.
- **Rationale:** A polished interface cannot be trustworthy when generated action, verified result, accepted result, and deployed state are conflated.

## Proposed decision template

```text
Date:
Decision ID:
Problem:
Decision:
Principles affected:
Alternatives considered:
Rationale:
User and product evidence:
Affected tokens / components / layouts / workflows:
Accessibility and responsive impact:
Compatibility and migration notes:
Verification plan:
Owner:
Status: proposed / experimental / accepted / superseded / deprecated
```

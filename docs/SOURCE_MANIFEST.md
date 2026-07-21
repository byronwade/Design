# Source manifest

This manifest records how supplied and generated design artifacts are represented in the repository. Searchable Markdown and executable text assets are the source of truth; DOCX and ZIP files remain distribution formats rather than the only location of a concept.

| Supplied or generated artifact | Repository representation | Status |
| --- | --- | --- |
| `DESIGN-PRINCIPLES.md` / Calm Capability draft | `docs/DESIGN_PRINCIPLES.md`, `docs/review/UI_REVIEW_GUIDELINES.md`, `docs/INFLUENCES.md`, and accepted decisions D-011 through D-016 | Principles, operational quality floor, provenance, and governance retained as searchable normative material |
| `precision-workbench-design-guidelines.zip` and companion Markdown files | `docs/DESIGN_PRINCIPLES.md`, `docs/review/UI_REVIEW_GUIDELINES.md`, `docs/INFLUENCES.md` | Useful content reconciled into the current Calm Capability and Warm Paper authority model rather than uploaded as a competing system |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.docx` | `docs/references/CALM_PAPER_WORKBENCH.md` and its five section files | Comprehensive preference synthesis retained as a supporting reference |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.md` | `docs/references/calm-paper-workbench/` | Source content split at stable topic boundaries for review and search |
| `Personal_UIUX_Design_System_v1.docx` | `docs/archive/V1_PREFERENCE_PROFILE.md`, plus integrated rules in `DESIGN.md` and `docs/DESIGN_SYSTEM.md` | Superseded source concepts retained without making a second canonical system |
| `pasted.txt` / Warm Paper Workbench | `DESIGN.md`, `docs/DESIGN_SYSTEM.md`, `docs/DECISIONS.md`, `docs/references/CALM_PAPER_WORKBENCH.md`, and the Codex/Claude warm-paper skills | Canonical visual system, detailed preference reference, and agent behavior |
| `Animations.txt` | `docs/motion/MOTION_PRINCIPLES.md`, `docs/motion/ANIMATION_AUDIT_WORKFLOW.md`, and both `improve-animations` skills with `AUDIT.md` and `PLAN-TEMPLATE.md` | Normative motion contract, read-only audit workflow, precise rule catalog, and executor-ready planning retained |
| `Apple Design.txt` | `docs/motion/APPLE_FLUID_INTERACTION.md`, `docs/motion/MOTION_PRINCIPLES.md`, and `docs/INFLUENCES.md` | Interaction, gesture, spring, material, typography, accessibility, design-foundation, and provenance concepts retained without treating Apple’s visual language as a template |
| `calm-paper-workbench.tokens.json` | `tokens/calm-paper-workbench.tokens.json` | Machine-readable interchange asset |
| `calm-paper-workbench.css` | `styles/calm-paper-workbench.css` | Starter shell and component implementation layer |
| `calm-paper-workbench-review-checklist.md` | `docs/checklists/DESIGN_REVIEW.md` and `docs/review/UI_REVIEW_GUIDELINES.md` | Detailed release checklist and executable file-and-line review contract |
| `Calm_Paper_Workbench_Design_System_Bundle.zip` | The individual files above | Bundle content is represented by searchable and executable repository sources |

## Precedence

1. Accessibility, safety, legal, and platform constraints.
2. The actual person, task, domain, risk, and current project brief.
3. `docs/DESIGN_PRINCIPLES.md`.
4. `DESIGN.md`, accepted decisions, `docs/DESIGN_SYSTEM.md`, and `docs/motion/MOTION_PRINCIPLES.md`.
5. Detailed preference and research references when no accepted rule conflicts.
6. Existing repository conventions that do not conflict with the system.
7. External references and framework defaults.

## Coverage rule

No current design concept should exist only inside a DOCX, ZIP, pasted text file, or chat attachment. New durable source material belongs in the relevant principles, canonical document, reference, decision, checklist, token, style, or agent skill and should be recorded here. Binary exports may be regenerated for distribution, but they should remain derivatives of searchable repository sources.

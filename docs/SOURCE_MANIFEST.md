# Source manifest

This manifest records how the supplied design artifacts are represented in the repository. Searchable Markdown and executable text assets are the source of truth; DOCX and ZIP files remain distribution formats rather than the only location of a concept.

| Supplied artifact | Repository representation | Status |
| --- | --- | --- |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.docx` | `docs/references/CALM_PAPER_WORKBENCH.md` and its five section files | Comprehensive preference synthesis retained as a supporting reference |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.md` | `docs/references/calm-paper-workbench/` | Source content split at stable topic boundaries for review and search |
| `Personal_UIUX_Design_System_v1.docx` | `docs/archive/V1_PREFERENCE_PROFILE.md`, plus integrated rules in `DESIGN.md` and `docs/DESIGN_SYSTEM.md` | Superseded source concepts retained without making a second canonical system |
| `pasted.txt` / Warm Paper Workbench | `DESIGN.md`, `docs/DESIGN_SYSTEM.md`, `docs/DECISIONS.md`, and the Codex/Claude warm-paper skills | Canonical system and agent behavior |
| `Animations.txt` | `docs/motion/ANIMATION_AUDIT_WORKFLOW.md` and the Codex/Claude animation-audit skills | Workflow retained and adapted to repository conventions |
| `Apple Design.txt` | `docs/motion/APPLE_FLUID_INTERACTION.md` | Interaction, gesture, spring, material, typography, accessibility, and design-foundation concepts retained |
| `calm-paper-workbench.tokens.json` | `tokens/calm-paper-workbench.tokens.json` | Machine-readable interchange asset |
| `calm-paper-workbench.css` | `styles/calm-paper-workbench.css` | Starter shell and component implementation layer |
| `calm-paper-workbench-review-checklist.md` | `docs/checklists/DESIGN_REVIEW.md` | Detailed review and release checklist |
| `Calm_Paper_Workbench_Design_System_Bundle.zip` | The individual files above | Bundle content is represented by searchable and executable repository sources |

## Precedence

1. Current project brief or direct user instruction.
2. `DESIGN.md` and accepted decisions in `docs/DECISIONS.md`.
3. `docs/DESIGN_SYSTEM.md` and relevant layout or motion references.
4. `docs/references/CALM_PAPER_WORKBENCH.md` when additional preference detail is needed and no accepted rule conflicts.
5. Existing repository conventions that do not conflict with the system.

## Coverage rule

No current design concept should exist only inside a DOCX or ZIP. New durable source material belongs in the relevant canonical document, reference, decision, checklist, token, style, or agent skill and should be recorded here. Binary exports may be regenerated for distribution, but they should remain derivatives of searchable repository sources.

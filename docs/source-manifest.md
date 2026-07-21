# Source manifest

This manifest records how the supplied artifacts were normalized into the repository. The repository favors searchable Markdown and executable text assets over duplicated binary bundles so that design agents, coding agents, reviewers, and GitHub search can use the concepts directly.

| Supplied artifact | Repository representation | Status |
| --- | --- | --- |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.docx` | `docs/design-system/calm-paper-workbench.md` and its five section files | Canonical content represented in searchable Markdown |
| `Personal_UIUX_Design_System_Calm_Paper_Workbench.md` | `docs/design-system/calm-paper-workbench/` | Canonical source split by stable topic boundaries |
| `Personal_UIUX_Design_System_v1.docx` | `docs/archive/v1-preference-profile.md` | Superseded concepts retained as an explicit archive summary |
| `pasted.txt` / Warm Paper Workbench | `docs/design-system/warm-paper-workbench-agent-spec.md` and its three section files | Source content retained in searchable Markdown |
| `Animations.txt` | `docs/processes/animation-audit-workflow.md` | Source content retained; supporting audit catalog and plan template added |
| `Apple Design.txt` | `docs/principles/apple-interaction-design.md` and its three section files | Source content retained in searchable Markdown |
| `calm-paper-workbench.tokens.json` | `tokens/calm-paper-workbench.tokens.json` | Exact implementation asset |
| `calm-paper-workbench.css` | `styles/calm-paper-workbench.css` | Exact implementation asset |
| `calm-paper-workbench-review-checklist.md` | `docs/checklists/design-review.md` | Exact review asset |
| `Calm_Paper_Workbench_Design_System_Bundle.zip` | The individual canonical files listed above | Bundle is intentionally not the source of truth because its contents duplicate repository files |

## Coverage rule

No current concept should exist only inside a DOCX or ZIP. New source material should be added to the appropriate Markdown specification, principle, process, checklist, token, or style file and recorded here. Binary exports may be generated for distribution, but they should remain derivatives of the searchable repository sources.

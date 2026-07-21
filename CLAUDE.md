# Design repository instructions

Before performing visual, interaction, frontend, product-design, or design-system work:

1. Read `docs/DESIGN_PRINCIPLES.md` for the product values, tensions, quality floor, trust model, and definition of done.
2. Read `DESIGN.md` for canonical visual tokens and project-level rationale.
3. Read `docs/DESIGN_SYSTEM.md` and accepted entries in `docs/DECISIONS.md`.
4. Read the relevant layout, motion, review, or detailed reference document for the task.
5. Use `.claude/skills/warm-paper-workbench/SKILL.md` for interface design or implementation.
6. Use `.claude/skills/improve-animations/SKILL.md` for read-only motion audits and implementation planning.
7. Review substantial interface work with `docs/review/UI_REVIEW_GUIDELINES.md`.

Use this authority order: accessibility, safety, legal, and platform constraints; the actual person and current brief; Calm Capability principles; canonical visual and motion decisions; detailed references; existing repository conventions; framework defaults.

Preserve the system’s calm professional character, warm paper palette, compact accessible controls, integrated container chrome, stable context, scope-based control placement, task-specific density, progressive disclosure, source-backed trust, complete states, and purposeful interruptible motion unless the current brief explicitly overrides them.

Do not treat research or another company’s visual language as a template to copy. Translate useful principles to the product’s domain, natural color world, information model, signature, and actual constraints.

When introducing a durable rule, update the decision log, principles or canonical documentation, executable tokens, affected skills, tests and fixtures, source manifest where relevant, and changelog in the same change. Record an explicit exception instead of silently creating a parallel system.

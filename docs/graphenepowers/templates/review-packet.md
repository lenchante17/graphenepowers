# Review Packet

Use this bounded packet when dispatching `graphenepowers:code-review`.

## Packet Header

```yaml
review_packet:
  mode: Quality Review
  scope:
    task_ids: [T3]
    window_id: W1
    changed_files:
      - src/widget/parser.ts
      - tests/widget/parser.test.ts
  classification_summary:
    grade: Feature
    confidence: medium
  design_contract_ref: docs/graphenepowers/specs/2026-03-30-widget-design.md
  plan_ref: docs/graphenepowers/plans/2026-03-30-widget-parser.md
  plan_progress_ref: docs/graphenepowers/plans/2026-03-30-widget-parser-plan-progress.md
  verification:
    commands:
      - npm test -- widget/parser
    evidence:
      - parser tests pass on the updated window
  focused_questions:
    - does the diff preserve locked parser error invariants?
```

## Rules

- include only the artifacts the selected review mode needs
- prefer task cards and contract excerpts over free-form summaries
- if review scope changes, revise the packet instead of sending raw session history
- if a finding threatens a locked interface or invariant, route back through the orchestrator or human gate

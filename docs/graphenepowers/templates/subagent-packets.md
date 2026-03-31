# Subagent Packet Templates

Use these as baseline packet shapes for clean-context subagent handoff.

Related templates:

- `docs/graphenepowers/templates/design-contract.md`
- `docs/graphenepowers/templates/review-packet.md`
- `docs/graphenepowers/templates/retrospective-summary.md`

Canonical task-event schema:

- `docs/graphenepowers/schemas/task-event.schema.yaml`

## Task Event

```yaml
task_event:
  task_id: T3
  kind: task_completed
  status: review
  active_agent_time: 0.6h
  elapsed_active_time: 0.3h
  verification:
    commands:
      - node --test docs/graphenepowers/tools/plan-progress.test.cjs
    evidence:
      - parser regression tests are green
  artifacts:
    - docs/graphenepowers/tools/validate-plan-progress.cjs
    - docs/graphenepowers/tools/lib/plan-progress.cjs
```

## Execution Packet

```yaml
execution_packet:
  task_id: T3
  task_name: Implement widget parser
  window_id: W1
  depends_on_satisfied: [T1, T2]
  write_set:
    - src/widget/parser.ts
    - tests/widget/parser.test.ts
  acceptance:
    - parser accepts v2 widgets
    - invalid payloads return typed errors
  verification:
    commands:
      - npm test -- widget/parser
  contract_excerpt:
    locked_interfaces:
      - WidgetParser.parse(input)
    locked_invariants:
      - parser errors stay typed
  known_blockers: []
```

## Review Packet

```yaml
review_packet:
  mode: Quality Review
  scope:
    window_id: W1
    task_ids: [T3]
    changed_files:
      - src/widget/parser.ts
      - tests/widget/parser.test.ts
  design_contract: docs/graphenepowers/specs/2026-03-30-widget-design.md
  plan_progress_extract:
    review_state: pending
    acceptance:
      - parser accepts v2 widgets
    verification:
      commands:
        - npm test -- widget/parser
      evidence:
        - parser tests pass
  result_packet: docs/graphenepowers/examples/feature-windowed/result-packet-W1.md
```

## Retrospective Packet

```yaml
retrospective_packet:
  grade: Feature
  planning_mode: windowed
  design_contract: docs/graphenepowers/specs/2026-03-30-widget-design.md
  graph_summary:
    critical_path: [T1, T4, T7]
    graph_version: 4
    rewindow_count: 1
  plan_progress_path: docs/graphenepowers/examples/feature-windowed/plan-progress.md
  result_packets:
    - docs/graphenepowers/examples/feature-windowed/result-packet-W1.md
  review_findings:
    - review: Quality Review
      status: pass
  verification_summary:
    - window: W1
      result: passing
```

## Rules

- Keep packets scoped.
- Prefer concrete artifacts over narrative summaries.
- Add fields only when they materially improve execution, review, or retrospective quality.

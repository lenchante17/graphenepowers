# plan-progress.md

## Machine Record

```yaml
meta:
  plan_version: 1
  grade: Small Task
  planning_mode: lightweight
  confidence: medium
  profile_asymmetry: 0.34
  graph_version: 1
  critical_path: [T1, T2, T3]
  ready_parallel_lanes: [[T1]]
  estimated_duration: 2.0h
  estimated_effort: 2.75h
  started_at: 2026-03-30T11:00:00Z
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Add validator regression tests
    depends_on: []
    duration_pert: {o: 0.25, m: 0.5, p: 0.75}
    effort_pert: {o: 0.25, m: 0.75, p: 1.0}
    status: done
    active_agent_time: 0.6h
    elapsed_active_time: 0.4h
    owner: worker-a
    write_set:
      - docs/graphenepowers/tools/plan-progress.test.cjs
      - docs/graphenepowers/tools/test-fixtures/invalid-duplicate-task-ids.md
      - docs/graphenepowers/tools/test-fixtures/invalid-missing-blockers-section.md
    acceptance:
      - duplicate task ids fail validation
      - missing blockers section fails validation
    verification:
      commands:
        - node --test docs/graphenepowers/tools/plan-progress.test.cjs
      evidence:
        - regression tests fail before parser hardening
    artifacts:
      - docs/graphenepowers/tools/plan-progress.test.cjs
    review_state: passed
    blocker_ids: []
  - id: T2
    name: Harden shared parser and validator
    depends_on: [T1]
    duration_pert: {o: 0.5, m: 1.0, p: 1.5}
    effort_pert: {o: 0.75, m: 1.25, p: 1.75}
    status: review
    active_agent_time: 1.1h
    elapsed_active_time: 0.9h
    owner: worker-b
    write_set:
      - docs/graphenepowers/tools/lib/plan-progress.cjs
      - docs/graphenepowers/tools/validate-plan-progress.cjs
      - docs/graphenepowers/tools/render-plan-progress.cjs
    acceptance:
      - validator and renderer use the same parsing rules
      - duplicate task ids are rejected
      - blockers section is required
    verification:
      commands:
        - node --test docs/graphenepowers/tools/plan-progress.test.cjs
      evidence:
        - shared parser tests are green
    artifacts:
      - docs/graphenepowers/tools/lib/plan-progress.cjs
      - docs/graphenepowers/tools/validate-plan-progress.cjs
      - docs/graphenepowers/tools/render-plan-progress.cjs
    review_state: pending
    blocker_ids: []
  - id: T3
    name: Update examples and operations docs
    depends_on: [T2]
    duration_pert: {o: 0.25, m: 0.5, p: 0.75}
    effort_pert: {o: 0.5, m: 0.75, p: 1.0}
    status: ready
    active_agent_time: null
    elapsed_active_time: null
    owner: unassigned
    write_set:
      - docs/graphenepowers/examples/small-task-lightweight/README.md
      - docs/graphenepowers/examples/small-task-lightweight/execution-plan.md
      - docs/graphenepowers/plan-progress-operations.md
    acceptance:
      - non-windowed example is available
      - operations guide references the task-event schema
    verification:
      commands:
        - node docs/graphenepowers/tools/validate-plan-progress.cjs docs/graphenepowers/examples/small-task-lightweight/plan-progress.md
      evidence: []
    artifacts: []
    review_state: none
    blocker_ids: []

blockers: []
events:
  - ts: 2026-03-30T11:20:00Z
    kind: task_completed
    task_id: T1
  - ts: 2026-03-30T12:05:00Z
    kind: verification_recorded
    task_id: T2
```

## Human View Summary

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Status | Review | Owner |
|----|------|------------|----------------|--------------|--------|--------|-------|
| T1 | Add validator regression tests | `-` | `0.5 ± 0.25h` | `0.75 ± 0.35h` | `done` | `passed` | `worker-a` |
| T2 | Harden shared parser and validator | `T1` | `1.0 ± 0.5h` | `1.25 ± 0.5h` | `review` | `pending` | `worker-b` |
| T3 | Update examples and operations docs | `T2` | `0.5 ± 0.25h` | `0.75 ± 0.35h` | `ready` | `none` | `unassigned` |

## Human View Graph Summary

- graph version: `1`
- critical path: `T1 -> T2 -> T3`
- ready parallel lanes: `T1`

## Human View Kanban

### Ready

- `T3 Update examples and operations docs`

### Review

- `T2 Harden shared parser and validator`

### Done

- `T1 Add validator regression tests`

## Human View Review Queue

- `T2 Quality Review` — `waiting`

## Human View Blockers

No open blockers.

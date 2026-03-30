# plan-progress.md

## Machine Record

```yaml
meta:
  plan_version: 1
  grade: Feature
  planning_mode: windowed
  confidence: medium
  profile_asymmetry: 0.40
  graph_version: 1
  critical_path: [T1, T4, T7]
  ready_parallel_lanes: [[T1], [T2, T3]]
  estimated_duration: 8.0h
  estimated_effort: 11.0h
  contract_ref: docs/graphenepowers/specs/YYYY-MM-DD-example-design.md
  current_window_id: W1
  window_status: active
  started_at: null
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Example task
    depends_on: []
    window_id: W1
    duration_pert: {o: 0.5, m: 1.0, p: 2.0}
    effort_pert: {o: 0.5, m: 1.5, p: 2.5}
    status: ready
    active_agent_time: null
    elapsed_active_time: null
    owner: unassigned
    write_set:
      - src/example.ts
      - tests/example.test.ts
    acceptance:
      - behavior matches the approved requirement
    verification:
      commands:
        - npm test -- example
      evidence: []
    artifacts: []
    review_state: none
    blocker_ids: []

blockers: []
events: []
result_packets: []
```

## Human View Summary

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Status | Review | Owner |
|----|------|------------|----------------|--------------|--------|--------|-------|

## Human View Graph Summary

- graph version: `1`
- critical path: `T1 -> T4 -> T7`
- ready parallel lanes: `T1`, `T2 + T3`
- current window: `W1`
- deferred outside window: `T5`, `T6`, `T7`

## Human View Current Window

**Window ID:** `W1`

**Goal:** [one sentence]

**Admitted Tasks:** `T1`, `T2`, `T3`

**Deferred Outside Window:** `T4`, `T5`, `T6`, `T7`

## Human View Kanban

### Backlog

- `T4 Example backlog task`

### Ready

- `T1 Example ready task`

### In Progress

- `T2 Example active task`

### Blocked

- `T3 Example blocked task`

### Review

- `T8 Example review task`

### Done

- `T9 Example done task`

## Human View Review Queue

- `T8 Quality Review` — `waiting`
- `W1 Spec Delta Review` — `not needed`

## Human View Blockers

| Blocker ID | Task | Kind | Summary | Status |
|------------|------|------|---------|--------|
| B1 | T3 | Environment | [summary] | open |

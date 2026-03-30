# plan-progress.md

## Machine Record

```yaml
meta:
  plan_version: 1
  grade: Small Task
  planning_mode: lightweight
  confidence: medium
  profile_asymmetry: 0.20
  graph_version: 1
  critical_path: [T1, T2]
  ready_parallel_lanes: [[T1]]
  estimated_duration: 1.5h
  estimated_effort: 2.0h
  started_at: null
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Add failing test
    depends_on: []
    duration_pert: {o: 0.25, m: 0.5, p: 0.75}
    effort_pert: {o: 0.25, m: 0.5, p: 0.75}
    status: done
    active_agent_time: 0.3h
    elapsed_active_time: 0.2h
    owner: worker-a
    write_set:
      - tests/example.test.ts
    acceptance:
      - failing test exists
    verification:
      commands:
        - node --test tests/example.test.js
      evidence:
        - failure observed
    artifacts:
      - tests/example.test.ts
    review_state: passed
    blocker_ids: []
  - id: T1
    name: Implement behavior
    depends_on: [T1]
    duration_pert: {o: 0.5, m: 0.75, p: 1.0}
    effort_pert: {o: 0.5, m: 1.0, p: 1.25}
    status: review
    active_agent_time: 0.6h
    elapsed_active_time: 0.5h
    owner: worker-b
    write_set:
      - src/example.ts
    acceptance:
      - behavior passes the locked test
    verification:
      commands:
        - node --test tests/example.test.js
      evidence:
        - test passes
    artifacts:
      - src/example.ts
    review_state: pending
    blocker_ids: []

blockers: []
events: []
```

## Human View Summary

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Status | Review | Owner |
|----|------|------------|----------------|--------------|--------|--------|-------|
| T1 | Add failing test | `-` | `0.5 ± 0.25h` | `0.5 ± 0.25h` | `done` | `passed` | `worker-a` |
| T1 | Implement behavior | `T1` | `0.75 ± 0.25h` | `1.0 ± 0.38h` | `review` | `pending` | `worker-b` |

## Human View Graph Summary

- graph version: `1`
- critical path: `T1 -> T2`
- ready parallel lanes: `T1`

## Human View Kanban

### Review

- `T1 Implement behavior`

### Done

- `T1 Add failing test`

## Human View Blockers

No open blockers.

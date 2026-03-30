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
  critical_path: [T1]
  ready_parallel_lanes: [[T1]]
  estimated_duration: 0.75h
  estimated_effort: 1.0h
  started_at: null
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Apply isolated fix
    depends_on: []
    duration_pert: {o: 0.25, m: 0.5, p: 0.75}
    effort_pert: {o: 0.25, m: 0.5, p: 0.75}
    status: done
    active_agent_time: 0.4h
    elapsed_active_time: 0.3h
    owner: worker-a
    write_set:
      - src/example.ts
    acceptance:
      - behavior matches the approved requirement
    verification:
      commands:
        - node --test tests/example.test.js
      evidence:
        - tests pass
    artifacts:
      - src/example.ts
    review_state: passed
    blocker_ids: []

blockers: []
events: []
```

## Human View Summary

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Status | Review | Owner |
|----|------|------------|----------------|--------------|--------|--------|-------|
| T1 | Apply isolated fix | `-` | `0.5 ± 0.25h` | `0.5 ± 0.25h` | `done` | `passed` | `worker-a` |

## Human View Graph Summary

- graph version: `1`
- critical path: `T1`
- ready parallel lanes: `T1`

## Human View Kanban

### Done

- `T1 Apply isolated fix`

---
name: executing-plans
description: Use when executing a written plan or plan-progress record with dependencies, blockers, and verification requirements, especially when work may run in parallel or require isolated workspaces
---
# Executing Plans
Orchestrate a written plan; do not improvise execution state.
## Read In Order
1. `states/core-loop.md`
2. `states/recovery-and-close.md`
Load `subagents/execution-subagent/AGENTS.md`, `scripts/setup-worktree.sh`, and `docs/graphenepowers/plan-progress-operations.md` as needed.
## Non-Negotiables
- Only the orchestrator writes `plan-progress.md`.
- Read the current plan and `plan-progress.md` before dispatch.
- Dispatch only ready tasks whose active write sets do not conflict.
- Prefer separate subagents when tasks are parallel-safe; serialize or isolate tasks that share interfaces, services, fixtures, or environment state.
- Use `lean` packets for standalone pattern-based tasks and `full` packets when architecture or dependencies matter.
- Include explicit service hygiene when work starts long-lived processes or ports.
- Run `graphenepowers:test-driven-development` before production code.
- Use `graphenepowers:systematic-debugging` when verification or blocker root cause is unclear.
- After each durable transition, update task nodes, re-render human views, and validate.
## Human Gates
- Stop for grade raises, new external dependencies, threatened locked interfaces or invariants, unexpected public interface changes, low-confidence replan, or missing ownership or verification data.
## Handoff
- Review-ready work goes to `graphenepowers:code-review`.
- Review failures return to `dispatch` with `review_state: changes_requested`.
- `Feature` close-out expects result packets and project-root `retrospective.md`.

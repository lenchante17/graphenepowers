# Execution Packets

Planning should support clean-context execution workers directly.

## Required Packet Fields

- `task_id`
- task name
- current window id when relevant
- `context_mode`: `lean` or `full`
- owned `write_set`
- acceptance criteria
- verification commands
- relevant contract excerpts when present
- known blockers

Use `lean` packets for standalone, pattern-based work where the worker does not need the full plan. Use `full` packets when dependencies, architecture, or contract interactions matter.

If a task starts services or can leave persistent side effects, add an explicit hygiene contract covering cleanup before start, environment checks, and cleanup before report.

Recommended hygiene fields:

- `cleanup_before`: commands that clear stale processes or state before startup
- `readiness_checks`: commands that verify ports, sockets, fixtures, or temp paths are ready
- `cleanup_after`: commands that stop the started service and prove cleanup happened

Workers should return structured output that the orchestrator can convert into graph, kanban, review, and blocker state updates.

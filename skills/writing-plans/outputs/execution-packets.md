# Execution Packets

Planning should support clean-context execution workers directly.

## Required Packet Fields

- `task_id`
- task name
- current window id when relevant
- owned `write_set`
- acceptance criteria
- verification commands
- relevant contract excerpts when present
- known blockers

Workers should return structured output that the orchestrator can convert into graph, kanban, review, and blocker state updates.

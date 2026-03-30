# Graph Design

Turn approved requirements into a dependency model before writing task prose.

## Step 1: Map the work as a graph

Identify:

- change units
- dependencies between units
- expected write sets
- verification per unit

Each task node should include:

- stable task id (`T1`, `T2`, ...)
- `depends_on`
- initial status seed
- `owner`
- write set or owned files or modules
- acceptance criteria
- verification command
- expected artifacts
- fields that render into kanban and review state
- both `duration` and `effort` estimates

## Step 2: Estimate twice

Every task gets two PERT triplets:

- `duration_pert`: elapsed time for scheduling
- `effort_pert`: total agent work for capacity and cost

Do not reuse one estimate for both.

## Step 3: Identify the critical path

- Compute the dependency path that controls elapsed time
- Identify ready parallel lanes without violating dependency logic
- Mark early parallelizable work
- Pull blockers and interface risks as early as practical

For `Feature`, detail the near-term critical path and risky edges first. Leave later work coarser if rolling re-plan will refine it later.

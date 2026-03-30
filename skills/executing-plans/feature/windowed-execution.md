# Feature Windowing

Use this guidance when the plan's `planning_mode` is `windowed`.

## Rules

- the execution unit is the committed window, not the whole feature
- local reordering inside the window is normal if contract and graph assumptions still hold
- estimate misses are warnings, not automatic human gates
- prefer autonomous re-windowing over whole-plan rewrite when the contract still holds

## Result Packet

Each completed window should produce:

- changed artifacts
- completed tasks
- verification evidence
- graph delta
- critical-path delta
- remaining risks
- recommendation for the next window

## Next-Window Decision

After a result packet, choose one:

- auto-commit next window
- autonomous re-windowing
- exception gate

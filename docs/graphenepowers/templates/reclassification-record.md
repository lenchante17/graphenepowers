# Reclassification Record

Use this record whenever route grade, confidence posture, or feature mode changes after work has started.

## Markdown Record

- previous route:
- new route:
- previous confidence:
- new confidence:
- trigger:
- evidence:
- approved by:
- affected artifacts:
- next step:

## `plan-progress.md` Event Shape

```yaml
- kind: route_reclassified
  at: 2026-03-30T16:10:00Z
  previous_grade: Small Task
  new_grade: Feature
  previous_confidence: medium
  new_confidence: medium
  trigger: uncovered a locked public interface and cross-module write set
  evidence:
    - parser change now affects public API and migration docs
    - review requires design-contract updates before more execution
  approved_by: human
  affected_artifacts:
    - docs/graphenepowers/plans/2026-03-30-widget-parser.md
    - docs/graphenepowers/plans/2026-03-30-widget-parser-plan-progress.md
  next_step: return to routing/feature.md and lock the design contract
```

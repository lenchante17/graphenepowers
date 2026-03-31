# Small Task Route

Use this route after `routing/triage.md` classifies the work as `Small Task`.

## Goal

Add lightweight planning and explicit state tracking without collapsing into feature-grade process.

## Route

```text
Request
-> using-graphenepowers
-> routing/triage.md
-> Small Task
-> graphenepowers:writing-plans (lightweight)
-> graphenepowers:executing-plans
-> graphenepowers:code-review
-> graphenepowers:retrospective
```

## Notes

- use `graphenepowers:writing-plans` in `lightweight` mode
- keep the task graph explicit even when the plan stays short
- if the classification used a hard override, run preflight review before execution
- if scope rises or confidence drops during rolling re-plan, return to `routing/triage.md`
- if the route changes after execution has started, record it with `docs/graphenepowers/templates/reclassification-record.md` before continuing

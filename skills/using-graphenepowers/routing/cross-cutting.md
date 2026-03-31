# Cross-Cutting Routes

These rules can interrupt any main route.

## Bugs And Unclear Failures

```text
Request
-> using-graphenepowers
-> routing/cross-cutting.md
-> graphenepowers:systematic-debugging
-> if code change required: graphenepowers:test-driven-development
```

Use this path when:

- a test failure appears
- behavior is unexpected
- execution hits an unclear blocker
- verification fails without a clear cause

## During Planned Work

- `graphenepowers:systematic-debugging` handles unclear failures inside `executing-plans`
- `graphenepowers:test-driven-development` is required before production code changes
- if debugging changes the scope or risk class, return to `routing/triage.md`, consult `docs/graphenepowers/human-gates.md`, and record the change with `docs/graphenepowers/templates/reclassification-record.md`

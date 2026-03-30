# Micro Route

Use this route after `routing/triage.md` classifies the work as `Micro`.

## Goal

Keep isolated work fast without dropping verification discipline.

## Route

```text
Request
-> using-graphenepowers
-> routing/triage.md
-> Micro
-> execute directly
-> verify before completion
```

## Rules

- keep the scope tight
- state the verification command before editing
- use the smallest effective change
- do not create a full plan unless the work grows
- if the work stops being isolated, return to `routing/triage.md`

## Support Asset

- `docs/graphenepowers/micro-fast-path.md`

## Escalate Out Of Micro When

- the write set expands across multiple modules
- a new invariant or design choice appears
- a public interface may change
- verification becomes multi-step
- root cause is unclear enough to require `graphenepowers:systematic-debugging`

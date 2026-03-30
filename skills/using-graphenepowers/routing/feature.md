# Feature Route

Use this route after `routing/triage.md` classifies the work as `Feature`, or when classification confidence is too low to trust a lighter route.

## Goal

Force design clarity before implementation and keep execution windowed once the design contract is locked.

## Route

```text
Request
-> using-graphenepowers
-> routing/triage.md
-> Feature
-> research similar work and latest knowledge
-> prepare context brief
-> graphenepowers:brainstorming
-> lock design contract
-> graphenepowers:writing-plans (windowed)
-> graphenepowers:code-review (Preflight Spec Review)
-> graphenepowers:executing-plans
-> graphenepowers:code-review
-> graphenepowers:retrospective
```

## Rules

- do not start implementation before design approval
- keep the design contract stable before planning
- use `windowed` planning rather than fully detailing the entire feature up front
- prefer re-windowing over whole-plan rewrite when the contract still holds

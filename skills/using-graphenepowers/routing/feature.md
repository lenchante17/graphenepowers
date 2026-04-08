# Feature Route

Use this route after `routing/triage.md` classifies the work as `Feature`, or when classification confidence is too low to trust a lighter route.

## Goal

Force design clarity before implementation and keep execution windowed once the design contract is locked.

## Mode Selection

Choose the initial feature mode before brainstorming. If the Stage 2 research changes confidence, switch modes during brainstorming.

### Exploratory Feature

Use when interfaces, invariants, sequencing, or user-visible behavior are still meaningfully undecided.

```text
Request
-> using-graphenepowers
-> routing/triage.md
-> Feature
-> graphenepowers:brainstorming (exploratory; main agent owns Stage 2 search/survey/briefing)
-> graphenepowers:writing-plans (windowed)
-> graphenepowers:code-review (Preflight Spec Review)
-> graphenepowers:executing-plans
-> graphenepowers:code-review
-> graphenepowers:retrospective
```

### Stable-Design Feature

Use when a design already exists or is mostly agreed and the remaining work is to confirm assumptions, surface only blocking questions, and lock the contract.

```text
Request
-> using-graphenepowers
-> routing/triage.md
-> Feature
-> graphenepowers:brainstorming (contract-confirmation; main agent owns Stage 2 search/survey/briefing)
-> graphenepowers:writing-plans (windowed)
-> graphenepowers:code-review (Preflight Spec Review)
-> graphenepowers:executing-plans
-> graphenepowers:code-review
-> graphenepowers:retrospective
```

## Rules

- do not start implementation before design approval
- keep Stage 2 research and Stage 3 option generation with the same main agent so later design choices can reuse the gathered context
- keep the design contract stable before planning
- use `windowed` planning rather than fully detailing the entire feature up front
- prefer re-windowing over whole-plan rewrite when the contract still holds
- if contract-confirmation mode reveals unstable interfaces or unresolved invariants, switch immediately to exploratory mode

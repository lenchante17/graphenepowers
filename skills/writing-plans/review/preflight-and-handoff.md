# Preflight Review and Handoff

## Preflight Review

Run `graphenepowers:code-review` in `Preflight Spec Review` mode when:

- the classification is `Feature`
- the classification used a hard override

Before preflight review or direct handoff:

- run `writing-plans/scripts/check-plan-placeholders.cjs <plan-doc>` on the saved plan document
- fix placeholder hits, fuzzy ownership, or vague verification before asking a reviewer or executor to trust the plan

When preflight review runs:

- spawn a fresh clean-context reviewer instead of reusing the planner
- require the reviewer to read the full spec or contract, plan, and seeded `plan-progress.md`
- require the reviewer to return one self-contained human-facing brief sized to roughly one A4 page
- treat that brief as the primary human review artifact; the human should not need to re-read the raw plan unless they want deeper inspection
- make the brief cover plan summary, critical path or parallel lanes, major gates or risks, findings, and approval status

If preflight review fails:

- fix the plan
- re-run preflight review
- replace the previous human-facing brief with a fresh reviewer brief
- do not start implementation yet

Use `writing-plans/review/plan-document-reviewer-prompt.md` as the reviewer prompt asset.

## Handoff to Execution

After saving both files:

- hand off to `graphenepowers:executing-plans`
- mention the planning mode explicitly
- mention whether rolling re-plan is expected
- mention any low-confidence tasks explicitly

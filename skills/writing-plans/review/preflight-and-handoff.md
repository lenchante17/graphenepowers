# Preflight Review and Handoff

## Preflight Review

Run `graphenepowers:code-review` in `Preflight Spec Review` mode when:

- the classification is `Feature`
- the classification used a hard override

Before preflight review or direct handoff:

- run `writing-plans/scripts/check-plan-placeholders.cjs <plan-doc>` on the saved plan document
- fix placeholder hits, fuzzy ownership, or vague verification before asking a reviewer or executor to trust the plan

If preflight review fails:

- fix the plan
- re-run preflight review
- do not start implementation yet

Use `writing-plans/review/plan-document-reviewer-prompt.md` as the reviewer prompt asset.

## Handoff to Execution

After saving both files:

- hand off to `graphenepowers:executing-plans`
- mention the planning mode explicitly
- mention whether rolling re-plan is expected
- mention any low-confidence tasks explicitly

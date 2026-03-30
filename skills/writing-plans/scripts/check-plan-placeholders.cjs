#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const target = process.argv[2];

if (!target || target === '--help' || target === '-h') {
  console.error('Usage: check-plan-placeholders.cjs <plan-doc.md>');
  process.exit(target ? 0 : 1);
}

const filePath = path.resolve(process.cwd(), target);
const source = fs.readFileSync(filePath, 'utf8');
const lines = source.split(/\r?\n/);

const rules = [
  { label: 'placeholder-token', pattern: /\b(TBD|TODO)\b/i, hint: 'Replace placeholder tokens with concrete plan detail.' },
  { label: 'deferred-detail', pattern: /\b(implement later|fill in details)\b/i, hint: 'Do not defer task detail inside an approved execution plan.' },
  { label: 'generic-hardening', pattern: /\b(add appropriate error handling|add validation|handle edge cases)\b/i, hint: 'Name the actual edge case, file, or acceptance target.' },
  { label: 'generic-tests', pattern: /\bwrite tests for the above\b/i, hint: 'Name the test file or verification command instead of referring to "the above".' },
  { label: 'cross-task-shortcut', pattern: /\bsimilar to Task\b/i, hint: 'Repeat the required detail; clean-context workers may read tasks out of order.' },
];

const findings = [];

lines.forEach((line, index) => {
  for (const rule of rules) {
    if (rule.pattern.test(line)) {
      findings.push({
        line: index + 1,
        label: rule.label,
        text: line.trim(),
        hint: rule.hint,
      });
    }
  }
});

if (findings.length === 0) {
  console.log(`OK: no placeholder findings in ${target}`);
  process.exit(0);
}

console.error(`FAIL: found ${findings.length} placeholder issue(s) in ${target}`);
for (const finding of findings) {
  console.error(`- line ${finding.line} [${finding.label}] ${finding.text}`);
  console.error(`  hint: ${finding.hint}`);
}
process.exit(1);

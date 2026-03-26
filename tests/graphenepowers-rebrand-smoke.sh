#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

assert_file() {
  local path="$1"
  if [ ! -f "$ROOT/$path" ]; then
    echo "Missing expected file: $path" >&2
    exit 1
  fi
}

assert_contains() {
  local path="$1"
  local pattern="$2"
  if ! grep -qE "$pattern" "$ROOT/$path"; then
    echo "Expected pattern '$pattern' in $path" >&2
    exit 1
  fi
}

assert_absent_dir() {
  local path="$1"
  if [ -d "$ROOT/$path" ]; then
    echo "Directory should not be publicly exposed anymore: $path" >&2
    exit 1
  fi
}

assert_file "README.md"
assert_contains "README.md" "^# GraphenePowers$"
assert_contains "README.md" 'Forked from `obra/superpowers`'

assert_file ".codex/INSTALL.md"
assert_contains ".codex/INSTALL.md" "github.com/lenchante17/graphenepowers.git"
assert_contains ".codex/INSTALL.md" "~/.agents/skills/graphenepowers"

assert_file "docs/README.codex.md"
assert_contains "docs/README.codex.md" "using-graphenepowers"

assert_file "package.json"
assert_contains "package.json" "\"name\": \"graphenepowers\""

assert_file ".opencode/plugins/graphenepowers.js"
assert_contains ".opencode/plugins/graphenepowers.js" "You have graphenepowers"

assert_file "skills/using-graphenepowers/SKILL.md"
assert_file "skills/triage/SKILL.md"
assert_file "skills/code-review/SKILL.md"
assert_file "skills/retrospective/SKILL.md"

assert_absent_dir "skills/using-superpowers"
assert_absent_dir "skills/subagent-driven-development"

echo "graphenepowers rebrand smoke test passed"

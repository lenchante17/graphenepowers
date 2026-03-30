#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: setup-worktree.sh <branch-name> [--location <dir>] [--run-setup] [--baseline <command>] [--run-baseline]

Creates an isolated git worktree using GraphenePowers defaults:
- prefer existing .worktrees/
- otherwise prefer existing worktrees/
- otherwise default to .worktrees/
- fail if a project-local worktree directory is not ignored

By default this script prints suggested setup and baseline steps without running them.
Use --run-setup and/or --run-baseline for explicit execution.
EOF
}

if [[ $# -eq 0 ]]; then
  usage
  exit 1
fi

BRANCH_NAME=""
LOCATION=""
RUN_SETUP="false"
RUN_BASELINE="false"
BASELINE_COMMAND=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --location)
      LOCATION="${2:-}"
      shift 2
      ;;
    --run-setup)
      RUN_SETUP="true"
      shift
      ;;
    --baseline)
      BASELINE_COMMAND="${2:-}"
      shift 2
      ;;
    --run-baseline)
      RUN_BASELINE="true"
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    -*)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
    *)
      if [[ -n "$BRANCH_NAME" ]]; then
        echo "Only one branch name is allowed." >&2
        exit 1
      fi
      BRANCH_NAME="$1"
      shift
      ;;
  esac
done

if [[ -z "$BRANCH_NAME" ]]; then
  echo "Branch name is required." >&2
  usage >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

choose_location() {
  if [[ -n "$LOCATION" ]]; then
    printf '%s\n' "$LOCATION"
  elif [[ -d .worktrees ]]; then
    printf '.worktrees\n'
  elif [[ -d worktrees ]]; then
    printf 'worktrees\n'
  else
    printf '.worktrees\n'
  fi
}

LOCATION="$(choose_location)"

resolve_parent() {
  case "$1" in
    .worktrees|worktrees)
      printf '%s/%s\n' "$REPO_ROOT" "$1"
      ;;
    /*)
      printf '%s\n' "$1"
      ;;
    *)
      printf '%s/%s\n' "$REPO_ROOT" "$1"
      ;;
  esac
}

verify_ignored() {
  local dir_name="$1"
  if ! git check-ignore -q "$dir_name"; then
    echo "Refusing to create a project-local worktree in '$dir_name' because it is not ignored." >&2
    echo "Add '$dir_name/' to .gitignore (or use an explicit external location) before running this script." >&2
    exit 1
  fi
}

if [[ "$LOCATION" == ".worktrees" || "$LOCATION" == "worktrees" ]]; then
  verify_ignored "$LOCATION"
fi

PARENT_DIR="$(resolve_parent "$LOCATION")"
WORKTREE_PATH="$PARENT_DIR/$BRANCH_NAME"
mkdir -p "$PARENT_DIR"

if [[ -e "$WORKTREE_PATH" ]]; then
  echo "Worktree path already exists: $WORKTREE_PATH" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  git worktree add "$WORKTREE_PATH" "$BRANCH_NAME"
else
  git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"
fi

declare -a setup_commands=()

if [[ -f "$WORKTREE_PATH/package.json" ]]; then
  setup_commands+=("npm install")
fi
if [[ -f "$WORKTREE_PATH/Cargo.toml" ]]; then
  setup_commands+=("cargo build")
fi
if [[ -f "$WORKTREE_PATH/requirements.txt" ]]; then
  setup_commands+=("python -m pip install -r requirements.txt")
fi
if [[ -f "$WORKTREE_PATH/pyproject.toml" ]]; then
  setup_commands+=("poetry install")
fi
if [[ -f "$WORKTREE_PATH/go.mod" ]]; then
  setup_commands+=("go mod download")
fi

run_in_worktree() {
  local command="$1"
  (
    cd "$WORKTREE_PATH"
    bash -lc "$command"
  )
}

if [[ "$RUN_SETUP" == "true" && ${#setup_commands[@]} -gt 0 ]]; then
  for command in "${setup_commands[@]}"; do
    echo "Running setup: $command"
    run_in_worktree "$command"
  done
fi

if [[ -n "$BASELINE_COMMAND" && "$RUN_BASELINE" == "true" ]]; then
  echo "Running baseline verification: $BASELINE_COMMAND"
  run_in_worktree "$BASELINE_COMMAND"
fi

echo "Worktree ready at $WORKTREE_PATH"
echo "Location source: $LOCATION"

if [[ ${#setup_commands[@]} -gt 0 ]]; then
  if [[ "$RUN_SETUP" == "true" ]]; then
    echo "Setup commands completed."
  else
    echo "Suggested setup commands:"
    for command in "${setup_commands[@]}"; do
      echo "- $command"
    done
  fi
fi

if [[ -n "$BASELINE_COMMAND" ]]; then
  if [[ "$RUN_BASELINE" == "true" ]]; then
    echo "Baseline verification completed."
  else
    echo "Suggested baseline verification: $BASELINE_COMMAND"
  fi
else
  echo "No baseline command provided. Run the project-appropriate test or verification command before implementation."
fi

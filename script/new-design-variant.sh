#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <variant-name> [base-branch]"
  exit 1
fi

variant_name="$1"
base_branch="${2:-design/baseline-v1}"
repo_root="$(pwd)"
repo_name="$(basename "$repo_root")"
branch_name="design/$variant_name"
worktree_dir="../${repo_name}-${variant_name}"

if ! git show-ref --verify --quiet "refs/heads/$base_branch"; then
  echo "Base branch '$base_branch' does not exist."
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$branch_name"; then
  echo "Branch '$branch_name' already exists."
  exit 1
fi

if [[ -e "$worktree_dir" ]]; then
  echo "Worktree path '$worktree_dir' already exists."
  exit 1
fi

git branch "$branch_name" "$base_branch"
git worktree add "$worktree_dir" "$branch_name"

echo "Created branch: $branch_name"
echo "Created worktree: $worktree_dir"
echo "Start it with: cd $worktree_dir && PORT=5052 npm run dev"

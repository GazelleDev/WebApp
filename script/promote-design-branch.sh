#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <source-branch> [baseline-name]"
  echo "Example: $0 design/exploration-v2 baseline-v2"
  exit 1
fi

source_branch="$1"
baseline_name="${2:-}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree must be clean before promotion."
  exit 1
fi

if ! git show-ref --verify --quiet "refs/heads/$source_branch"; then
  echo "Source branch '$source_branch' does not exist."
  exit 1
fi

git checkout main
git merge --no-ff "$source_branch" -m "Merge $source_branch into main"

if [[ -n "$baseline_name" ]]; then
  baseline_branch="design/$baseline_name"
  baseline_tag="design-$baseline_name"

  if git show-ref --verify --quiet "refs/heads/$baseline_branch"; then
    echo "Baseline branch '$baseline_branch' already exists."
    exit 1
  fi

  if git rev-parse --verify --quiet "refs/tags/$baseline_tag" >/dev/null; then
    echo "Baseline tag '$baseline_tag' already exists."
    exit 1
  fi

  git branch "$baseline_branch" main
  git tag "$baseline_tag" main

  echo "Created baseline branch: $baseline_branch"
  echo "Created baseline tag: $baseline_tag"
fi

echo "Promoted $source_branch into main"

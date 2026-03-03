# Design Version Workflow

This project now uses a simple git branch + worktree flow for design explorations.

## Branch Roles

- `main`: approved design line and the branch that should stay safe to share or deploy.
- `design/baseline-v1`: frozen visual checkpoint. Do not keep iterating here.
- `design/exploration-v2`: active design branch for the current round of refinement.
- `design/<variant-name>`: short-lived experiments created from a baseline or exploration branch.

## Current Baseline

- Current stable design branch: `design/baseline-v1`
- Use that branch as the starting point for any new visual exploration.

## Create a New Design Variant

From the repo root:

```bash
./script/new-design-variant.sh home-v2
```

That will:

- create a branch named `design/home-v2`
- create a sibling worktree directory named `../Brand-Design-Guide-home-v2`
- check that branch out in the new directory

## Naming

Recommended branch names:

- `design/home-v2`
- `design/navbar-alt`
- `design/footer-refine`
- `design/palette-warm-dark`

## Promote an Approved Design

When a variant is approved, merge it into `main` and optionally create a new frozen baseline:

```bash
./script/promote-design-branch.sh design/exploration-v2 baseline-v2
```

That will:

- merge the approved design branch into `main`
- create a new branch named `design/baseline-v2`
- create a matching tag named `design-baseline-v2`

## Compare Versions

```bash
git diff design/baseline-v1...design/home-v2
git log --oneline --decorate --graph --all
```

## Run a Variant

Each worktree is its own checkout, so you can run the app separately inside that folder:

```bash
cd ../Brand-Design-Guide-home-v2
PORT=5052 npm run dev
```

Use a different port for each active design variant.

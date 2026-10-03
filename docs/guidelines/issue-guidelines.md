# Issue guidelines

How we use GitHub issues in this repo so that work stays traceable from report to
merge.

## 1. Labels

| Label | Meaning |
|---|---|
| `bug` | Something that worked before is broken, or is plainly wrong |
| `feature` | New capability (e.g. blog comments) |
| `chore` | Tooling, CI, deps, docs |
| `docs` | Documentation changes |
| `good first issue` | Self-contained, low-risk starter task |
| `help wanted` | We want community/external help |

## 2. Issue templates

Use the templates in `.github/ISSUE_TEMPLATE/`:

- **Bug report** — must include: environment (frontend/backend/studio), reproduction
  steps, expected vs actual behavior, and logs/screenshots.
- **Feature request** — must include: the user-facing problem, proposed approach, and
  scope (which part of the repo it touches). If a design decision is needed, the issue
  should link to an ADR once drafted.
- **Config/chore** — must include: which workflow/env is affected and the evidence
  (failing job link, lint output).

## 3. Workflow (issue → change)

1. **Triage:** a maintainer labels the issue and confirms scope.
2. **Design (if non-trivial):** open a short ADR draft under `docs/adr/` when the
   change involves technology choices or trade-offs (see ADR-001 as an example).
3. **Branch:** `vibe/<short-slug>` or `feat/<slug>` from `main`. One issue → one PR.
4. **PR:** reference the issue in the PR body (`Closes #N`). CI must pass before review.
5. **Review & merge:** squash-merge to `main`; CI + deploy workflows run automatically.
6. **Docs:** if the change introduces a new operational task, add or update an SOP
   under `docs/sop/` in the same PR.

## 4. Definition of done for an issue

- Code merged to `main` with a passing CI run.
- Relevant docs updated (ADR for decisions, SOP for operations).
- If the change touches Sanity schema: the Studio deploys without errors and the
  production dataset accepts the new documents.

## 5. Conventions

- Issue titles: imperative, specific — "Blog comment form rejects valid 2-character names",
  not "Comments broken".
- Never close issues by reponing chatter; close them in the merge commit or PR body.
- Keep discussions in the issue; decisions go into ADRs so they survive the thread.

---
name: plans
description: Use when a brief or the user names a plan, task, map, or the plans directory, and before any code change in a repo that has a plan. The layout of plans, tasks, reports, and maps under `~/.local/share/plans/`, and the decision tiers every agent follows under a plan.
---

# Plans

A plan is the shared understanding between the user and every agent working on an effort. Plans live outside the code, in one global directory the user edits in their editor and serves to a browser, and agents re-read from disk before every write.

## Layout

```
~/.local/share/plans/            ($XDG_DATA_HOME/plans when set); its own git repo
  <project>/<slug>/
    plan.md                      the plan
    tasks/NN-<task-slug>.md      one file per task, numbered from 01 in dependency order
    reports/NN-<task-slug>.md    the debrief for task NN; the worker writes it, later edits only append under Plan impact
    map/                         a wayfinder map, when the effort needed one before the plan (layout in the skill "wayfinder")
```

`<project>` is the name of the code repo's main checkout: `basename "$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")"`, the same from any worktree. A repo has a plan when `~/.local/share/plans/<project>/` holds one; a plan names its repo path on the first line under Goal.

The plans directory is a git repo (`git init` it when missing). Every session that writes there commits there before it stops; the user's uncommitted changes in it are their hand edits. The directory is served as plain files (`tailscale serve`, or any static server), so every page must work from a directory listing: no `index.html` anywhere.

One writer per file. `plan.md` and the task files belong to the user and the manager (the session the user is talking to). A worker writes only its own report and its own code; anything it wants changed in the plan or a task goes in the report, and the manager folds it in after the wave.

## plan.md

```
# <Title>

## Goal
Repo: <absolute path of the code repo>
Who the work is for and what changes for them. One paragraph.

## Shape
The data shapes, seams, and module responsibilities that are settled. Prose and type sketches. File paths and code snippets go stale in a week, so they stay out.

## Decisions
1. <decision>. <reason> `[confirmed]`

## Out of scope
What the effort will not do, one line each.

## Open questions
Decisions not yet asked. Empty when `/align` is done.
```

Every decision line carries one tag:

- `[confirmed]` the user agreed in conversation.
- `[user-edit]` the user wrote it into a file directly. Treat as confirmed, and keep their wording.
- `[proposed]` an agent made it during work and the user has not seen it yet. The user confirms by changing the tag, or rejects by deleting the line.

## tasks/NN-task-slug.md

```
# NN: <Title>

Status: ready | in flight | done | blocked
Blocked by: NN, NN | none

## What to build
The behaviour this task makes work, from the user's side, and the seams it is tested at.

## Acceptance criteria
- [ ] one per line, each checkable by a command or an observation

## Out of scope
```

`ready` is the status of every new task, blockers or not. The manager sets `in flight` at dispatch and `done` after merge. `blocked` means a "Needs your decision" item in the task's report gates the rest of it.

The frontier is every task whose status is `ready` and whose blockers are all `done`.

## Decision tiers

Every choice an agent makes under a plan falls in one of three tiers. The tier decides whether the user hears about it before, after, or never.

**Major: stop and ask.** A choice is major when it changes the plan: scope, a data shape or interface not already in Shape, a new dependency, a one-way door (a migration, a deletion, an external side effect), or a departure from a `[confirmed]` or `[user-edit]` decision. Put the question to the user with options and a recommended answer. A worker that cannot reach the user records the question in its report under "Needs your decision", marks the task `blocked`, and finishes every part of the task that does not hang on the answer.

**Mid: act, then show.** A choice a reviewer would want to see: where a module lives, the name of anything exported, an error-handling or test strategy, a departure from the task text that keeps the plan intact. Make it, and record it as a `[proposed]` line in the report's Decisions section.

**Minor: act.** Local details nobody needs to review. They leave no trace beyond the code.

When torn between two tiers, pick the higher one.

---
name: status
description: Where a plan stands and what waits on the user.
disable-model-invocation: true
---

# Status

Read the plan's directory (ask which plan when there are several) together with the branches and worktrees, and hand back the overview. Build it from the files and the git state only.

```
## Waiting on you
Every `[proposed]` decision in plan.md, and every "Needs your decision" item in the reports that no `[confirmed]` or `[user-edit]` line in plan.md answers. Numbered, each with its recommendation. Omit the section when it is empty.

## Capsule
At most five bullets: what the effort is, how far it is (tasks done of total), what the last wave landed.

## Tasks
One line each, prefixed with exactly one tag:
[done] [in flight <branch>] [ready] [blocked by NN] [blocked on you]

## Next move
The one action that advances the plan most: a decision to make, `/propagate` after edits, the next `/dispatch` wave.
```

`blocked by NN` is a `ready` task with an unmet blocker; `blocked on you` is a task whose file says `blocked`.

When it outgrows a screen, cut detail before cutting tasks. Done when every task file has exactly one line under Tasks.

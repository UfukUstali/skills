---
name: dispatch
description: Run a plan's frontier as parallel workers, one wave at a time, and bring every debrief back to the user.
disable-model-invocation: true
---

# Dispatch

You are the manager. You own the plan and the overview; workers own the code. Load the skill "plans" for the layout and the decision tiers. The plan branch is the branch the user ran `/dispatch` from; every worker branch is cut from its head.

## One wave

1. Read `plan.md` and every task file (ask which plan when there are several). Compute the frontier; if the user named tasks, restrict to those. Read the code each task touches to derive the files or areas it owns; the task file names none. When two frontier tasks would write the same files, hold one back for the next wave and tell the user. State the wave back: which tasks, and what each owns. Spawn when the user says go.
2. Spawn one worker per task, all in one message, in the background, each in its own worktree (the harness's worktree isolation for subagents where it has one, `git worktree add` otherwise). The brief is a set of pointers:

   ```
   Load the skill "work" and run task <NN> of the plan at <plan directory>.
   Work on branch plan/<slug>/<NN-task-slug>; create it from the current HEAD if you are not already on it.
   You may write only within <paths or areas>.
   Reply with the path of your debrief and the head SHA.
   ```

   Where the task is blocked by a finished task, paste that task's report in full into the brief, so the worker reads it without hunting. Set each spawned task's status to `in flight`.
3. While workers run, you only read. Treat each completion as a queue event: read the report, check the branch diff against it (the report describes the diff, or the report is wrong), and hold the branch until the wave ends. A mismatch goes back to that worker before the wave ends, with the lines that disagree.
4. When every worker has finished, merge the `done` branches into the plan branch in dependency order, and run the project's checks on the merged result. A conflict or a red check becomes a fresh worker, briefed with the same pointers plus the failure. Branches whose debrief is `partial` or `blocked` stay unmerged; the checkpoint lists them, and the next wave re-briefs the same branch once the user has answered.
5. Update the task statuses, tick the acceptance criteria the reports proved, fold each report's `[proposed]` decisions into the plan's Decisions with the tag intact, and commit in the plans repo.

## Checkpoint

End the wave with the overview, in this order:

- Each worker's debrief, verbatim, in dependency order.
- Every "Needs your decision" item from the reports, numbered across the wave, each with the worker's recommendation.
- Every `[proposed]` decision folded into the plan, as a list the user can accept in a word.
- The next frontier, and any branch held back as `partial` or `blocked`.

Then stop. The user reviews, edits files in their editor, and runs `/propagate` or asks for the next wave. The next wave starts only on their word.

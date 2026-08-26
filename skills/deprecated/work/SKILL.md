---
name: work
description: Use when a brief names task NN of a plan, when the user says "work on task NN", or for any code change in a repo whose project has a directory under `~/.local/share/plans/`. Runs the change under the plan's decision tiers and ends with a debrief.
---

# Work

Do one task and hand it back so the user can review it cold. Load the skill "plans" for the layout and the decision tiers.

## Orient

Read `plan.md`, the task file, and the report of every task this one is blocked by (pasted into your brief when you are a worker; under `reports/` otherwise). Then read the code the task touches until you can say, in the plan's words, where each change goes and at which seam it is tested. A task that names its seams is tested there; a task that does not gets seams from you, recorded as a mid-tier decision.

Without a task file (the user asked for a change directly), the user's message is the task, and the plan still binds (the plan whose Shape covers the files you touch; ask when two do).

## Build

Work in small commits: one test, one change, check it, commit, repeat. Each commit passes the checks by itself, with a message that says what and why, so the sequence reads as an argument for the change, base first.

Apply the tiers as you go. Stay inside the task: a problem outside it goes in the report under "What follows", with the smallest in-scope workaround when one is needed.

When the task text and the code disagree (a seam that does not exist, an assumption in Shape that is false), that is a finding for the report's Plan impact section, together with the in-scope choice you made.

## Verify

Run the checks the acceptance criteria name, then the project's type check and test suite. A criterion counts as met only through a command you ran or a behaviour you observed; a green build on its own meets nothing.

## Hand back

Load the skill "debrief" and write the result to `reports/NN-<task-slug>.md` (without a task file, the debrief is your reply). Commit it. Reply with the report path and the head SHA.

When you are the manager rather than a worker, also set the task's status, tick the criteria the debrief proved, fold its `[proposed]` decisions into `plan.md`, and commit in the plans repo.

---
name: breakdown
description: Break a plan into tasks agents can work in parallel, with blocking edges between them.
disable-model-invocation: true
---

# Breakdown

Turn a plan into task files. Load the skill "plans" for the layout. If the repo holds more than one plan and the user did not name one, ask which.

## Draft the tasks

Each task is a tracer bullet: a narrow but complete path through every layer it touches, demoable or verifiable on its own, sized to one fresh context window. Prefer ten small tasks over four large ones. Prefactoring that makes later tasks easy is its own task and goes first.

Give each task its blocking edges: the tasks that must be `done` before it can start. Then run the throughput checkpoint over the set, and keep all four items in your reply, with `n/a: <reason>` on any that does not apply:

- Blocking first steps. Shared types, base modules, and migrations land before fan-out.
- Independent workstreams. Disjoint files, services, or layers parallelize. Shared writes serialize.
- Shared mutable state. Two tasks writing one file is a blocking edge or a split.
- Smallest safe decomposition. If one worker should do it all, say why.

A wide refactor (one mechanical change touching files across the codebase) is sequenced as expand, migrate, contract: add the new form beside the old; migrate call sites in batches, each its own task blocked by the expand; delete the old form in a task blocked by every batch.

## Quiz the user

Show the set as a numbered list: title, blocked by, what it delivers. Mark the tasks that form the first wave. Then ask, with your recommendation on each:

1. Should any task merge or split?
2. Does each edge name only a task that gates it?

Iterate until the user approves.

## Write

Write `tasks/NN-<task-slug>.md`, every field of the task format filled, `Status: ready` on each. Leave file paths and code out, except a type sketch copied from the plan's Shape when it pins a decision more exactly than prose can.

Done when every task file exists, every blocking edge names an existing task, and at least one task is on the frontier. Commit in the plans repo, reply with the first wave, and name `/dispatch` as the step that runs it.

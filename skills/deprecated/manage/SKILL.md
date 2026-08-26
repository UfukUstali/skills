---
name: manage
description: Which skill to reach for at each point of the plan-driven workflow.
disable-model-invocation: true
---

# Manage

`/wayfinder` charts an effort too big to settle in one sitting, one decision per session, until `/align` can settle the plan in one; `/align` settles the plan, `/breakdown` turns it into tasks, `/dispatch` runs a wave, you edit, `/propagate` carries the edits through, `/dispatch` runs the next wave. `/status` at any point; `/work NN` to run one task in this session.

Tell the user which step they are on (the plans directory is in the skill "plans"): no plan for this project, `/align`, or `/wayfinder` when the idea does not fit one sitting; a `map/` with open tickets, `/wayfinder`; a `plan.md` with no `tasks/`, `/breakdown`; uncommitted changes in either repo, `/propagate`; otherwise `/status` and then what it names as the next move.

---
name: align
description: Reach a shared plan with the user through rounds of questions, written to the plans directory as it settles.
disable-model-invocation: true
---

# Align

Interview the user until the two of you hold the same picture of the effort, and write that picture down as the plan. Load the skill "plans" for the file layout and the decision tiers, and the skill "grill" for the rounds.

## Rounds

Ask two kinds of question even when you could guess the answer:

- Major-tier decisions. Every one is the user's, in full.
- Mid-tier decisions that will shape more than one task. Settling them now is cheap; reversing them across parallel workers later is not.

When a cleared wayfinder map exists under the plan's `map/`, its Decisions so far and closed tickets are the settled tree: seed the plan from them, and let the first round confirm rather than ask.

## Writing the plan

Pick the slug from the goal (two or three words, kebab-case) and say it in your first reply. Create `plan.md` under the plans directory once the user has answered the first round, and update it after every round, so the user can read and edit it in their editor while you talk. An edit the user made between rounds is a decision, tagged `[user-edit]`, and it reshapes the tree like any answer would.

## Done

The session is done when the grill is done and Open questions in `plan.md` is empty. Commit in the plans repo, reply with the plan's path and `/breakdown` as the next step, and stop.

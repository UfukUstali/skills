---
name: propagate
description: Carry the user's hand edits through the code, plan, tasks, and reports.
disable-model-invocation: true
---

# Propagate

The user has changed a few key points by hand. Make the rest of the repo agree with them. Load the skill "plans" for the layout and the decision tiers.

## Find the edits

Unless the user named files, the edits are the uncommitted changes in two repos: the code repo and the plans repo (`git status`, `git diff`, and untracked files in each). If both trees are clean, ask what they changed. Edits in the plans repo count as much as code: a retagged decision, a deleted `[proposed]` line, a reworded Shape, a new task.

## Read the intent

For each edit, state in one line what the user decided and what it implies elsewhere: call sites of a renamed symbol, tests that assert the old behaviour, a plan line the code now contradicts, a task whose scope moved, a report whose claims stopped being true. The user's edit wins over whatever it contradicts: an edited plan line drives code changes, and an edited code file drives a new `[user-edit]` line in `plan.md`.

Play the list back before changing anything: "You changed X. I read that as Y. It implies Z." Where an edit could mean two things, ask, with your recommendation. Proceed once the user has answered any question you asked; with none asked, proceed after the play-back.

## Carry it through

Commit the user's edits first, word for word, then each propagation as its own commit. Every user edit ends as a `[user-edit]` line in `plan.md`: the user's own plan lines retagged, code edits written as new decision lines. Stay at mid tier and below: a propagation that would itself be a major decision stops and asks. A report is history, so its text stays as written; add a dated line under its Plan impact saying what the edit changed.

Done when every implication you listed has a commit, the old symbol or behaviour appears only in git history and in reports, and the project's checks pass.

## Hand back

Load the skill "debrief" and reply with it, the user's edits as the first entries under Changes, marked as theirs: they are the base the rest stands on.

---
name: grill
description: Use when a skill says to grill, or when the user asks to be interviewed about a plan, design, or decision. Rounds of numbered questions, each with a recommended answer, until nothing is left silently assumed.
---

# Grill

Interview the user until the two of you hold the same picture. Facts are your job; decisions are the user's. When a question needs a fact from the codebase or the docs, look it up yourself (a subagent if it is slow) and keep asking the rest of the round while it runs. Put every decision to the user and wait for the answer.

## Rounds

Map the subject as a design tree: every decision branches into the decisions that hang off it. The open decisions are those whose prerequisites are settled. Ask all of them in one round, numbered, each with your recommended answer so the user can accept in a word:

```
**Q1. <title>** <the question, with the options when there are some>
Recommend: <your answer, and the reason in one sentence>
```

A question whose answer depends on another question still open belongs to a later round. A round is done when every question in it has an answer or an explicit deferral; a deferred question comes back in the next round. After each round, recompute the open decisions and ask the next. The tree sets the count; three questions and fifty are both normal.

## Done

The interview is done when no decision is open (every branch visited, nothing left silently assumed) and the user says the picture matches theirs. Act on it only after that.

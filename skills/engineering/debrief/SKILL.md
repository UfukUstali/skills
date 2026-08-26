---
name: debrief
description: Use before reporting any piece of work done, in any repo. The hand-back overview for a reader who has seen none of the changes.
---

# Debrief

The reader is the user coming back cold. They know the spec or the ticket, they have not seen a single change, and from this document alone they will decide whether to accept the work, edit it, or redirect it. Write for that reader.

## Order

Default to dependency order: the change everything else rests on comes first, and its entry says what the later changes build on it. When another order serves the reader better (a bug fix reads symptom, cause, fix; a migration reads old, bridge, new), use it and say in one line which order you chose. The order serves the reader, so it is rarely the order the work happened in.

## Sections

```
# Debrief: <ticket or spec title>

**Status:** done | partial | blocked    **Branch:** <name> @ <sha>

## In one paragraph
What this ticket was and what it now makes work, in the spec's terms and the project's `CONTEXT.md` vocabulary. A reader can stop here.

## Changes
One entry per change, in the order chosen above. Each entry:
- What changed, named by the concept (the type, the module, the behaviour), with the files in parentheses.
- Why: the decision or requirement it serves.
- What builds on it: the later entries that depend on it and what they take for granted from it. Left out on leaf changes.

## Decisions
Decisions the user confirmed, each with the spec section, ADR, or message that confirmed it. Then the choices made during the work that the user has not seen, one line each: the choice, the reason, what reversing it would take. Flag any that belongs in an ADR or in `CONTEXT.md`.

## Verification
Each command you ran and what it showed, one line each. Every acceptance criterion with its evidence. Anything unverified, named as unverified.

## What follows
Work items only: the tickets this unblocks, follow-ups it found (a refactor it needed but did not own, a bug it met), out-of-scope work worth a ticket. Each marked as already on the issue tracker or new.

## Spec impact
Text edits only, as concrete lines for the spec and the open tickets: an implementation decision confirmed or broken, what the rest of the work can now rely on, what it should stop assuming.

## Needs your decision
Numbered questions, each with options and a recommended answer. "None" is a valid value; an absent section is not.
```

`partial` means the work stopped short for a reason other than a user decision (context ran out, a criterion could not be verified). `blocked` means a "Needs your decision" item gates the rest.

## Prose

Short declarative sentences. A mechanism or a number over a feeling: "the cache entry is dropped on write" rather than "the cache stays fresh". Sentence-case headings, periods and commas as the only separators, emphasis only on the two labels in the status line. Every claim about the code names the file or the command that proves it.

Done when every modified file appears in a Changes entry, every acceptance criterion appears under Verification, and the document reads without the chat that produced it.

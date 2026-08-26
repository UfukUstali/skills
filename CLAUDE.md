# Skills

Matt Pocock's agent skills, copied verbatim from `~/projects/personal/matt-skills` (commit `5b15a47`), plus this repo's own additions. Each skill directory holds a `SKILL.md` and an `agents/openai.yaml`.

## Layout

Skills sit in bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools
- `deprecated/`: the first version of this repo, kept until deleted

Every skill in `engineering/` or `productivity/` (the promoted buckets) has an entry in `.claude-plugin/plugin.json`'s `skills` array, a line in its bucket `README.md`, and a line in the top-level `README.md`, each linking the name to its `SKILL.md`, grouped into User-invoked and Model-invoked. Skills in `deprecated/` appear in none of them.

## Matt's skills stay verbatim

Every promoted skill not listed under Own below is a byte-for-byte copy of Matt's. To update one, copy it from `matt-skills` again; edits here get overwritten on the next copy. `ask-matt` is left as Matt wrote it, so it does not route to the skills under Own.

## Own

- `engineering/debrief`: the hand-back overview every piece of work ends with.
- `productivity/unslop`: from pstack, with an `agents/openai.yaml` added.
- `engineering/setup-matt-pocock-skills/issue-tracker-local-html.md` and the `local-html/` seed directory beside it: the fourth issue tracker, HTML pages under `~/.local/share/plans/<project>/`. The setup `SKILL.md` names it in three places (the exploration list, Section A's options, step 4's template list); those three lines are the only edits to a Matt skill.

## Invariants

- A skill is user-invoked in both harnesses or neither: `disable-model-invocation: true` in the frontmatter pairs with `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. A user-invoked description is a one-line summary for the human; a model-invoked description carries the trigger branches. Details in [.agents/invocation.md](./.agents/invocation.md).
- Skills reach each other by calling the Skill tool with the name, one per call: `Call the Skill tool with "grilling"`.
- After touching `.claude-plugin/`, run `claude plugin validate . --strict` and `claude plugin validate .claude-plugin/plugin.json`. The warning that this `CLAUDE.md` is not shipped as plugin context is expected.
- After adding, removing, or renaming a skill, run `scripts/link-skills.sh` so `~/.claude/skills` and `~/.agents/skills` match.

## Writing

Apply `writing-for-agents` (`skills/productivity/writing-for-agents/SKILL.md`) and `unslop` (`skills/productivity/unslop/SKILL.md`) to every edit of an own SKILL.md, the tracker template, the README, or this file. In short, every step ends on a checkable completion criterion, reference the agent does not need on every run goes behind a pointer, prohibitions are phrased as the behaviour wanted, periods and commas are the only separators, headings are sentence case.

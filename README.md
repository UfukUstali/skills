# skills

[Matt Pocock's skills](https://github.com/mattpocock/skills), copied verbatim, plus three things of my own: `debrief`, `unslop`(from [pstack](https://github.com/cursor/plugins/tree/main/pstack)), and a local HTML issue tracker. They run on Claude Code, Codex, and OpenCode.

The [Nuxt UI skill](./skills/engineering/nuxt-ui/SKILL.md) and Anthropic's [frontend-design skill](./skills/engineering/frontend-design/SKILL.md) are also included.

## Install

```bash
./scripts/link-skills.sh
```

This symlinks every promoted skill into `~/.claude/skills` (Claude Code, OpenCode) and `~/.agents/skills` (Codex, OpenCode), so `git pull` updates the install.

Then run `/setup-matt-pocock-skills` once per repo. It asks which issue tracker to use, which triage labels you apply, and where docs go.

## The local HTML tracker

Pick "Local HTML in a global directory" at setup and issues, specs, and wayfinder maps become dark-mode HTML pages under `~/.local/share/plans/<project>/`, outside the code. That directory is its own git repo and is served as plain files, so you can read it from any device:

```bash
tailscale serve --bg ~/.local/share/plans
```

The pages link to one another and discover each other from the directory listing: a wayfinder map renders its ticket table with the frontier highlighted, and a ticket about layout carries its wireframe inline. Edit any page in your editor and the agent reads it back from disk. The template is [issue-tracker-local-html.md](./skills/engineering/setup-matt-pocock-skills/issue-tracker-local-html.md), beside Matt's GitHub, GitLab, and local markdown ones.

## Reference

**User-invoked** skills are reachable only when you type them; **model-invoked** skills the agent can also reach for on its own.

### Engineering

**User-invoked**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)**: Ask which skill or flow fits your situation. A router over the user-invoked skills in this repo.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that also builds your project's domain model, sharpening terminology and updating `CONTEXT.md` and ADRs inline.
- **[triage](./skills/engineering/triage/SKILL.md)**: Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)**: Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build the work described by a spec or set of tickets, driving `/tdd` at pre-agreed seams and closing out with `/code-review` before committing.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on the issue tracker, resolved one at a time until the way to the destination is clear.

**Model-invoked**

- **[prototype](./skills/engineering/prototype/SKILL.md)**: Build a throwaway prototype to answer a design question: a single shareable HTML file for state/logic, or several toggleable UI variations.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Disciplined diagnosis loop for hard bugs and performance regressions: build a feedback loop that goes red on this bug, minimise, hypothesise, instrument, fix, regression-test.
- **[research](./skills/engineering/research/SKILL.md)**: Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Actively build and sharpen a project's domain model by challenging terms, stress-testing with scenarios, and updating `CONTEXT.md` and ADRs inline.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Shared discipline and vocabulary for designing deep modules: small interfaces, clean seams, testable through the interface.
- **[code-review](./skills/engineering/code-review/SKILL.md)**: Two-axis review of the diff since a fixed point, standards and spec, run as parallel sub-agents.
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)**: Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation, never `--abort`.
- **[wizard](./skills/engineering/wizard/SKILL.md)**: Generate an interactive bash wizard that walks a human through steps only they can perform.
- **[debrief](./skills/engineering/debrief/SKILL.md)**: The hand-back overview for any piece of work, written for a reader who has seen none of the changes.

- [nuxt-ui](./skills/engineering/nuxt-ui/SKILL.md). Build interfaces with Nuxt UI, customize themes, build forms, and compose page layouts.
- [frontend-design](./skills/engineering/frontend-design/SKILL.md). Design new interfaces or reshape existing ones with intentional typography, color, and layout.

### Productivity

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: Get relentlessly interviewed about a plan or design until every branch of the design tree is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[teach](./skills/productivity/teach/SKILL.md)**: Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**: Turn a decision you can't answer alone into a Markdown questionnaire for the one person who can.
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**: Fire this the moment a message doesn't land. The agent re-pitches it with the context you're missing, using your `CONTEXT.md` vocabulary.

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.md)**: Interview the user relentlessly about a plan, decision, or idea until every branch of the design tree is resolved.
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: Writing documents for agents: skills, AGENTS.md/CLAUDE.md, and any doc an agent reaches by a pointer.
- **[unslop](./skills/productivity/unslop/SKILL.md)**: Cut AI tells from any writing.

## Lineage

Except for the additions below, the engineering and productivity skills are [mattpocock/skills](https://github.com/mattpocock/skills) at commit `5b15a47`, unchanged apart from the three lines in `setup-matt-pocock-skills` that name the HTML tracker. `unslop` is from [pstack](https://github.com/cursor/plugins/tree/main/pstack). `debrief` and the HTML tracker are mine.

`nuxt-ui` is copied verbatim from `~/projects/personal/ui/skills/nuxt-ui` at commit `2b29c33f4` in `nuxt/ui`, with `agents/openai.yaml` added.

`frontend-design` is copied verbatim from `~/projects/personal/anthropic-skills/skills/frontend-design` at commit `34040c9` in `anthropics/skills`, including `LICENSE.txt`, with `agents/openai.yaml` added.

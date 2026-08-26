---
name: wayfinder
description: Plan a chunk of work too big for one session as a shared map of decision tickets, local HTML pages that link to one another, and resolve them one at a time until the way to the destination is clear.
disable-model-invocation: true
---

# Wayfinder

A loose idea has arrived, too big for one agent session, and wrapped in fog: the way from here to the **destination** is not visible yet. Wayfinding is about finding that way, not charging at the destination. This skill charts the way as a **shared map** of **decision tickets** (questions whose resolution is a decision, not slices of a build to execute) and works them one at a time until the route is clear.

The destination varies per effort, and naming it is the first act of charting: it shapes every ticket. It might be a plan to hand to `/align`, a decision to lock before planning starts, or a change made in place like a data-structure migration. The map is domain-agnostic.

## Plan, don't do

Wayfinder is planning: each ticket resolves a decision, and the map is done when the way is clear, with nothing left to decide before someone goes and does the thing. The pull to just do the work is the signal you have reached the edge of the map and it is time to hand off. An effort can carry execution into the map through a line in its Notes, but only a line the user wrote; absent that, produce decisions, not deliverables.

## Refer by name

Every ticket has a name: its title. In everything the human reads (narration, the map's Decisions so far), refer to it by that name, never by a bare number. The number and link ride inside the name, they never stand in for it.

## The tracker

The map and its tickets are HTML pages under the plan's `map/` directory, dark themed, linking to one another. Load the skill "plans" for where that directory is and how the slug is chosen. The `templates/` directory beside this skill holds `style.css`, `map.js`, `map.html`, and `ticket.html`; copy the stylesheet and the script into the map directory when charting, and create every page from its template.

The directory is served as plain files, so the pages discover each other at load time: `map.js` fetches the directory listing, finds every `NN-*.html`, reads each page's state, and renders the map's ticket table, the frontier, and each ticket's badges and blocked-by links by name. Nothing is generated ahead of time, and no page is named `index.html`.

- **Map**: `map.html`. Destination, Notes, the ticket table (rendered), Decisions so far, Not yet specified, Out of scope.
- **Ticket**: `NN-<ticket-slug>.html`, numbered from 01. Its state is the attributes of its `<html>` tag, and you own them: `data-id`, `data-type` (`research`, `prototype`, `grilling`, `task`), `data-mode` (`hitl`, `afk`), `data-status` (`open`, `closed`), `data-claimed` (empty, or who), `data-blocked-by` (space-separated ids, edited whenever the map changes shape). The body holds the Question, an optional Mock, Assets, and the Resolution once closed.
- **Frontier for you**: `scripts/frontier.sh <map-dir>` from this skill's directory prints every ticket's state and the frontier, the same computation the browser does.
- **Assets**: `assets/<name>.html` in the map directory, linked from the ticket that produced them: a prototype, research findings, a wireframe that outgrew the ticket page. Each links back to its ticket and to `../style.css`.
- **Mocks**: a ticket whose question is about look or layout carries a small wireframe inside its Mock section, built from the `.wire` classes in `style.css` (rows, columns, boxes, buttons, inputs, text bars). Inline SVG is fine when boxes are not enough. Keep it to what the question needs.

The map is an index, never a store. A decision lives in exactly one place, its ticket's Resolution; the map gists it and links.

A ticket is **unblocked** when every ticket it is blocked by is closed. The **frontier** is the open, unblocked, unclaimed tickets. A session **claims** a ticket by setting `data-claimed`, first, before any work.

## Ticket types

Every ticket is either **HITL** (worked with a human who speaks for themselves) or **AFK** (driven by the agent alone). A HITL ticket resolves only through that live exchange; an agent that answers its own questions has broken it.

- **Research** (AFK): reading documentation, third-party APIs, or local knowledge bases to surface a fact a decision waits on. Resolved by a subagent that investigates against primary sources and writes its findings, each claim cited, to `assets/<ticket-slug>-findings.html`, linked from the ticket. Use when knowledge outside the working directory is required.
- **Prototype** (HITL): raise the fidelity of the discussion with a cheap, rough, concrete artifact to react to. For a look-or-layout question, a wireframe in the ticket's Mock section or a page under `assets/`; for a logic or state question, a single self-contained HTML page under `assets/` with buttons that push the state through the hard cases and render it after every action. Throwaway, no persistence, no polish. The pick between variants is the user's; the ticket stays open until they make it.
- **Grilling** (HITL): conversation. The default. Load the skill "grill".
- **Task** (HITL or AFK): manual work that must happen before a decision can be made: signing up for a service so its API can be judged, provisioning access, moving data so its shape can be seen. The one type that does rather than decides, and it earns its place by unblocking a decision, never by delivering the destination. The agent drives it alone where it can; otherwise it hands the human a precise checklist. The resolution records what was done and the facts later tickets depend on.

## Fog of war

The map is deliberately incomplete: chart only what you can see. Beyond the live tickets lies the **fog of war**: decisions and investigations you can tell are coming but cannot yet pin down, because they hang on questions still open. Resolving a ticket clears the fog ahead of it, graduating whatever is now specifiable into fresh tickets, until no tickets remain.

The map's **Not yet specified** section holds that dim view: the suspected question, the area to revisit. Everything here is in scope, just not sharp enough to ticket.

**Fog or ticket?** The test is whether you can state the question precisely now, not whether you can answer it now. Ticket when the question is already sharp, even if blocked. Not yet specified when you cannot yet phrase it that sharply; one patch of fog may graduate into several tickets, or none.

## Out of scope

Fog only gathers toward the destination. Work beyond it is **out of scope**: it gets the map's Out of scope section, one line each with why, and it never graduates. When an existing ticket turns out to sit past the destination, close it with a one-line Resolution saying so, and list it under Out of scope rather than Decisions so far: a scope boundary is not a step on the route.

## Invocation

Two modes. Either way, resolve at most one ticket per session, research excepted.

### Chart the map

The user arrives with a loose idea.

1. **Name the destination.** Load the skill "grill" and pin down what this map is finding its way to. The destination fixes the scope, so it is settled first.
2. **Map the frontier.** Grill again, breadth-first: fan out across the whole space rather than deep on one thread, surfacing the open decisions and the first steps takeable now. If this surfaces no fog (the way is already clear and the whole journey fits one session), stop and tell the user `/align` is the right tool.
3. **Create the map**: copy `style.css` and `map.js`, create `map.html` from the template with Destination and Notes filled in, Decisions so far empty, and the fog written into Not yet specified.
4. **Create the tickets you can specify now**, then wire `data-blocked-by` in a second pass once every ticket has its number. Everything you cannot yet specify stays in Not yet specified.
5. **Fire the research subagents**, one per research ticket, in parallel and in the background, each writing its own findings page.
6. Commit in the plans repo, reply with the path of `map.html` and the frontier from `frontier.sh`, and stop. Charting is one session's work; it resolves nothing.

### Work through the map

The user arrives with a map and, optionally, a ticket. Without one, you pick.

1. Load `map.html`: the low-resolution view. Run `frontier.sh` to get the frontier.
2. Choose the ticket: the one the user named, else the first on the frontier. Claim it before any work.
3. Resolve it. Zoom as needed: open the full page of any related or closed ticket; load whatever skills the Notes name. In doubt, load the skill "grill".
4. Record the resolution: fill the ticket's Resolution section with the answer, set `data-status="closed"`, and add one line to the map's Decisions so far (the ticket's name as a link, then the gist).
5. Add newly surfaced tickets (create, then wire). Graduate any fog the answer made specifiable, removing each graduated patch from Not yet specified so it lives only as its ticket. If the answer reveals a ticket sits beyond the destination, rule it out of scope. If it invalidates other tickets, update or close them.
6. Commit in the plans repo and stop.

When the map clears (no open tickets, Not yet specified empty), reply that the route is known and `/align` is the next step; it reads Decisions so far and the closed tickets as the settled tree, and its first round confirms rather than asks.

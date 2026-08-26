# Issue tracker: Local HTML in a global directory

Issues and specs for this repo live as HTML pages in a directory outside the code, `~/.local/share/plans/<project>/` (`$XDG_DATA_HOME/plans/<project>/` when `XDG_DATA_HOME` is set). The directory is served as plain files, so every page reads from any device, and the whole tree is its own git repo.

`<project>` is the name of this repo's main checkout, the same from any worktree:

```bash
basename "$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")"
```

## Conventions

- The plans directory is a git repo (`git init` it when missing). Commit there before the session stops. Uncommitted changes are the user's hand edits, so read a page from disk before writing to it.
- Serve it as plain files: `tailscale serve --bg ~/.local/share/plans`, or `python -m http.server` inside it. Pages discover each other from the server's directory listing, so no file anywhere in the tree is named `index.html`.
- Seed files live in `~/.local/share/plans/templates/`: `style.css`, `map.js`, `map.html`, `ticket.html`, `page.html`, `frontier.sh`. `/setup-matt-pocock-skills` copies them there from the `local-html/` directory beside this template. Every feature directory gets its own copy of `style.css` and `map.js`, and every page is created from `ticket.html`, `map.html`, or `page.html`.
- One feature per directory: `<project>/<feature-slug>/`
- The spec is `<project>/<feature-slug>/spec.html`, created from `page.html`
- Implementation issues are one page per ticket at `<project>/<feature-slug>/NN-<slug>.html`, numbered from `01`, created from `ticket.html`, never a single combined page. An implementation issue drops the `data-type` and `data-mode` attributes; those belong to wayfinder tickets.
- A page's state is the `data-*` attributes on its `<html>` tag: `data-status` is `open` or `closed`, `data-claimed` is empty or who holds it, `data-blocked-by` is the space-separated numbers of the tickets that gate it. `map.js` reads these to render each page's badges and blocked-by links.
- Triage state is the `data-labels` attribute on the `<html>` tag, space-separated (see `triage-labels.md` for the role strings). A `wontfix` issue is also `data-status="closed"`.
- Comments and conversation history append to the bottom of the page under an `<h2>Comments</h2>` heading, one `<div class="panel">` per comment, opened by a `<p class="meta">` line with the date and author
- One dark stylesheet: every page links `style.css` and nothing else. Pages under `assets/` link `../style.css`.

## When a skill says "publish to the issue tracker"

Create a new page under `<project>/<feature-slug>/`, creating the directory and copying `style.css` and `map.js` into it when it is new. Commit in the plans repo.

## When a skill says "fetch the relevant ticket"

Read the page at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a page with one **child** page per ticket in the same directory.

- **Map**: `<project>/<effort>/map.html`, from `map.html`: Destination, Notes, the ticket table, Decisions so far, Not yet specified, Out of scope. `map.js` renders the ticket table from the ticket pages in the directory and highlights the frontier, so the map never lists open tickets by hand.
- **Child ticket**: `<project>/<effort>/NN-<slug>.html`, numbered from `01`, from `ticket.html`, with the question in the body. `data-type` records the ticket type (`research`/`prototype`/`grilling`/`task`), `data-mode` records `hitl` or `afk`, `data-status` is `open` or `closed`, `data-claimed` is empty or who holds it.
- **Blocking**: `data-blocked-by="NN NN"` on the `<html>` tag, edited whenever the map changes shape. A ticket is unblocked when every ticket it lists is `closed`.
- **Frontier**: `~/.local/share/plans/templates/frontier.sh <effort-dir>` prints every ticket's state and the frontier (open, unblocked, unclaimed; first by number wins). The map page computes the same in the browser.
- **Claim**: set `data-claimed` to who holds it and save, before any work.
- **Resolve**: fill the ticket's `<h2>Resolution</h2>` section with the answer, set `data-status="closed"`, then append a context pointer (the ticket's name as a link, then the gist) to the map's Decisions so far. Commit.
- **Assets**: `<project>/<effort>/assets/<name>.html`, from `page.html`, for a prototype, research findings, or a wireframe that outgrew its ticket. Linked from the ticket that produced it, and linking back. A ticket whose question is about look or layout carries a small wireframe in its Mock section, built from the `.wire` classes in `style.css`.

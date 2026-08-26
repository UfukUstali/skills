// Shared by map.html and every ticket page. Discovers the ticket pages from the
// directory listing the static server returns for "./" (no index.html may exist),
// reads each page's state from its <html> data-* attributes, and renders from that.

async function loadTickets() {
  const listing = await (await fetch("./")).text();
  const doc = new DOMParser().parseFromString(listing, "text/html");
  const names = [...doc.querySelectorAll("a")]
    .map((a) => decodeURIComponent(a.getAttribute("href") || ""))
    .filter((h) => /^\d\d-[^/]*\.html$/.test(h));
  const tickets = await Promise.all(
    names.map(async (file) => {
      const page = new DOMParser().parseFromString(await (await fetch(file)).text(), "text/html");
      const d = page.documentElement.dataset;
      return {
        file,
        id: d.id,
        type: d.type || "",
        mode: (d.mode || "").toUpperCase(),
        status: d.status,
        claimed: d.claimed || "",
        blockedBy: (d.blockedBy || "").split(/\s+/).filter(Boolean),
        title: page.title.replace(/^\d+:\s*/, ""),
      };
    })
  );
  tickets.sort((a, b) => a.id.localeCompare(b.id));
  const byId = Object.fromEntries(tickets.map((t) => [t.id, t]));
  for (const t of tickets) {
    t.frontier = t.status === "open" && !t.claimed && t.blockedBy.every((b) => byId[b]?.status === "closed");
  }
  return { tickets, byId };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const link = (t) => `<a href="${esc(t.file)}">${esc(t.title)}</a>`;
const badges = (t) =>
  [t.type, t.mode]
    .filter(Boolean)
    .map((v) => `<span class="badge">${esc(v)}</span>`)
    .concat(`<span class="badge ${esc(t.status)}">${esc(t.status)}</span>`)
    .concat(t.claimed ? `<span class="badge">claimed by ${esc(t.claimed)}</span>` : [])
    .join(" ");
const blockedLinks = (t, byId) =>
  t.blockedBy.length ? t.blockedBy.map((b) => (byId[b] ? link(byId[b]) : esc(b))).join(", ") : "none";

// The ticket's path on the server, no leading slash and no extension: what to paste
// to an agent to point it at this ticket, e.g. "myproject/my-effort/02-mirror-server-api".
const ticketPath = (t) =>
  decodeURIComponent(new URL(t.file, location.href).pathname).replace(/^\//, "").replace(/\.html$/, "");

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // navigator.clipboard needs a secure context; plain http over a LAN address is not one.
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

async function renderMap() {
  const body = document.getElementById("tickets");
  try {
    const { tickets, byId } = await loadTickets();
    body.innerHTML = tickets
      .map(
        (t) =>
          `<tr class="${t.status}${t.frontier ? " frontier" : ""}"><td>${esc(t.id)}</td><td>${link(t)}</td>` +
          `<td>${esc(t.type)}</td><td>${esc(t.mode)}</td><td><span class="badge ${esc(t.status)}">${esc(t.status)}</span></td>` +
          `<td>${blockedLinks(t, byId)}</td><td>${esc(t.claimed)}</td>` +
          `<td><button class="copy" type="button" data-path="${esc(ticketPath(t))}">copy</button></td></tr>`
      )
      .join("");
    if (!tickets.length) body.innerHTML = `<tr><td colspan="8">no tickets yet</td></tr>`;
  } catch (e) {
    body.innerHTML = `<tr><td colspan="8">Serve this directory over HTTP (tailscale serve, or python -m http.server) to see the tickets. ${esc(e.message)}</td></tr>`;
  }
}

async function renderTicket() {
  const me = document.documentElement.dataset;
  const here = { type: me.type || "", mode: (me.mode || "").toUpperCase(), status: me.status, claimed: me.claimed || "" };
  document.getElementById("badges").innerHTML = badges(here);
  const el = document.getElementById("blocked-by");
  try {
    const { byId } = await loadTickets();
    const self = byId[me.id] || { blockedBy: (me.blockedBy || "").split(/\s+/).filter(Boolean) };
    el.innerHTML = "Blocked by: " + blockedLinks(self, byId);
  } catch (e) {
    el.textContent = "Blocked by: " + ((me.blockedBy || "").trim() || "none");
  }
}

document.addEventListener("click", async (e) => {
  const button = e.target.closest("button.copy");
  if (!button) return;
  await copyToClipboard(button.dataset.path);
  button.textContent = "copied";
  setTimeout(() => (button.textContent = "copy"), 1200);
});

document.documentElement.dataset.kind === "map" ? renderMap() : renderTicket();

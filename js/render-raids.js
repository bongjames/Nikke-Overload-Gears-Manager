// ============================================================
//  RENDER: SOLO RAIDS
// ============================================================

function renderRaids() {
    const el = document.getElementById("raids");
    const sortedRaids = [...state.raids].reverse();
    const raidList =
        sortedRaids
            .map((r) => {
                const displayName = `${r.season ? "Season " + r.season + " · " : ""}${r.name}${r.element ? " — " + elemIcon(r.element) + " " + r.element : ""}`;
                return `<div class="nikke-item ${state.selRaidEdit === r.id ? "active" : ""}" onclick="selRaidEdit('${r.id}')">
      ${displayName}
      <div class="nikke-item-sub">${r.entries.length} Nikke${r.entries.length !== 1 ? "s" : ""}</div>
    </div>`;
            })
            .join("") || '<div style="font-size:14px;color:#475569;padding:6px">No raids created</div>';

    el.innerHTML = `<div class="two-col">
    <div class="nikke-list">
      ${raidList}
      <button class="add-line-btn" onclick="showAddRaidForm()" style="margin-top:8px">+ New Raid</button>
      <div id="add-raid-form" class="form-panel" style="max-width:170px">
        <div class="form-row"><input class="form-input" id="raid-season-input" placeholder="Season #" type="number" min="1" style="font-size:14px"/></div>
        <div class="form-row"><input class="form-input" id="raid-name-input" placeholder="Boss name"/></div>
        <div class="form-row"><select class="form-input" id="raid-element-input" style="font-size:14px">
          <option value="">No weakness</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Wind">Wind</option>
          <option value="Electric">Electric</option>
          <option value="Iron">Iron</option>
        </select></div>
        <div class="btn-row"><button class="btn btn-primary" onclick="addRaid()" style="font-size:13px;padding:4px 10px">Add</button></div>
      </div>
    </div>
    <div id="raid-main">${state.selRaidEdit ? "" : '<div class="empty-state">← Select or create a raid</div>'}</div>
  </div>`;

    if (state.selRaidEdit) {
        const raid = state.raids.find((r) => r.id === state.selRaidEdit);
        if (raid) renderRaidMain(raid);
    }
}

function showAddRaidForm() {
    document.getElementById("add-raid-form").classList.add("show");
    document.getElementById("raid-name-input").focus();
}

function addRaid() {
    const name = document.getElementById("raid-name-input").value.trim();
    if (!name) return;
    const seasonInput = document.getElementById("raid-season-input");
    const season = seasonInput ? parseInt(seasonInput.value) || "" : "";
    const elemSel = document.getElementById("raid-element-input");
    const element = elemSel ? elemSel.value : "";
    const raid = { id: "r" + Date.now(), name, season, element, entries: [] };
    // Auto-add all roster Nikkes matching the selected element
    if (element) {
        state.nikkes
            .filter((n) => n.element === element)
            .forEach((n) => {
                raid.entries.push({ nikkeId: n.id, damage: 0 });
            });
    }
    state.raids.push(raid);
    state.selRaidEdit = raid.id;
    save();
    renderRaids();
}

function selRaidEdit(id) {
    state.selRaidEdit = id;
    renderRaids();
}

function deleteRaid(id) {
    if (!confirm("Delete this raid?")) return;
    state.raids = state.raids.filter((r) => r.id !== id);
    if (state.selRaidEdit === id) state.selRaidEdit = null;
    if (state.selRaid === id) state.selRaid = null;
    save();
    renderRaids();
    renderOverview();
}

function showEditRaid(id) {
    const form = document.getElementById("raid-edit-form");
    if (form) form.style.display = "";
}

function hideEditRaid() {
    const form = document.getElementById("raid-edit-form");
    if (form) form.style.display = "none";
}

function saveEditRaid(id) {
    const raid = state.raids.find((r) => r.id === id);
    if (!raid) return;
    const name = document.getElementById("raid-edit-name").value.trim();
    const season = parseInt(document.getElementById("raid-edit-season").value) || "";
    const element = document.getElementById("raid-edit-element").value;
    if (name) raid.name = name;
    raid.season = season;
    raid.element = element;
    save();
    renderRaids();
    renderOverview();
    renderRaidMain(raid);
}

function renderRaidMain(raid) {
    const area = document.getElementById("raid-main");
    const raidDisplayName = `${raid.season ? "Season " + raid.season + " · " : ""}${raid.name}${raid.element ? " — " + elemIcon(raid.element) + " " + raid.element + " Weak" : ""}`;
    const viewMode = state.raidViewMode || "damage"; // 'teams' or 'damage'

    // Sort unassigned entries by damage
    const sortMode = state.raidSortMode || "damage";

    // Group entries by team
    const teams = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
    raid.entries.forEach((e, i) => {
        const t = e.team || 0;
        teams[t] = teams[t] || [];
        teams[t].push({ ...e, origIdx: i });
    });

    // Sort unassigned by damage or name
    if (sortMode === "damage") {
        teams[0].sort((a, b) => (b.damage || 0) - (a.damage || 0));
    }

    const totalDmg = raid.entries.reduce((s, e) => s + (e.damage || 0), 0);

    // Build nikke selector (exclude already added)
    const addedIds = new Set(raid.entries.map((e) => e.nikkeId));
    const available = state.nikkes.filter((n) => !addedIds.has(n.id));
    const nikkeOpts = available.map((n) => `<option value="${n.id}">${n.name}</option>`).join("");

    // View toggle
    const viewToggle = `<div style="display:flex;gap:4px">
    <button class="btn-sm${viewMode === "damage" ? " active-sort" : ""}" onclick="setRaidView('damage')" style="font-size:12px;padding:2px 8px">Damage</button>
    <button class="btn-sm${viewMode === "teams" ? " active-sort" : ""}" onclick="setRaidView('teams')" style="font-size:12px;padding:2px 8px">Teams</button>
  </div>`;

    let bodyHtml = "";

    if (viewMode === "teams") {
        // ── TEAMS VIEW: 5 dedicated slots per team ──
        const maxEntryDmg = Math.max(...raid.entries.map((e) => e.damage || 0), 1);

        function renderSlot(teamNum, slotIdx, entry) {
            if (!entry) {
                // Empty slot — show picker
                return `<div class="raid-slot raid-slot-empty" data-team="${teamNum}" data-slot="${slotIdx}">
        <button class="raid-slot-add-btn" onclick="openRaidSlotPicker('${raid.id}',${teamNum},${slotIdx})" title="Add Nikke">+</button>
      </div>`;
            }
            const n = state.nikkes.find((x) => x.id === entry.nikkeId);
            const name = n ? n.name : "(removed)";
            const dmg = entry.damage ? `${Number(entry.damage).toLocaleString()}M` : "";
            const elem = n && n.element ? elemIcon(n.element) : "";
            const pct = maxEntryDmg > 0 ? ((entry.damage || 0) / maxEntryDmg) * 100 : 0;
            const dmgColor = !entry.damage ? "#64748b" : pct >= 80 ? "#4ade80" : pct >= 50 ? "#60a5fa" : pct >= 25 ? "#fbbf24" : "#f87171";
            return `<div class="raid-slot raid-slot-filled">
        ${n ? nikkeIcon(name, 38) : ""}
        <div class="raid-chip-info">
          <span class="raid-chip-name">${name}</span>
          <div class="raid-chip-meta">${elem}<span class="raid-chip-dmg-label" style="color:${dmgColor}">${dmg || "—"}</span><button class="raid-chip-edit-btn" onclick="event.stopPropagation();startEditChipDmg(this,'${raid.id}',${entry.origIdx},${entry.damage || 0})" title="Edit damage">▪</button></div>
        </div>
        <button class="raid-chip-remove" onclick="event.stopPropagation();removeRaidTeamSlot('${raid.id}',${entry.origIdx})" title="Remove">&times;</button>
      </div>`;
        }

        const teamTotals = [1, 2, 3, 4, 5].map((t) =>
            (teams[t] || []).reduce((s, e) => s + (e.damage || 0), 0),
        );
        const maxTeamDmg = Math.max(...teamTotals, 1);

        const teamLanes = [1, 2, 3, 4, 5]
            .map((t, ti) => {
                const members = teams[t] || [];
                const total = teamTotals[ti];
                const pct = maxTeamDmg > 0 ? (total / maxTeamDmg) * 100 : 0;
                const dmgColor = total === 0 ? "#64748b" : pct >= 80 ? "#4ade80" : pct >= 50 ? "#60a5fa" : pct >= 25 ? "#fbbf24" : "#f87171";
                // Build 5 slots (filled + empty)
                const slots = [];
                for (let i = 0; i < 5; i++) {
                    slots.push(renderSlot(t, i, members[i] || null));
                }
                const note = (raid.teamNotes && raid.teamNotes[t]) || "";
                return `<div class="raid-team-lane" data-team="${t}" data-raid-id="${raid.id}">
        <div class="raid-team-header">
          <span class="raid-team-label">Team ${t}</span>
          <span class="raid-team-total" style="color:${dmgColor}">${total ? total.toLocaleString() + "M" : "—"}</span>
          <div class="raid-note-wrap">
<input class="raid-team-note" type="text" placeholder="Notes..." value="${note.replace(/"/g, "&quot;")}"
  onblur="updateTeamNote('${raid.id}',${t},this.value)"
  onkeydown="if(event.key==='Enter')this.blur()"/>
<button class="raid-note-clear" onclick="clearTeamNote('${raid.id}',${t})" title="Clear note">&times;</button>
          </div>
        </div>
        <div class="raid-team-slots">${slots.join("")}</div>
      </div>`;
            })
            .join("");

        bodyHtml = `
      <div class="info-note" style="margin-bottom:10px">Click <strong>+</strong> to assign a Nikke to a slot. Enter damage in millions (e.g. 48 = 48M).</div>
      <div class="raid-teams-grid">${teamLanes}</div>`;

        // Slot picker modal (hidden by default, shown by openRaidSlotPicker)
        bodyHtml += `<div class="raid-slot-picker-overlay" id="raid-slot-picker-overlay" onclick="if(event.target===this)closeRaidSlotPicker()">
      <div class="raid-slot-picker-modal">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:14px;font-weight:600;color:#f1f5f9">Pick a Nikke</span>
          <button class="del-btn" onclick="closeRaidSlotPicker()" style="font-size:16px">✕</button>
        </div>
        <input class="form-input" id="raid-slot-picker-search" placeholder="Search..." oninput="filterRaidSlotPicker()" style="margin-bottom:8px"/>
        <div id="raid-slot-picker-list" class="raid-slot-picker-list"></div>
      </div>
    </div>`;
    } else {
        // ── DAMAGE VIEW: flat ranked list ──
        const dmgSortMode = state.raidDmgSortMode || "damage";
        const withIdx = raid.entries.map((e, i) => ({ ...e, origIdx: i }));

        // Compute potential for sorting
        const potentialMap = {};
        withIdx.forEach((e) => {
            const n = state.nikkes.find((x) => x.id === e.nikkeId);
            const gainPct = n ? getNikkeTotalGainPct(n) : 0;
            potentialMap[e.origIdx] = e.damage && gainPct > 0 ? (gainPct / 100) * e.damage : 0;
        });

        const sorted =
            dmgSortMode === "potential"
                ? withIdx.sort((a, b) => (potentialMap[b.origIdx] || 0) - (potentialMap[a.origIdx] || 0))
                : withIdx.sort((a, b) => (b.damage || 0) - (a.damage || 0));

        const maxDmg = sorted.length ? Math.max(...sorted.map((e) => e.damage || 0), 1) : 1;

        // Pre-compute potential gain (in M) for each entry to determine relative scale
        const potentials = sorted.map((e) => {
            const n = state.nikkes.find((x) => x.id === e.nikkeId);
            const gainPct = n ? getNikkeTotalGainPct(n) : 0;
            return e.damage && gainPct > 0 ? (gainPct / 100) * e.damage : 0;
        });
        const maxPotential = Math.max(...potentials, 0.001);

        const rows = sorted
            .map((e, rank) => {
                const n = state.nikkes.find((x) => x.id === e.nikkeId);
                const name = n ? n.name : "(removed)";
                const elem = n && n.element ? elemIcon(n.element) : "";
                const teamBadge = e.team
                    ? `<span class="raid-team-badge">T${e.team}</span>`
                    : '<span class="raid-team-badge" style="opacity:.3">—</span>';
                const pct = maxDmg > 0 ? ((e.damage || 0) / maxDmg) * 100 : 0;
                const barColor =
                    pct >= 80 ? "#4ade80" : pct >= 50 ? "#60a5fa" : pct >= 25 ? "#fbbf24" : "#f87171";
                // Potential damage gain if this nikke's overload gear is improved
                const gainPct = n ? getNikkeTotalGainPct(n) : 0;
                let gainCell;
                let gainBar = "";
                if (!e.damage || gainPct <= 0) {
                    gainCell = '<span style="color:#475569">—</span>';
                } else {
                    const gainM = (gainPct / 100) * e.damage;
                    const relPct = maxPotential > 0 ? (gainM / maxPotential) * 100 : 0;
                    const gainColor =
                        relPct >= 80
                            ? "#4ade80"
                            : relPct >= 50
                              ? "#60a5fa"
                              : relPct >= 25
                                ? "#fbbf24"
                                : "#f87171";
                    gainCell = `<span style="color:${gainColor};font-weight:700" title="+${gainPct.toFixed(2)}% from improving overload gear">+${gainM.toFixed(1)}M</span> <span style="font-size:12px;color:${gainColor}">(+${gainPct.toFixed(1)}%)</span>`;
                    gainBar = `<div class="raid-dmg-bar-bg"><div class="raid-dmg-bar" style="width:${relPct.toFixed(1)}%;background:${gainColor}"></div></div>`;
                }
                return `<tr class="rank-row">
        <td style="font-size:13px;color:#475569;width:24px">${rank + 1}</td>
        <td style="font-size:15px;font-weight:500;display:flex;align-items:center;gap:8px;cursor:pointer" onclick="goToGearNikke('${e.nikkeId}')" title="View in Gear Tracker">${n ? nikkeIcon(name, 30) : ""}${elem}${name}</td>
        <td style="width:36px;text-align:center">${teamBadge}</td>
        <td style="width:130px"><div style="display:flex;align-items:center;gap:3px">
          <input class="prio-count-input" type="text" inputmode="decimal" value="${e.damage || ""}" placeholder="0"
data-raid-dmg="${raid.id}-${e.origIdx}"
onfocus="this.select()"
onblur="raidDmgOnBlur('${raid.id}',${e.origIdx},this.value)"
onkeydown="raidDmgKeydown(event,'${raid.id}',${e.origIdx})"
style="text-align:right;width:100%;font-size:16px;font-weight:700"/>
          <span style="font-size:13px;color:#475569">M</span>
        </div></td>
        <td style="width:100px"><div class="raid-dmg-bar-bg"><div class="raid-dmg-bar" style="width:${pct.toFixed(1)}%;background:${barColor}"></div></div></td>
        <td style="width:120px;text-align:right;font-size:14px">${gainCell}</td>
        <td style="width:80px">${gainBar}</td>
        <td style="width:26px"><button class="small-del-btn" onclick="removeRaidEntry('${raid.id}',${e.origIdx})" title="Remove">✕</button></td>
      </tr>`;
            })
            .join("");

        bodyHtml = `
      <table class="attr-table" style="width:100%">
        <tr><th>#</th><th>Nikke</th><th>Tm</th><th class="sort-header" style="text-align:left" onclick="setRaidDmgSort('damage')">Damage${dmgSortMode === "damage" ? " ▼" : ""}</th><th></th><th class="sort-header" style="text-align:left" onclick="setRaidDmgSort('potential')">Potential${dmgSortMode === "potential" ? " ▼" : ""}</th><th></th><th></th></tr>
        ${rows}
      </table>`;
    }

    area.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px">
        <span id="raid-title-display" style="font-size:16px;font-weight:600;color:#f1f5f9">${raidDisplayName}</span>
        <button class="btn-sm" onclick="showEditRaid('${raid.id}')" title="Edit raid" style="font-size:12px;padding:2px 6px;min-width:auto">✎</button>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:13px;color:#64748b">Total: <strong style="color:#f1f5f9">${totalDmg ? totalDmg.toLocaleString() + "M" : "—"}</strong></span>
        <button class="del-btn" onclick="deleteRaid('${raid.id}')" title="Delete raid">✕ Delete</button>
      </div>
    </div>
    <div id="raid-edit-form" style="display:none;margin-bottom:10px;padding:10px;background:#151c2b;border:1px solid #1e2535;border-radius:8px">
      <div style="display:flex;gap:6px;align-items:center">
        <input class="form-input" id="raid-edit-season" value="${raid.season || ""}" placeholder="S#" type="number" min="1" style="width:50px;font-size:14px;padding:4px 8px"/>
        <input class="form-input" id="raid-edit-name" value="${raid.name}" placeholder="Boss name" style="flex:1;font-size:14px;padding:4px 8px"/>
        <select class="form-input" id="raid-edit-element" style="font-size:14px;padding:4px 6px;width:auto">
          <option value="">No weakness</option>
          ${["Fire", "Water", "Wind", "Electric", "Iron"].map((e) => `<option value="${e}" ${raid.element === e ? "selected" : ""}>${e}</option>`).join("")}
        </select>
        <button class="btn btn-primary" onclick="saveEditRaid('${raid.id}')" style="font-size:13px;padding:4px 10px">Save</button>
        <button class="btn-sm" onclick="hideEditRaid()" style="font-size:13px;padding:4px 8px">Cancel</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      ${viewToggle}
    </div>
    ${bodyHtml}
    ${
        viewMode === "damage" && available.length
? `
      <div style="display:flex;gap:6px;margin-top:10px;align-items:center">
        <select id="raid-add-nikke" class="form-input" style="flex:1;font-size:14px;padding:4px 6px">
          <option value="">— add nikke —</option>${nikkeOpts}
        </select>
        <button class="btn btn-primary" onclick="addRaidEntry('${raid.id}')" style="font-size:13px;padding:4px 10px">Add</button>
      </div>`
: ""
    }`;

    // No more drag-and-drop setup needed
}

function addRaidEntry(raidId) {
    const sel = document.getElementById("raid-add-nikke");
    if (!sel || !sel.value) return;
    const raid = state.raids.find((r) => r.id === raidId);
    raid.entries.push({ nikkeId: sel.value, damage: 0 });
    save();
    renderRaidMain(raid);
}

function removeRaidEntry(raidId, idx) {
    const raid = state.raids.find((r) => r.id === raidId);
    raid.entries.splice(idx, 1);
    save();
    renderRaidMain(raid);
}

function setRaidTeam(raidId, idx, team) {
    const raid = state.raids.find((r) => r.id === raidId);
    raid.entries[idx].team = parseInt(team) || 0;
    save();
    renderRaidMain(raid);
}

function updateTeamNote(raidId, teamNum, value) {
    const raid = state.raids.find((r) => r.id === raidId);
    if (!raid) return;
    if (!raid.teamNotes) raid.teamNotes = {};
    raid.teamNotes[teamNum] = value;
    save();
}

function clearTeamNote(raidId, teamNum) {
    const raid = state.raids.find((r) => r.id === raidId);
    if (!raid) return;
    if (!raid.teamNotes) raid.teamNotes = {};
    raid.teamNotes[teamNum] = "";
    save();
    renderRaidMain(raid);
}

function setRaidSort2(mode) {
    state.raidSortMode = mode;
    const raid = state.raids.find((r) => r.id === state.selRaidEdit);
    if (raid) renderRaidMain(raid);
}

function setRaidDmgSort(mode) {
    state.raidDmgSortMode = mode;
    const raid = state.raids.find((r) => r.id === state.selRaidEdit);
    if (raid) renderRaidMain(raid);
}

function setRaidView(mode) {
    state.raidViewMode = mode;
    const raid = state.raids.find((r) => r.id === state.selRaidEdit);
    if (raid) renderRaidMain(raid);
}

function startEditChipDmg(btn, raidId, entryIdx, currentVal) {
    const meta = btn.closest(".raid-chip-meta");
    meta.innerHTML = `<input class="raid-chip-dmg-input" type="text" inputmode="numeric" value="${currentVal || ""}" placeholder="0"
    onblur="commitChipDmg(this,'${raidId}',${entryIdx})"
    onkeydown="if(event.key==='Enter')this.blur();if(event.key==='Escape'){this.dataset.cancel='1';this.blur();}"/>`;
    const input = meta.querySelector("input");
    input.focus();
    input.select();
}

function commitChipDmg(input, raidId, entryIdx) {
    if (input.dataset.cancel === "1") {
        const raid = state.raids.find((r) => r.id === raidId);
        if (raid) renderRaidMain(raid);
        return;
    }
    const val = parseInt(input.value) || 0;
    const raid = state.raids.find((r) => r.id === raidId);
    if (!raid || !raid.entries[entryIdx]) return;
    raid.entries[entryIdx].damage = val;
    save();
    renderRaidMain(raid);
}

function initRaidDragDrop(raidId) {
    const chips = document.querySelectorAll(".raid-chip[data-raid-entry]");
    const dropZones = document.querySelectorAll('.raid-team-drop[data-raid-id="' + raidId + '"]');

    chips.forEach((chip) => {
        chip.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", chip.dataset.raidEntry);
            chip.classList.add("dragging");
            // Highlight all drop zones
            dropZones.forEach((z) => z.classList.add("drag-active"));
        });
        chip.addEventListener("dragend", (e) => {
            chip.classList.remove("dragging");
            dropZones.forEach((z) => {
                z.classList.remove("drag-active");
                z.classList.remove("drag-over");
            });
        });
    });

    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("drag-over");
        });
        zone.addEventListener("dragleave", (e) => {
            zone.classList.remove("drag-over");
        });
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("drag-over");
            const data = e.dataTransfer.getData("text/plain");
            // data format: "raidId-entryIdx"
            const parts = data.split("-");
            const entryIdx = parseInt(parts[parts.length - 1]);
            const targetTeam = parseInt(zone.dataset.team) || 0;
            const raid = state.raids.find((r) => r.id === raidId);
            if (raid && !isNaN(entryIdx) && raid.entries[entryIdx]) {
                raid.entries[entryIdx].team = targetTeam;
                save();
                renderRaidMain(raid);
            }
        });
    });
}

// ── Slot-based team picker ───────────────────────────────────
let _slotPickerState = { raidId: null, team: null, slot: null };

function openRaidSlotPicker(raidId, teamNum, slotIdx) {
    _slotPickerState = { raidId, team: teamNum, slot: slotIdx };
    const overlay = document.getElementById("raid-slot-picker-overlay");
    if (overlay) {
        overlay.classList.add("show");
        const searchInput = document.getElementById("raid-slot-picker-search");
        if (searchInput) { searchInput.value = ""; searchInput.focus(); }
        filterRaidSlotPicker();
    }
}

function closeRaidSlotPicker() {
    const overlay = document.getElementById("raid-slot-picker-overlay");
    if (overlay) overlay.classList.remove("show");
    _slotPickerState = { raidId: null, team: null, slot: null };
}

function filterRaidSlotPicker() {
    const searchInput = document.getElementById("raid-slot-picker-search");
    const list = document.getElementById("raid-slot-picker-list");
    if (!list) return;
    const q = searchInput ? searchInput.value.toLowerCase() : "";
    const raid = state.raids.find((r) => r.id === _slotPickerState.raidId);
    if (!raid) { list.innerHTML = ""; return; }
    // Get IDs already assigned to a team (team > 0) — unassigned (team 0) remain available
    const assignedToTeamIds = new Set(raid.entries.filter((e) => e.team && e.team > 0).map((e) => e.nikkeId));
    // Show all nikkes in roster, filtering out ones already assigned to a team
    const available = state.nikkes
        .filter((n) => !assignedToTeamIds.has(n.id) && n.name.toLowerCase().includes(q))
        .sort((a, b) => a.name.localeCompare(b.name));
    list.innerHTML = available.map((n) => {
        const elem = n.element ? elemIcon(n.element) : "";
        return `<div class="raid-slot-picker-item" onclick="pickRaidSlotNikke('${n.id}')">
      ${nikkeIcon(n.name, 28)}
      <span>${n.name}</span>
      <span style="font-size:12px;color:#64748b;margin-left:auto">${elem} ${burstDisplay(n)}</span>
    </div>`;
    }).join("") || '<div style="padding:8px;color:#475569;font-size:13px">No available Nikkes</div>';
}

function pickRaidSlotNikke(nikkeId) {
    const { raidId, team } = _slotPickerState;
    const raid = state.raids.find((r) => r.id === raidId);
    if (!raid) return;
    // If the nikke already has an unassigned entry (team 0), reassign it
    const existing = raid.entries.find((e) => e.nikkeId === nikkeId && (!e.team || e.team === 0));
    if (existing) {
        existing.team = team;
    } else {
        raid.entries.push({ nikkeId, damage: 0, team });
    }
    save();
    closeRaidSlotPicker();
    renderRaidMain(raid);
}

function removeRaidTeamSlot(raidId, entryIdx) {
    const raid = state.raids.find((r) => r.id === raidId);
    if (!raid) return;
    raid.entries.splice(entryIdx, 1);
    save();
    renderRaidMain(raid);
}

let _raidDmgSkipBlur = false;

function updateRaidDmg(raidId, idx, val) {
    const raid = state.raids.find((r) => r.id === raidId);
    raid.entries[idx].damage = parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
    save();
}

function raidDmgOnBlur(raidId, idx, val) {
    updateRaidDmg(raidId, idx, val);
}

function raidDmgKeydown(event, raidId, idx) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.blur();
    }
}

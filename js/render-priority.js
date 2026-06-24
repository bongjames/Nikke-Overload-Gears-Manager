// ============================================================
//  RENDER: LINE PRIORITIES
// ============================================================

let _prioSidebarSearch = "";

function filterPrioSidebarList() {
    const input = document.getElementById("prio-sidebar-search");
    if (!input) return;
    _prioSidebarSearch = input.value.toLowerCase();
    document.querySelectorAll("#priority .nikke-list .nikke-item").forEach((el) => {
        el.style.display = el.dataset.name.includes(_prioSidebarSearch) ? "flex" : "none";
    });
}

function renderPriority() {
    const el = document.getElementById("priority");
    let filtered = [...state.nikkes].sort((a, b) => a.name.localeCompare(b.name));
    if (state.gearElementFilter) filtered = filtered.filter((n) => n.element === state.gearElementFilter);
    if (state.gearBurstFilter) {
        const _bk = { I: "burst1", II: "burst2", III: "burst3" }[state.gearBurstFilter];
        if (_bk) filtered = filtered.filter((n) => n[_bk]);
    }

    // Auto-select top Nikke if none selected
    if (!state.selPrio && filtered.length > 0) {
        state.selPrio = filtered[0].id;
    }

    const list =
        filtered
            .map(
                (n) => `
    <div class="nikke-item ${state.selPrio === n.id ? "active" : ""}" data-name="${n.name.toLowerCase()}" onclick="selPrioNikke('${n.id}')" style="display:flex;align-items:center;gap:8px">
      ${nikkeIcon(n.name, 34)}<div>${n.name}<div class="nikke-item-sub">${n.priorities.length ? n.priorities.length + " line(s) set" : "No priorities yet"}</div></div>
    </div>`,
            )
            .join("") ||
        '<div style="font-size:14px;color:#475569;padding:6px">No Nikkes match filter</div>';

    // Build element filter options from elements present in roster
    const elements = [...new Set(state.nikkes.map((n) => n.element).filter(Boolean))].sort();
    const elemOpts = elements
        .map((e) => `<option value="${e}" ${state.gearElementFilter === e ? "selected" : ""}>${e}</option>`)
        .join("");
    const filterHtml = `<div style="margin-bottom:6px">
    <input id="prio-sidebar-search" class="form-input" placeholder="Search Nikke..." value="${_prioSidebarSearch.replace(/"/g, "&quot;")}" oninput="filterPrioSidebarList()" style="font-size:13px;padding:4px 8px;width:100%"/>
  </div>
  <div style="display:flex;gap:4px;margin-bottom:6px">
    <select style="font-size:13px;padding:3px 6px;background:#0f1117;color:#e2e8f0;border:1px solid #2d3f5e;border-radius:5px;flex:1" onchange="setGearElementFilter(this.value)">
      <option value="">All Elements</option>${elemOpts}
    </select>
    <select style="font-size:13px;padding:3px 6px;background:#0f1117;color:#e2e8f0;border:1px solid #2d3f5e;border-radius:5px;flex:1" onchange="setGearBurstFilter(this.value)">
      <option value="">All Bursts</option>
      <option value="I" ${state.gearBurstFilter === "I" ? "selected" : ""}>B1</option>
      <option value="II" ${state.gearBurstFilter === "II" ? "selected" : ""}>B2</option>
      <option value="III" ${state.gearBurstFilter === "III" ? "selected" : ""}>B3</option>
    </select>
  </div>`;

    el.innerHTML = `<div class="two-col">
    <div class="nikke-sidebar">${filterHtml}<div style="margin-bottom:6px"><button class="add-line-btn" style="width:100%;font-size:13px" onclick="loadAllDbPriorities()" title="Populate all Nikkes from database overload recommendations">↺ Load all from database</button></div><div class="nikke-list">${list}</div></div>
    <div id="prio-main">${state.selPrio ? "" : '<div class="empty-state">← Select a Nikke</div>'}</div>
  </div>`;
    if (_prioSidebarSearch) filterPrioSidebarList();

    if (state.selPrio) {
        const n = state.nikkes.find((x) => x.id === state.selPrio);
        if (n) renderPrioMain(n);
    }
}

function selPrioNikke(id) {
    if (state.selPrio === id) return;
    state.selPrio = id;
    // Just update active class without re-rendering sidebar
    document.querySelectorAll("#priority .nikke-list .nikke-item").forEach((el) => {
        const isActive = el.getAttribute("onclick")?.includes(id);
        el.classList.toggle("active", isActive);
    });
    // Only re-render the main content area
    const n = state.nikkes.find((x) => x.id === id);
    if (n) renderPrioMain(n);
    else document.getElementById("prio-main").innerHTML = '<div class="empty-state">← Select a Nikke</div>';
}

function renderPrioMain(nikke) {
    const area = document.getElementById("prio-main");
    const rows = nikke.priorities
        .map((p, i) => {
            const statOpts = ALL_LINES.filter((l) => !ALWAYS_TRASH.has(l))
                .map((l) => `<option value="${l}" ${p.line === l ? "selected" : ""}>${l}</option>`)
                .join("");
            const tierOpts = PRIORITY_TIERS.map(
                (t) => `<option value="${t}" ${p.tier === t ? "selected" : ""}>${t}</option>`,
            ).join("");
            const count = parseInt(p.count) || 1;
            const targetTier = parseInt(p.targetTier) || 11;
            const tTierOpts = Array.from({ length: 15 }, (_, k) => k + 1)
                .map((t) => `<option value="${t}" ${targetTier === t ? "selected" : ""}>T${t}</option>`)
                .join("");
            const tgtVal = p.line && TIER_TABLE[p.line] ? TIER_TABLE[p.line][targetTier - 1] : null;
            const prob = probHitTargetTier(targetTier);
            const expRolls = Math.round(1 / prob);
            return `<div class="prio-card">
      <div class="prio-col-labels">
        <span class="prio-col-label">Stat</span>
        <span class="prio-col-label">Priority</span>
        <span class="prio-col-label">Count</span>
        <span class="prio-col-label">Target Tier</span>
        <span></span>
      </div>
      <div class="prio-row">
        <select onchange="updatePrioLine('${nikke.id}',${i},this.value)"><option value="">— select —</option>${statOpts}</select>
        <select onchange="updatePrioTier('${nikke.id}',${i},this.value)">${tierOpts}</select>
        <input class="prio-count-input" type="number" min="1" max="4" value="${count}" onchange="updatePrioCount('${nikke.id}',${i},this.value)" title="How many of this line across all 4 gear pieces"/>
        <select class="tier-target-select" onchange="updatePrioTargetTier('${nikke.id}',${i},this.value)">${tTierOpts}</select>
        <button class="small-del-btn" onclick="delPrio('${nikke.id}',${i})" title="Remove">✕</button>
      </div>
      ${tgtVal ? `<div class="prio-hint">T${targetTier}+ for ${p.line || "stat"}: ≥<strong>${tgtVal}%</strong> · ${(prob * 100).toFixed(0)}% chance per reset roll (~${expRolls} rolls expected)</div>` : ""}
      ${p.line && p.line in MIN_VAL ? `<div class="prio-hint">Prydwen min per line: ${MIN_VAL[p.line]}% · Total min for ${count}×: ${(MIN_VAL[p.line] * count).toFixed(2)}%</div>` : ""}
    </div>`;
        })
        .join("");

    area.innerHTML = `
    <div class="nikke-hdr">
      ${nikkeIcon(nikke.name, 56)}
      <div>
        <div style="font-size:16px;font-weight:600;color:#f1f5f9">${nikke.name}</div>
        <div style="font-size:13px;color:#64748b">Priorities apply across all 4 gear slots</div>
      </div>
    </div>
    <div class="info-note" style="margin-bottom:10px">
      Set how many of each line you need (Count) and your minimum acceptable value tier (Target Tier, default T10).
      Passable lines are always sacrificeable when Change Effects is needed.
    </div>
    ${rows}
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="add-line-btn" onclick="addPrio('${nikke.id}')">+ Add line</button>
      <button class="add-line-btn" onclick="loadDbPriorities('${nikke.id}')" title="Populate from database overload recommendations">↺ Load from database</button>
    </div>
    <div class="info-note" style="margin-top:10px">
      DEF is always trash. Recommended reroll order: Line 3 (30%) → Line 2 (50%) → Line 1 (100% — last).
      No duplicate stats can appear on the same gear piece.
    </div>`;
}

function updatePrioLine(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].line = v;
    save();
    renderPrioMain(n);
    renderGear();
    renderOverview();
}
function updatePrioTier(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].tier = v;
    save();
    renderPrioMain(n);
    renderGear();
    renderOverview();
}
function updatePrioCount(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].count = Math.min(4, Math.max(1, parseInt(v) || 1));
    save();
    renderPrioMain(n);
    renderOverview();
}
function updatePrioTargetTier(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].targetTier = parseInt(v) || 11;
    save();
    renderPrioMain(n);
    renderGear();
}
function addPrio(nid) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities.push({ line: "", tier: "Ideal", count: 1, targetTier: 10 });
    save();
    renderPrioMain(n);
}
function delPrio(nid, i) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities.splice(i, 1);
    save();
    renderPrioMain(n);
    renderGear();
    renderOverview();
}

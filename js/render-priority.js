// ============================================================
//  RENDER: LINE PRIORITIES (Priorities sub-tab of the Nikkes screen)
// ============================================================

// Re-render the gear detail panel (attribute totals + verdicts depend on
// priorities) and the overview, keeping the active sub-tab. The selected
// Nikke is whatever the Nikkes screen currently has open (state.selGear).
function refreshGearPrio() {
    renderGear();
    renderOverview();
}

// Build the inner HTML of the Priorities sub-tab for a single Nikke.
// No header — the Nikke detail panel already shows the name/meta above.
function renderPrioContent(nikke) {
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
    </div>`;
        })
        .join("");

    return `
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
    refreshGearPrio();
}
function updatePrioTier(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].tier = v;
    save();
    refreshGearPrio();
}
function updatePrioCount(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].count = Math.min(4, Math.max(1, parseInt(v) || 1));
    save();
    refreshGearPrio();
}
function updatePrioTargetTier(nid, i, v) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities[i].targetTier = parseInt(v) || 11;
    save();
    refreshGearPrio();
}
function addPrio(nid) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities.push({ line: "", tier: "Ideal", count: 1, targetTier: 10 });
    save();
    refreshGearPrio();
}
function delPrio(nid, i) {
    const n = state.nikkes.find((x) => x.id === nid);
    n.priorities.splice(i, 1);
    save();
    refreshGearPrio();
}

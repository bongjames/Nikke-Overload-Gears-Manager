// ============================================================
//  WISHLIST
// ============================================================

function renderWishlist() {
    const el = document.getElementById("wishlist");

    const rosterByName = {};
    for (const n of state.nikkes ?? []) rosterByName[n.name] = n;

    const pools = { Elysion: [], Missilis: [], Tetra: [], "Pilgrim/Over-spec": [] };

    for (const db of NIKKE_DATABASE) {
        if (db.rarity !== "SSR") continue;
        if (db.manufacturer === "Abnormal") continue;
        if (db.seasonal) continue;

        const roster = rosterByName[db.name];
        const cores = roster ? (roster.cores ?? 0) : 0;
        const lb = roster ? (roster.limitBreak ?? 0) : 0;
        const power = roster ? (roster.power ?? 0) : 0;

        if (cores >= 7) continue;

        const bossing = db.build?.bossing ?? null;
        const isTreasure = TREASURE_NAMES.has(db.name);

        let rawIdx = bossing ? BOSSING_ORDER.indexOf(bossing) : 999;
        if (rawIdx === -1) rawIdx = 999;
        let bossingIdx = rawIdx;
        const lbBoosted = isTreasure && lb < 2 && rawIdx < 999;
        if (lbBoosted) bossingIdx = Math.max(0, rawIdx - 1);

        const burstVal = { III: 1, All: 1 }[db.burst] ?? 0;

        const candidate = {
            name: db.name,
            bossing,
            effectiveBossing: lbBoosted ? BOSSING_ORDER[bossingIdx] : bossing,
            lbBoosted,
            isOverspec: db.overspec === true,
            burst: db.burst,
            bossingIdx,
            burstVal,
            power,
            cores,
            lb,
        };

        if (db.overspec || db.manufacturer === "Pilgrim") {
            pools["Pilgrim/Over-spec"].push(candidate);
        } else {
            pools[db.manufacturer].push(candidate);
        }
    }

    const sortFn = (a, b) => {
        if (a.bossingIdx !== b.bossingIdx) return a.bossingIdx - b.bossingIdx;
        if (b.burstVal !== a.burstVal) return b.burstVal - a.burstVal;
        return b.power - a.power;
    };

    const POOL_ORDER = ["Elysion", "Missilis", "Tetra", "Pilgrim/Over-spec"];

    const cardsHtml = POOL_ORDER.map((mfr) => {
        const picks = pools[mfr].sort(sortFn).slice(0, 5);
        const rows =
            picks.length === 0
                ? `<tr><td colspan="4" style="color:#64748b;text-align:center;padding:.75rem">No eligible Nikkes</td></tr>`
                : picks
                      .map((p, i) => {
                          const treasureBadge = p.lbBoosted
                              ? ` <span style="color:#60a5fa;font-size:11px;vertical-align:middle">★ Treasure</span>`
                              : "";
                          const lbCell = p.lb > 0 ? `${p.lb}/3` : `<span style="color:#64748b">—</span>`;
                          const coresCell =
                              p.cores > 0 ? `${p.cores}/7` : `<span style="color:#64748b">—</span>`;
                          return `
                    <tr>
                        <td style="color:#64748b;width:1.5rem">${i + 1}</td>
                        <td>${p.name}${treasureBadge}</td>
                        <td style="color:#64748b">${lbCell}</td>
                        <td style="color:#64748b">${coresCell}</td>
                    </tr>`;
                      })
                      .join("");
        return `
            <div style="flex:1 1 380px;min-width:0">
                <div style="font-size:15px;font-weight:600;color:#f1f5f9;margin-bottom:.5rem;padding-bottom:.25rem;border-bottom:1px solid #1e2535">${mfr}</div>
                <table class="attr-table" style="width:100%;table-layout:fixed">
                    <colgroup>
                        <col style="width:2rem">
                        <col>
                        <col style="width:3.5rem">
                        <col style="width:4rem">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>LB</th>
                            <th>Cores</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    }).join("");

    el.innerHTML = `
        <div style="max-width:960px">
            <div class="section-label">Wishlist Recommendations</div>
            <div style="display:flex;flex-wrap:wrap;gap:1.5rem">
                ${cardsHtml}
            </div>
        </div>`;
}

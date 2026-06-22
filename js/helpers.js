// ============================================================
//  HELPER FUNCTIONS
// ============================================================

function scorePiece(nikke, slot) {
    const lines = nikke.gear[slot].lines;
    if (lines.every((l) => !l.stat)) return null;
    let good = 0,
        trash = 0;
    lines.forEach((l) => {
        if (!l.stat) return;
        const c = classifyLine(l.stat, nikke);
        if (isGoodLine(c)) good++;
        else trash++;
    });
    return { good, trash };
}

function dotStatus(nikke, slot) {
    const v = getVerdict(nikke, slot);
    if (!v) return "none";
    if (v.cls === "v-keep") return "done";
    if (v.cls === "v-ok") return "partial";
    return "warn";
}

function attrTotals(nikke) {
    const t = {};
    SLOTS.forEach((s) =>
        nikke.gear[s].lines.forEach((l) => {
            if (!l.stat || !l.val) return;
            const v = parseFloat(l.val);
            if (isNaN(v)) return;
            t[l.stat] = (t[l.stat] || 0) + v;
        }),
    );
    return t;
}

// Minimum total value expected across all 4 gear pieces
// = priority count × per-line minimum
function minTotalVal(nikke, stat) {
    if (!(stat in MIN_VAL)) return null;
    const p = nikke.priorities.find((p) => p.line === stat);
    if (!p) return null;
    return (parseInt(p.count) || 1) * MIN_VAL[stat];
}

function initials(name) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

/*
 * Get the efficiency rank of a specific nikke+slot across all nikkes.
 * Returns 0 if the slot is done or has no valid ranking.
 */
function getSlotRank(nikkeId, slot) {
    const rankings = [];
    state.nikkes.forEach((n) => {
        if (!n.priorities.length) return;
        SLOTS.forEach((s) => {
            const v = getVerdict(n, s);
            if (!v || v.cls === "v-keep") return;
            let rocks = 0,
                gainTotal = 0;
            if (v.options) {
                const rec = v.options.find((o) => o.recommended) || v.options[0];
                rocks = rec.rocks;
                const netMatch = rec.gain.match(/net\s+(?:\S+\s+)?([+-]?\d+\.?\d*)%/);
                if (netMatch) gainTotal = parseFloat(netMatch[1]);
                else {
                    const matches = rec.gain.match(/\+(\d+\.?\d*)%/g);
                    if (matches)
                        gainTotal = matches.reduce(
                            (sum, m) => sum + parseFloat(m.replace("+", "").replace("%", "")),
                            0,
                        );
                }
            } else {
                rocks = v.rocks;
                const netMatch = (v.gain || "").match(/net\s+(?:\S+\s+)?([+-]?\d+\.?\d*)%/);
                if (netMatch) gainTotal = parseFloat(netMatch[1]);
                else {
                    const matches = (v.gain || "").match(/\+(\d+\.?\d*)%/g);
                    if (matches)
                        gainTotal = matches.reduce(
                            (sum, m) => sum + parseFloat(m.replace("+", "").replace("%", "")),
                            0,
                        );
                }
            }
            if (rocks <= 0 || gainTotal <= 0) return;
            rankings.push({ nikkeId: n.id, slot: s, efficiency: gainTotal / rocks });
        });
    });
    rankings.sort((a, b) => b.efficiency - a.efficiency);
    const idx = rankings.findIndex((r) => r.nikkeId === nikkeId && r.slot === slot);
    return idx >= 0 ? idx + 1 : 0;
}

/*
 * Total potential damage gain (%) for a nikke, summed across all
 * incomplete gear slots. Uses the same gain-parsing logic as the
 * efficiency ranking. Returns a percentage number (e.g. 7.5 = +7.5%).
 */
function getNikkeTotalGainPct(nikke) {
    if (!nikke || !nikke.priorities || !nikke.priorities.length) return 0;
    let total = 0;
    SLOTS.forEach((s) => {
        const v = getVerdict(nikke, s);
        if (!v || v.cls === "v-keep") return;
        // Use pre-computed DPS-weighted gain if available
        if (v.options) {
            const rec = v.options.find((o) => o.recommended) || v.options[0];
            if (rec && rec.dpsGain > 0) {
                total += rec.dpsGain;
                return;
            }
        } else if (v.dpsGain > 0) {
            total += v.dpsGain;
            return;
        }
        // Fallback: parse gain string (for older verdict shapes)
        let gainStr = "";
        if (v.options) {
            const rec = v.options.find((o) => o.recommended) || v.options[0];
            gainStr = rec ? rec.gain : "";
        } else {
            gainStr = v.gain || "";
        }
        if (!gainStr) return;
        // Parse individual stat gains separated by " or "
        const parts = gainStr.split(/\s+or\s+/);
        let bestWeighted = 0;
        parts.forEach((part) => {
            const m = part.match(/([A-Za-z\s]+?)\s*\+(\d+\.?\d*)%/);
            if (m) {
                const stat = ALL_LINES.find((l) => part.includes(l)) || "";
                const val = parseFloat(m[2]);
                const w = stat ? getStatDmgWeight(stat, nikke.name, nikke) : 1.0;
                bestWeighted = Math.max(bestWeighted, val * w);
            }
        });
        if (bestWeighted > 0) total += bestWeighted;
    });
    return total;
}

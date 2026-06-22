// ============================================================
//  CUBES TAB
// ============================================================

function renderCubes() {
    const el = document.getElementById("cubes");
    const levels = state.cubeLevels ?? {};

    // Map cube tid → list of Nikke names using it
    const cubeUsers = {};
    state.nikkes.forEach((n) => {
        if (n.cube && n.cube.tid) {
            if (!cubeUsers[n.cube.tid]) cubeUsers[n.cube.tid] = [];
            cubeUsers[n.cube.tid].push(n.name || String(n.id));
        }
    });

    const rows = Object.entries(HARMONY_CUBES)
        .map(([tid, name]) => {
            const tidNum = parseInt(tid, 10);
            const hasLevel = levels[tid] != null;
            const level = levels[tid];
            const users = (cubeUsers[tidNum] || []).slice().sort((a, b) => a.localeCompare(b));
            const userCell = users.length
                ? `<span style="color:#94a3b8;font-size:14px">${users.join(", ")}</span>`
                : `<span style="color:#334155;font-size:14px">—</span>`;
            const minDis = hasLevel && level <= 1 ? " disabled" : "";
            const maxDis = hasLevel && level >= 15 ? " disabled" : "";
            const levelCell = hasLevel
                ? `<div class="stepper" style="width:96px">
                <button type="button" class="stepper-btn" tabindex="-1" onmousedown="event.preventDefault()" onclick="stepCubeLevel(${tid},-1)"${minDis}>−</button>
                <input class="stepper-input" type="number" inputmode="numeric" min="1" max="15" step="1" placeholder="—" value="${level}" onchange="updateCubeLevel(${tid},this.value)"/>
                <button type="button" class="stepper-btn" tabindex="-1" onmousedown="event.preventDefault()" onclick="stepCubeLevel(${tid},1)"${maxDis}>+</button>
              </div>`
                : `<span style="color:#475569;font-size:14px">not tracked</span>`;
            const actionCell = hasLevel
                ? `<button class="btn" style="padding:2px 8px;font-size:13px;background:#7f1d1d;border-color:#991b1b"
                onclick="removeCubeLevel(${tid})">Remove</button>`
                : `<button class="btn" style="padding:2px 8px;font-size:13px"
                onclick="addCubeLevel(${tid})">Add</button>`;
            return `<tr>
            <td style="font-weight:600">${name}</td>
            <td>${levelCell}</td>
            <td>${actionCell}</td>
            <td style="white-space:normal;word-break:break-word">${userCell}</td>
        </tr>`;
        })
        .join("");

    el.innerHTML = `
        <div>
            <table class="attr-table cube-table" style="table-layout:fixed;width:100%">
                <tr>
                    <th style="width:140px">Cube</th>
                    <th style="width:110px">Level</th>
                    <th style="width:80px"></th>
                    <th>Equipped By</th>
                </tr>
                ${rows}
            </table>
        </div>
    `;
}

function updateCubeLevel(tid, value) {
    if (!state.cubeLevels) state.cubeLevels = {};
    const v = parseInt(value, 10);
    if (!isNaN(v) && v >= 1) {
        state.cubeLevels[tid] = Math.min(v, 15);
    } else {
        delete state.cubeLevels[tid];
    }
    save();
    renderCubes();
}

function stepCubeLevel(tid, delta) {
    if (!state.cubeLevels) state.cubeLevels = {};
    const cur = state.cubeLevels[tid] != null ? state.cubeLevels[tid] : 1;
    state.cubeLevels[tid] = Math.max(1, Math.min(15, cur + delta));
    save();
    renderCubes();
}

function addCubeLevel(tid) {
    if (!state.cubeLevels) state.cubeLevels = {};
    state.cubeLevels[tid] = 1;
    save();
    renderCubes();
}

function removeCubeLevel(tid) {
    if (state.cubeLevels) delete state.cubeLevels[tid];
    save();
    renderCubes();
}

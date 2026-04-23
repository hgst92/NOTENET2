function adminPage() {
    model.app.currentPage = "adminPage";
    updateView();
}

function adminView() {
    return `
        <div class="container admin-page">
            <header>
                <div>
                    <h2>NoteNet — Administrasjon</h2>
                    <div class="small">Administrer brukere, roller og status</div>
                </div>
                <div class="right">
                    <div>Hei ${model.app.currentUser?.userName ?? "Admin"} 👑</div>
                    <button id="logoutBtn">Logg ut</button>
                </div>
            </header>

            <div class="stats" id="stats">
                <div class="stat"><small>Totale brukere:</small><div id="totalUsers">0</div></div>
                <div class="stat"><small>Aktive brukere:</small><div id="activeUsers">0</div></div>
                <div class="stat"><small>Premium brukere:</small><div id="premiumUsers">0</div></div>
                <div class="stat"><small>Totale lister:</small><div id="totalLists">0</div></div>
            </div>

            <div class="controls">
                <input id="search" type="text" placeholder="Søk (navn, epost, kode)"/>
                <select id="filterRole">
                    <option value="">Alle roller</option>
                    <option>Admin</option>
                    <option>Premium</option>
                    <option>Gratis</option>
                </select>
                <select id="filterStatus">
                    <option value="">Alle status</option>
                    <option>Aktiv</option>
                    <option>Inaktiv</option>
                    <option>Deaktivert</option>
                </select>                
            </div>

            <table id="usersTable" aria-label="Brukerliste">
                <thead>
                    <tr>
                        <th data-key="kode">Kode ▲</th>
                        <th data-key="navn">Bruker</th>
                        <th data-key="email">Epost</th>
                        <th data-key="rolle">Rolle</th>
                        <th data-key="lister">Lister</th>
                        <th data-key="status">Status</th>
                        <th>Handlinger</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div id="modal" class="modal" role="dialog" aria-modal="true">
            <div class="panel">
                <h3 id="modalTitle">Logg ut</h3>
                <div class="row"><label for="mKode">Bekrefte at du vil logge ut.</label></div>
                <div style="text-align:right;margin-top:12px">
                    <button id="cancel">Avbryt</button>
                    <button id="save">Bekrefte</button>
                </div>
            </div>
        </div>
    `;
}
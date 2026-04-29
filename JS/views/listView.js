function getListUserCount(list) {
    return 1 + (list.sharedWithUserIds?.length ?? 0);
}

function getBadgeClass(userName) {
    const user = model.users.find(u => u.userName === userName);
    if (!user || user.role === "Free") return "badge-free";
    return "badge-premium-admin";
}

function renderSubMenu() {
    const subMenu = document.getElementById("subMenu");

    if (model.app.currentPage !== "myListsPage") {
        subMenu.className = "menu-line";
        subMenu.innerHTML = "";
        return;
    }

    const accessibleLists = getAccessibleLists();

    let html = accessibleLists.map((list, index) => `
        <span
            class="menu-link ${model.app.selectedListId === list.id ? "active" : ""}"
            onclick="selectList(${list.id})"
        >
            ${escapeHtml(list.title)}
        </span>
        ${index < accessibleLists.length - 1 ? '<span class="menu-separator">|</span>' : ""}
    `).join("");

    html += `
        <span class="menu-separator">|</span>
        <span class="menu-link" onclick="showAddListPrompt()">+ Ny liste</span>
    `;

    subMenu.innerHTML = html;
}

function myListsPage() {
    ensureSelectedListAccess();
    const currentUser = model.app.currentUser;
    const accessibleLists = getAccessibleLists();

    // renderSubMenu();
    const selectedList = accessibleLists.find(list => list.id === model.app.selectedListId);

    if (!selectedList) {
        return renderNavbar() + `
            <article class="card-box">
                <h2>Mine lister</h2>
                <p>${accessibleLists.length === 0 ? "Du har ingen tilgjengelige lister ennå." : "Velg en liste i menyen over."}</p>
                <button onclick="showAddListPrompt()">Opprett første liste</button>
            </article>
        `;
    }

    const sharedWithNames = (selectedList.sharedWithUserIds ?? [])
        .map(userId => model.users.find(user => user.id === userId)?.userName)
        .filter(Boolean);
    const canUseSharingFeatures = currentUser?.role === "Premium" || currentUser?.role === "Admin";
    const canShareSelectedList = canCurrentUserShare(selectedList);

    const itemsHtml = selectedList.content.length === 0
        ? `<p class="muted">This list has no items yet.</p>`
        : `<ul class="items-list">`
          + selectedList.content.map((item, index) => `
            <li class="${item.isChecked ? "checked" : ""}" onclick="toggleItem(${index})">
                <span class="item-text">${escapeHtml(item.text)}</span>
                <span class="item-right">
                    <span class="${getBadgeClass(item.addedBy)}">${escapeHtml(item.addedBy)}</span>
                    <span class="close-btn" onclick="event.stopPropagation(); removeItem(${index})">&times;</span>
                </span>
            </li>
          `).join("")
          + `</ul>`;

    return renderNavbar() + `
        <div class="card-box list-page-box">
            <h2>
                ${escapeHtml(selectedList.title)}
                <span class="list-user-count">
                    ${getListUserCount(selectedList)}🧑
                    ${selectedList.ownerId === model.app.currentUser?.id ? "🛡️" : ""}
                </span>
            </h2>
            
            <div class="inline-actions">
                <input
                    id="newItemInput"
                    type="text"
                    value="${escapeHtml(model.inputs.myListsPage.newItemText)}"
                    oninput="updateNewItemText(this.value)"
                    onkeydown="if(event.key==='Enter') addItem()"
                    placeholder="Write a new item..."
                />
                <button type="button" onclick="addItem()">Add</button>
                <button type="button" class="secondary" onclick="renameCurrentList()">Rename list</button>
                <button type="button" class="contrast" onclick="removeCurrentList()">Delete list</button>
                ${canUseSharingFeatures ? `<button type="button" class="secondary" onclick="shareCurrentList()" ${canShareSelectedList ? "" : "disabled"} title="${canShareSelectedList ? "Del listen med andre brukere" : "Velg en liste du eier for å dele"}">Del liste</button>` : ''}
                ${canUseSharingFeatures ? `<button type="button" class="secondary" onclick="unshareCurrentList()" ${(canShareSelectedList && sharedWithNames.length > 0) ? "" : "disabled"} title="${(canShareSelectedList && sharedWithNames.length > 0) ? "Fjern deling for en bruker" : "Listen må være din og delt med noen"}">Fjern deling</button>` : ''}
            </div>

            ${canUseSharingFeatures && !canShareSelectedList ? '<p class="muted">Du kan bare dele lister du selv eier.</p>' : ''}

            <p class="muted">
                Eier: ${escapeHtml(model.users.find(user => user.id === selectedList.ownerId)?.userName ?? currentUser?.userName ?? "Ukjent")}
                ${sharedWithNames.length > 0 ? ` | Delt med: ${escapeHtml(sharedWithNames.join(", "))}` : ""}
            </p>

            <hr />

            ${itemsHtml}
        </div>
    `;
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

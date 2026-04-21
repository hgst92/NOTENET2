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

    let html = model.lists.map((list, index) => `
        <span
            class="menu-link ${model.app.selectedListId === list.id ? "active" : ""}"
            onclick="selectList(${list.id})"
        >
            ${escapeHtml(list.title)}
        </span>
        ${index < model.lists.length - 1 ? '<span class="menu-separator">|</span>' : ""}
    `).join("");

    html += `
        <span class="menu-separator">|</span>
        <span class="menu-link" onclick="showAddListPrompt()">+ Add list</span>
    `;

    subMenu.innerHTML = html;
}

function myListsPage() {

    // renderSubMenu();
    const selectedList = model.lists.find(list => list.id === model.app.selectedListId);

    if (!selectedList) {
        return renderNavbar() + `
            <article class="card-box">
                <h2>My Lists</h2>
                <p>No list selected.</p>
                <button onclick="showAddListPrompt()">Create first list</button>
            </article>
        `;
    }

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
            <h2>${escapeHtml(selectedList.title)}</h2>
            <p class="muted">${escapeHtml(selectedList.desciption || "")}</p>

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
            </div>

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

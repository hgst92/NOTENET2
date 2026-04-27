// function renderMainMenu() {
//     const mainMenu = document.getElementById("mainMenu");

//     const items = [
//         { key: "home", label: "Hjem" },
//         { key: "lists", label: "Mine Lister" },//         
//         { key: "profile", label: "Profil" },
//     ];

//     mainMenu.innerHTML = items.map((item, index) => `
//         <span
//             class="menu-link ${model.app.currentPage === item.key ? "active" : ""}"
//             onclick="selectMain('${item.key}')"
//         >
//             ${item.label}
//         </span>
//         ${index < items.length - 1 ? '<span class="menu-separator">|</span>' : ""}
//     `).join("");
// }

function renderNavbar() {
    const isAdmin = model.app.currentUser?.role === "Admin";
    const items = [
        { key: "myListsPage", label: "Mine Lister" },
        { key: "grupperPage", label: "Grupper" },
        { key: "profilePage", label: "Profil" + (() => { const n = (model.pendingInvitations ?? []).filter(inv => inv.toUserId === model.app.currentUser?.id).length; return n > 0 ? ` <span style="background:red;color:white;border-radius:50%;padding:1px 6px;font-size:0.75em;">${n}</span>` : ""; })() },
        ...(isAdmin ? [{ key: "adminPage", label: "Administrasjon" }] : []),
    ];

    return `<nav class="menu-line" id="mainMenu">` + items.map((item, i) => `
        <span
            class="menu-link ${model.app.currentPage === item.key ? "active" : ""}"
            onclick="selectMain('${item.key}')"
        >
            ${item.label}
        </span>
        ${i < items.length - 1 ? '<span class="menu-separator">|</span>' : ""}
    `).join("") + `</nav><div id="subMenu"></div>`;
}
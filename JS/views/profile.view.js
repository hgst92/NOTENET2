function profilePage() {
    const user = model.app.currentUser;
    const groups = model.groups ?? [];

    return renderNavbar() + /*HTML*/ `
    <div>

    <!-- NAVBAR -->


    <div>
    🔔 
    <span> Hei ${user.userName} 👑</span>
    </div>
</div>

<!-- MAIN -->
<div style="display:flex; padding:20px; gap:20px;">

    <!-- VENSTRE: GRUPPER / LISTER -->
    <div style="width:50%; border:1px solid black; padding:20px;">

        <h3>Grupper og lister</h3>

        ${groups.length === 0 ? `
            <p>Du har ingen grupper ennå.</p>
        ` : groups.map(group => `
            <div style="margin-bottom:15px;">

            <strong>Gruppe: ${group.name}</strong>
            
                ${group.listsId.map(id => {
                    const list = model.lists.find(l => l.id === id);
                    if (!list) return "";

                    return `
                    <p onclick="selectList(${list.id})" 
                    style="cursor:pointer; padding:5px; border-radius:5px; ${model.app.selectedListId === list.id ? 'font-weight:bold; background: #eee;' : ''}"
                    onmouseover="this.style.background='#eee'"
                    onmouseout="this.style.background='transparent'"
                    > 
                     ${list.title}
                    </p>
                    `;
                }).join("")}
        </div>
        `).join("")}
        </div>
    
    <!-- HØYRE: INNSTILLINGER -->
    <div style="width:50%; padding:20px; border-left:1px solid black;">

    <h2>Innstillinger</h2>
    
    <p>Email: ${user.emailAddress}</p>
    <p>Telefon: 55555</p>

    <button>Endre epost</button>
    <button>Endre nummer</button>

    <br><br>

    <button onclick="logout()">Logg ut</button>

    </div>
</div>

</div>
`;
 }
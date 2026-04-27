function profilePage() {
    const user = model.app.currentUser;
    const groups = model.groups ?? [];

    return renderNavbar() + /*HTML*/ `
    <div>

    <!-- NAVBAR -->


    <div>
    🔔${(() => { const n = (model.pendingInvitations ?? []).filter(inv => inv.toUserId === user.id).length; return n > 0 ? ` <span style="background:red;color:white;border-radius:50%;padding:1px 6px;font-size:0.75em;">${n}</span>` : ""; })()} 
    <span> Hei ${user.userName} 👑</span>
    </div>
</div>

<!-- MAIN -->
<div style="display:flex; flex-direction:column; padding:20px; gap:20px;">

    <!-- INVITASJONER TOPP -->
    ${(() => {
        const myInvitations = (model.pendingInvitations ?? []).filter(inv => inv.toUserId === user.id);
        if (myInvitations.length === 0) return "";
        return `
        <div style="border:2px solid orange; border-radius:8px; padding:16px; background:#fff8e1;">
            <h3 style="margin:0 0 12px 0;">📬 Ventende invitasjoner (${myInvitations.length})</h3>
            ${myInvitations.map(inv => {
                const list = model.lists.find(l => l.id === inv.listId);
                const fromUser = model.users.find(u => u.id === inv.fromUserId);
                return `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:8px; margin-bottom:6px; background:white; border:1px solid #ccc; border-radius:5px;">
                    <span><strong>${fromUser?.userName ?? "Ukjent"}</strong> inviterer deg til <strong>${list?.title ?? "Ukjent liste"}</strong></span>
                    <span>
                        <button onclick="acceptInvitation(${inv.id})" style="margin-right:6px;">Godta</button>
                        <button onclick="declineInvitation(${inv.id})">Avslå</button>
                    </span>
                </div>`;
            }).join("")}
        </div>`;
    })()}

    <div style="display:flex; gap:20px;">

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
</div>
`;
 }
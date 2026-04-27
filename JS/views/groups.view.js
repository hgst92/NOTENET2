function grupperPage() {
    return renderNavbar() + `
    <div style="padding:20px;">
    <h2>Grupper</h2>

    ${model.groups.map(group => `
<div style="margin-bottom:20px;">
<h3 style="margin-top:20px;">${group.name}</h3>

${group.listIds.map(id => {
    const list = model.lists.find(l => l.id === id);
    if(!list) return "";
    return `
    <div 
    onclick="selectList(${list.id}); goTo('myListsPage')" 
    style="
    cursor:pointer;
    padding:6px;
    border-radius6px;
    ${model.app.selectedListId === list.id ? 'background:#ddd; font-weight:bold;' : ''}
    "
    onmouseover="this.style.background='#eee'"
    onmouseout="this.style.background='transparent'"
    > 
    - ${list.title}
    </div>
    `;
}).join("")}
</div>
`).join("")}
</div>
`;
}
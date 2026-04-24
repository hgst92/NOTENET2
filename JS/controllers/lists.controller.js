function selectList(listId) {
    const accessibleLists = getAccessibleLists();
    const hasAccess = accessibleLists.some(list => list.id === listId);
    if (!hasAccess) return;

    model.app.selectedListId = listId;
    updateView();
}

function getAccessibleLists() {
    const user = model.app.currentUser;
    if (user.role === "Admin") return model.lists;

    return model.lists.filter(list =>
        list.ownerId === user.id || (list.sharedWithUserIds ?? []).includes(user.id)
    );
}

function canCurrentUserShare(list) {
    const user = model.app.currentUser;
    if (!user || !list) return false;

    const isPremiumOrAdmin = user.role === "Premium" || user.role === "Admin";
    return isPremiumOrAdmin && list.ownerId === user.id;
}

function ensureSelectedListAccess() {
    const accessibleLists = getAccessibleLists();
    if (accessibleLists.length === 0) {
        model.app.selectedListId = null;
        return;
    }

    const currentStillAvailable = accessibleLists.some(list => list.id === model.app.selectedListId);
    if (!currentStillAvailable) {
        const ownedList = accessibleLists.find(list => list.ownerId === model.app.currentUser?.id);
        model.app.selectedListId = (ownedList ?? accessibleLists[0]).id;
    }
}

function shareCurrentList() {
    const currentUser = model.app.currentUser;
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!currentUser || !list) return;

    if (!canCurrentUserShare(list)) {
        alert("Kun Premium/Admin kan dele egne lister.");
        return;
    }

    const email = prompt("Skriv inn e-post til brukeren du vil dele med:");
    if (!email || !email.trim()) return;

    const targetUser = model.users.find(user => user.emailAddress === email.trim());
    if (!targetUser) {
        alert("Fant ingen bruker med den e-posten.");
        return;
    }

    if (targetUser.id === currentUser.id) {
        alert("Du eier allerede denne listen.");
        return;
    }

    list.sharedWithUserIds = list.sharedWithUserIds ?? [];
    if (list.sharedWithUserIds.includes(targetUser.id)) {
        alert("Listen er allerede delt med denne brukeren.");
        return;
    }

    list.sharedWithUserIds.push(targetUser.id);
    list.isShared = list.sharedWithUserIds.length > 0;
    alert(`Listen er delt med ${targetUser.userName}.`);
    updateView();
}

function unshareCurrentList() {
    const currentUser = model.app.currentUser;
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!currentUser || !list) return;

    if (!canCurrentUserShare(list)) {
        alert("Kun eier med Premium/Admin kan fjerne deling.");
        return;
    }

    const sharedUserIds = list.sharedWithUserIds ?? [];
    if (sharedUserIds.length === 0) {
        alert("Listen er ikke delt med noen.");
        return;
    }

    const sharedUsers = sharedUserIds
        .map(userId => model.users.find(user => user.id === userId))
        .filter(Boolean);

    const availableUsersText = sharedUsers
        .map(user => `${user.userName} (${user.emailAddress})`)
        .join("\n");

    const email = prompt(`Hvem vil du fjerne deling for?\n${availableUsersText}\n\nSkriv e-post:`);
    if (!email || !email.trim()) return;

    const targetUser = sharedUsers.find(user => user.emailAddress === email.trim());
    if (!targetUser) {
        alert("Fant ingen delt bruker med den e-posten.");
        return;
    }

    list.sharedWithUserIds = sharedUserIds.filter(userId => userId !== targetUser.id);
    list.isShared = list.sharedWithUserIds.length > 0;
    alert(`Deling fjernet for ${targetUser.userName}.`);
    updateView();
}

function showAddListPrompt() {
    const currentUser = model.app.currentUser;
    if (!currentUser) {
        alert("Du må være logget inn for å opprette lister.");
        return;
    }

    const name = prompt("Name of the new list:");
    if (!name || !name.trim()) return;

    const newId = model.lists.length > 0
        ? Math.max(...model.lists.map(list => list.id)) + 1
        : 1;

    const newList = {
        id: newId,
        title: name.trim(),
        desciption: "",
        content: [],
        isFavourite: false,
        isShared: false,
        ownerId: currentUser.id,
        sharedWithUserIds: [],
    };

    model.lists.push(newList);
    model.app.currentPage = "myListsPage";
    model.app.selectedListId = newId;
    updateView();
}

function renameCurrentList() {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list) return;

    if (list.ownerId !== model.app.currentUser?.id) {
        alert("Kun eier kan endre navn på listen.");
        return;
    }

    const newName = prompt("New list name:", list.title);
    if (!newName || !newName.trim()) return;

    list.title = newName.trim();
    updateView();
}

function removeCurrentList() {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list) return;

    if (list.ownerId !== model.app.currentUser?.id) {
        alert("Kun eier kan slette listen.");
        return;
    }

    const confirmed = confirm(`Delete "${list.title}"?`);
    if (!confirmed) return;

    model.lists = model.lists.filter(l => l.id !== model.app.selectedListId);
    ensureSelectedListAccess();
    updateView();
}

function updateNewItemText(value) {
    model.inputs.myListsPage.newItemText = value;
}

function addItem() {
    const text = model.inputs.myListsPage.newItemText.trim();
    if (!text) {
        alert("You must write something!");
        return;
    }

    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list) return;

    const canAccessList = getAccessibleLists().some(accessibleList => accessibleList.id === list.id);
    if (!canAccessList) {
        alert("Du har ikke tilgang til denne listen.");
        return;
    }

    list.content.push({
        text: text,
        isChecked: false,
        addedBy: model.app.currentUser?.userName ?? "Gjest",
    });

    model.inputs.myListsPage.newItemText = "";
    updateView();
}

function toggleItem(index) {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list || index < 0 || index >= list.content.length) return;

    const canAccessList = getAccessibleLists().some(accessibleList => accessibleList.id === list.id);
    if (!canAccessList) {
        alert("Du har ikke tilgang til denne listen.");
        return;
    }

    list.content[index].isChecked = !list.content[index].isChecked;
    updateView();
}

function removeItem(index) {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list || index < 0 || index >= list.content.length) return;

    const canAccessList = getAccessibleLists().some(accessibleList => accessibleList.id === list.id);
    if (!canAccessList) {
        alert("Du har ikke tilgang til denne listen.");
        return;
    }

    list.content.splice(index, 1);
    updateView();
}

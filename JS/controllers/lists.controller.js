function selectList(listId) {
    model.app.selectedListId = listId;
    updateView();
}

function showAddListPrompt() {
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
    };

    model.lists.push(newList);
    model.app.currentPage = "myListsPage";
    model.app.selectedListId = newId;
    updateView();
}

function renameCurrentList() {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list) return;

    const newName = prompt("New list name:", list.title);
    if (!newName || !newName.trim()) return;

    list.title = newName.trim();
    updateView();
}

function removeCurrentList() {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list) return;

    const confirmed = confirm(`Delete "${list.title}"?`);
    if (!confirmed) return;

    model.lists = model.lists.filter(l => l.id !== model.app.selectedListId);
    model.app.selectedListId = model.lists.length > 0 ? model.lists[0].id : null;
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

    list.content.push({
        text: text,
        isChecked: false,
        addedBy: model.app.currentUser,
    });

    model.inputs.myListsPage.newItemText = "";
    updateView();
}

function toggleItem(index) {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list || index < 0 || index >= list.content.length) return;

    list.content[index].isChecked = !list.content[index].isChecked;
    updateView();
}

function removeItem(index) {
    const list = model.lists.find(l => l.id === model.app.selectedListId);
    if (!list || index < 0 || index >= list.content.length) return;

    list.content.splice(index, 1);
    updateView();
}

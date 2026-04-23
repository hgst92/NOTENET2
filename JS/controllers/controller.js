// function updateView() {
// 	const appElement = document.getElementById("app");
// 	if (!appElement) return;

// 	appElement.innerHTML = homeView();
// }

// there is already in view.js ...

function selectMain(key) {
    const isAdmin = model.app.currentUser?.role === "Admin";
    if (key === "adminPage" && !isAdmin) {
        model.app.currentPage = model.app.currentUser ? "profilePage" : "homePage";
        updateView();
        return;
    }

    model.app.currentPage = key;
	if (key === "myListsPage") {
        const accessibleLists = getAccessibleLists();
        if (model.app.selectedListId === null && accessibleLists.length > 0) {
            const ownedList = accessibleLists.find(list => list.ownerId === model.app.currentUser?.id);
            model.app.selectedListId = (ownedList ?? accessibleLists[0]).id;
        }
    }
    updateView();
}

updateView();
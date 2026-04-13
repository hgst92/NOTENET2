function updateView() {
	const appElement = document.getElementById("app");
	if (!appElement) return;

	appElement.innerHTML = homeView();
}

updateView();

function updateView() {
    const app = document.getElementById("app");

    if (model.app.currentPage === "logInPage") {
        app.innerHTML = logInPage();
    }

    else if (model.app.currentPage === "homePage") {
        app.innerHTML = homeView();
    }

    else if (model.app.currentPage === "profilePage") {
        app.innerHTML = profilePage();
    }

    else if (model.app.currentPage === "myListsPage") {
        app.innerHTML = myListsPage();
    }

    else if (model.app.currentPage === "adminPage") {
        app.innerHTML = adminPage();
    }
}

function updateView() {
    const app = document.getElementById("app");
    const isLoggedIn = !!model.app.currentUser;
    const isAdmin = model.app.currentUser?.role === "Admin";

    if (!isLoggedIn && model.app.currentPage !== "homePage" && model.app.currentPage !== "logInPage") {
        model.app.currentPage = "homePage";
    }

    if (isLoggedIn && (model.app.currentPage === "homePage" || model.app.currentPage === "logInPage")) {
        model.app.currentPage = "profilePage";
    }

    if (model.app.currentPage === "adminPage" && !isAdmin) {
        model.app.currentPage = isLoggedIn ? "profilePage" : "homePage";
    }

    // document.getElementById("subMenu").innerHTML = "";

    if (model.app.currentPage === "logInPage") {
        app.innerHTML = logInPage();
    }

    else if (model.app.currentPage === "homePage") {
        app.innerHTML = homeView();
    }

    else if (model.app.currentPage === "profilePage") {
        app.innerHTML = profilePage();
    }  

     else if (model.app.currentPage === "grupperPage") {
        app.innerHTML = grupperPage();
    }

    else if (model.app.currentPage === "myListsPage") {
        app.innerHTML = myListsPage();
        renderSubMenu();
    }   
    
    else if (model.app.currentPage === "adminPage") {
        app.innerHTML = renderNavbar() + adminView();
        initAdminPage();
    }
}

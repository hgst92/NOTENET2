
function login() {
    const input = model.inputs.logInPage;
    const email = input.email.trim();
    const password = input.password;

    if (!email) {
        alert("Skriv inn e-post");
        return;
    }

    if (!password) {
        alert("Skriv inn passord");
        return;
    }

    const user = model.users.find(u => u.emailAddress === email && u.password === password);

    if (user && user.isActive) {
        model.app.currentUser = user;
        model.app.currentPage = "profilePage";
        model.inputs.logInPage.email = "";
        model.inputs.logInPage.password = "";
    } else if (user && !user.isActive) {
        alert("Brukeren er deaktivert");
    } else {
        alert("Feil e-post eller passord");
    }

    updateView();
}

function register() {
    const input = model.inputs.registerPage;

    if (!input.email.trim()) {
        alert("Skriv inn e-postadresse");
        return;
    }

    if (!input.password) {
        alert("Skriv inn passord");
        return;
    }

    if (input.password !== input.confirmPassword) {
        alert("Passord matcher ikke");
        return;
    }

    const existingUser = model.users.find(user => user.emailAddress === input.email.trim());
    if (existingUser) {
        alert("E-postadressen er allerede registrert");
        return;
    }

    const newUser = {
        id: "user_" + Date.now(),
        userName: input.email.trim(),
        emailAddress: input.email.trim(),
        password: input.password,
        role: "Free",
        lists: 0,
        isActive: true,
    };

    model.users.push(newUser);
    model.app.currentUser = newUser;
    model.app.currentPage = "profilePage";
    model.inputs.registerPage.email = "";
    model.inputs.registerPage.password = "";
    model.inputs.registerPage.confirmPassword = "";

    updateView();
}

function logout() {
    model.app.currentUser = null;
    model.app.currentPage = "homePage";
    updateView();
}

function goTo(page) {
    model.app.currentPage = page;
    updateView();
}

function toggleForgotPassword() {
    model.app.showForgotPassword = !model.app.showForgotPassword;
    updateView();
}

function sendReset() {
    const email = model.inputs.forgottenPasswordPopUp.confirmEmail;

    if (!email) {
        alert("Skriv inn e-post " + email);

        model.app.showForgotPassword = false;
        updateView();
    }
}

updateView();

const model = {
    app: {
        currentPage: "logInPage",
        currentUser: "",
        isAdmin: true,
        selectedListId: null,
    },
    inputs: {
        logInPage: {
            email: "",
            password: "",
        },
        forgottenPasswordPopUp: {
            confirmEmail: "",
        },
        registerPage: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        myListsPage: {
            newOwnListName: "",
            newSharedListName: "",
            newItemText: "",
        },
        adminPage: {
            searchQuary: "",
            addListContent: "",
        },
        profilePage: {
            updateEmail: "",
            updatePhone: "",
        },
    },
    lists: [
        {
            id: 1,
            title: "17.05 Party [ 15🙍 🛡️ ]", // il numero utenti non deve essere hardcoded
            desciption: "Ingredienser",
            content: [
                { text: "Øl", isChecked: false, addedBy: "Ema" },
                { text: "Vin", isChecked: false, addedBy: "Andreas" },
                { text: "Mini norsk-flagger", isChecked: false, addedBy: "Ema" },
            ],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 2,
            title: "Pizza [ 2🙍 🛡️ ]", // il numero utenti non deve essere hardcoded
            desciption: "Hvordan lage pizza",
            content: [
                { text: "Lage deig", isChecked: false, addedBy: "Andreas" },
                { text: "Putt i ofvnen", isChecked: false, addedBy: "Bjørn" },
                { text: "vent", isChecked: false, addedBy: "Ove" },
                { text: "ta ut", isChecked: false, addedBy: "Hege" },
                { text: "spis", isChecked: false, addedBy: "Ema" },
            ],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 3,
            title: "Filmer",
            desciption: "",
            content: [
                { text: "Beskrivelse av filmens innhold", isChecked: false, addedBy: "Bjørn" },
            ],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 4,
            title: "Front end [ 6🙍 🛡️ ]", // il numero utenti non deve essere hardcoded
            desciption: "Beskrivelse av arbeidsoppgaver",
            content: [
                { text: "Presentasjon", isChecked: false, addedBy: "Ove" },
                { text: "Sende epost", isChecked: false, addedBy: "Andreas" },
                { text: "Møte kl.12:15", isChecked: false, addedBy: "Rebecka" },
                { text: "Kaffe", isChecked: false, addedBy: "Ema" },
                { text: "Jobbe (valgfritt)", isChecked: false, addedBy: "Hege" },
            ],
            isFavourite: false,
            isShared: false,
        },
    ],
    users: [
        { id: "A001", userName: "Bjørn", emailAdress: "bn@gmail.com", role: "Admin", lists: 20, isActive: true, },
        { id: "A002", userName: "Rebecka", emailAdress: "ra@gmail.com", role: "Premium", lists: 15, isActive: true, },
        { id: "A003", userName: "Andreas", emailAdress: "bn@gmail.com", role: "Free", lists: 7, isActive: false, },
        { id: "A004", userName: "Emanuele", emailAdress: "ee@proton.me", role: "Premium", lists: 13, isActive: true, },
        { id: "A005", userName: "Hege", emailAdress: "he@gmail.com", role: "Free", lists: 5, isActive: false, },
        { id: "A006", userName: "Ove", emailAdress: "oe@gmail.com", role: "Premium", lists: 14, isActive: true, },
    ]
}

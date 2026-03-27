const model = {
    app: {
        currentPage: "logInPage",
        currentUser: "",
        isAdmin: true,

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
            title: "Mat",
            desciption: "Ingredienser",
            content: ["Tortellini", "Saus"],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 2,
            title: "Pizza",
            desciption: "Hvordan lage pizza",
            content: ["Lage deig", "Putt i ofvnen", "vent", "ta ut", "spis"],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 3,
            title: "Filmomtale",
            desciption: "",
            content: ["Beskrivelse av filmens innhold"],
            isFavourite: false,
            isShared: false,
        },
        {
            id: 4,
            title: "Front end",
            desciption: "Beskrivelse av arbeidsoppgaver",
            content: ["Presentasjon", "Sende epost", "Møte kl.12:15", "Kaffe", "Jobbe (valgfritt)"],
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



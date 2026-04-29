const model = {
    app: {
        currentPage: "homePage",
        currentUser: null,
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
         groups: [
        {
            id: 1,
            name: "Familie",
            listsId: [1, 2]
        },
        {
            id: 2,
            name: "Venner",
            listsId: [3, 4]
        }
    ], //endring gjort her

    pendingInvitations: [
        { id: 1, listId: 1, fromUserId: "A001", toUserId: "A002" }
    ],

    lists: [
        {
            id: 1,
            title: "17.05 Party",
            desciption: "Ingredienser",
            content: [
                { text: "Øl", isChecked: false, addedBy: "Ema" },
                { text: "Vin", isChecked: false, addedBy: "Andreas" },
                { text: "Mini norsk-flagger", isChecked: false, addedBy: "Ema" },
            ],
            isFavourite: false,
            isShared: false,
            ownerId: "A001",
            sharedWithUserIds: ["A004", "A003"],
        },
        {
            id: 2,
            title: "Pizza",
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
            ownerId: "A003",
            sharedWithUserIds: ["A002", "A003", "A004", "A005", "A006"],
        },
        {
            id: 3,
            title: "Filmer",
            desciption: "",
            content: [
                { text: "Project Hail Mary", isChecked: false, addedBy: "Bjørn" },
                { text: "Mulholland Drive", isChecked: false, addedBy: "Bjørn" },
                { text: "Avatar - The Legend of Aang", isChecked: false, addedBy: "Bjørn" },
            ],
            isFavourite: false,
            isShared: false,
            ownerId: "A001",
            sharedWithUserIds: [],
        },
        {
            id: 4,
            title: "Front end",
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
            ownerId: "A002",
            sharedWithUserIds: ["A002", "A003", "A004", "A005", "A006"],
        },
    ],
    users: [
        { id: "A001", userName: "Bjørn", emailAddress: "bn@gmail.com", password: "Admin123", role: "Admin", lists: 20, isActive: true, },
        { id: "A002", userName: "Rebecka", emailAddress: "ra@gmail.com", password: "Premium123", role: "Premium", lists: 15, isActive: true, },
        { id: "A003", userName: "Andreas", emailAddress: "an@gmail.com", password: "Free123", role: "Free", lists: 7, isActive: false, },
        { id: "A004", userName: "Emanuele", emailAddress: "ee@proton.me", password: "Premium123", role: "Premium", lists: 13, isActive: true, },
        { id: "A005", userName: "Hege", emailAddress: "he@gmail.com", password: "Free123", role: "Free", lists: 5, isActive: false, },
        { id: "A006", userName: "Ove", emailAddress: "oe@gmail.com", password: "Premium123", role: "Premium", lists: 14, isActive: true, },
    ]
}

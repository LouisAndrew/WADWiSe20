// App div element.
let app

// Screen(s) element.
let loginScreen
let mapScreen
let addNewAddress
let updateAddress

let contactList

window.onload = function () {
    app = document.getElementById('app')

    loginScreen = document.getElementById('login')
    mapScreen = document.getElementById('mapscreen')
    addNewAddress = document.getElementById('addnewaddress')
    updateAddress = document.getElementById('updatedeleteaddress')

    contactList = document.getElementById('contactlist')
    welcome()
}

// User datas:: to another file?

/**
 * Hard coded users. Both has 2 more contacts..
 */
const normalo = {}
const admina = {}

// Userbase is an object..
let userBase = {
    normalo,
    admina,
}

/**
 *
 * Schema for user object:
 *
 * title: string,
 * gender: string,
 * firstName: string,
 * lastName: string,
 * zip: numbeer,
 * city: string,
 * country: string,
 * email: string,
 * others: string,
 * isPrivate: boolean,
 */

/**
 * Hard coded users. (normalo, admina)
 */
const users = [normalo, admina]

// screens function

/**
 * Function to display when page first loads.
 * Displays login page
 */
const welcome = function () {
    // example on how to render login page on SPA.
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'none'
    updateAddress.style.display = 'none'

    loginScreen.style.display = 'block'

    // function to handle loginform
    const loginForm = document.querySelector('#login form')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // get the form input values here.
        const password = document.getElementById('password').value
        const username = document.getElementById('username').value

        // wait for return value from login function
        const loginSuccesful = login(password, username)

        if (loginSuccesful) {
            // hardcoded isAdmin to true
            main(username, true)
        } else {
            const LOGIN_FAILED_MSG = 'Username or password is wrong'
            const loginError = document.getElementById('login-error')

            loginError.textContent = LOGIN_FAILED_MSG
            loginError.style.margin = '4px 0'
        }
    })
}

/**
 * Function to show main page.
 * Also: Shows the text 'Hello, ${username}!'
 * @param {string} username string: username of the logged in user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const main = function (username, isAdmin) {
    // show map
    loginScreen.style.display = 'none'
    addNewAddress.style.display = 'none'
    updateAddress.style.display = 'none'
    mapScreen.style.display = 'block'

    document.getElementById('showminebtn').addEventListener('click', (e) => {
        myContactsScreen(username)
    })
    document.getElementById('showallbtn').addEventListener('click', (e) => {
        allContactsScreen(username, isAdmin)
    })
    document.getElementById('addnewbtn').addEventListener('click', (e) => {
        addContactScreen(username, isAdmin)
    })
    document.getElementById('logoutbtn').addEventListener('click', (e) => {
        welcome()
    })

    // Show hello message
    // show log out button
    // show contact list
    // show buttons.
    // handle when user logged in is an admin => more permissions, more rights..
}

/**
 * Shows new contact screen.
 * Additonal field for isAdmin: Admin should be able to add contact ALSO for normalo user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 * @param {string} username: identifier of user
 */
const addContactScreen = function (username, isAdmin) {
    loginScreen.style.display = 'none'
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'block'
    updateAddress.style.display = 'none'
    
    const addNewAddressForm = document.querySelector('#address-form styled')
    addNewAddressForm.addEventListener('submit', (e) => {
        if (checkNewContact()) {
            addContact()
        }else{}
    })

    addNewAddressForm.getElementById('cancelbtn').addEventListener('click', (e) => {
        welcome()
        //main(username, isAdmin)
    })
}

/**
 * Shows delete / update contact screen
 * @param {user} user: given data (from backend?)
 */
const updateContactScreen = function ({
    title,
    gender,
    firstName,
    lastName,
    zip,
    city,
    country,
    email,
    others,
    isPrivate,
}) {}

/**
 * Shows all contact screen.
 * If the logged in user is an admin: show ALL users available.
 * If the user is a "normal" user: show ALL public users.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const allContactsScreen = function (isAdmin) {}

/**
 * Shows all private contacts of this user.
 */
const myContactsScreen = function () {}

// Functionalities

/**
 * Login function.
 * Invoked when user filled the username + password field and clicked on login button.
 * @param password string: password inputted by the user.
 * @param username string: username of the user.
 * @returns true, if the login is successful
 */
const login = function (password, username) {
    // catch error when password, username is not right.
    return username === 'Louis' || username === 'Julia' // for mocking purposes
}

/**
 * Logs current user out.
 */
const logout = function () {
    // show login page.
}

/**
 * Shows "Add Contact screen"
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const addNewContact = function (isAdmin) {
    // calls addContactScreen
}

/**
 * Shows "All contacts screen."
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const showAllContacts = function (isAdmin) {}

/**
 * Shows "My contacts"
 */
const showMyContacts = function () {}

/**
 * Check contents of AddNewContactForm bevore submitting is allowed
 * @param {*} param0 
 */
const checkNewContact = function (){

}

/**
 * Add a contact into current user's contact list.
 *
 * @param {user} user: given values from input fields
 */
const addContact = function ({
    title,
    gender,
    firstName,
    lastName,
    zip,
    city,
    country,
    email,
    others,
    isPrivate,
}) {}

/**
 * Save user datas to localstorage?
 */
const saveContact = function () {}

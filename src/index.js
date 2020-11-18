// User datas:: to another file?

/**
 * Hard coded users. Both has 2 more contacts..
 */
const normalo = {}
const admina = {}

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

// App div element.
const app = document.getElementById('app')

// Screen(s) element.
const login = document.getElementById('login')
const mapScreen = document.getElementById('mapscreen')
const addNewAddress = document.getElementById('addnewaddress')
const updateAddress = document.getElementById('updatedeleteaddress')

const contactList = document.getElementById('contactlist')

/**
 * Function to display when page first loads.
 * Displays login page
 */
const welcome = () => {
    // example on how to render login page on SPA.
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'none'
    updateAddress.style.display = 'none'

    login.style.display = 'block'
}

/**
 * Function to show main page.
 * Also: Shows the text 'Hello, ${username}!'
 * @param {string} username string: username of the logged in user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const main = (username, isAdmin) => {
    // Show hello message
    // show log out button
    // show contact list
    // show map
    // show buttons.
    // handle when user logged in is an admin => more permissions, more rights..
}

/**
 * Shows new contact screen.
 * Additonal field for isAdmin: Admin should be able to add contact ALSO for normalo user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const addContactScreen = (isAdmin) => {}

/**
 * Shows delete / update contact screen
 * @param {user} user: given data (from backend?)
 */
const updateContactScreen = ({
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
}) => {}

/**
 * Shows all contact screen.
 * If the logged in user is an admin: show ALL users available.
 * If the user is a "normal" user: show ALL public users.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const allContactsScreen = (isAdmin) => {}

/**
 * Shows all private contacts of this user.
 */
const myContactsScreen = () => {}

// Functionalities

/**
 * Login function.
 * Invoked when user filled the username + password field and clicked on login button.
 * @param password string: password inputted by the user.
 * @param username string: username of the user.
 */
const login = (password, username) => {
    // catch error when password, username is not right.
}

/**
 * Logs current user out.
 */
const logout = () => {
    // show login page.
}

/**
 * Shows "Add Contact screen"
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const addNewContact = (isAdmin) => {
    // calls addContactScreen
}

/**
 * Shows "All contacts screen."
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const showAllContacts = (isAdmin) => {}

/**
 * Shows "My contacts"
 */
const showMyContacts = () => {}

/**
 * Add a contact into current user's contact list.
 *
 * @param {user} user: given values from input fields
 */
const addContact = ({
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
}) => {}

/**
 * Save user datas to localstorage?
 */
const saveContact = () => {}

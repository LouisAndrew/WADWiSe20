// import screens from './screens'
// console.log(screens)
//delete me just for git checking

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

const alice = {
    title: 'Frau',
    gender: 'W',
    firstName: 'Alice',
    lastName: 'A',
    street: 'Musterstr. 1',
    zip: 123456,
    city: 'Berlin',
    country: 'Deutschland',
    email: 'alice@in-wonderland.com',
    others: '',
    private: true,
}

const bob = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Bob',
    lastName: 'B',
    street: 'Spainstr. 2',
    zip: 456221,
    city: 'Madrid',
    country: 'Spanien',
    email: 'bob@the-builder.com',
    others: '',
    private: false,
}

const cat = {
    title: '',
    gender: 'D',
    firstName: 'Cat',
    lastName: 'C',
    street: 'Katzenstr. 2',
    zip: 123421,
    city: 'München',
    country: 'Deutschland',
    email: 'cute@cat.com',
    others: '',
    private: false,
}

const daniel = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Daniel',
    lastName: 'D',
    street: 'Time Square',
    zip: 213412,
    city: 'New York',
    email: 'daniel@wellington.de',
    country: 'USA',
    others: '',
    private: true,
}

/**
 * Hard coded users. Both has 2 more contacts..
 */
const normalo = {
    username: 'Louis',
    password: 'aaa',
    isAdmin: false,
    contacts: [alice, bob],
}
const admina = {
    username: 'Julia',
    password: 'aaa',
    isAdmin: true,
    contacts: [cat, daniel],
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
let userBase = [normalo, admina]

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
            const { isAdmin } = getUser(username)
            // get the info, if the logged in user is an admin.

            main(username, isAdmin)
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
        showMyContacts(username)
    })
    document.getElementById('showallbtn').addEventListener('click', (e) => {
        showAllContacts(username, isAdmin)
    })
    document.getElementById('addnewbtn').addEventListener('click', (e) => {
        addContactScreen(username, isAdmin)
    })

    // show log out button
    document.getElementById('logoutbtn').addEventListener('click', (e) => {
        welcome()
    })

    // show contact list
    showMyContacts(username)

    console.log('help')
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

    // Hatte hier die falsche querySelector parameter eingegeben
    const addNewAddressForm = document.querySelector('#addnewaddress form')
    addNewAddressForm.addEventListener('submit', (e) => {
        // preventDefault: prevent the page from refreshing itself.
        e.preventDefault()
        if (checkNewContact()) {
            addContact()
        } else {
        }
    })

    // hier auch
    document.getElementById('cancelbtn').addEventListener('click', (e) => {
        main(username, isAdmin)
    })
}

/**
 * Shows delete / update contact screen
 * @param {Contact} user: given data (from backend?)
 * @param {User} currUser: current loggedin user, where the data(s) updated would be updated
 */
const updateContact = function (
    {
        title,
        gender,
        firstName,
        lastName,
        zip,
        street,
        city,
        country,
        email,
        others,
        isPrivate,
    },
    currUser
) {
    loginScreen.style.display = 'none'
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'block'
    updateAddress.style.display = 'none'

    // form elements
    const titleField = document.getElementById('title')
    const genderField = document.getElementById('gender')
    const firstNameField = document.getElementById('first-name')
    const lastNameField = document.getElementById('last-name')
    const streetField = document.getElementById('street')
    const zipField = document.getElementById('zip')
    const cityField = document.getElementById('city')
    const countryField = document.getElementById('country')
    const emailField = document.getElementById('email')
    const othersField = document.getElementById('others')
    const isPrivateField = document.getElementById('private')

    // assigning values
    titleField.value = title
    genderField.value = gender
    firstNameField.value = firstName
    lastNameField.value = lastName
    streetField.value = street
    zipField.value = zip
    cityField.value = city
    countryField.value = country
    emailField.value = email
    othersField.value = others
    isPrivateField.value = isPrivate

    document.getElementById('cancelbtn').addEventListener('click', (e) => {
        main(currUser.username, currUser.isAdmin)
    })
}

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
 * @param {string} username: username of the logged in user
 */
const showAllContacts = function (username, isAdmin) {
    const currUser = getUser(username)

    // needs to be flatten.
    const contactsUnflattened = userBase.map((user) =>
        user.contacts.filter((contact) => {
            // return the contact even though its private if the contact is already in the contactbook of
            // current user
            if (isAdmin || user.username === username) {
                return contact
            }

            return !contact.private
        })
    )

    // using lodash to flatten the contact arr.
    // from [[contact1, contact2], [contact3]] -> to: [contact1, contact2, contact3]
    const contacts = _.flatten(contactsUnflattened)

    renderContacts(contacts, currUser)
}

/**
 * Shows "My contacts"
 * @param {string} username: username of the current loggedin user.
 */
const showMyContacts = function (username) {
    // filter the userbase arr. Looking for the same username!
    const currUser = getUser(username)
    if (!currUser) {
        return
    }

    const { contacts } = currUser

    renderContacts(contacts, currUser)
}

/**
 * function to render contacts provided in the
 * @param {Contact[]} contacts
 * @param {User} currUser current loggedin user
 */
const renderContacts = (contacts, currUser) => {
    const contactList = document.getElementById('contactlist')

    clearContactListChildren(contactList)

    contacts.forEach((contact) => {
        const el = document.createElement('li')
        el.setAttribute('contactValue', JSON.stringify(contact))
        el.className = 'contact'
        el.textContent = contact.firstName
        contactList.appendChild(el)

        el.addEventListener('click', () => {
            // const contactValue = e.target.getAttribute('contactValue')
            console.log(contact)
            updateContact(contact, currUser)
        })
    })
}

/**
 * Function to clear all element within the contactlist ul.
 * Used when the contactlist element needs to be updated.
 * @param {HTMLElement} el: contact list element.
 */
const clearContactListChildren = (el) => {
    // removing all inner html of contactlist
    el.innerHTML = ''
}

/**
 * Check contents of AddNewContactForm bevore submitting is allowed
 * @param {*} param0
 */
const checkNewContact = function () {}

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

/**
 * Utility function to get a user from the userbase
 * @param {string} username
 * @returns {User} when user with the provided username is available within the userbase
 * @returns {null} when user is not available
 */
const getUser = function (username) {
    const currUserArr = userBase.filter((user) => user.username === username)
    if (currUserArr.length === 0) {
        // means user is not available in the userBase
        return null
    }

    // if user is available.
    return currUserArr[0]
}

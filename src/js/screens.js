// Screen(s) element.
let loginScreen
let mapScreen
let addNewAddress
let updateAddress
let map

let contactList

/**
 * Function to display when page first loads.
 * Displays login page
 */
const welcome = function () {
    // example on how to render login page on SPA.

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

            // cleanup => remove loginScreen from view.
            loginScreen.style.display = 'none'
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
    const cleanup = () => {
        mapScreen.style.display = 'none'
    }

    // show map
    mapScreen.style.display = 'block'

    document.getElementById('showminebtn').addEventListener('click', (e) => {
        showMyContacts(username)
    })
    document.getElementById('showallbtn').addEventListener('click', (e) => {
        showAllContacts(username, isAdmin)
    })
    document.getElementById('addnewbtn').addEventListener('click', (e) => {
        cleanup()
        addContactScreen(username, isAdmin)
    })

    // show log out button
    document.getElementById('logoutbtn').addEventListener('click', (e) => {
        cleanup()
        welcome()
    })

    // show contact list
    showMyContacts(username)
}

/**
 * Shows new contact screen.
 * Additonal field for isAdmin: Admin should be able to add contact ALSO for normalo user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 * @param {string} username: identifier of user
 */
const addContactScreen = function (username, isAdmin) {
    const addBtn = document.getElementById('addbtn')
    const cancelBtn = document.getElementById('cancelbtn')
    const form = document.querySelector('#addnewaddress form')

    addNewAddress.style.display = 'block'
    cancelBtn.style.display = 'block'
    addBtn.style.display = 'block'
    addBtn.setAttribute('type', 'submit') // set the button as the submit button.

    const { getValues, cleanupForm } = formHelper()

    // Cleanup function. Setting all display to none and removing attributes
    const cleanup = () => {
        addNewAddress.style.display = 'none'
        cancelBtn.style.display = 'none'

        addBtn.style.display = 'none'
        addBtn.removeAttribute('type')
        cleanupForm()
    }

    // form elements

    const submit = (e) => {
        e.preventDefault()

        // form elements
        // changed the querySelector from 'addNewAddressForm.getElementById' to 'document.getElementById'
        const formValues = getValues()

        const { street, zip, city, country } = formValues

        // also: removed the 'Field' from variable names, as we already accessing its values and moved these block from above, bcs we have to wait for the user to
        // actually finish inputting the values and clicking the add button.

        if (checkNewContact(street, zip, city, country)) {
            addContact(formValues, getUser(username))

            cleanup()
            main(username, isAdmin)
        } else {
            cleanup()
            main(username, isAdmin)
        }
    }

    // okay this fixes the bug.
    form.onsubmit = submit // not using event listener anymore, as it produces bug which fires the submit event multiple times
    cancelBtn.onclick = () => {
        cleanup()
        main(username, isAdmin)
    }
}

/**
 * Shows delete / update contact screen
 * @param {Contact} user: given data (from backend?)
 * @param {User} currUser: current loggedin user, where the data(s) updated would be updated
 * @param {int} contactIndex: is index of the contact within the contacts attribute of the user (used to update / delete contact.)
 */
const updateContactScreen = function (
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
    currUser,
    contactIndex
) {
    const cancelBtn = document.getElementById('cancelbtn')
    const updateBtn = document.getElementById('updatebtn')
    const deleteBtn = document.getElementById('deletebtn')
    const form = document.querySelector('#addnewaddress form')

    // display all of the necessary buttons
    addNewAddress.style.display = 'block'
    cancelBtn.style.display = 'block'
    deleteBtn.style.display = 'block'

    updateBtn.style.display = 'block'
    updateBtn.setAttribute('type', 'submit') // setting the bnutton's type with submit.

    const { getFields, getValues, cleanupForm } = formHelper()

    // Cleanup function. Setting all display to none and removing attributes
    const cleanup = () => {
        addNewAddress.style.display = 'none'
        cancelBtn.style.display = 'none'
        deleteBtn.style.display = 'none'

        updateBtn.style.display = 'none'
        updateBtn.removeAttribute('type')

        // reset the values.
        cleanupForm()
    }

    const submit = (e) => {
        e.preventDefault()

        const newValues = getValues()

        cleanup()
        updateContact(newValues, currUser, contactIndex)
    }

    // form elements
    const {
        titleField,
        genderField,
        firstNameField,
        lastNameField,
        streetField,
        zipField,
        countryField,
        emailField,
        othersField,
        isPrivateField,
        cityField,
    } = getFields()

    // assigning values to its provided value.
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
    isPrivateField.value = isPrivate === 'on'

    cancelBtn.onclick = () => {
        cleanup()
        main(currUser.username, currUser.isAdmin)
    }

    deleteBtn.onclick = () => {
        cleanup()
        deleteContact(currUser, contactIndex)
    }

    form.onsubmit = submit
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

    cleanMap() // always clean the map before rerendering new markers
    clearContactListChildren(contactList)

    contacts.forEach((contact, index) => {
        const el = document.createElement('li')
        el.setAttribute('contactValue', JSON.stringify(contact))
        el.className = 'contact'
        el.textContent = contact.firstName
        contactList.appendChild(el)

        const { lon, lat, firstName, lastName } = contact

        addMarker(lon, lat, `${firstName} ${lastName}`)

        el.addEventListener('click', () => {
            // calls main cleanup.
            mapScreen.style.display = 'none'
            updateContactScreen(contact, currUser, index)
        })
    })
}

/**
 * Function to add a marker to mark the contact's position in map
 * @param {number} lon longitude of the address
 * @param {number} lat latitude of the address
 * @param {string} name name of the address' owner
 */
const addMarker = (lon, lat, name) => {
    // binding tooltip rather than popup, bcs if a popup is clicked, it always sets the marker to the far left of the map
    L.marker({ lon, lat }).bindTooltip(name).addTo(map)
}

/**
 * Function to remove all marker from the map layer
 */
const cleanMap = () => {
    map.eachLayer = (layer) => {
        layer.remove()
    }
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
 * Helper function which returns functions that can be used to simplify the code by returning the field element(s) or its values
 * @returns {getFields, getValues, cleanupForm} Utility functions to help simplify the code
 */
const formHelper = () => {
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

    /**
     * Function to return all form fields.
     * @returns form fields.
     */
    const getFields = () => ({
        titleField,
        genderField,
        firstNameField,
        lastNameField,
        streetField,
        zipField,
        countryField,
        emailField,
        othersField,
        isPrivateField,
        cityField,
    })

    /**
     * Function to return the value of all form fields
     * @returns {formValue} value of all form fields
     */
    const getValues = () => ({
        title: titleField.value,
        gender: genderField.value,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        street: streetField.value,
        zip: zipField.value,
        city: cityField.value,
        country: countryField.value,
        email: emailField.value,
        others: othersField.value,
        isPrivate: isPrivateField.value === 'on',
    })

    /**
     * Function to reset the value(s) of the form
     */
    const cleanupForm = () => {
        // setting the non-required to null and required to its base value
        titleField.value = null
        genderField.value = 'M'
        firstNameField.value = ''
        lastNameField.value = ''
        streetField.value = ''
        zipField.value = ''
        cityField.value = ''
        countryField.value = ''
        emailField.value = null
        othersField.value = null
        isPrivateField.value = 'on'

        // error msg always called: An invalid form control with name='' is not focusable.
        // Answer: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable
        // Non-critical issue, but how to hide / disable err msg?
    }

    return { getFields, getValues, cleanupForm }
}
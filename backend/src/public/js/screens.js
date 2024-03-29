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
    loginForm.addEventListener('submit', async (e) => {
        const loginError = document.getElementById('login-error')

        e.preventDefault()

        // get the form input values here.
        const password = document.getElementById('password').value
        const username = document.getElementById('username').value

        // wait for return value from login function
        // const loginSuccesful = login(password, username)

        const loginSuccesful = await loginDb(password, username) // calls the endpoint /adviz/login

        if (await loginSuccesful) {
            const { isAdmin } = loginSuccesful

            // cleanup on err msg
            loginError.textContent = ''
            loginError.style.margin = '0'
            // get the info, if the logged in user is an admin.

            // cleanup => remove loginScreen from view.
            loginScreen.style.display = 'none'
            main(username, isAdmin)
        } else {
            const LOGIN_FAILED_MSG = 'Username or password is wrong'

            loginError.textContent = LOGIN_FAILED_MSG
            loginError.style.margin = '4px 0'
        }
    })
}

/**
 * Function to show error msg.
 * @param {string} username: username of the current loggedin user.
 * @param {Boolean} isAdmin: If current user is an admin
 */
const showErrMsg = (username, isAdmin) => {
    // const err = document.getElementById('error')
    showModal()
    const button = document.querySelector('#error button')

    button.onclick = () => {
        document.getElementById('modal').style.display = 'none'
        main(username, isAdmin)
    }
}

/**
 * Show overlay to contain the error msg
 */
const showModal = () => {
    document.getElementById('modal').style.display = 'flex'
}

/**
 * Function to show main page.
 * Also: Shows the text 'Hello, ${username}!'
 * @param {string} username string: username of the logged in user.
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 */
const main = function (username, isAdmin) {
    const greeting = document.getElementById('username-greeting')

    const cleanup = () => {
        mapScreen.style.display = 'none'
        greeting.textContent = ''
    }

    // show map
    mapScreen.style.display = 'block'
    greeting.textContent = username

    // not attaching event-listener anymore, as it causes lags when the app is being used for a long time (attaching event listener everytime main got called.)
    const showMineBtn = document.getElementById('showminebtn')
    const showAllBtn = document.getElementById('showallbtn')
    const addNewBtn = document.getElementById('addnewbtn')
    const logoutBtn = document.getElementById('logoutbtn')

    showMineBtn.onclick = () => {
        showMyContacts(username, isAdmin)
    }

    showAllBtn.onclick = () => {
        showAllContacts(username, isAdmin)
    }

    addNewBtn.onclick = () => {
        cleanup()
        addContactScreen(username, isAdmin)
    }

    logoutBtn.onclick = () => {
        cleanup()
        welcome()
    }

    // show contact list
    showMyContacts(username, isAdmin)
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
    const addAddressError = document.getElementById('addaddress-error')

    addNewAddress.style.display = 'block'
    cancelBtn.style.display = 'block'
    addBtn.style.display = 'block'
    addBtn.setAttribute('type', 'submit') // set the button as the submit button.

    // changing to const, as const is block scoped and var is global scoped
    const userOptionExists = document.getElementById('user-select')

    const { getValues, cleanupForm } = formHelper()

    if (isAdmin) {
        renderUserOption()
    } else {
        if (userOptionExists != null) {
            //checks if userOption has been created
            userOptionExists.parentNode.textContent = '' // remove the label before removing the select option
            userOptionExists.parentNode.removeChild(userOptionExists) //and removes it :)
        }
    }

    // Cleanup function. Setting all display to none and removing attributes
    const cleanup = () => {
        addNewAddress.style.display = 'none'
        cancelBtn.style.display = 'none'

        addBtn.style.display = 'none'
        addBtn.removeAttribute('type')

        addAddressError.innerHTML = ''

        cleanupForm()
    }

    // form elements

    const submit = (e) => {
        e.preventDefault()

        // form elements
        // changed the querySelector from 'addNewAddressForm.getElementById' to 'document.getElementById'
        const formValues = getValues()

        let toBeAdded

        if (isAdmin) {
            const userSelectValue = document.getElementById('user-select').value
            toBeAdded = getUser(userSelectValue)
        } else {
            toBeAdded = getUser(username)
        }

        const { street, zip, city, country } = formValues

        // also: removed the 'Field' from variable names, as we already accessing its values and moved these block from above, bcs we have to wait for the user to
        // actually finish inputting the values and clicking the add button.

        const onSuccess = (lat, lon) => {
            addContactDB(
                { ...formValues, lat, lon },
                toBeAdded,
                (errMsg) => {
                    console.log('Error got called')
                    // callback failure function -> if interaction with backend is not successful.
                    addAddressError.textContent = errMsg
                    addAddressError.style.display = 'block'
                    addAddressError.style.margin = '4px 0'
                },
                () => {
                    // callback success
                    cleanup()
                    main(username, isAdmin)
                }
            )
        }

        const onFailure = () => {
            const ADDRESSCHECK_FAILED_MSG =
                'Sorry, I couldnt find this address.' //if i just make this a simple else, this part is still executed

            addAddressError.textContent = ADDRESSCHECK_FAILED_MSG
            addAddressError.style.display = 'block'
            addAddressError.style.margin = '4px 0'
        }

        checkNewContact(street, zip, city, country, onSuccess, onFailure)
    }

    // okay this fixes the bug.
    form.onsubmit = submit // not using event listener anymore, as it produces bug which fires the submit event multiple times
    cancelBtn.onclick = () => {
        cleanup()
        main(username, isAdmin)
    }
}

/**
 * Function to render useroption when adding user on admin log in.
 */
const renderUserOption = () => {
    const userSelect = document.createElement('select') // creating select element
    userSelect.id = 'user-select' // assigning id to the select element
    userSelect.required = true

    const label = document.getElementById('user-select-label')
    label.textContent = 'Create user for'
    label.appendChild(userSelect)

    userBase.forEach((user) => {
        const option = document.createElement('option')
        option.value = user.username
        option.textContent = user.username

        userSelect.appendChild(option)
    })
}

/**
 * Shows delete / update contact screen
 * @param {Contact} user: given data (from backend?)
 * @param {User} user: current loggedin user, where the data(s) updated would be updated
 * @param {int} contactIndex: is index of the contact within the contacts attribute of the user (used to update / delete contact.)
 * @param {String} username of the user
 * @param {Boolean} isAdmin true, if the user is an amdin
 */
const updateContactScreen = function (
    {
        _id,
        titel,
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
    user,
    username,
    isAdmin
) {
    const cancelBtn = document.getElementById('cancelbtn')
    const updateBtn = document.getElementById('updatebtn')
    const deleteBtn = document.getElementById('deletebtn')
    const form = document.querySelector('#addnewaddress form')
    const addAddressError = document.getElementById('addaddress-error')

    const canUpdate = isAdmin || user.username === username // can update if to-be updated is your own contact or current logged in is an admin

    // display all of the necessary buttons
    addNewAddress.style.display = 'block'
    cancelBtn.style.display = 'block'
    deleteBtn.style.display = canUpdate ? 'block' : 'none'

    updateBtn.style.display = canUpdate ? 'block' : 'none'
    // setting the bnutton's type with submit.

    if (canUpdate) {
        updateBtn.setAttribute('type', 'submit')
    }

    const userOptionExists = document.getElementById('user-select')
    if (userOptionExists && userOptionExists.parentNode) {
        userOptionExists.parentNode.textContent = '' // remove the label before removing the select option
        userOptionExists.parentNode?.removeChild(userOptionExists) //and removes it :)
    }

    const { getFields, getValues, cleanupForm } = formHelper()

    // Cleanup function. Setting all display to none and removing attributes
    const cleanup = () => {
        addNewAddress.style.display = 'none'
        cancelBtn.style.display = 'none'
        deleteBtn.style.display = 'none'

        updateBtn.style.display = 'none'
        updateBtn.removeAttribute('type')

        addAddressError.innerHTML = ''

        // reset the values.
        cleanupForm()
    }

    const error = (errMsg) => {
        console.log('Error')
        // callback failure function -> if interaction with backend is not successful.
        addAddressError.textContent = errMsg
        addAddressError.style.display = 'block'
        addAddressError.style.margin = '4px 0'
    }

    const submit = (e) => {
        e.preventDefault()

        const newValues = getValues()
        const { street, zip, city, country } = newValues // what causes the bug is that the lat, lon is not calculated when updating

        const onSuccess = (lat, lon) => {
            updateContactDb({ ...newValues, lat, lon }, _id, error, () => {
                cleanup()
                main(username, isAdmin)
            })
        }

        const onFailure = () => {
            const ADDRESSCHECK_FAILED_MSG =
                'Sorry, I couldnt find this address.' //if i just make this a simple else, this part is still executed
            error(ADDRESSCHECK_FAILED_MSG)
        }

        checkNewContact(street, zip, city, country, onSuccess, onFailure)
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
    titleField.value = titel
    genderField.value = gender
    firstNameField.value = firstName
    lastNameField.value = lastName
    streetField.value = street
    zipField.value = zip
    cityField.value = city
    countryField.value = country
    emailField.value = email
    othersField.value = others
    isPrivateField.checked = isPrivate

    cancelBtn.onclick = () => {
        cleanup()
        main(username, isAdmin)
    }

    deleteBtn.onclick = () => {
        // deleteContact(user, contactIndex, currUser)
        try {
            deleteContactDb(_id, error, () => {
                cleanup()
                main(username, isAdmin)
            })
        } catch (e) {
            console.error(e)
            error('Oops, something went wrong')
        }
    }

    form.onsubmit = canUpdate
        ? submit
        : () => {
              error('Error updating, you cannot update this contact')
          } // set to empty function if user is prohibitted to update
}

/**
 * Shows "All contacts screen."
 * @param {boolean} isAdmin: identifier to identify if the logged-in user is an admin.
 * @param {string} username: username of the logged in user
 */
const showAllContacts = async function (username, isAdmin) {
    // const currUser = getUser(username)
    const rsp = await getAllContacts(username)
    if (await rsp) {
        const { contacts: contactsRsp } = await rsp
        const contacts = contactsRsp.map((c) => ({
            ...c.value,
            ...c,
        }))
        await renderContacts(contacts, { username, isAdmin })
    } else {
        // handle error here!
        showErrMsg(username, isAdmin)
    }
}

/**
 * Shows "My contacts"
 * @param {string} username: username of the current loggedin user.
 * @param {Boolean} isAdmin: If current user is an admin
 */
const showMyContacts = async function (username, isAdmin) {
    // filter the userbase arr. Looking for the same username!

    const rsp = await getContacts(username) // wait for data from getContacts function (in index.js)

    if (await rsp) {
        const { contacts } = await rsp
        await renderContacts(
            contacts.map((ct) => ({ ...ct, contactOf: username })),
            { username, isAdmin }
        )
    } else {
        // handle error here!
        showErrMsg(username, isAdmin)
    }
}

/**
 * function to render contacts provided in the
 * @param {Contact[]} contacts
 * @param {User} currUser current loggedin user
 */
const renderContacts = (contacts, currUser) => {
    const contactList = document.getElementById('contactlist')

    cleanMap(contacts) // always clean the map before rerendering new markers
    clearContactListChildren(contactList)

    console.log(currUser)

    contacts.forEach((contact) => {
        const el = document.createElement('li')
        el.setAttribute('contactValue', JSON.stringify(contact))
        el.className = 'contact'
        el.textContent = contact.firstName
        contactList.appendChild(el)

        const { lon, lat, firstName, lastName } = contact
        const { username, isAdmin } = currUser

        addMarker(lon, lat, `${firstName} ${lastName}`)

        el.addEventListener('click', () => {
            // calls main cleanup.
            mapScreen.style.display = 'none'
            updateContactScreen(
                contact,
                getUser(contact.contactOf),
                username,
                isAdmin
            )
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
    // how to get the marker type of a layer?
    map.eachLayer((layer) => {
        // map layer has an attribute, named _url
        if (!layer._url) {
            layer.remove()
        }
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
        titel: titleField.value,
        gender: genderField.value,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        street: streetField.value,
        zip: zipField.value,
        city: cityField.value,
        country: countryField.value,
        email: emailField.value,
        others: othersField.value,
        isPrivate: isPrivateField.checked,
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
        isPrivateField.checked = true

        // error msg always called: An invalid form control with name='' is not focusable.
        // Answer: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable
        // Non-critical issue, but how to hide / disable err msg?
    }

    return { getFields, getValues, cleanupForm }
}

// module.exports.welcome = welcome

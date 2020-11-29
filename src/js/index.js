// App div element.
let app

window.onload = function () {
    app = document.getElementById('app')

    loginScreen = document.getElementById('login')
    mapScreen = document.getElementById('mapscreen')
    addNewAddress = document.getElementById('addnewaddress')
    updateAddress = document.getElementById('updatedeleteaddress')

    contactList = document.getElementById('contactlist')

    // set all screen's display to none.
    loginScreen.style.display = 'none'
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'none'
    updateAddress.style.display = 'none'

    welcome()
}

/**
 * Add a contact into current user's contact list.
 *
 * @param {Contact} contact: given values from input fields
 * @param {User} user: Current logged in user. OR user, whom the contact should be added to (Added by admin)
 */
const addContact = function (contact, user) {
    // contact should be added to the user provided.
    const contacts = [...user.contacts, contact] // equivalent to: array.push()
    _.set(user, 'contacts', contacts) // this is a function from lodash. docs: https://lodash.com/docs/4.17.15#set. Used bcs tbh i don't know how to rlly mutate the user object well.

    main(user.username, user.isAdmin)
}

/**
 * Function to actually update a contact from a user. Called when user clicks on the update button
 * @param {Contact} user: given data (from backend?)
 * @param {User} user: current loggedin user, where the data(s) updated would be updated
 * @param {int} contactIndex: is index of the contact within the contacts attribute of the user (used to update / delete contact.)
 */
const updateContact = function (contact, user, contactIndex) {
    // const contactsOriginal = [...user.contacts] // original contacts attribute of the user
    // _.pullAt(contactsOriginal, contactIndex) // is another lodash function, to pull an element from an array at the given index.

    // console.log(contactsOriginal)

    // const contactsUpdated = [...contactsOriginal, contact]

    // updating user's contactlist on the given index with the new contact object
    const contactsUpdated = user.contacts.map((ct, index) => {
        if (index === contactIndex) {
            return contact
        } else {
            return ct
        }
    })

    const content = 'in update contact'
    console.log({ content, contactsUpdated })

    _.set(user, 'contacts', contactsUpdated)

    main(user.username, user.isAdmin)
}

/**
 * Function to delete a contact from a user contacts
 * @param {User} user user, from whom the contact is to be deleted
 * @param {int} contactIndex index of the to-be-deleted contact
 */
const deleteContact = (user, contactIndex) => {
    const contactsUpdated = [...user.contacts] // original contacts attribute of the user
    _.pullAt(contactsUpdated, contactIndex) // is another lodash function, to pull an element from an array at the given index.

    // same as above

    console.log(contactsUpdated)

    _.set(user, 'contacts', contactsUpdated)

    main(user.username, user.isAdmin)
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
    return username === 'Louis' || username === 'Julia' // TODO: add userbase query here
}

/**
 * Logs current user out.
 */
const logout = function () {
    // show login page.
}

/**
 * Mockup for debugging
 * @param {*} street
 * @param {*} zip
 * @param {*} city
 * @param {*} country
 */
const checkNewContact = function (street, zip, city, country) {
    console.log('checkNewContact() was called')
    return true
}

/**
 * Check contents of Addressfields in AddNewContactForm bevore submitting is allowed
 * @param street: contents of streetfield
 * @param zip: contents of zipfield
 * @param city: contents of cityfield
 * @param country: contents of countryfield
 */
const realcheckNewContact = function (street, zip, city, country) {
    const Http = new XMLHttpRequest()
    // URl for nominatim search API https://nominatim.org/release-docs/develop/api/Search/
    const url = 'https://nominatim.openstreetmap.org/search?'
    // we're going for a structured search here. free-form query would also be an option, but I assume more prone to error?
    //let freeformquery = "q="+country+"/"+city+"/"+zip+"/"+street;
    let queryParameter =
        'street=' +
        street +
        '&city=' +
        city +
        '&country=' +
        country +
        '&postalcode=' +
        zip
    //I cose this format because it's shortest and quickly returns the coordinates of lat and long, which we could use for updating markers on the map
    const format = '&geocodejson'

    //
    var responseObjekt

    Http.open('GET', url + queryParameter + format)
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.responseText)
            responseObject = this.responseXML
            return true
        } else {
            return false
        }
    }
}

/**
 * Save user datas to localstorage?
 */
const saveContact = function () {}

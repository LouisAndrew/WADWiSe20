// App div element.
let app

window.onload = function () {
    app = document.getElementById('app')

    loginScreen = document.getElementById('login')
    mapScreen = document.getElementById('mapscreen')
    addNewAddress = document.getElementById('addnewaddress')

    contactList = document.getElementById('contactlist')

    // set all screen's display to none.
    loginScreen.style.display = 'none'
    mapScreen.style.display = 'none'
    addNewAddress.style.display = 'none'
    // map should be generated in index.html file

    welcome()
    // main(admina.username, true) // debugging map
}

/**
 * Add a contact into current user's contact list.
 *
 * @param {Contact} contact: given values from input fields
 * @param {User} user: Current logged in user. OR user, whom the contact should be added to (Added by admin)
 * @param {User} currUser current loggedin user.
 */
const addContact = function (contact, user, currUser) {
    // contact should be added to the user provided.
    const contacts = [...user.contacts, contact] // equivalent to: array.push()
    _.set(user, 'contacts', contacts) // this is a function from lodash. docs: https://lodash.com/docs/4.17.15#set. Used bcs tbh i don't know how to rlly mutate the user object well.

    main(currUser.username, currUser.isAdmin)
}

/**
 * Function to actually update a contact from a user. Called when user clicks on the update button
 * @param {Contact} user: given data (from backend?)
 * @param {User} user: current loggedin user, where the data(s) updated would be updated
 * @param {int} contactIndex: is index of the contact within the contacts attribute of the user (used to update / delete contact.)
 * @param {User} currUser current loggedin user.
 */
const updateContact = function (contact, user, contactIndex, currUser) {
    // updating user's contactlist on the given index with the new contact object
    const contactsUpdated = user.contacts.map((ct, index) => {
        if (index === contactIndex) {
            return contact
        } else {
            return ct
        }
    })

    _.set(user, 'contacts', contactsUpdated)

    main(currUser.username, currUser.isAdmin)
}

/**
 * Function to delete a contact from a user contacts
 * @param {User} user user, from whom the contact is to be deleted
 * @param {int} contactIndex index of the to-be-deleted contact
 * @param {User} currUser current loggedin user.
 */
const deleteContact = (user, contactIndex, currUser) => {
    const contactsUpdated = [...user.contacts] // original contacts attribute of the user
    _.pullAt(contactsUpdated, contactIndex) // is another lodash function, to pull an element from an array at the given index.

    // same as above

    _.set(user, 'contacts', contactsUpdated)

    main(currUser.username, currUser.isAdmin)
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
 * Check contents of Addressfields in AddNewContactForm bevore submitting is allowed
 * @param street: contents of streetfield
 * @param zip: contents of zipfield
 * @param city: contents of cityfield
 * @param country: contents of countryfield
 */
const checkNewContact = function (
    street,
    zip,
    city,
    country,
    onSuccess,
    onFailure
) {
    var resultobj = {
        successful: false,
        lat: 0.0,
        lon: 0.0,
    }

    const Http = new XMLHttpRequest()
    // URl for nominatim search API https://nominatim.org/release-docs/develop/api/Search/
    const url = 'https://nominatim.geocoding.ai/search?' //switched to a thirdparty services
    // we're going for a structured search here. free-form query would also be an option.
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
    const format = '&geocodejson'

    Http.open('GET', url + queryParameter + format)
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const geojson = Http.responseText
            const geoobj = JSON.parse(geojson)
            if (Object.keys(geoobj).length == 0) {
                //responseobj is empty if there is no address matching your query in osm database
                onFailure()
            } else {
                resultobj.successful = true
                resultobj.lat = geoobj[0].lat
                resultobj.lon = geoobj[0].lon
                onSuccess(resultobj.lat, resultobj.lon)
            }
        } else if (this.readyState == 4 && this.status != 200) {
            console.log('nope.received this status:' + Http.statusText) //why is this always an empty string??
        }
    }
    return resultobj
}

/**
 * Save user datas to localstorage?
 */
const saveContact = function () {}

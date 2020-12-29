const Contact = require('../models/contact') // import model of the contact.

/**
 * Create new contact in the database.
 *
 * 👇 Static typing the parameter. Java-like intellisense. Find the model in: models/contact.js
 * @param {{
 *  titel: String,
 *  gender: String,
 *  firstName: String,
 *  lastName: String,
 *  street: String,
 *  zip: String,
 *  city: String,
 *  country: String,
 *  email: String,
 *  others: String,
 *  isPrivate: Boolean,
 *  lat: String,
 *  lon: String
 * }} data user data
 *
 * @returns {Promise<(Number | null)>} id of the new contact.
 * ! ⚠ Async await always returns a promise. if this becomes confusing just tell me. I would then refractor this function.
 */
const createContact = async (data) => {
    try {
        const doc = await Contact.create(data)
        return await doc._id
    } catch (e) {
        console.error(e) // logging error for debug purposes.
        return null
    }
}

module.exports = createContact

const { Contact, User } = require('../models') // import models of the contact and user.

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
 *  userId: String
 * }} data user data + userID to be updated
 *
 * @returns {Promise<(Number | null)>} id of the new contact.
 * ! ⚠ Async await always returns a promise. if this becomes confusing just tell me. I would then refractor this function.
 */
const createContact = async (data) => {
    const { userId, ...userData } = data

    try {
        const contactDoc = await Contact.create(userData)
        const contactId = await contactDoc._id // id of the new contact.

        // update user's contact list. with given userId
        await User.findByIdAndUpdate(userId, { $push: { contacts: contactId } }) // if the id is not found: CastError.
        return await contactId
    } catch (e) {
        console.error(e) // logging error for debug purposes.
        return null
    }
}

module.exports = createContact

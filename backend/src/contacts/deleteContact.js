const { User, Contact } = require('../models') // importing user + contact models

/**
 * Delete a contact from the given user contact list and also remove the contact data from the DB
 * @param {String} username username
 * @param {Contact} contact contact
 * @returns {Promise<Boolean>} returns true, if the operation is succersful
 */
const deleteContact = async (username, contact) => {
    try {
        const contactDoc = await Contact.findOne(contact) // get contact from the DB
        const userDoc = await User.findOne({ userName: username }) // get user with the given username

        const { contacts } = await userDoc
        const contactId = await contactDoc._id // id of the contact document

        // check if the contact is within this user's contact list.
        if (await contacts.includes(contactId)) {
            await contactDoc.delete() // delete the contact from the database
            const contactList = await contacts.filter((id) => id !== contactId) // deleteing the contact from contactlist
            await userDoc.update({ contacts: contactList })

            return true
        } else {
            return false
        }
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = deleteContact

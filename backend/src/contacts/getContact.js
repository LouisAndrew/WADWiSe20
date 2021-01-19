const { Types } = require('mongoose')
const { User, Contact } = require('../models')

/**
 * Get contacts of the user with the given user ID.
 *
 * ? what about getAllContacts?
 * @param {String} userId Id of the user. ⚠ What mentioned here is actually username, and not _id from the mongodb document.
 * @returns {([Contact] | null)} either an array of contacts or null if the query fails.
 */
const getContact = async (userId) => {
    try {
        const { contacts } = await User.findOne({ userName: userId })
        // const { contacts } = await userDoc

        // query all documents from given contacts attribute.
        const contactDocs = await Contact.find({
            _id: { $in: contacts.map((id) => Types.ObjectId(id)) }, // mapping every element of contacts to an object ID.
        }) // finding all document with id in contacts variable

        return await contactDocs
    } catch (e) {
        // console.error(e)
        return null
    }
}

/**
 * Helper method to find if the contact is in the contact list of the user.
 * @param {String} contactId
 * @param {[String]} contactList
 */
const isMyContact = (contactId, contactList) => contactList.includes(contactId)

/**
 * Get all contacts from the database, that should be visible for this user.
 * @param {String} userId username of the user
 * @returns {([Contact] | null)}
 */
const getAllContacts = async (userId) => {
    const isAdmin = userId === 'admina' // boolean if the user is an admin.

    try {
        const allContacts = await Contact.find() // find all contacts
        const userDoc = await User.findOne({ userName: userId }) // find the requesting user.

        // returns all contacts if user is an admin
        if (isAdmin) {
            console.log(await 'Returning all contacts')
            return await allContacts
        }

        const { contacts: contactList } = await userDoc // contact list of the requesting user
        return await allContacts.filter(
            (contact) =>
                isMyContact(contact._id, contactList) || !contact.isPrivate
        )
    } catch (e) {
        return null
    }
}

module.exports = getContact
module.exports.getAllContacts = getAllContacts

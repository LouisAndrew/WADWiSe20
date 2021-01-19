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
 * Assigning contactOF Attribute for each Contacts
 * Function is being runned under the assumption: 1 contact could no exist within 2 different users
 * @param {String} contactId
 * @param {[{ contacts: [String] }]} allUsers
 */
const assignContactOf = (contactId, allUsers) => {
    const contactOf = allUsers.filter((user) =>
        user.contacts.includes(contactId)
    )

    return contactOf[0].userName ?? 'admina' // either return the contact owner or admina, if the contact has no owner
}

const finishUpGetAllContacts = async (contacts) => {
    try {
        const allUsers = await User.find({})
        console.log(contacts.map((c) => ({ ...c, foo: 'bar' })))
        return await contacts.map((contact) => ({
            ...contact,
            contactOf: assignContactOf(contact._id, allUsers),
        }))
    } catch (e) {
        console.error(e)
        return null
    }
}

/**
 * Get all contacts from the database, that should be visible for this user.
 * Contacts returned should have additional attribute = contactOf.
 * @param {String} userId username of the user
 * @returns {([Contact] | null)}
 */
const getAllContacts = async (userId) => {
    const isAdmin = userId === 'admina' // boolean if the user is an admin.

    try {
        const allContacts = await Contact.find({}) // find all contacts
        const userDoc = await User.findOne({ userName: userId }) // find the requesting user.
        const allUsers = await User.find({})
        // returns all contacts if user is an admin
        if (isAdmin) {
            console.log(await 'Returning all contacts')
            return await allContacts.map((value) => ({
                value,
                contactOf: assignContactOf(value._id, allUsers),
            }))
        }

        const { contacts: contactList } = await userDoc // contact list of the requesting usera
        return await allContacts
            .filter(
                (contact) =>
                    isMyContact(contact._id, contactList) || !contact.isPrivate
            )
            .map((value) => ({
                value,
                contactOf: assignContactOf(value._id, allUsers),
            }))
    } catch (e) {
        return null
    }
}

module.exports = getContact
module.exports.getAllContacts = getAllContacts

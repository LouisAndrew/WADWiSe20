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

module.exports = getContact

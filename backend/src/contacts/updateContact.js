const { Contact } = require('../models')

// /**
//  * Update existing contact from the given User to the new (updated) Attributes
//  * @param {Number} userId
//  * @param {User} oldContact
//  * @param {User} newContact
//  * @returns {Promise<Boolean>} true, if the update is successful
//  */
// const updateContact = async (userId, oldContact, newContact) => {
//     try {
//         const contactDoc = await Contact.findOne(oldContact)
//         const userDoc = await User.findOne({ userName: userId })

//         // admina could always update a contact..
//         const isContactOfUser =
//             userId === 'admina'
//                 ? true
//                 : await userDoc.contacts.includes(contactDoc._id)

//         if (await isContactOfUser) {
//             await contactDoc.update(newContact)
//             return true
//         } else {
//             return false
//         }
//     } catch (e) {
//         console.error(e)
//         return false
//     }
// }

/**
 * Update existing contact from the given User to the new (updated) Attributes
 * @param {Number} contactId: Id of the updated contanct
 * @param {Contact} contact new fields for the contact
 * @returns {Promise<Boolean>} true, if the update is successful
 */
const updateContact = async (contact, contactId) => {
    try {
        const doc = await Contact.findById({ _id: contactId })

        await doc.update(contact)
        return await true
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = updateContact

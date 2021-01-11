// store functions used in login route
const { User } = require('../models')

/**
 * Always return the admina user.
 * @returns {(User | null)} returns null if no user is found and the User document if it is found.
 */
const debug = async () => {
    try {
        const doc = await User.findOne({ userName: 'admina' })

        return await doc
    } catch (e) {
        console.error(e)
        return null
    }
}

/**
 * Login functionality, checking if the user with username and password exists within the database
 * @param {String} username
 * @param {String} password
 */
const login = (username, password) => {}

module.exports = login
module.exports.debug = debug

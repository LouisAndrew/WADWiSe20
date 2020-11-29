// User datas:: to another file?

const alice = {
    title: 'Frau',
    gender: 'W',
    firstName: 'Alice',
    lastName: 'A',
    street: 'Musterstr. 1',
    zip: 123456,
    city: 'Berlin',
    country: 'Deutschland',
    email: 'alice@in-wonderland.com',
    others: '',
    private: true,
}

const bob = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Bob',
    lastName: 'B',
    street: 'Spainstr. 2',
    zip: 456221,
    city: 'Madrid',
    country: 'Spanien',
    email: 'bob@the-builder.com',
    others: '',
    private: false,
}

const cat = {
    title: '',
    gender: 'D',
    firstName: 'Cat',
    lastName: 'C',
    street: 'Katzenstr. 2',
    zip: 123421,
    city: 'München',
    country: 'Deutschland',
    email: 'cute@cat.com',
    others: '',
    private: false,
}

const daniel = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Daniel',
    lastName: 'D',
    street: 'Time Square',
    zip: 213412,
    city: 'New York',
    email: 'daniel@wellington.de',
    country: 'USA',
    others: '',
    private: true,
}

/**
 * Hard coded users. Both has 2 more contacts..
 */
var normalo = {
    username: 'Louis',
    password: 'aaa',
    isAdmin: false,
    contacts: [alice, bob],
}
var admina = {
    username: 'Julia',
    password: 'aaa',
    isAdmin: true,
    contacts: [cat, daniel],
}

/**
 *
 * Schema for user object:
 *
 * title: string,
 * gender: string,
 * firstName: string,
 * lastName: string,
 * zip: numbeer,
 * city: string,
 * country: string,
 * email: string,
 * others: string,
 * isPrivate: boolean,
 */

/**
 * Hard coded users. (normalo, admina)
 */
const userBase = [normalo, admina]

/**
 * Utility function to get a user from the userbase
 * @param {string} username
 * @returns {User} when user with the provided username is available within the userbase
 * @returns {null} when user is not available
 */
const getUser = function (username) {
    const currUserArr = userBase.filter((user) => user.username === username)
    if (currUserArr.length === 0) {
        // means user is not available in the userBase
        return null
    }

    // if user is available.
    return currUserArr[0]
}

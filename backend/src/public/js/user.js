// User datas:: to another file?

const alice = {
    title: 'Frau',
    gender: 'W',
    firstName: 'Alice',
    lastName: 'Allison',
    street: 'Leipziger Straße 75',
    zip: 10117,
    city: 'Berlin',
    country: 'Deutschland',
    email: 'alice@in-wonderland.com',
    others: '',
    isPrivate: true,
    lat: 52.5094305,
    lon: 13.3862223,
}

const bob = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Bob',
    lastName: 'Bobbinsky',
    street: 'Martin-Luther-Straße 21',
    zip: 10777,
    city: 'Berlin',
    country: 'Deutschland',
    email: 'bob@the-builder.com',
    others: '',
    isPrivate: false,
    lat: 52.497479,
    lon: 13.346461,
}

const cat = {
    title: '',
    gender: 'D',
    firstName: 'Cat',
    lastName: 'Cat',
    street: 'Katzenstr. 2A',
    zip: 21335,
    city: 'Lüneburg',
    country: 'Deutschland',
    email: 'cute@cat.com',
    others: '',
    isPrivate: false,
    lat: 53.2489851,
    lon: 10.4061901,
}
const kim = {
    title: '',
    gender: 'D',
    firstName: 'Kim',
    lastName: 'Meyer',
    street: 'Metzer Straße 20',
    zip: 10405,
    city: 'Berlin',
    country: 'Deutschland',
    email: 'businesskim@office.net',
    others: '',
    isPrivate: false,
    lat: 52.5327813604134,
    lon: 13.414483666419983,
}

const daniel = {
    title: 'Herr',
    gender: 'M',
    firstName: 'Daniel',
    lastName: 'Duff',
    street: 'Time Square',
    zip: 213412,
    city: 'New York',
    email: 'daniel@wellington.de',
    country: 'USA',
    others: '',
    isPrivate: true,
    lat: 40.7581738,
    lon: -73.9856834,
}

/**
 * Hard coded users. Both has 2 more contacts..
 */
var normalo = {
    username: 'normalo',
    password: 'a',
    isAdmin: false,
    contacts: [alice, bob],
}
var admina = {
    username: 'admina',
    password: 'a',
    isAdmin: true,
    contacts: [kim, cat, daniel],
}

/**
 * Hard coded users. (normalo, admina)
 */
let userBase = [normalo, admina]

let currUser

const debug = () => {}

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

const { Schema, model } = require('mongoose') // If we decided to use mongoose, we must model our schema

const contactSchema = new Schema({
    titel: String,
    gender: String,
    firstName: String,
    lastName: String,
    street: String,
    zip: Number,
    city: String,
    country: String,
    email: String,
    others: String,
    isPrivate: Boolean,
    lat: Number,
    lon: Number,
})

// First param is the model name.
const Contact = model('Contact', contactSchema)
/**
 * https://mongoosejs.com/docs/models.html
 * The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.
 * Thus, for the example above, the model 'Contact' is for the 'contacts' collection in the database.
 */

module.exports = Contact

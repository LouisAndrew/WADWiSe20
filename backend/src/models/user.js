const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    userName: String,
    passWord: String,
    contacts: [Schema.Types.ObjectId], // array of Object IDs..
})

const User = model('User', userSchema)

module.exports = User

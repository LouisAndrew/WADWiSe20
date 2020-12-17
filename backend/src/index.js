// entry file.
const express = require('express')
const mongoose = require('mongoose')

// setup express server here
const app = express()
const port = 8000

// connect to mongoDB here
const username = `Admina`
const password = `a`
const uri = `mongodb+srv://${username}:${password}@cluster0.5ot88.mongodb.net/AdVizData?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

// error handling when connection to db is not successful
db.on('error', console.error.bind(console, 'Connection error:'))

// listen to server after connected to mongoDB!
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})

const loginRouter = require('./login')
const contactsRouter = require('./contacts')

// setup express routes here.
app.use('/adviz/login', loginRouter)
app.use('/adviz/contacts', contactsRouter)

// resources: https://expressjs.com/en/guide/routing.html

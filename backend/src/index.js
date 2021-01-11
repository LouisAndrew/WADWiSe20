// entry file.
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// setup express server here
const app = express()
const port = 8000

app.use(express.json()) // accepting JSON body
app.use(cors())

// connect to mongoDB here
const username = `Admina`
const password = `a`
const uri = `mongodb+srv://${username}:${password}@cluster0.5ot88.mongodb.net/AdVizData?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // deprecation warning
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

// adding access to public folder
app.use(express.static(path.join(__dirname, 'public'))) // giving public/index.html access to all of its js and csses

// setup express routes here.
app.use('/adviz/login', loginRouter)
app.use('/adviz/contacts', contactsRouter)

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public')) // sending index.html to the client.
})

// resources: https://expressjs.com/en/guide/routing.html

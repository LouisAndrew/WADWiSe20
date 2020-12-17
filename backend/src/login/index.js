/*
  * Endpoint: /adviz/login
        todo: GET /adviz/login?userId={userId}&password={password} -> logs user in
        ? alternative: POST /adviz/login -> with userID and password in the request body / header.
 */
const router = require('express').Router() // initializing router object.

const defaultRoute = router.route('/')

// todo: implement login functionality.
defaultRoute.get((req, res) => {
    res.send('This is login')
})

module.exports = router

/*
  * Endpoint: /adviz/login
        todo: GET /adviz/login?userId={userId}&password={password} -> logs user in
        ? alternative: POST /adviz/login -> with userID and password in the request body / header.
 */
const router = require('express').Router() // initializing router object.
const { debug } = require('./login')

const defaultRoute = router.route('/')

defaultRoute.get(async (req, res) => {
    const useDebug = true // identifiier to use dbug.

    const user = useDebug ? await debug() : null

    if (await user) {
        await res.status(200).send({ user })
    }

    await res.status(401).send({ msg: 'Error' })
})

module.exports = router

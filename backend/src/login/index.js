/*
  * Endpoint: /adviz/login
        todo: GET /adviz/login?userId={userId}&password={password} -> logs user in
        ? alternative: POST /adviz/login -> with userID and password in the request body / header.
 */
const router = require('express').Router() // initializing router object.
const login = require('./login')
const { debug } = require('./login')

const defaultRoute = router.route('/')

defaultRoute.post(async (req, res) => {
    const { body } = req
    const useDebug = false // set to true to always log in as admina. for development purposes.

    const { userId, password } = body

    // send error when no userId or password is provided
    if (!userId || !password) {
        res.status(401).send({ msg: 'Error' })
        return
    }

    // just ignore the debug function.
    const user = useDebug ? await debug() : await login(userId, password)

    // check if user exists.
    if (await user) {
        await res.status(200).send({ user })
        return
    }

    await res.status(401).send({ msg: 'Error' })
})

module.exports = router

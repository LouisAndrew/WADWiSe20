/*
  * Endpoint: /adviz/contacts
        POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        PUT /adviz/contacts/id -> Aktualisiert Kontakt
        DELETE /adviz/contacts/id -> Löscht den Kontakt
 */

const router = require('express').Router() // initializing router object.

const createContact = require('./createContact')

const defaultRoute = router.route('/')
const routeWithParam = router.route('/:id')

defaultRoute.post(async (req, res) => {
    // ! Testing endpoint -> use sample data on sample.json
    const { body } = req

    if (!body.firstName) {
        // handle error if data is not found in the body.
        res.status(400).send({ msg: 'Error, no user data is provided.' })
        return
    }

    const contactId = await createContact(body)
    if (await !contactId) {
        res.status(400).send({ msg: 'Failed creating new contact' })
        return
    }

    res.status(200).send({ id: contactId })
})

// todo: implement get functonality
defaultRoute.get((req, res) => {
    res.send(`Called get with user ID: ${req.query.userId}`)
})

// todo: implement contact update
routeWithParam.put((req, res) => {
    res.send(`Called put with contact ID: ${req.params.id}`)
})

// todo: implement contact deletion
routeWithParam.delete((req, res) => {
    res.send(`Deleting contact with the ID of ${req.params.id}`)
})

module.exports = router

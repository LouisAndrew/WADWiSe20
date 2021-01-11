/*
  * Endpoint: /adviz/contacts
        POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        PUT /adviz/contacts/id -> Aktualisiert Kontakt
        DELETE /adviz/contacts/id -> Löscht den Kontakt
 */

const router = require('express').Router() // initializing router object.

const createContact = require('./createContact')
const getContact = require('./getContact')

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

    /**
     * ! Was ist es eigentlich hier gemeint? Status code: 201 & "HTTP-Header: Location: /adviz/contacts/newId"
     */
    await res
        .status(201)
        .header({ Location: '' })
        .send({ msg: 'Success', id: contactId })
})

defaultRoute.get(async (req, res) => {
    // Hard coded bcs it is unlikely tht admina user id would be changed.
    const { userId } = req.query

    // error handling if userId is not provided.
    if (!userId) {
        res.status(401).send({ msg: 'Unauthorized' })
        return
    }

    const contacts = await getContact(userId) // returns null if error occured.
    if (!contacts) {
        res.status(404).send({ msg: 'Not Found' })
        return
    }

    await res
        .status(200)
        .header({ 'Content-Type': 'application/json' })
        .send({ contacts })
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

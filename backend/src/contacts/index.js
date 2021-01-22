/*
  * Endpoint: /adviz/contacts
        POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        PUT /adviz/contacts/id -> Aktualisiert Kontakt
        DELETE /adviz/contacts/id -> Löscht den Kontakt
 */

const router = require('express').Router() // initializing router object.

const createContact = require('./createContact')
const deleteContact = require('./deleteContact')
const getContact = require('./getContact')
const updateContact = require('./updateContact')

const { getAllContacts } = require('./getContact')

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

routeWithParam.put(async (req, res) => {
    // get the new and old contact from the request body..
    const { oldContact, newContact } = req.body
    const { id: userId } = req.params

    // send error if no old + newContact objects are provided.
    if (!oldContact || !newContact) {
        res.status(400).send({ msg: 'Bad request' })
        return
    }

    const isUpdateSuccessful = await updateContact(
        userId,
        oldContact,
        newContact
    )

    if (await isUpdateSuccessful) {
        res.status(200).send({ msg: 'Succesful' })
        return
    } else {
        res.status(400).send({ msg: 'Bad request' })
        return
    }
})

routeWithParam.delete(async (req, res) => {
    const { id: contactId } = req.params

    if (!contactId) {
        // return 404 if no contact is found on the body
        res.status(404).send({ msg: 'Not found' })
        return
    }

    const isDeleteSuccesful = await deleteContact(contactId)
    if (await isDeleteSuccesful) {
        res.status(200).send({ msg: 'Succesful' })
        return
    } else {
        res.status(404).send({ msg: 'Contact not found' })
        return
    }
})

/**
 * Get all visible user
 */
routeWithParam.get(async (req, res) => {
    const { id: userId } = req.params
    const contacts = await getAllContacts(userId)

    if (await !contacts) {
        res.status(404).send({ msg: 'Not found' })
        return
    } else {
        res.status(201)
            .header({ 'Content-Type': 'application/json' })
            .send({ contacts })
    }
})

module.exports = router

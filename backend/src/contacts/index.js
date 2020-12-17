/*
  * Endpoint: /adviz/contacts
        POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        PUT /adviz/contacts/id -> Aktualisiert Kontakt
        DELETE /adviz/contacts/id -> Löscht den Kontakt
 */

const router = require('express').Router() // initializing router object.

const defaultRoute = router.route('/')
const routeWithParam = router.route('/:id')

// todo: implement create contact functionality
defaultRoute.post((req, res) => {
    // ! Testing endpoint -> use sample data on sample.json
    res.send(
        `Called post, user datas should be on body ${JSON.stringify(req.body)}`
    )
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

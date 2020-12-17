/*
  * Endpoint: /adviz/contacts
        todo: POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        todo: GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        todo: PUT /adviz/contacts/id -> Aktualisiert Kontakt
        todo: DELETE /adviz/contacts/id -> Löscht den Kontakt
 */

const router = require('express').Router() // initializing router object.

const defaultRoute = router.route('/')

defaultRoute.get((req, res) => {
    res.send('This is contacts')
})

module.exports = router

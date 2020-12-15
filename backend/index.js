// entry file.

// setup express server here

// connect to mongoDB here

// listen to port here
// listen to server after connected to mongoDB!

// setup express routes here.
// resources: https://expressjs.com/en/guide/routing.html

/*
   Required routes:

    /adviz/login
        GET /adviz/login?userId={userId}&password={password} -> logs user in
        alternative: POST /adviz/login -> with userID and password in the request body / header.

    /adviz/contacts
        POST /adviz/contacts -> Legt neuen Kontakt an, schickt Id des neuen Kontaktes an den Client zurück 
        GET /adviz/contacts?userId=USERID -> Schickt alle Kontakte des Users USERID zurück ⚠ userId = admina -> get all contacts.
        PUT /adviz/contacts/id -> Aktualisiert Kontakt
        DELETE /adviz/contacts/id -> Löscht den Kontakt
*/

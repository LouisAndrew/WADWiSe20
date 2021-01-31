import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Loading from '../loading'
import Error from '../error'
import ContactList from '../contact-list'
import ContactForm from '../contact-form'

/**
 * Available states of the adviz main component.
 */
const AppState = {
    MY_CONTACTS: 1,
    ALL_CONTACTS: 2,
    NEW: 3,
    UPDATE: 4,
    LOADING: 99,
}

Object.freeze(AppState) // creating an enumeration
// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

/**
 * Main component of the app. This is where all of the operation is done.
 */
const Main = ({ username }) => {
    const [appState, setAppState] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [shouldDisplayForm, setShouldDisplayForm] = useState(true) // identifier if contact form should be displayed.
    const [editContactId, setEditContactId] = useState(-1) // identifier if a specific contact should be displayed
    const [isError, setIsError] = useState(false)
    const [contacts, setContacts] = useState([])

    // set state to MY_CONTACTS by default
    useEffect(() => {
        setAppState(AppState.MY_CONTACTS)
    }, [])

    // decide operation based on current app state
    useEffect(() => {
        switch (appState) {
            case AppState.MY_CONTACTS:
                fetchMyContacts()
                break
            case AppState.ALL_CONTACTS:
                fetchAllContacts()
                break
            case AppState.NEW:
                setShouldDisplayForm(true)
                if (editContactId !== -1) {
                    setEditContactId(-1)
                }
                break
            case AppState.UPDATE:
                setShouldDisplayForm(true)
                break
        }
    }, [appState])

    /**
     * Function to fetch all contacts of this user.
     */
    const fetchMyContacts = () => {
        const url = `/adviz/contacts?userId=${username}` // fetching with url
        getContacts(url)
    }

    /**
     * Function to fetch all (visible) contacts for this user
     */
    const fetchAllContacts = () => {
        const url = `/adviz/contacts/${username}` // fetching with url
        getContacts(url, async (contactsData) => {
            /**
             * Additional operation, allContact endpoint would return: [{ value: Contact Data, contactOf: username }]
             * Should first processed!
             */
            setContacts(
                contactsData.map((ct) => ({
                    ...ct.value,
                    contactOf: ct.contactOf,
                }))
            )
        })
    }

    /**
     * @param url: Url of the backend endpoint
     * @param {Function | Boolean} getAllContacts: identifier if any additional operation should be done to the data.
     */
    const getContacts = async (url, getAllContacts = false) => {
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            const {
                data: { contacts: contactsData },
            } = await res

            if (!getAllContacts) {
                await setContacts(contactsData)
            } else {
                await getAllContacts(contactsData)
            }

            await setIsLoading(false)
        } catch (e) {
            console.error(e)
            setIsError(true)
        }
    }

    console.log(contacts)

    return (
        <div id="mapscreen" className="map-screen modal">
            {isLoading && <Loading />}
            {isError && <Error />}
            {shouldDisplayForm && <ContactForm username={username} />}
            <div className="container">
                <h1>Hello, {username}!</h1>
                <div className="buttons">
                    <button
                        className="primary"
                        onClick={() => {
                            setAppState(AppState.MY_CONTACTS)
                        }}
                    >
                        <span
                            className="iconify"
                            data-icon="eva:person-fill"
                            data-inline="false"
                        />
                        Show my contacts
                    </button>
                    <button
                        className="primary"
                        onClick={() => {
                            setAppState(AppState.ALL_CONTACTS)
                        }}
                    >
                        <span
                            className="iconify"
                            data-icon="eva:globe-2-fill"
                            data-inline="false"
                        />
                        Show all contacts
                    </button>
                    <button className="secondary">
                        <span
                            className="iconify"
                            data-icon="eva:person-add-fill"
                            data-inline="false"
                        />
                        Add new contact
                    </button>
                    <button className="others">
                        <span
                            className="iconify"
                            data-icon="eva:log-in-outline"
                            data-inline="false"
                        />
                        Log out
                    </button>
                </div>
                <div className="flex-container">
                    <div className="contact-list-wrapper">
                        <h4 style={{ margin: 0, marginBottom: 16 }}>
                            {appState === AppState.MY_CONTACTS
                                ? 'My contacts'
                                : 'All contacts'}
                        </h4>
                        <ContactList username={username} contacts={contacts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * <section id="mapscreen" class="map-screen modal">
    <div class="container">
      <h1>Hello, <span id="username-greeting"></span>!</h1>
      <div class="buttons">
        <button id="showminebtn" type="button" class='primary'> <span class="iconify" data-icon="eva:person-fill" data-inline="false"></span>Show my contacts</button>
        <button id="showallbtn" type="button" class='primary'> <span class="iconify" data-icon="eva:globe-2-fill" data-inline="false"></span>Show all contacts</button>
        <button id="addnewbtn" type="button" class='secondary'> <span class="iconify" data-icon="eva:person-add-fill" data-inline="false"></span>Add new contact</button>
        <button id="logoutbtn" type="button" class='others'> <span class="iconify" data-icon="eva:log-in-outline" data-inline="false"></span>Log out </span></button>
      </div>
      <div class="flex-container">
        <ul id="contactlist">
        </ul>
        <div id="map"></div>
        <script>
          map = L.map('map').setView({ lon: 13.39293, lat: 52.54181 }, 10); //the last number is the zoomlevel. took me forever to find it
          // add the OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(map);

          // show the scale bar on the lower left corner
          L.control.scale().addTo(map);
        </script>
      </div>
    </div>
    </div>
    <div id="modal">
      <div id="error">
        <h1>Oops, something went wrong</h1>
        <button class='others'>Go back</button>
      </div>
    </div>
  </section>
 */

Main.propTypes = {
    username: PropTypes.string.isRequired,
}

export { Main }

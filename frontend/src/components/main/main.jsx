import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Loading from '../loading'
import Error from '../error'
import ContactList from '../contact-list'
import ContactForm from '../contact-form'
import Map from '../map'

import './index.scss'

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
const Main = ({ username, logout }) => {
    const [appState, setAppState] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [shouldDisplayForm, setShouldDisplayForm] = useState(false) // identifier if contact form should be displayed.
    const [contactValue, setContactValue] = useState(undefined) // identifier if a specific contact should be displayed
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
                if (contactValue !== undefined) {
                    setContactValue(undefined)
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

    /**
     * Function to close popup form.
     */
    const closeModal = () => {
        setContactValue(undefined)
        setShouldDisplayForm(false)
        setAppState(AppState.MY_CONTACTS)
    }

    /**
     * function to start editing a contact.
     * @param {Contact} contact
     */
    const editContact = (contact) => {
        setContactValue(contact)
        setAppState(AppState.UPDATE)
    }

    return (
        <div id="mapscreen" className="map-screen modal">
            {isLoading && <Loading />}
            {isError && <Error />}
            {shouldDisplayForm && (
                <ContactForm
                    username={username}
                    contactValues={contactValue}
                    closeModal={closeModal}
                />
            )}
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
                    <button
                        className="secondary"
                        onClick={() => {
                            setAppState(AppState.NEW)
                        }}
                    >
                        <span
                            className="iconify"
                            data-icon="eva:person-add-fill"
                            data-inline="false"
                        />
                        Add new contact
                    </button>
                    <button className="others" onClick={logout}>
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
                        <ContactList
                            username={username}
                            contacts={contacts}
                            editContact={editContact}
                        />
                    </div>
                    <div>
                        <Map contacts={contacts} username={username} />
                        <div className="user-icons">
                            <div className="user-wrapper normalo">Normalo</div>
                            <div className="user-wrapper admina">Admina</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Main.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
}

export { Main }

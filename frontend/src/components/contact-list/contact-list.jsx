import React from 'react'
import PropTypes from 'prop-types'

import contactType from '../../types/contact'
import ContactButton from './contact-button/contact-button'

/**
 * Container component that wraps all of the "to-be rendered" contacts and handles contact click event!
 */
const ContactList = ({ contacts, username, editContact }) => {
    return (
        <li id="contactlist">
            {contacts.map((ct) => (
                <ContactButton
                    key={`${ct.firstName}-${ct.lastName}-${ct.lat}`}
                    contact={ct}
                    username={username}
                    handleClick={editContact}
                />
            ))}
        </li>
    )
}

ContactList.propTypes = {
    /**
     * List of contacts given fetched from the database
     */
    contacts: PropTypes.arrayOf(PropTypes.shape(contactType)).isRequired,
    /**
     * username of current loggedin user.
     */
    username: PropTypes.string,
    /**
     * function to start editing a contact.
     */
    editContact: PropTypes.func.isRequired,
}

export { ContactList }

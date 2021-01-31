import React from 'react'
import PropTypes from 'prop-types'

import contactType from '../../types/contact'

/**
 * Container component that wraps all of the "to-be rendered" contacts and handles contact click event!
 */
const ContactList = ({ contacts }) => {
    return <div></div>
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape(contactType)),
}

export { ContactList }

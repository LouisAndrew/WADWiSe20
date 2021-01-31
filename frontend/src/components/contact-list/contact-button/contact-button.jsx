import PropTypes from 'prop-types'

import contactType from '../../../types/contact'

/**
 * Rendered contact that would be shown on the contact list.
 */
const ContactButton = ({ contact, username, handleClick }) => {
    const contactOf = contact.contactOf ?? username // identifier, whose contact is this.
    // used to decide the identifier's color. see app.scss

    return (
        <li
            className="contact"
            onClick={() => {
                handleClick(contact)
            }}
        >
            <div className="container">{contact.firstName}</div>
            <div className={`identifier ${contactOf}`} />
        </li>
    )
}

ContactButton.propTypes = {
    /**
     * Data of the contact
     */
    contact: PropTypes.shape(contactType).isRequired,
    /**
     * username of current loggedin user.
     */
    username: PropTypes.string,
    /**
     * Function to respond to click event when user clicks on this contact button
     */
    handleClick: PropTypes.func.isRequired,
}

export default ContactButton

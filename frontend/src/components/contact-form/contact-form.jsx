import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import contactType from '../../types/contact'
import './index.scss'

/**
 * Reusable form component to add a new or update an existing user.
 * Using React Portal in this document..
 */
const ContactForm = ({ contactValues = undefined, username }) => {
    const isAdmin = username === 'admina' // check if the current loggedin user is an admin

    const Element = (
        <div className="portal-container">
            <div className="container modal" id="contact-form">
                <form className="address-form styled">
                    <h2 style={{ marginLeft: 16 }}>
                        <span
                            style={{ marginRight: 16, display: 'inline-block' }}
                        >
                            👤
                        </span>
                        {contactValues ? 'Update contact' : 'Add new contact'}
                    </h2>
                    <div className="form-fields">
                        <label htmlFor="title">
                            Titel
                            <input type="text" name="title" id="title" />
                        </label>

                        <label htmlFor="gender">
                            Gender
                            <select name="gender" id="gender">
                                <option value="M">M</option>
                                <option value="W">W</option>
                                <option value="D">D</option>
                            </select>
                        </label>

                        <label htmlFor="first-name">
                            First name
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                required
                            />
                        </label>

                        <label htmlFor="last-name">
                            Last name
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                required
                            />
                        </label>

                        <label htmlFor="street">
                            Street + number
                            <input
                                type="text"
                                name="street"
                                id="street"
                                required
                            />
                        </label>

                        <label htmlFor="zip">
                            ZIP
                            <input type="number" name="zip" id="zip" required />
                        </label>

                        <label htmlFor="city">
                            City
                            <input type="text" name="city" id="city" required />
                        </label>

                        <label htmlFor="country">
                            Country
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                            />
                        </label>

                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" id="email" />
                        </label>

                        <label htmlFor="others">
                            Others
                            <input type="text" name="others" id="others" />
                        </label>

                        {isAdmin && (
                            <label htmlFor="user-select" id="user-select-label">
                                Create user for
                                <select id="user-select">
                                    <option value="admina">Admina</option>
                                    <option value="normalo">Normalo</option>
                                </select>
                            </label>
                        )}

                        <label htmlFor="private">
                            Private
                            <input
                                type="checkbox"
                                name="private"
                                id="private"
                                defaultChecked
                            />
                        </label>
                    </div>

                    <div id="addaddress-error" className="error"></div>

                    <div className="buttons">
                        {contactValues ? (
                            <>
                                <button id="updatebtn" className="primary">
                                    Update
                                </button>
                                <button
                                    id="deletebtn"
                                    className="others"
                                    type="button"
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button id="addbtn" className="primary">
                                Add
                            </button>
                        )}
                        <button
                            id="cancelbtn"
                            className="secondary"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    return ReactDOM.createPortal(Element, document.getElementById('portal'))
}

ContactForm.propTypes = {
    /**
     * Field values of the current contact (undefined if creating a new contact)
     */
    contactValues: PropTypes.shape(contactType),
    /**
     * Current logged-in user.
     */
    username: PropTypes.string.isRequired,
}

export { ContactForm }

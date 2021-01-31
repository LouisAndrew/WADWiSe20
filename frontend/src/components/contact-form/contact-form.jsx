import { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import contactType from '../../types/contact'
import './index.scss'

/**
 * Reusable form component to add a new or update an existing user.
 * Using React Portal in this document..
 */
const ContactForm = ({ contactValues = undefined, username }) => {
    const [errMsg, setErrMsg] = useState('')

    /**
     * Assigning default Values of the form fields with the provided values from contactValues
     */
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: contactValues?.titel ?? '',
            gender: contactValues?.gender ?? 'M',
            'first-name': contactValues?.firstName ?? '',
            'last-name': contactValues?.lastName ?? '',
            street: contactValues?.street ?? '',
            zip: contactValues?.zip ?? '',
            city: contactValues?.city ?? '',
            country: contactValues?.country ?? '',
            email: contactValues?.email ?? '',
            others: contactValues?.others ?? '',
            'contact-of': contactValues?.contactOf ?? username,
            private: contactValues?.isPrivate ?? true,
        },
    })

    const isAdmin = username === 'admina' // check if the current loggedin user is an admin

    /**
     * Function to handle submit data from the user.
     * @param {} data
     */
    const onSubmit = async (data) => {
        const { street, city, country, zip } = data

        const { lat = undefined, lon = undefined } = await getLatLon(
            street,
            city,
            country,
            zip
        ) // get the lat and lon of the address by hitting an api endpoint

        if ((await !lat) || (await !lon)) {
            return
        }

        const isUpdating = contactValues !== undefined
    }

    const updateContact = async () => {}
    const addContact = async () => {}
    const deleteContact = async () => {}

    /**
     * Function to get the lat lon values of the given address data.
     * @param {String} street
     * @param {String} city
     * @param {String} country
     * @param {String} zip
     */
    const getLatLon = async (street, city, country, zip) => {
        const url = 'https://nominatim.geocoding.ai/search?'

        try {
            const { data } = await axios.get(
                `${url}street=${street}&city=${city}&country=${country}&postalcode=${zip}&geocodejson`
            )

            if (data.length > 0) {
                const { lat, lon } = await data[0]
                return await { lat, lon }
            } else {
                setErrMsg('😢 Please enter a valid address')
                return {} // return an empty object
            }
        } catch (e) {
            console.error(e)
            setErrMsg('😢 Please enter a valid address')
        }
    }

    const Element = (
        <div className="portal-container">
            <div className="container modal" id="contact-form">
                <form
                    className="address-form styled"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                            <input
                                type="text"
                                name="title"
                                id="title"
                                ref={register}
                            />
                        </label>

                        <label htmlFor="gender">
                            Gender
                            <select
                                name="gender"
                                id="gender"
                                ref={register({ required: true })}
                            >
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
                                ref={register}
                            />
                        </label>

                        <label htmlFor="last-name">
                            Last name
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                required
                                ref={register}
                            />
                        </label>

                        <label htmlFor="street">
                            Street + number
                            <input
                                type="text"
                                name="street"
                                id="street"
                                required
                                ref={register}
                            />
                        </label>

                        <label htmlFor="zip">
                            ZIP
                            <input
                                type="number"
                                name="zip"
                                id="zip"
                                required
                                ref={register}
                            />
                        </label>

                        <label htmlFor="city">
                            City
                            <input
                                type="text"
                                name="city"
                                id="city"
                                required
                                ref={register}
                            />
                        </label>

                        <label htmlFor="country">
                            Country
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                ref={register}
                            />
                        </label>

                        <label htmlFor="email">
                            Email
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={register}
                            />
                        </label>

                        <label htmlFor="others">
                            Others
                            <input
                                type="text"
                                name="others"
                                id="others"
                                ref={register}
                            />
                        </label>

                        {isAdmin && (
                            <label htmlFor="user-select" id="user-select-label">
                                Create user for
                                <select
                                    id="user-select"
                                    name="contact-of"
                                    ref={register}
                                >
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

                    {errMsg && (
                        <div id="addaddress-error" className="error">
                            {errMsg}
                        </div>
                    )}

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

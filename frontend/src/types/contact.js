import PropTypes from 'prop-types'

const contact = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired,
    _id: PropTypes.string,
    titel: PropTypes.string,
    others: PropTypes.string,
    contactOf: PropTypes.string,
}

const contactWithAddress = {
    ...contact,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
}

export default contactWithAddress

import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios' // http client

import './index.scss' // additional styling.
import Loading from '../loading'

/**
 * Login form component. Calling the endpoint /adviz/login on the backend when the form is submitted.
 */
const Login = ({ onSuccess }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Function to handle changes of the value within the username input
     * @param {React.ChangeEvent<HTMLInputElement} e
     */
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    /**
     * Function to handle changes of the value within the password input
     * @param {React.ChangeEvent<HTMLInputElement} e
     */
    const handleChangePass = (e) => {
        setPassword(e.target.value)
    }

    /**
     * Function to handle form submit
     * @param {React.FormEvent<HTMLFormElement} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = '/adviz/login'
        setIsLoading(true)

        try {
            await axios.post(url, {
                userId: username,
                password,
            })
	    // if everything is going as expected, continue to finally block.
        } catch (e) {
            console.error(e)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const imgUrl =
        'https://images.unsplash.com/photo-1500576992153-0271099def59?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aGVsbG98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

    return (
        <section id="login" className="login-section modal">
            {isLoading && <Loading />}
            <img src={imgUrl} />
            <div className="container">
                <h1>Welcome to adviz! please login to continue</h1>
                <form className="styled" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        username:
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </label>
                    <label htmlFor="password">
                        password:
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={handleChangePass}
                        />
                    </label>

                    {error && (
                        <div id="login-error" className="error">
                            😞 Wrong password / username
                        </div>
                    )}
                    <button className="primary" type="submit">
                        <span
                            className="iconify"
                            data-icon="eva:unlock-outline"
                            data-inline="false"
                        />
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}

Login.propTypes = {
    /**
     * Function to be called when login operation is succesful
     */
    onSucces: PropTypes.func.isRequired,
}

export { Login }

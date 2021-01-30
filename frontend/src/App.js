import { useState } from 'react'

import logo from './logo.svg'
import './app.scss'

/**
 * Available states of the adviz app.
 */
const AppState = {
    LOGIN: 1,
    MAIN: 2,
    // NEW: 3,
    // UPDATE: 4,
    LOADING: 99,
}

Object.freeze(AppState) // creating an enumeration
// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

/**
 * Main container of the whole Adviz app.
 */
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currUser, setCurrUser] = useState('') // username of the current loggedin user

    return (
        <div className="App">
            {isLoggedIn ? 'Logged in' : 'I dont know u'}
            <button
                onClick={() => {
                    setIsLoggedIn((prev) => !prev)
                }}
            >
                Go to next state
            </button>
        </div>
    )
}

export default App

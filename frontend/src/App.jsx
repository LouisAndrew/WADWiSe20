import { useState, useEffect } from 'react'

import Login from './components/login'
import Main from './components/main'
import './app.scss'

/**
 * Main container of the whole Adviz app.
 */
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currUser, setCurrUser] = useState('') // username of the current loggedin user

    const debug = true // skip login. debug purposes only
    useEffect(() => {
        if (debug) {
            setIsLoggedIn(true)
            setCurrUser('admina')
        }
    }, [])

    return (
        <div className="App">
            {isLoggedIn ? (
                <Main username={currUser} />
            ) : (
                <Login
                    onSuccess={(username) => {
                        setCurrUser(username)
                        setIsLoggedIn(true)
                    }}
                />
            )}
        </div>
    )
}

export default App

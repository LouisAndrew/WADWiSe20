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

    const debug = false // skip login. debug purposes only
    useEffect(() => {
        if (debug) {
            setIsLoggedIn(true)
            setCurrUser('admina')
        }
    }, [])

    /**
     * Function to log the user out
     */
    const logout = () => {
        setIsLoggedIn(false)
        setCurrUser('')
    }

    return (
        <div className="App">
            {isLoggedIn ? (
                <Main username={currUser} logout={logout} />
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

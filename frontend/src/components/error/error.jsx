import React from 'react'

import './index.scss'

/**
 * Reusable component to show an error message
 */
const Error = () => {
    /**
     * Function to refresh the page on error
     */
    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className="error-modal">
            <div style={{ textAlign: 'center' }}>
                <h2>😲 Oops, something went wrong</h2>
                <button onClick={refreshPage} className="others">
                    Click to refresh the page
                </button>
            </div>
        </div>
    )
}

Error.propTypes = {}

export { Error }

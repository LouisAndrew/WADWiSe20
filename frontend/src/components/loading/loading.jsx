import React from 'react'
import BarLoader from 'react-spinners/BarLoader'

import './index.scss'

/**
 * Loading component to show a simple loading bar when component is loading something
 */
const Loading = () => {
    return (
        <div className="loading-modal">
            <BarLoader color="#5e7ce2" height={4} width={100} />
        </div>
    )
}

Loading.propTypes = {}

export { Loading }

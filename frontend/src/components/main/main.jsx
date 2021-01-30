import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Loading from '../loading'

/**
 * Available states of the adviz main component.
 */
const AppState = {
    MY_CONTACTS: 1,
    ALL_CONTACTS: 2,
    NEW: 3,
    UPDATE: 4,
    LOADING: 99,
}

Object.freeze(AppState) // creating an enumeration
// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

/**
 * Main component of the app. This is where all of the operation is done.
 */
const Main = ({ username }) => {
    const [appState, setAppState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [contacts, setContacts] = useState([])

    return (
        <div id="mapscreen" className="map-screen-modal">
            {isLoading && <Loading />}
            <div className="container">
                <h1>Hello, {username}!</h1>
                <div className="buttons">
                    <button className="primary">
                        <span
                            className="iconify"
                            data-icon="eva:person-fill"
                            data-inline="false"
                        />
                        Show my contacts
                    </button>
                    <button className="primary">
                        <span
                            className="iconify"
                            data-icon="eva:globe-2-fill"
                            data-inline="false"
                        />
                        Show all contacts
                    </button>
                    <button className="secondary">
                        <span
                            className="iconify"
                            data-icon="eva:person-add-fill"
                            data-inline="false"
                        />
                        Add new contact
                    </button>
                    <button className="others">
                        <span
                            className="iconify"
                            data-icon="eva:log-in-outline"
                            data-inline="false"
                        />
                        Log out
                    </button>
                </div>
                <div className="flex-container">
                    <div className="contact-list-wrapper">
                        <h4>
                            {appState === AppState.MY_CONTACTS
                                ? 'My contacts'
                                : 'All contacts'}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * <section id="mapscreen" class="map-screen modal">
    <div class="container">
      <h1>Hello, <span id="username-greeting"></span>!</h1>
      <div class="buttons">
        <button id="showminebtn" type="button" class='primary'> <span class="iconify" data-icon="eva:person-fill" data-inline="false"></span>Show my contacts</button>
        <button id="showallbtn" type="button" class='primary'> <span class="iconify" data-icon="eva:globe-2-fill" data-inline="false"></span>Show all contacts</button>
        <button id="addnewbtn" type="button" class='secondary'> <span class="iconify" data-icon="eva:person-add-fill" data-inline="false"></span>Add new contact</button>
        <button id="logoutbtn" type="button" class='others'> <span class="iconify" data-icon="eva:log-in-outline" data-inline="false"></span>Log out </span></button>
      </div>
      <div class="flex-container">
        <ul id="contactlist">
        </ul>
        <div id="map"></div>
        <script>
          map = L.map('map').setView({ lon: 13.39293, lat: 52.54181 }, 10); //the last number is the zoomlevel. took me forever to find it
          // add the OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(map);

          // show the scale bar on the lower left corner
          L.control.scale().addTo(map);
        </script>
      </div>
    </div>
    </div>
    <div id="modal">
      <div id="error">
        <h1>Oops, something went wrong</h1>
        <button class='others'>Go back</button>
      </div>
    </div>
  </section>
 */

Main.propTypes = {
    username: PropTypes.string.isRequired,
}

export { Main }

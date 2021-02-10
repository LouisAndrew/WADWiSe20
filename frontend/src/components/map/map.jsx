import PropTypes from 'prop-types'
import {
    MapContainer,
    TileLayer,
    ScaleControl,
    Marker,
    Popup,
} from 'react-leaflet'
import { divIcon } from 'leaflet'

import contactType from '../../types/contact'
import 'leaflet/dist/leaflet.css' // import leaflet css

/**
 * Map component where the markers would then be placed.
 */
const Map = ({ contacts, username }) => {
    // https://github.com/PaulLeCam/react-leaflet/issues/48
    return (
        <div id="map">
            <MapContainer
                center={[52.54181, 13.39293]}
                zoom={10}
                scrollWheelZoom
                style={{ height: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                >
                    <ScaleControl />
                </TileLayer>
                {contacts.map((ct) => (
                    <Marker
                        key={`${ct._id}-marker`}
                        position={[ct.lat, ct.lon]}
                        icon={divIcon({
                            className: '',
                            iconSize: [24, 24],
                            html: `<div class="marker ${
                                ct.contactOf ?? username
                            }"></div>`,
                        })}
                    >
                        <Popup className={`popup ${ct.contactOf ?? username}`}>
                            {ct.firstName} {ct.lastName}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

Map.propTypes = {
    /**
     * To be rendered contacts
     */
    contacts: PropTypes.arrayOf(PropTypes.shape(contactType)),
    /**
     * username of the current loggedin user
     */
    username: PropTypes.string,
}

export { Map }

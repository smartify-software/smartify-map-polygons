import React, {useState} from 'react';
import {GoogleMap, LoadScript, StandaloneSearchBox, useLoadScript} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: 38.8977,
    lng: -77.0365
};

const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'

export function BasicGoogleMap() {
    const [searchBox, setSearchBox] = useState(null);
    const [places, setPlaces] = useState([]);

    const onPlacesChanged = () => {
        const newPlaces = searchBox.getPlaces();
        setPlaces(newPlaces);
    };

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ["places"],
    });

    if (loadError) return <div>Map ca nnot be loaded right now, sorry.</div>;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            mapTypeId={'terrain'}
            zoom={16}
        >
            <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Enter address or location"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </StandaloneSearchBox>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(BasicGoogleMap)

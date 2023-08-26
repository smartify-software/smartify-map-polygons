import React, {useState} from 'react';
import {GoogleMap, useLoadScript, TrafficLayer} from '@react-google-maps/api';
import {StandaloneSearchBox} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: 38.8977,
    lng: -77.0365
};

const options = {
    zoomControl: true,
    fullscreenControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    gestureHandling: 'greedy',
};

const libraries = ["places", "visualization", "drawing", "geometry"]
const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'

function DrawingManagerFunctional() {
    return null;
}

export function BasicGoogleMap() {
    const [searchBox, setSearchBox] = useState(null);
    const [places, setPlaces] = useState([]);

    const onPlacesChanged = () => {
        const newPlaces = searchBox.getPlaces();
        setPlaces(newPlaces);
    };

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey,
        libraries,
    });

    if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={options}
            zoom={16}
        >
            <DrawingManagerFunctional/>
            <TrafficLayer/>
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

export default React.memo(BasicGoogleMap);

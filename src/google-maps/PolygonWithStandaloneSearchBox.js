import React from 'react';
import {GoogleMap, useJsApiLoader, Polygon, StandaloneSearchBox, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const polygonCoords = [
    {lat: -3.745, lng: -38.523},
    {lat: -3.747, lng: -38.523},
    {lat: -3.747, lng: -38.525},
    {lat: -3.745, lng: -38.525},
];

const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'

function extracted() {
    const [map, setMap] = React.useState(null);
    const [searchBox, setSearchBox] = React.useState(null);
    const [places, setPlaces] = React.useState([]);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onPlacesChanged = () => {
        const newPlaces = searchBox.getPlaces();
        setPlaces(newPlaces);
    };
    return {setSearchBox, places, onLoad, onUnmount, onPlacesChanged};
}

export function MyPolygonWithSearchBox() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places'],
    });

    const {setSearchBox, places, onLoad, onUnmount, onPlacesChanged} = extracted();

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
            <StandaloneSearchBox onLoad={(ref) => setSearchBox(ref)} onPlacesChanged={onPlacesChanged}>
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
            <Polygon
                paths={polygonCoords}
                options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    clickable: true,
                    draggable: true,
                    editable: true,
                    visible: true,
                }}
                onDragEnd={(event) => console.log(event)}
                onClick={(event) => console.log(event)}
            />
            {places.map((place) => (
                <Marker key={place.place_id} position={place.geometry.location}/>
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MyPolygonWithSearchBox);

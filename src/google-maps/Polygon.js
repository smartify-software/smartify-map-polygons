import React from 'react';
import {GoogleMap, useJsApiLoader, Polygon} from '@react-google-maps/api';
import {StandaloneSearchBox} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const polygonCoords = [
    {lat: -3.745, lng: -38.523},
    {lat: -3.747, lng: -38.523},
    {lat: -3.747, lng: -38.525},
    {lat: -3.745, lng: -38.525},
];
const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'


export function MyPolygon() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
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
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MyPolygon);

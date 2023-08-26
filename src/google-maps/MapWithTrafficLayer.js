import React, {useState} from 'react';
import {GoogleMap, TrafficLayer, useLoadScript} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: 38.8977,
    lng: -77.0365
};

const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'

function MapWithTrafficLayer() {
    const [map, setMap] = useState(null);
    const [trafficLayer, setTrafficLayer] = useState(null);

    const onLoad = (mapInstance) => {
        setMap(mapInstance);
        setTrafficLayer(new window.google.maps.TrafficLayer());
    };

    const onUnmount = () => {
        trafficLayer.setMap(null);
    };

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places'],
    });

    if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >

            {trafficLayer && <TrafficLayer onLoad={() => trafficLayer.setMap(map)}/>}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default MapWithTrafficLayer;

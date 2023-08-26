import React, {useState} from "react";
import {
    GoogleMap,
    LoadScript,
    Polygon,
    Marker,
} from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0"

export default function App() {
    const [map, setMap] = useState(null);
    const [path, setPath] = useState([]);
    const [markers, setMarkers] = useState([]);

    const onLoad = React.useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    const onMapClick = (e) => {
        const nextPath = [...path, e.latLng];
        setPath(nextPath);

        const nextMarkers = [...markers, {position: e.latLng}];
        setMarkers(nextMarkers);
    };

    return (
        <div style={{height: "800px", width: "100%"}}>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                    mapContainerStyle={{height: "100%", width: "100%"}}
                    zoom={10}
                    center={{lat: 37.7749, lng: -122.4194}}
                    onClick={onMapClick}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {path.length > 1 && (
                        <Polygon
                            path={path} options={{fillColor: "#ff0000"}}
                            draggable={true}
                            editable={true}
                        />
                    )}

                    {markers.map((marker, index) => (
                        <Marker
                            draggable={true}
                            key={index}
                            position={marker.position}/>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

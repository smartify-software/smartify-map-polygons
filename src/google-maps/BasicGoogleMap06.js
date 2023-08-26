import React, {useState} from "react";
import {
    GoogleMap,
    LoadScript,
    Polygon,
    Marker,
} from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0"

const SELECT_MODE = "SELECT_MODE";
const DRAW_MODE = "DRAW_MODE";

export default function App() {
    const [map, setMap] = useState(null);
    const [path, setPath] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [mode, setMode] = useState(DRAW_MODE);

    const [selected, setSelected] = useState(null);

    const onLoad = React.useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    const onMapClick = (e) => {
        if (mode === DRAW_MODE) {
            const nextPath = [...path, e.latLng];
            setPath(nextPath);

            const nextMarkers = [...markers, {position: e.latLng}];
            setMarkers(nextMarkers);
        }
    };

    const onPolygonClick = (polygon) => {
        if (mode === SELECT_MODE) {
            setSelected(polygon);
        }
    };

    const onDeleteClick = () => {
        // if (selected) {
        //     setSelected(null);
        //
        //     const nextMarkers = markers.filter((marker) => {
        //         return !google.maps.geometry.poly.containsLocation(
        //             marker.position,
        //             selected
        //         );
        //     });
        //     setMarkers(nextMarkers);
        //
        //     const nextPath = path.filter((point) => {
        //         return !google.maps.geometry.poly.containsLocation(
        //             point,
        //             selected
        //         );
        //     });
        //     setPath(nextPath);
        // }
    };

    const onSelectClick = () => {
        setMode(SELECT_MODE);
        setSelected(null);
    };

    const onDrawClick = () => {
        setMode(DRAW_MODE);
        setSelected(null);
    };

    return (
        <div style={{height: "800px", width: "100%"}}>
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 1,
                    backgroundColor: "#fff",
                    padding: "10px",
                }}
            >
                <button onClick={onSelectClick}>Select</button>
                <button onClick={onDrawClick}>Draw</button>
                <button onClick={onDeleteClick}>Delete</button>
            </div>
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
                            path={path}
                            options={{fillColor: "#ff0000"}}
                            draggable={true}
                            editable={mode === DRAW_MODE}
                        />
                    )}

                    {markers.map((marker, index) => (
                        <Marker
                            draggable={true}
                            key={index}
                            position={marker.position}
                            onClick={() => {
                                setSelected(marker);
                            }}
                        />
                    ))}

                    {selected && (
                        <Polygon
                            path={selected.getPath().getArray()}
                            options={{strokeColor: "#00ff00"}}
                            onClick={() => {
                                setSelected(null);
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

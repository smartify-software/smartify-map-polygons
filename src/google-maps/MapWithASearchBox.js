import React, {useState} from "react";
import {GoogleMap, LoadScript, Marker, StandaloneSearchBox} from "@react-google-maps/api";

const googleMapsApiKey = 'AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0'

const MapWithASearchBox = () => {
    const [center, setCenter] = useState({lat: 41.9, lng: -87.624});
    const [markers, setMarkers] = useState([]);
    const [places, setPlaces] = useState([]);

    const onLoad = (ref) => {
        console.log("search box: ", ref);
    };

    const onPlacesChanged = () => {
        const newPlaces = searchBoxRef.current.getPlaces();
        setPlaces(newPlaces);
        const bounds = new window.google.maps.LatLngBounds();

        newPlaces.forEach((place) => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        setCenter({
            lat: bounds.getCenter().lat(),
            lng: bounds.getCenter().lng(),
        });

        setMarkers(
            newPlaces.map((place) => ({
                position: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
            }))
        );
    };

    const searchBoxRef = React.useRef(null);

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
            <GoogleMap zoom={15} center={center}>
                <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                    ref={searchBoxRef}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `600px`,
                            marginTop: `27px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                        }}
                    />
                </StandaloneSearchBox>
                {markers.map((marker) => (
                    <Marker key={`${marker.position.lat}-${marker.position.lng}`} position={marker.position}/>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapWithASearchBox;

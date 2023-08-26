import React, {useState} from 'react';
import {
    Circle, GoogleMap, LoadScript, Marker, Polygon, StandaloneSearchBox, TrafficLayer
} from '@react-google-maps/api';

const googleMapsApiKey = "AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0"

export function BasicGoogleMap() {
    const [map, setMap] = useState(null)
    const [searchBox, setSearchBox] = useState(null)
    const [markers, setMarkers] = useState([])
    const [center, setCenter] = useState({lat: 38.8977, lng: -77.0365})

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onPlacesChanged = () => {
        if (searchBox !== null) {
            const places = searchBox.getPlaces();
            const bounds = new window.google.maps.LatLngBounds();
            console.log(places)

            places.forEach((place) => {
                if (place.geometry && place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            const nextMarkers = places.map((place) => ({
                position: place.geometry.location,
            }));
            const nextCenter = nextMarkers.length > 0 ? nextMarkers[0].position : center;

            setCenter(nextCenter);
            setMarkers(nextMarkers);
            map.fitBounds(bounds);
        }
    };

    return (<div>
        <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={{
                    height: "800px", width: "100%"
                }}
                center={center}
                zoom={16}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <StandaloneSearchBox
                    onLoad={ref => setSearchBox(ref)}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `40px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `16px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: `absolute`,
                            left: `50%`,
                            marginLeft: `-120px`,
                            marginTop: `10px`,
                        }}
                    />
                </StandaloneSearchBox>
                {markers.map((marker) => {
                    return (<div key={marker.position.toString()}>
                        <Circle
                            style={{fillColor: "blue", fillOpacity: 0.5, strokeColor: "red", strokeOpacity: 0.5}}
                            draggable={true}
                            editable={true}
                            center={center} radius={10}
                        />
                        <Marker key={marker.position.toString()} position={marker.position}/>
                    </div>);
                })}
                {/* Create polygon around the center */}
            </GoogleMap>
        </LoadScript>
    </div>);
}

export default React.memo(BasicGoogleMap);

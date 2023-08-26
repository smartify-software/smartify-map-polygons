import React, {useState} from 'react';
import {
    Circle, GoogleMap, InfoWindow, LoadScript, Marker, Polygon, StandaloneSearchBox
} from '@react-google-maps/api';

const googleMapsApiKey = "AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0"

export function BasicGoogleMap() {
    const [map, setMap] = useState(null)
    const [searchBox, setSearchBox] = useState(null)
    const [markers, setMarkers] = useState([])
    const [center, setCenter] = useState({lat: 38.8977, lng: -77.0365})
    const [selectedMarker, setSelectedMarker] = useState(null)

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
            console.log(markers)
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
                onRightClick={
                    (e) => {
                        console.log(e.latLng.lat(), e.latLng.lng())
                    }
                }
                center={center}
                zoom={16}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {selectedMarker && (
                    <InfoWindow
                        props={{position: selectedMarker.position}}
                        position={{lat: selectedMarker.position.lat + 0.002, lng: selectedMarker.position.lng}}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h2>{selectedMarker.title}</h2>
                            <p>{selectedMarker.description}</p>
                        </div>
                    </InfoWindow>
                )}
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
                        {/* create  polygon around the marker*/}
                        <Polygon options={
                            {
                                paths: [
                                    {lat: marker.position.lat() + 0.001, lng: marker.position.lng() + 0.001},
                                    {lat: marker.position.lat() + 0.001, lng: marker.position.lng() - 0.001},
                                    {lat: marker.position.lat() - 0.001, lng: marker.position.lng() - 0.001},
                                    {lat: marker.position.lat() - 0.001, lng: marker.position.lng() + 0.001},
                                ],
                                strokeColor: "#000000",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#000000",
                                fillOpacity: 0.35
                            }
                        }/>
                        <Marker
                            draggable={true}
                            onDragEnd={(e) => {
                                console.log(e.latLng.lat(), e.latLng.lng())
                            }}
                            key={marker.position.toString()}
                            position={marker.position}/>
                    </div>);
                })}
                {/* Create polygon around the center */}
            </GoogleMap>
        </LoadScript>
    </div>);
}

export default React.memo(BasicGoogleMap);

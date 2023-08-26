import React, {useState} from "react";
import {GoogleMap, LoadScript, Marker, StandaloneSearchBox} from "@react-google-maps/api";

const PlacesWithStandaloneSearchBox = () => {
    const [places, setPlaces] = useState([]);
    const searchBoxRef = React.useRef(null);

    const onPlacesChanged = () => {
        const newPlaces = searchBoxRef.current.getPlaces();
        setPlaces(newPlaces);
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDifYrq9cituyv5rtj5Ejs9JM5_XFEG7-0"
            libraries={["places"]}
        >
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={searchBoxRef}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
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
                <ol>
                    {places.map(({place_id, formatted_address, geometry: {location}}) => (
                        <li key={place_id}>
                            {formatted_address} at ({location.lat()}, {location.lng()})
                        </li>
                    ))}
                </ol>
            </div>
        </LoadScript>
    );
};

export default PlacesWithStandaloneSearchBox;

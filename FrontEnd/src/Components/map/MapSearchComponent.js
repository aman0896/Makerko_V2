import React, { useEffect, useRef, useState } from "react";
import { LatLng } from "leaflet";
import Search from "react-leaflet-search";
import { markerIcon } from "./MapIconComponent";
import { Marker, Popup } from "react-leaflet";

const customPopup = (SearchInfo) => {
    console.log(SearchInfo, "search info");
    return (
        <Popup>
            <div>
                <p>I am a custom popUp</p>
                <p>
                    latitude and longitude from search component:{" "}
                    {SearchInfo.latLng.toString().replace(",", " , ")}
                </p>
                <p>Info from search component: {SearchInfo.info}</p>
                <p>
                    {SearchInfo.raw &&
                        SearchInfo.raw.place_id &&
                        JSON.stringify(SearchInfo.raw.place_id)}
                </p>
            </div>
        </Popup>
    );
};

export default function MapSearchComponent({ search }) {
    const { latitude, longitude } = search;
    const [state, setState] = useState({
        lat: null,
        lng: null,
    });

    useEffect(() => {
        if (latitude) {
            setState({ ...state, ["lat"]: latitude, ["lng"]: longitude });
        }
    }, []);
    // console.log(props.search, "line 28 map seach");
    return (
        <>
            {state.lat && (
                <div>
                    <Search
                        position="topright"
                        inputPlaceholder="Custom placeholder"
                        showMarker={false}
                        zoom={18}
                        closeResultsOnClick={true}
                        openSearchOnLoad={false}
                        search={
                            // console.log(lat, lng, "lat and lng");
                            new LatLng(state.lat, state.lng)
                        }
                        // these searchbounds would limit results to only Turkey.
                        providerOptions={{
                            searchBounds: [
                                new LatLng(
                                    20.685880489484212,
                                    90.32144788186963
                                ),
                                new LatLng(
                                    33.686965188941837,
                                    75.31763645303363
                                ),
                            ],
                            region: "np",
                        }}
                        onChange={(info) => {
                            console.log("FROM onChange: ", info);
                            // setLat(null);
                            // setLng(null);
                        }}
                    >
                        {(info) => (
                            <Marker icon={markerIcon} position={info?.latLng}>
                                {customPopup(info)}
                            </Marker>
                        )}
                    </Search>
                    {/* {console.log(lat, lng, "lat and lng")} */}
                    {console.log("count")}
                </div>
            )}
        </>
    );
}

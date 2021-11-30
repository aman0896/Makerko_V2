import React, { useEffect, useState } from "react";
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

export default function MapSearchComponent(props) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    useEffect(() => {
        if (lat !== null || lng !== null) {
            setLat(null);
            setLng(null);
        } else {
            if (props.search) {
                setLat(props.search.latitude);
                setLng(props.search.longitude);
                // setLatLng({
                //     lat: props.search.latitude,
                //     lng: props.search.longitude,
                // });
                console.log("inside useEffect");
            }
        }
    }, [props.search]);

    useEffect(() => {
        if (lat === null || lng === null) {
            console.log(lat, "lat");
            setLat(null);
            setLng(null);
        }
    }, [lat, lng]);

    return (
        <>
            {lat && (
                <>
                    <Search
                        position="topright"
                        inputPlaceholder="Custom placeholder"
                        showMarker={false}
                        zoom={18}
                        closeResultsOnClick={true}
                        openSearchOnLoad={false}
                        search={
                            // console.log(lat, lng, "lat and lng");
                            new LatLng(lat, lng)
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
                    {console.log(lat, lng, "lat and lng")}
                    {console.log("count")}
                </>
            )}
        </>
    );
}

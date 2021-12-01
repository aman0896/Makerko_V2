import {
    MapContainer,
    TileLayer,
    ZoomControl,
    ScaleControl,
    useMap,
} from "react-leaflet";
import { useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import Logo from "../../assets/logo/Logo.png";
import { useState, useEffect } from "react";
import MapOverlayComponent from "./MapOverlayComponent";
// import MapSearchComponent from "./MapSearchComponent";
import MapMarkerComponent from "./MapMarkerComponent";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { markerIcon } from "./MapIconComponent";
// import "leaflet-geosearch/dist/geosearch.css";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import icon from "./constants";

// function LeafletgeoSearch() {
//     const map = useMap();
//     useEffect(() => {
//         const provider = new OpenStreetMapProvider();

//         const searchControl = new GeoSearchControl({
//             provider,
//             position: "topright",
//             marker: {
//                 icon,
//                 // draggable: true,
//             },
//             searchLabel: "Kathmandu, Bagmati Pradesh, Nepal",
//         });

//         map.addControl(searchControl);

//         return () => map.removeControl(searchControl);
//     }, []);

//     return null;
// }
const center = {
    lat: 51.505,
    lng: -0.09,
};

function DraggableMarker() {
    const [draggable, setDraggable] = useState(true);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                console.log(marker.getLatLng(), "dragend infor line 58");
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            icon={markerIcon}
            draggable={draggable}
            onDragend={() =>
                console.log(
                    "line 74",
                    markerRef.current.leafletElement["_latlng"]
                )
            }
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? "Marker is draggable"
                        : "Click here to make marker draggable"}
                </span>
            </Popup>
        </Marker>
    );
}

export default function MapComponent(props) {
    const [maker, setMaker] = useState(null);

    function LocationMarker() {
        const [position, setPosition] = useState(null);

        const map = useMap();

        // useEffect(() => {
        //     map.locate().on("locationfound", function (e) {
        //         console.log(e.latlng, "event");
        //         setPosition(e.latlng);
        //         map.flyTo(e.latlng, map.getZoom());
        //     });
        // }, []);

        useEffect(() => {
            if (props.search) {
                setPosition([
                    props.search.latitude
                        ? props.search.latitude
                        : props.search.lat,
                    props.search.longitude
                        ? props.search.longitude
                        : props.search.lon,
                ]);
                map.flyTo(
                    [
                        props.search.latitude
                            ? props.search.latitude
                            : props.search.lat,
                        props.search.longitude
                            ? props.search.longitude
                            : props.search.lon,
                    ],
                    18
                );
            }
            // map.locate().on("locationfound", function (e) {
            //     console.log(e.latlng, "event");
            //     setPosition(e.latlng);
            //     map.flyTo(e.latlng, map.getZoom());
            // });
        }, [props.search]);

        return position === null ? null : (
            <Marker position={position} icon={markerIcon}>
                <Popup>You are here</Popup>
            </Marker>
        );
    }

    const handleClickMarker = (item) => {
        if (maker === null) {
            setMaker(item);
        } else {
            if (maker.name === item.name) {
                setMaker(null);
            } else {
                setMaker(item);
            }
        }
    };

    return (
        <>
            <div className="mapContainer">
                <MapOverlayComponent
                    handleClick={() => setMaker(null)}
                    data={maker}
                    logo={Logo}
                />
                <MapContainer
                    className="mapBlock markercluster-map"
                    center={[28.3949, 84]}
                    zoom={7}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    onclick={() => setMaker(null)}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ScaleControl position="bottomright" />
                    <ZoomControl position="bottomright" />
                    <MapMarkerComponent
                        data={props.data}
                        handleClick={handleClickMarker}
                    />
                    <DraggableMarker />
                    <LocationMarker />

                    {/* <LeafletgeoSearch /> */}
                    {console.log(props.search, "line 53 map component")}
                    {/* {props.search && (
                        <MapSearchComponent search={props.search} />
                    )} */}
                </MapContainer>
            </div>
        </>
    );
}

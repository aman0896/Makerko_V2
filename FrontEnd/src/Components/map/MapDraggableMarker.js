import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { markerIcon } from "./MapIconComponent";

function MapDraggableMarker(props) {
    const center = {
        lat: props.currentPosition ? props.currentPosition.latitude : 51.505,
        lng: props.currentPosition ? props.currentPosition.longitude : -0.09,
    };
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

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            console.log(e.latlng, "map.locate");
            // setPosition(e.latlng);
            // map.flyTo(e.latlng, map.getZoom());
            // const radius = e.accuracy;
            // const circle = L.circle(e.latlng, radius);
            // circle.addTo(map);
            // setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

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

export default MapDraggableMarker;

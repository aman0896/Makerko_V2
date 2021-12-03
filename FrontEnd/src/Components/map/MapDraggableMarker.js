import React, { useState, useRef, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";
import { markerIcon } from "./MapIconComponent";

function MapDraggableMarker() {
    const center = {
        lat: 51.505,
        lng: -0.09,
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

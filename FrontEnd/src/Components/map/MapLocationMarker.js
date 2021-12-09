import { useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import MapDraggableMarker from "./MapDraggableMarker";

function MapLocationMarker(props) {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
        if (props.pos.latitude && props.pos.longitude) {
            let data = {
                lat: props.pos.latitude,
                lng: props.pos.longitude,
            };
            setPosition(data);
            map.flyTo(data, 12);
        }
    }, [props.pos]);

    const mapEvent = useMapEvents({
        click: (e) => {
            // const { lat, lng } = e.latlng;
            // L.marker([lat, lng], { markerIcon }).addTo(map);
            setPosition(e.latlng);
            props.locationSet({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            });
        },
        dblclick: (e) => {
            map.locate().on("locationfound", function (e) {
                console.log(e.latlng, "event");
                setPosition(e.latlng);
                props.locationSet({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
                map.flyTo(e.latlng, 12);
            });
        },
    });
    return position === null ? null : (
        <MapDraggableMarker
            currentPosition={position}
            locationSet={props.locationSet}
        />
    );
}

export default MapLocationMarker;

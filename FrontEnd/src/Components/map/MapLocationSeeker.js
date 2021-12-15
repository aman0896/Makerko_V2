import React from "react";
import { useMap } from "react-leaflet";

function LocationSeeker(props) {
    const [position, setPosition] = React.useState(null);

    const map = useMap();

    // useEffect(() => {
    //     map.locate().on("locationfound", function (e) {
    //         console.log(e.latlng, "event");
    //         setPosition(e.latlng);
    //         map.flyTo(e.latlng, map.getZoom());
    //     });
    // }, []);

    React.useEffect(() => {
        if (props.search) {
            setPosition([
                props.search.Latitude
                    ? props.search.Latitude
                    : props.search.lat,
                props.search.Longitude
                    ? props.search.Longitude
                    : props.search.lon,
            ]);
            map.flyTo(
                [
                    props.search.Latitude
                        ? props.search.Latitude
                        : props.search.lat,
                    props.search.Longitude
                        ? props.search.Longitude
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

    return position === null ? null : null;
    // <Marker position={position} icon={markerIcon}>
    //     <Popup>You are here</Popup>
    // </Marker>
}

export default LocationSeeker;

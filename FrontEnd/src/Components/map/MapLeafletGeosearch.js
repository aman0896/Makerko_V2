import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./constants";

function MapLeafletGeosearch() {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            position: "topright",
            marker: {
                icon,
                // draggable: true,
            },
            searchLabel: "Search",
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, []);

    return null;
}

export default MapLeafletGeosearch;

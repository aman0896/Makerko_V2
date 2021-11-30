import { Map, TileLayer, ZoomControl, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import Logo from "../../assets/logo/Logo.png";
import { useState } from "react";
import MapOverlayComponent from "./MapOverlayComponent";
import MapSearchComponent from "./MapSearchComponent";
import MapMarkerComponent from "./MapMarkerComponent";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker } from "react-leaflet";

export default function MapComponent(props) {
    const [maker, setMaker] = useState(null);

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
                <Map
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
                    {console.log(props.search, "line 53 map component")}
                    <MapSearchComponent search={props.search} />
                </Map>
            </div>
        </>
    );
}

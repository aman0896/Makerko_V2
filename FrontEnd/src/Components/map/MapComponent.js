import {
    MapContainer,
    TileLayer,
    ZoomControl,
    ScaleControl,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import Logo from "../../assets/logo/Logo.png";
import { useState } from "react";
import MapOverlayComponent from "./MapOverlayComponent";
import MapMarkerComponent from "./MapMarkerComponent";
import LocationSeeker from "./MapLocationSeeker";
import MapLocationMarker from "./MapLocationMarker";
import MapDraggableMarker from "./MapDraggableMarker";
import MapLeafletGeosearch from "./MapLeafletGeosearch";

export default function MapComponent(props) {
    const [maker, setMaker] = useState(null);

    const handleClickMarker = (item) => {
        console.log(item, "handle click marker");
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

    function MapListner() {
        useMapEvents({
            click: () => {
                setMaker(null);
            },
        });
        return null;
    }

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
                    eventHandlers={{
                        click: (e) => {
                            console.log(e, "map contaner");
                            setMaker(null);
                        },
                    }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ScaleControl position="bottomright" />
                    <ZoomControl position="bottomright" />
                    <MapListner />
                    <MapLocationMarker />
                    <MapMarkerComponent
                        data={props.data}
                        handleClick={handleClickMarker}
                    />
                    <MapDraggableMarker />
                    <LocationSeeker search={props.search} />
                    {/* <MapLeafletGeosearch /> */}
                </MapContainer>
            </div>
        </>
    );
}

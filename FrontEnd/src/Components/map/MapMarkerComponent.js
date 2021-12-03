import { Marker } from "react-leaflet";
import { markerIcon } from "./MapIconComponent";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: "marker-cluster-custom",
        iconSize: L.point(40, 40, true),
    });
};

export default function MapMarkerComponent(props) {
    return (
        <>
            <MarkerClusterGroup
                showCoverageOnHover={false}
                spiderfyDistanceMultiplier={2}
                iconCreateFunction={createClusterCustomIcon}
            >
                {props.data?.map((item) => (
                    <Marker
                        position={[
                            parseFloat(item.latitude),
                            parseFloat(item.longitude),
                        ]}
                        icon={markerIcon}
                        eventHandlers={{
                            click: () => {
                                props.handleClick(item);
                            },
                        }}
                    >
                        {/* <Popup>
                        <PopUpComponent data={item} />
                    </Popup> */}
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </>
    );
}

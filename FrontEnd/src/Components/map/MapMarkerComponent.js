import { Marker } from "react-leaflet";
import { markerIcon } from "./MapIconComponent";

export default function MapMarkerComponent(props) {
    return (
        <div>
            {props.data?.map((item) => (
                <Marker
                    position={[
                        parseFloat(item.latitude),
                        parseFloat(item.longitude),
                    ]}
                    icon={markerIcon}
                    onclick={() => props.handleClick(item)}
                >
                    {/* <Popup>
                        <PopUpComponent data={item} />
                    </Popup> */}
                </Marker>
            ))}
        </div>
    );
}

import { useMapEvents } from "react-leaflet";

function MapLocationMarker() {
    let pos = null;
    const map = useMapEvents({
        click: (e) => {
            // const { lat, lng } = e.latlng;
            // L.marker([lat, lng], { markerIcon }).addTo(map);
            console.log(e.latlng);
            pos = e.latlng;
            // <MapMarkerComponent
            //     data={props.data}
            //     handleClick={handleClickMarker}
            // />;
        },
    });
    return null;
}

export default MapLocationMarker;

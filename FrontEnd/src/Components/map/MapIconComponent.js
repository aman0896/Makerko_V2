import L from "leaflet";
import Marker from "../../assets/icons/Marker.png";
const markerIcon = new L.Icon({
    iconUrl: Marker,
    iconRetinaUrl: Marker,
    iconAnchor: [0, 44],
    popupAnchor: [12, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [24, 41],
});

const pinMB = L.icon({
    iconUrl: Marker,
    iconSize: [12, 41],
    iconAnchor: [0, 44],
    popupAnchor: [12, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export { markerIcon, pinMB };

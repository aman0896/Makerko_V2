import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markerIcon } from "./MapIconComponent";
import PopUpComponent from "./PopUpComponent";
import Search from "react-leaflet-search";
import "./Map.css";

export default function MapComponent(props) {
    const customPopup = (SearchInfo) => {
        return (
            <Popup>
                <div>
                    <p>I am a custom popUp</p>
                    <p>
                        latitude and longitude from search component:{" "}
                        {SearchInfo.latLng.toString().replace(",", " , ")}
                    </p>
                    <p>Info from search component: {SearchInfo.info}</p>
                    <p>
                        {SearchInfo.raw &&
                            SearchInfo.raw.place_id &&
                            JSON.stringify(SearchInfo.raw.place_id)}
                    </p>
                </div>
            </Popup>
        );
    };

    return (
        <>
            {/* <div className="w-25 h-100 bg-danger overMap">yeah we are here</div> */}
            <div
                className="container"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "450px",
                    backgroundColor: "red",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 450,
                        top: 0,
                        left: 0,
                        zIndex: 10000,
                        backgroundColor: "white",
                        opacity: 0.6,
                    }}
                ></div>
                <Map
                    style={{ height: "450px", width: "100%" }}
                    center={[28.3949, 84]}
                    zoom={7}
                    scrollWheelZoom={true}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="bottomright" />

                    {props.data &&
                        props.data.map((item) => (
                            <Marker
                                position={[
                                    parseFloat(item.latitude),
                                    parseFloat(item.longitude),
                                ]}
                                icon={markerIcon}
                                onclick={() => console.log("item", item)}
                            >
                                <Popup>
                                    <PopUpComponent data={item} />
                                </Popup>
                            </Marker>
                        ))}
                    <Search
                        // customProvider={this.provider}
                        //   onChange={(info) => {
                        //     console.log("FROM onChange: ", info);
                        //   }}
                        position="topright"
                        inputPlaceholder="Custom placeholder"
                        // search={this.state.search}
                        showMarker={false}
                        zoom={7}
                        closeResultsOnClick={true}
                        openSearchOnLoad={false}
                        // these searchbounds would limit results to only Turkey.
                        // providerOptions={{
                        //   searchBounds: [
                        //     new LatLng(33.100745405144245, 46.48315429687501),
                        //     new LatLng(44.55916341529184, 24.510498046875)
                        //   ],
                        //   region: "tr"
                        // }}

                        // default provider OpenStreetMap
                        // provider="BingMap"
                        // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
                    >
                        {(info) => (
                            <Marker icon={markerIcon} position={info?.latLng}>
                                {customPopup(info)}
                            </Marker>
                        )}
                    </Search>
                </Map>
            </div>
        </>
    );
}

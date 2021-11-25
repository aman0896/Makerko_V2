import React from "react";
import MapComponent from "../../Components/map/MapComponent";

const mapData = require("../../data/MapData.json");

export default function Map() {
    console.log(mapData.makers, "data");
    return (
        <div>
            <div className="mainComponent">
                <label className="header">makers map</label>
                <MapComponent data={mapData.makers} />
            </div>
        </div>
    );
}

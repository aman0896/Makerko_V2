import React from "react";
import MapComponent from "../../Components/map/MapComponent";
import "./Map.css";
const mapData = require("../../data/MapData.json");

export default function Map() {
    console.log(mapData.makers, "data");
    return (
        <>
            <div className="mainComponent" style={{ position: "relative" }}>
                <div className="headerBlock">
                    <label className="header">makers map</label>
                    <input
                        type="text"
                        placeholder="Search"
                        className="mapSearch"
                    />
                </div>
                <MapComponent data={mapData.makers} />
                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-outline-primary">
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary ml-3">
                        Select Location
                    </button>
                </div>
            </div>
        </>
    );
}

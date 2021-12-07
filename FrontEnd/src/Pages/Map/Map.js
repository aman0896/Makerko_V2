import { Alert } from "bootstrap";
import React, { useState, useEffect } from "react";
import Filter from "../../Components/filter/Filter";
import { GetFilters } from "../../Components/filter/GetFilters";
import MapComponent from "../../Components/map/MapComponent";
import "./Map.css";
const mapData = require("../../data/MapData.json");

export default function Map() {
    const [mapSearch, setMapSearch] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const handleSearch = (data) => {
        console.log(data, "map page search line 11");
        setMapSearch(data);
    };
    const { filterItems, requestFilter } = GetFilters(mapData.makers);

    const parentCallBack = (childData) => {
        // console.log(childData, "child data");
        if (childData && childData.param !== null) {
            requestFilter(childData);
        } else {
            requestFilter(childData);
        }
    };

    useEffect(() => {
        // navigator.permissions
        //     .query({ name: "geolocation" })
        //     .then(function (result) {
        //         if (result.state == "granted") {
        //             console.log(result.state, "line 32 inside granted");
        //         } else if (result.state == "prompt") {
        //             console.log(result.state, "line 34 inside prompt");
        //             // navigator.geolocation.getCurrentPosition(
        //             //     revealPosition,
        //             //     positionDenied,
        //             //     geoSettings
        //             // );
        //         } else if (result.state == "denied") {
        //             navigator.permissions
        //                 .revoke({ name: "geolocation" })
        //                 .then(function (result) {
        //                     // report(result.state);
        //                     console.log("permision revoke");
        //                 });
        //             console.log(result.state, "line 41 inside denied");
        //         }
        //         result.onchange = function () {
        //             console.log(result.state, "line 43");
        //         };
        //     });
        if (!navigator.geolocation) {
            // setStatus("Geolocation is not supported by your browser");
            alert("Geolocation is not supported by your browser");
        } else {
            // setStatus("Locating...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // setStatus(null);
                    // setLat(position.coords.latitude);
                    // setLng(position.coords.longitude);
                    setCurrentPosition(position.coords);
                    alert("Location Successfully Retrieved");
                },
                () => {
                    // setStatus("Unable to retrieve your location");
                    alert("Unable to retrieve your location");
                }
            );
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentPosition(position.coords);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }, []);

    console.log(filterItems, "Filter items");
    return (
        <>
            <div className="mainComponent" style={{ position: "relative" }}>
                <div className="headerBlock">
                    <label className="header">makers map</label>
                    <Filter
                        type="string"
                        filterTypeName="StringOperator"
                        filterColumn="name"
                        tableData={mapData.makers}
                        handleSearch={handleSearch}
                        data={filterItems}
                        parentCallBack={parentCallBack}
                    />
                </div>
                <MapComponent
                    data={mapData.makers}
                    search={mapSearch}
                    currentPosition={currentPosition}
                />
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

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

    console.log(filterItems, "Filter items");
    return (
        <>
            <div className="mainComponent" style={{ position: "relative" }}>
                <div className="headerBlock">
                    <div
                        className="heading text-uppercase"
                        style={{ fontSize: 38 }}
                    >
                        makers map
                    </div>
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
                    drawMark={true}
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

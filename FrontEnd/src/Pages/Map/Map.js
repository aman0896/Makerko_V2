import React, { useState } from "react";
import Filter from "../../Components/filter/Filter";
import { GetFilters } from "../../Components/filter/GetFilters";
import MapComponent from "../../Components/map/MapComponent";
import "./Map.css";
const mapData = require("../../data/MapData.json");

export default function Map() {
    const [mapSearch, setMapSearch] = useState();
    const handleSearch = (event) => {
        setMapSearch(event.target.value);
    };
    const { filterItems, requestFilter } = GetFilters(mapData.makers);

    const parentCallBack = (childData) => {
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
                    <label className="header">makers map</label>
                    <Filter
                        type="string"
                        filterTypeName="StringOperator"
                        filterColumn="name"
                        tableData={mapData.makers}
                        data={filterItems}
                        parentCallBack={parentCallBack}
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

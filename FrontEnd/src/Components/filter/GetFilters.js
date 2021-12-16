import React, { useState } from "react";
import FilterFunction from "./FilterFunction";

export const GetFilters = (filterItems, config = null) => {
    const [filterConfig, setFilterConfig] = useState(config);

    const filteredItem = React.useMemo(() => {
        let newFilteredData = [];
        if (filterItems) newFilteredData = [...filterItems];
        if (filterConfig !== null) {
            newFilteredData = filterItems.filter((item, index) => {
                console.log(item, "filter item");
                console.log(item["Company_Name"], "filter item");
                let filterName = item["Company_Name"].toLowerCase();
                let filterData = filterConfig.param.filterData;
                let filterOperatorValue = filterConfig.param.filterOperator;
                let filterResult = FilterFunction(
                    filterName,
                    filterData,
                    filterOperatorValue
                );
                return filterResult;
            });
        }
        return newFilteredData;
    }, [filterItems, filterConfig]);

    const requestFilter = (filterParam) => {
        if (filterParam !== null) {
            let key = "contains";
            let param = filterParam.param;
            setFilterConfig({ key, param });
        } else {
            setFilterConfig(null);
        }
    };
    return { filterItems: filteredItem, requestFilter, filterConfig };
};

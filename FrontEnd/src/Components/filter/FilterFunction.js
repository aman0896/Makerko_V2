const FilterFunction = (filterName, filterValue, operator) => {
    const comparisonOperatorsHash = {
        "===": function (a, b) {
            if (typeof a === "number") {
                return a === b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] === b;
            } else return a === b;
        },
        contains: function (a, b) {
            return a.includes(b);
        },
        startWith: function (a, b) {
            return a.startsWith(b);
        },
        endsWith: function (a, b) {
            return a.endsWith(b);
        },
        "!=": function (a, b) {
            if (typeof a === "number") {
                return a !== b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] !== b;
            } else return a !== b;
        },
        ">": function (a, b) {
            if (typeof a === "number") {
                return a > b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] > b;
            } else return a > b;
        },
        ">=": function (a, b) {
            if (typeof a === "number") {
                return a >= b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] >= b;
            } else return a >= b;
        },
        "<": function (a, b) {
            if (typeof a === "number") {
                return a < b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] < b;
            } else return a < b;
        },
        "<=": function (a, b) {
            if (typeof a === "number") {
                return a <= b;
            }
            if (a.indexOf("T") > -1) {
                let filterData = a.split("T");
                return filterData[0] <= b;
            } else return a <= b;
        },
    };
    var comparisonOperator = comparisonOperatorsHash[operator];
    // let res = comparisonOperator(filterName, filterValue);
    return comparisonOperator(filterName, filterValue);
};
export default FilterFunction;

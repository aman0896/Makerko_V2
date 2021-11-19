import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const DropDown = ({
    placeholder,
    ID,
    options,
    onChange,
    selectedValue,
    getOptionLabel,
    getOptionValue,
    multipleSelect,
}) => {
    const customStyles = {
        control: (base) => ({
            ...base,
            height: "50px",
            minHeight: "50px",
        }),
        indicatorSeparator: () => {}, // removes the "stick"

        dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles,
            color: "#5044fd", // your changes to the arrow
            "&:hover": {
                color: "#5044fd",
            },
        }),
    };
    return (
        <Select
            placeholder={placeholder}
            styles={customStyles}
            value={selectedValue}
            isClearable="true"
            id={ID}
            options={options}
            onChange={onChange}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={multipleSelect}
        />
    );
};

DropDown.prototype = {};

DropDown.defaultProps = {
    className: "text-dark",
    isClearable: "true",
};

export default DropDown;

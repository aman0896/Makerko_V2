import React, { useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { colors } from "../Values/colors";

function ReactCreatbale({ selectedMaterial, placeholder }) {
    const handleChange = (e) => {
        console.group("Value Changed");
        console.log(e);
        console.groupEnd();
        selectedMaterial(e);
        // console.log(e, "CreatableSelect");
        // if (e.__isNew__ !== undefined && e.__isNew__ === true) {
        //     colourOptions.push({ label: e.label, value: e.value });
        //     console.log(colourOptions, "options");
        // }
    };

    const handleInputChange = (inputValue, actionMeta) => {
        console.group("Input Changed");
        console.log(inputValue);
        console.log(actionMeta);
        console.groupEnd();
    };

    const customStyles = {
        control: (base) => ({
            ...base,

            minHeight: "50px",
            borderColor: colors.gray,
        }),
        indicatorSeparator: () => {}, // removes the "stick"
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            // console.log({ data, isDisabled, isFocused, isSelected });
            return {
                ...styles,
                backgroundColor: isFocused ? colors.primary : null,
                color: isFocused ? colors.white : null,
            };
        },

        dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles,
            color: colors.primary, // your changes to the arrow
            "&:hover": {
                color: colors.primary,
            },
            display: "none",
        }),
    };

    return (
        <>
            <label className="mb-1 font-weight-bold" style={{ fontSize: 14 }}>
                Add Material
            </label>
            <CreatableSelect
                onChange={handleChange}
                onInputChange={handleInputChange}
                styles={customStyles}
                placeholder={placeholder}
            />
        </>
    );
}

export default ReactCreatbale;

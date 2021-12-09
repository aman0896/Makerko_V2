import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

const DropDown = ({
    label,
    placeholder,
    ID,
    options,
    onChange,
    selectedValue,
    getOptionLabel,
    getOptionValue,
    multipleSelect,
    name,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    setFieldTouched,
    value,
}) => {
    const [data, setData] = useState();
    const customStyles = {
        control: (base) => ({
            ...base,

            minHeight: "50px",
            borderColor:
                errors[name] && touched[name] ? colors.danger : colors.gray,
        }),
        indicatorSeparator: () => {}, // removes the "stick"

        dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles,
            color: colors.primary, // your changes to the arrow
            "&:hover": {
                color: colors.primary,
            },
        }),
    };
    const handleChange = (event) => {
        setData(event.target.value);
        setFieldValue(name, event.target.value);
    };

    return (
        <>
            <label className="mb-1 font-weight-bold" style={{ fontSize: 14 }}>
                {label}
            </label>
            <Select
                placeholder={placeholder}
                styles={customStyles}
                value={value}
                //isClearable="true"
                id={ID}
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                isMulti={multipleSelect}
                onChange={(selectedOption) => {
                    onChange(selectedOption);
                }}
                onBlur={() => {
                    handleBlur(name);
                }}
                style={
                    errors[name] &&
                    touched[name] && {
                        borderColor: colors.danger,
                    }
                }
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

DropDown.prototype = {};

DropDown.defaultProps = {
    className: "text-dark",
    isClearable: "true",
};

export default DropDown;

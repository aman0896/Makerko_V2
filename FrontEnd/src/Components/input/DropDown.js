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
    setInitial,
    value,
}) => {
    const [data, setData] = useState();
    useEffect(() => {
        if (setInitial) {
            setData(setInitial);
            setFieldValue(name, setInitial);
        }
    }, [setInitial]);
    const customStyles = {
        control: (base) => ({
            ...base,

            minHeight: "50px",
            borderColor:
                errors[name] && touched[name] ? colors.danger : colors.gray,
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
        }),
    };
    const handleChange = (option) => {
        setData(option);
        setFieldValue(name, option);
    };

    return (
        <>
            <label className="mb-1 font-weight-bold" style={{ fontSize: 14 }}>
                {label}
            </label>
            <Select
                defaultValue={setInitial}
                placeholder={placeholder}
                styles={customStyles}
                value={value ? value : data}
                //isClearable="true"
                id={ID}
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                isMulti={multipleSelect}
                onChange={(selectedOption) => {
                    onChange
                        ? onChange(selectedOption)
                        : handleChange(selectedOption);
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

import React, { useEffect } from "react";
import Creatable from "react-select/creatable";

function ReactSelect() {
    const colourOptions = [
        { label: "Red", value: "Red" },
        { label: "Green", value: "Green" },
    ];

    const handleChange = (e) => {
        if (e.__isNew__ !== undefined && e.__isNew__ === true) {
            colourOptions.push({ label: e.label, value: e.value });
            console.log(colourOptions, "options");
        }
    };

    const handleInputChange = (e) => {
        console.log(e, "handleINputChange");
    };

    return (
        <div style={{ width: "50%", margin: 10 }}>
            <Creatable
                isClearable
                onChange={handleChange}
                onInputChange={handleInputChange}
                options={colourOptions}
            />
        </div>
    );
}

export default ReactSelect;

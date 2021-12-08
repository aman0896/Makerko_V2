import React from "react";
import Button from "../../Components/Button";
function QuoteButton({ value, textTransform, buttonStyle }) {
    return (
        <Button
            buttonStyle={buttonStyle}
            style={{
                fontWeight: 100,
                minWidth: 150,
                fontWeight: 500,
                textTransform: textTransform,
            }}
        >
            {value}
        </Button>
    );
}

function ServicesComponent({ header, services }) {
    return (
        <>
            <div className="heading my-3">{header}</div>
            <div className="row text-center">
                {services?.map((item) => (
                    <div
                        className="p-2 ml-3 mb-2 rounded text-white"
                        style={{ backgroundColor: "#0000ff" }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
}

function TextIconComponent({ icon, text }) {
    return (
        <div>
            {icon}
            <label className="ml-2">{text}</label>
        </div>
    );
}

export { QuoteButton, ServicesComponent, TextIconComponent };

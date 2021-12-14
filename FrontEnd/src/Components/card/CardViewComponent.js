import React from "react";
import "./Card.css";

function CardViewComponent({ imageStyle, title, description, key }) {
    return (
        <div className="imageStyle" style={imageStyle} key={key}>
            <div className="textStyle">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default CardViewComponent;

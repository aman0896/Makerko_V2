import React from "react";
import { colors } from "../Values/colors";
import "./Card.css";

function Card({
    data,
    path,
    imageStyle,
    titleStyle,
    descriptionStyle,
    cardStyle,
    selectedCard,
}) {
    const onCardSelect = () => {
        selectedCard(data);
    };

    return (
        <div
            className="card-bank text-center"
            style={cardStyle}
            onClick={onCardSelect}
        >
            <img className="mb-4" src={data.image} style={imageStyle} />
            {path === "aboutUs" && (
                <div
                    className="hr-divider"
                    style={{ background: colors.primary }}
                ></div>
            )}
            <h4 className="m-1" style={titleStyle}>
                {data.name}
            </h4>
            <p className="m-1" style={descriptionStyle}>
                {data.description}
            </p>
        </div>
    );
}

export default Card;

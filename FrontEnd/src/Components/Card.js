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
    handleClick,
}) {
    // const onCardSelect = () => {
    //   selectedCard(data);
    // };

    return (
        <div
            className="card-bank text-center"
            style={cardStyle}
            onClick={handleClick}
        >
            <img
                className="mb-4"
                src={data.image || data.url}
                style={imageStyle}
                alt=""
            />
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
            <p
                className="m-1"
                style={{
                    textAlign: "start",
                    color: colors.primary,
                    fontSize: "1rem",
                    padding: "0px 10px",
                }}
            >
                {data.hashTag}
            </p>
        </div>
    );
}

export default Card;

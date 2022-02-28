import React from "react";
import { colors } from "../Values/colors";
import "./Card.css";
import { MobileMediaQuery, TabletMediaQuery } from "./ReactResponsize";

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

    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    return (
        <div
            className="card-bank text-center"
            style={cardStyle}
            onClick={handleClick ? () => handleClick(data) : ""}
        >
            <img
                className="mb-1"
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
                    fontSize: isMobile ? "12px" : isTablet ? "14px" : "",
                    padding: "0px 10px",
                    display: isMobile ? "none" : isTablet ? "none" : "block",
                }}
            >
                {data.hashTag}
            </p>
        </div>
    );
}

export default Card;

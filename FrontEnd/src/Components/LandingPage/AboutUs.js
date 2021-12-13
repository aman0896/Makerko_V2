import React from "react";
import { colors } from "../../Values/colors";
import SlideView from "../slideView/SlideView";
import "./AboutUs.css";

function AboutUs({ data }) {
    const imageStyle = {
        objectFit: "cover",
        width: "100%",
        height: "260px",
    };

    const titleStyle = {
        color: colors.white,
    };

    const cardStyle = {
        borderRadius: "5px",
        overflow: "hidden",
        height: "392px",
        width: "98%",
    };

    return (
        <div className="aboutus-container">
            <div className="aboutus-sub-container">
                <h2 className="aboutus-heading">AboutUs</h2>
                <SlideView
                    path="aboutUs"
                    cardStyle={cardStyle}
                    slides={data}
                    imageStyle={imageStyle}
                    titleStyle={titleStyle}
                />
            </div>
        </div>
    );
}

export default AboutUs;

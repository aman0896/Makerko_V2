import React from "react";
import { useHistory } from "react-router-dom";
import { colors } from "../../Values/colors";
import { MobileMediaQuery, TabletMediaQuery } from "../ReactResponsize";
import SlideView from "../slideView/SlideView";
import "./AboutUs.css";

function AboutUs({ data, aboutRef }) {
    const history = useHistory();

    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    const imageStyle = {
        objectFit: "cover",
        width: "100%",
        height: isMobile ? "130px" : isTablet ? "170px" : "200px",
    };

    const titleStyle = {
        color: colors.white,
        fontSize: isMobile ? "1rem" : isTablet ? "1.2rem" : "1.5rem",
    };

    const cardStyle = {
        borderRadius: "5px",
        overflow: "hidden",
        height: isMobile ? "250px" : isTablet ? "300px" : "430px",
        width: "90%",
    };

    const onClickCard = (data) => {
        history.push({ pathname: "/about", state: data.id });
    };

    return (
        <div className="aboutus-container" ref={aboutRef}>
            <div className="aboutus-sub-container">
                <h2 className="aboutus-heading">About Us</h2>
                <div
                    style={{
                        width: isMobile ? "100%" : isTablet ? "90%" : "70%",
                    }}
                >
                    <SlideView
                        path="aboutUs"
                        cardStyle={cardStyle}
                        slides={data}
                        imageStyle={imageStyle}
                        titleStyle={titleStyle}
                        onClick={(selectedCard) => onClickCard(selectedCard)}
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

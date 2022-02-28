import React, { useState } from "react";
import "./ProductionCapabilities.css";
import SlideView from "../slideView/SlideView";
import { colors } from "../../Values/colors";
import { Button2 } from "../Button";
import ModalChoice from "../modal/ModalChoice";
import { useHistory } from "react-router-dom";
import {
    DesktopMediaQuery,
    MobileMediaQuery,
    TabletMediaQuery,
} from "../ReactResponsize";

function ProductionCapabilities({ productionType }) {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const isDesktop = DesktopMediaQuery();
    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    const imageStyle = {
        objectFit: "cover",
        width: "100%",
        height: isMobile ? "80%" : isTablet ? "170px" : "200px",
    };

    const titleStyle = {
        color: colors.primary,
        fontSize: isMobile ? "1.2rem" : isTablet ? "1.2rem" : "",
    };
    const descriptionStyle = {
        color: colors.dark,
        fontSize: isMobile ? "12px" : isTablet ? "14px" : "",
        display: isMobile ? "none" : isTablet ? "block" : "block",
    };

    const cardStyle = {
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        height: isMobile ? "250px" : isTablet ? "300px" : "430px",
        width: "100%",
    };

    const showModalChoice = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const onClickHaveDesign = () => {
        window.location.href = "/get-quote";
    };

    const onClickRequestDesign = () => {
        window.location.href = "/request-design";
    };

    return (
        <div className="main-container">
            <div className="sub-container">
                <h2 className="headingStyle heading">
                    Production Capabilities
                </h2>
                <SlideView
                    cardStyle={cardStyle}
                    slides={productionType}
                    imageStyle={imageStyle}
                    titleStyle={titleStyle}
                    descriptionStyle={descriptionStyle}
                />
                <div
                    className={
                        isMobile || isTablet
                            ? "m-2 d-flex flex-column"
                            : " mt-5 m-3 d-flex justify-content-between"
                    }
                >
                    <p style={{ color: colors.white }}>
                        Other Local manufacturing: Vacuum Forming / Injection
                        Molding / Tool and Die Making / Casting / Metal
                        Fabrication / Wood Working
                    </p>
                    <span>
                        <Button2
                            onClick={showModalChoice}
                            buttonSize={
                                isMobile
                                    ? "button2--small"
                                    : isTablet
                                    ? "button2--medium"
                                    : "button2--large"
                            }
                        >
                            Get a Quote
                        </Button2>
                    </span>
                </div>
            </div>
            <ModalChoice
                show={showModal}
                handleClose={handleClose}
                onClickButton1={onClickHaveDesign}
                onClickButton2={onClickRequestDesign}
                title="Get a quote"
                btnTitle1="Have a Design"
                btnTitle2="Request a Desgin"
            />
        </div>
    );
}

export default ProductionCapabilities;

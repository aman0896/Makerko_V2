import React, { useState } from "react";
import "./ProductionCapabilities.css";
import SlideView from "../slideView/SlideView";
import { colors } from "../../Values/colors";
import { Button2 } from "../Button";
import ModalChoice from "../modal/ModalChoice";
import { useHistory } from "react-router-dom";

function ProductionCapabilities({ productionType }) {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const imageStyle = {
        objectFit: "cover",
        width: "100%",
        height: "260px",
    };

    const titleStyle = {
        color: colors.primary,
    };
    const descriptionStyle = {
        color: colors.dark,
    };

    const cardStyle = {
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        height: "430px",
        width: "98%",
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
                <div className="mt-5 m-3 d-flex justify-content-between">
                    <span style={{ color: colors.white }}>
                        Other Local manufacturing: Vacuum Forming / Injection
                        Molding / Tool and Die Making / Casting / Metal
                        Fabrication / Wood Working
                    </span>
                    <span>
                        <Button2
                            onClick={showModalChoice}
                            buttonSize="button2--large"
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

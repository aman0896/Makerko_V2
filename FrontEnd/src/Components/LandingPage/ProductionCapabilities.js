import React from "react";
import "./ProductionCapabilities.css";
import SlideView from "../SlideView";
import { colors } from "../../Values/colors";

function ProductionCapabilities({ productionType }) {
    const imageStyle = {
        objectFit: "cover",
        width: "100%",
        height: "260px",
    };

    const titleStyle = {
        color: colors.primary,
    };
    const descriptionStyle = {
        color: colors.primary,
    };

    const cardStyle = {
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        height: "392px",
        width: "98%",
    };

    return (
        <div className="main-container">
            <div className="sub-container">
                <h2 className="heading">Production Capabilities</h2>
                <SlideView
                    cardStyle={cardStyle}
                    slides={productionType}
                    imageStyle={imageStyle}
                    titleStyle={titleStyle}
                    descriptionStyle={descriptionStyle}
                />
                <div className="m-2" style={{ color: colors.white }}>
                    <span>
                        Other Local manufacturing: Injection Molding / Tool and
                        Die Making / Casting / Metal Fabrication / Wood Working
                    </span>
                    <button className="btn-primary ml-3">Get a Quote</button>
                </div>
            </div>
        </div>
    );
}

export default ProductionCapabilities;

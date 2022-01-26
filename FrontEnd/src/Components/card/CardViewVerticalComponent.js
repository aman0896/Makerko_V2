import React, { useState, useEffect } from "react";
import { FileDownload } from "../../commonApi/CommonApi";
import { colors } from "../../Values/colors";

const CardViewVerticalComponent = ({
    index,
    name,
    description,
    image,
    imageFit,
    setSelectedHub,
    selected,
    data,
    onPress,
}) => {
    const onCardSelect = () => {
        if (selected === undefined || selected === null) {
            onPress(data);
        } else {
            setSelectedHub(index);
        }
    };

    console.log(image, "image hub");

    return (
        <>
            <div key={index} className="col-xl-6 col-lg-6 col-md-12 p-3 pb-4">
                <div
                    className="row m-auto rounded overflow-hidden"
                    style={{
                        overflow: "hidden",
                        maxHeight: "300px",
                        backgroundColor: colors.dark,
                        border: selected
                            ? `5px solid ${colors.success}`
                            : "none",
                    }}
                    onClick={onCardSelect}
                >
                    <img
                        className="col-lg-5 col-md-12 col-sm-12 col-12"
                        src={image}
                        style={{
                            width: "225px",
                            height: "302px",
                            objectFit: imageFit ? imageFit : "cover",
                            padding: imageFit ? 20 : 0,
                        }}
                        alt={image}
                    />

                    <div
                        className="col-lg-7 pr-5 pt-3"
                        style={{
                            backgroundColor: colors.primary,
                        }}
                    >
                        <span
                            className="text-left text-white sub-heading text-uppercase"
                            style={{ fontSize: "18px" }}
                        >
                            {name}
                        </span>
                        <p
                            style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                WebkitLineClamp: 5,
                            }}
                            className="text-left text-white mt-2"
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardViewVerticalComponent;

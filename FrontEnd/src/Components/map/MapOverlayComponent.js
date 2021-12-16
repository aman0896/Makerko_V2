import React from "react";

export default function MapOverlayComponent(props) {
    return (
        <>
            {props.data && (
                <div className="mapOverlayContainer">
                    <div style={{ position: "relative" }}>
                        <div
                            className="mapOverlayClose"
                            onClick={props.handleClick}
                        >
                            <i class="far fa-times-circle"></i>
                        </div>
                        <div className="mapOverlayImageBlock">
                            <img src={props.logo} height="85%" />
                        </div>
                        <div className="text-white text-justify pl-3 mapOverlayTextBlock">
                            <span className="header" style={{ fontSize: 18 }}>
                                {props.data.name}
                            </span>
                            <div className="textParagraph">
                                {props.data.description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

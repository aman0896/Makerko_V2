import React, { useEffect, useState } from "react";
import { FileDownload } from "../../commonApi/CommonApi";

export default function MapOverlayComponent(props) {
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    useEffect(() => {
        async function GetProfileImage() {
            if (props.data && props.data.Logo) {
                const imageData = JSON.parse(props.data.Logo);
                const imageBlob = await FileDownload(imageData.filePath);
                const profileImageUrl = window.URL.createObjectURL(
                    new Blob([imageBlob])
                );
                setProfileImagePreview(profileImageUrl);
            }
        }

        GetProfileImage();
    }, [props.data]);
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
                            <img
                                src={
                                    profileImagePreview
                                        ? profileImagePreview
                                        : "https://cdn0.iconfinder.com/data/icons/app-13/64/aplication_29-512.png"
                                }
                                height="85%"
                            />
                        </div>
                        <div className="text-white text-justify pl-3 mapOverlayTextBlock">
                            <span
                                className="header text-uppercase"
                                style={{ fontSize: 18 }}
                            >
                                {props.data.Company_Name}
                            </span>
                            <div className="textParagraph">
                                {props.data.Brief_Description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import React, { useEffect, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css";
import { useRef } from "react";
import Button from "./Button";

export default function ImageCropper({
    src,
    setImageDestination,
    onSaveClick,
    onCancelClick,
    aspectRatio = 1,
}) {
    const imageElement = useRef();

    useEffect(() => {
        const cropper = new Cropper(imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: aspectRatio,
            viewMode: 2,

            crop: () => {
                const canavas = cropper.getCroppedCanvas();
                setImageDestination(canavas.toDataURL("image/png"));
            },
        });
    }, []);

    return (
        <div>
            <div className="image-container">
                <img ref={imageElement} src={src} alt="source" />
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button
                    btnName="Save"
                    type="button"
                    styleClass="btn mt-2"
                    onClick={onSaveClick}
                    style={{
                        fontSize: "16px",
                        backgroundColor: "#5044FD",
                        borderRadius: "5px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        width: "100px",
                    }}
                />
                <Button
                    btnName="Cancel"
                    type="button"
                    styleClass="btn bg-danger ml-2 mt-2"
                    onClick={onCancelClick}
                    style={{
                        fontSize: "16px",
                        borderRadius: "5px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        width: "100px",
                    }}
                />
            </div>
        </div>
    );
}

export const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //New Code
    return new Blob([ab], { type: mimeString });
};

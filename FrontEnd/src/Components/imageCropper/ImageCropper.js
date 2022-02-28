import React, { useEffect, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css";
import { useRef } from "react";
import Button from "../Button";

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
            dragMode: "move",
            zoomable: false,
            scalable: false,
            aspectRatio: aspectRatio,
            viewMode: 2,
            crop: () => {
                const canavas = cropper.getCroppedCanvas();
                setImageDestination(canavas.toDataURL("image/png"));
            },
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: true,
            toggleDragModeOnDblclick: false,
        });
    }, [aspectRatio, setImageDestination]);

    return (
        <div>
            <div className="cropper_container">
                <img
                    ref={imageElement}
                    style={{ maxWidth: "100%" }}
                    src={src}
                    alt="source"
                />
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button
                    buttonStyle="button--primary--solid"
                    onClick={onSaveClick}
                    style={{ marginRight: 2 }}
                >
                    Save
                </Button>
                <Button
                    buttonStyle="button--danger--outline"
                    onClick={onCancelClick}
                    style={{ marginLeft: 2 }}
                >
                    Cancel
                </Button>
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

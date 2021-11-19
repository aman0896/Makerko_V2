import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./feature.css";

const ImageCropper = (props) => {
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  console.log(cropper, "cropper");

  const getCropData = (e) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      cropper.setDragMode();
    }
    cropper.getCroppedCanvas().toBlob(function (blob) {
      var formData = new FormData();
      console.log(blob, "blob");

      formData.append("file", blob);
      props.parentCallback({
        data: cropper.getCroppedCanvas().toDataURL(),
        formData: formData,
      });
    });
  };
  useEffect(() => {
    props.getCropper(cropper);
  }, [cropper]);
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Cropper
          style={{
            height: props.height,
            width: props.width,

            background: "lightgray",
          }}
          zoomTo={0.1}
          aspectRatio={props.ratio}
          preview="img-preview"
          src={props.file}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          movable={true}
          cropBoxMovable={false}
          // cropBoxResizable={false}
          responsive={true}
          autoCropArea={1}
          center={true}
          checkOrientation={true}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>

      {props.showCropButton && (
        <button className="crop" onClick={getCropData}>
          Crop Image
        </button>
      )}

      <br style={{ clear: "both" }} />
    </div>
  );
};

export default ImageCropper;

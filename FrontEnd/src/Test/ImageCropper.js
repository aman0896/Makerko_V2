import React, { useState } from "react";
import ImageCropper from "../Components/imageCropper/ImageCropper";
import WrapperComponent from "../Components/WrapperComponent";

function ImageCropperTest() {
    const [coverImageDestination, setCoverImageDestination] = useState();
    const [viewCoverImage, setViewCoverImage] = useState();
    const [showImageCropper, setImageCropper] = useState(false);
    const [showInput, setInput] = useState(false);

    const onCoverImageSave = () => {};
    const onImageCropCancel = () => {
        setImageCropper(false);
        setInput(false);
    };

    const coverImageUpdate = (e) => {
        const file = e.target.files[0];
        setImageCropper(true);
        setInput(true);
        setViewCoverImage(URL.createObjectURL(file));
    };
    return (
        <WrapperComponent>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "70%",
                    }}
                >
                    {showImageCropper && (
                        <ImageCropper
                            src={viewCoverImage}
                            setImageDestination={setCoverImageDestination}
                            onSaveClick={onCoverImageSave}
                            onCancelClick={() =>
                                onImageCropCancel("coverImage")
                            }
                            aspectRatio={10 / 3}
                        />
                    )}
                    <input
                        id="cover-image"
                        type="file"
                        name="file"
                        accept={".jpg, .jpeg, .png"}
                        onChange={coverImageUpdate}
                        hidden={showInput}
                    />
                </div>
            </div>
        </WrapperComponent>
    );
}

export default ImageCropperTest;

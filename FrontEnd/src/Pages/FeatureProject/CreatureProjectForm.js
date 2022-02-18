import { ErrorMessage, FieldArray } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { postDataWithFormData } from "../../commonApi/CommonApi";
import { createProject } from "../../commonApi/Link";
import Button from "../../Components/Button";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import WrapperComponent from "../../Components/WrapperComponent";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import { ProjectValidationSchema } from "../Form/ValidationSchema";
import "./Featureproject.css";
import { MdEdit } from "react-icons/md";
import ImageCropper, {
    dataURItoBlob,
} from "../../Components/imageCropper/ImageCropper";
import { useHistory } from "react-router-dom";

const InitialValues = {
    coverImage: "",
    projectTitle: "",
    materials: "",
    category: "",
    description: "",
    contents: [
        {
            content_title: "",
            content_image: "",
            image_position: "",
            content_details: "",
        },
    ],
    pdfFile: "",
    gallery: "",
    termsCondition: false,
};

const imagePosition = [
    {
        direction: "right",
        value: "right",
    },
    {
        direction: "left",
        value: "left",
    },
];

function CreateProjectForm(props) {
    const history = useHistory();
    const formRef = useRef();
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const [author, setAuthor] = useState();
    const [addMore, setAddMore] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const { width } = useWindowDimensions();
    const [imagePreview, setImagePreview] = useState();
    const [galleryImage, setGalleryImage] = useState(null);
    const [previousImagePath, setPreviousImagePath] = useState();
    const [deletedImagePath, setDeletedImagepath] = useState([]);
    const [totalGalleryImage, setTotalGalleryImage] = useState(null);
    const [profileImage, setProfileImage] = useState();
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [prevProfileImage, setPrevProfileImage] = useState();
    const [showCoverImage, setShowCoverImage] = useState();
    const [showImageCropper, setImageCropper] = useState(false);
    const [imageDestination, setImageDestination] = useState();
    const [prevCoverImage, setPrevCoverImage] = useState();
    const [targetFile, setTargetFile] = useState();

    const style = width > 600 ? { width: "30%" } : { width: "100%" };
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];
    const SUPPORTED_FORMATS_PDF = [".pdf"];

    useEffect(() => {
        if (currentUserData) setAuthor(currentUserData);
    }, [currentUserData]);

    console.log(formRef.current && formRef.current.values, "values");

    const handleSubmit = (values) => {
        const coverImage = values.coverImage;
        const pdfFile = values.pdfFile;
        const gallery = values.gallery;
        const contents = values.contents;
        const authorDetails = author;

        console.log(contents, "contenst");

        const restDetails = {
            projectTitle: values.projectTitle,
            materials: values.materials,
            category: values.category,
            description: values.description,
            termsCondition: values.termsCondition,
        };

        const formData = new FormData();
        formData.append("coverImage", coverImage, targetFile.name);
        formData.append("pdfFile", pdfFile);
        formData.append("contents", JSON.stringify(contents));
        formData.append("restDetails", JSON.stringify(restDetails));
        formData.append("author", JSON.stringify(authorDetails));
        for (let i = 0; i < contents.length; i++) {
            console.log(contents[i].content_image, "check image content");
            formData.append("contentImage", contents[i].content_image);
        }
        for (let i = 0; i < gallery.length; i++) {
            formData.append("gallery", gallery[i]);
        }

        postDataWithFormData(
            createProject,
            formData,
            (onSuccess) => {
                if (onSuccess.data.create === "success") {
                    history.push({
                        pathname: "/projects",
                        state: {
                            message:
                                "Thank you for sharing your project/innovation with MAKERKO.",
                        },
                    });
                }
            },
            (onFail) => {
                console.log(onFail);
            }
        );
    };

    const onCancel = () => {
        window.location.href = "/";
    };

    const onDeleteClick = (img) => {
        const filterData = imagePreview.filter(
            (data) => data.filePath !== img.filePath
        );

        setImagePreview(filterData);

        let filteredData = previousImagePath.filter(
            (data) => data.fileName !== img.fileName
        );
        const deletedData = previousImagePath.filter(
            (data) => data.fileName == img.fileName
        );

        setDeletedImagepath([...deletedImagePath, ...deletedData]);

        setPreviousImagePath(filteredData);
    };

    const handleOnMultipleImageUpload = (event) => {
        const galleryImage = event.target.files;
        console.log(galleryImage, ";line no 93");

        if (galleryImage.length > 0) {
            formRef.current.setFieldValue("gallery", galleryImage);

            let filePreview = [];

            for (let i = 0; i < galleryImage.length; i++) {
                filePreview.push({
                    filePath: URL.createObjectURL(galleryImage[i]),
                    fileName: galleryImage[i].Name,
                });
                //file.push(galleryImage[i]);
            }
            setGalleryImage(filePreview);
            setTotalGalleryImage(galleryImage.length);
        } else {
            formRef.current.setFieldValue("gallery", null);
            setGalleryImage(null);
            setTotalGalleryImage(null);
            formRef.current.setFieldTouched("gallery");
        }
    };

    const onCroppedImageSave = () => {
        const blob = dataURItoBlob(imageDestination);
        console.log(blob, "blob");
        formRef.current.setFieldValue("coverImage", blob);
        const url = URL.createObjectURL(blob);
        setShowCoverImage(url);
        setImageCropper(false);
        // window.location.reload();
    };

    const onImageCropCancel = () => {
        setImageCropper(false);
        setImageDestination(profileImagePreview);
        setShowCoverImage();
    };

    const onCoverImageUpload = (e) => {
        const file = e.target.files[0];
        setImageCropper(true);

        if (file) {
            setShowCoverImage(URL.createObjectURL(file));
            setTargetFile(file);
        }
    };

    return (
        <WrapperComponent>
            <div
                className="d-flex flex-column border-border-danger"
                style={{ width: "80%", margin: "0 10%" }}
            >
                <div
                    className="heading"
                    style={{ color: "#0000FF", fontSize: "36px" }}
                >
                    Feature Project
                </div>
                <div>
                    <FormikComponent
                        initialValues={InitialValues}
                        onSubmit={handleSubmit}
                        validationSchema={ProjectValidationSchema}
                        formRef={formRef}
                    >
                        <div className="cover-image my-4">
                            {showImageCropper ? (
                                <ImageCropper
                                    src={showCoverImage}
                                    aspectRatio={16 / 6}
                                    setImageDestination={setImageDestination}
                                    onSaveClick={onCroppedImageSave}
                                    onCancelClick={onImageCropCancel}
                                />
                            ) : (
                                <>
                                    <img
                                        className="cover-image-profile"
                                        src={
                                            showCoverImage
                                                ? showCoverImage
                                                : "http://localhost:3000/assests/cover.jpg"
                                        }
                                        alt=""
                                    />
                                </>
                            )}
                        </div>

                        <FormikController
                            control="file"
                            label="Choose Main Photo of Project:"
                            name="coverImage"
                            title="Choose File"
                            accept={SUPPORTED_FORMATS}
                            onChange={onCoverImageUpload}
                        />

                        <div className="row">
                            <div className="col-lg-6">
                                <FormikController
                                    control="input"
                                    label="Title of Project:"
                                    placeholder="Enter Title of Project"
                                    name="projectTitle"
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormikController
                                    control="input"
                                    label="Materials:"
                                    name="materials"
                                    placeholder="Ex. Polypropylene(PP),PVC"
                                />
                            </div>
                        </div>

                        <FormikController
                            control="input"
                            label="Selector/Category:"
                            name="category"
                            placeholder="Ex. #CNC, #Handicraft"
                        />

                        <FormikController
                            control="textarea"
                            label="Description:"
                            name="description"
                            placeholder="Add Summary of Project"
                        />

                        <div
                            className="font-weight-bold mr-2"
                            style={{ fontSize: 14 }}
                        >
                            Content
                        </div>
                        {showPreview && <h1>{InitialValues.Title}</h1>}
                        <FieldArray name="contents">
                            {(fieldArrayProps) => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                return values.contents.map((values, index) => {
                                    return (
                                        <div key={index}>
                                            <FormikController
                                                control="input"
                                                label="Title:"
                                                name={`contents[${index}].content_title`}
                                            />

                                            <div style={style}>
                                                <FormikController
                                                    control="file"
                                                    name={`contents[${index}].content_image`}
                                                    title="Choose File"
                                                    accept={SUPPORTED_FORMATS}
                                                />

                                                <FormikController
                                                    control="select"
                                                    label="Image Position:"
                                                    placeholder="Choose Position"
                                                    name={`contents[${index}].image_position`}
                                                    options={imagePosition}
                                                    getOptionLabel={(options) =>
                                                        options.direction
                                                    }
                                                />
                                            </div>

                                            <FormikController
                                                control="textarea"
                                                label="Detail Description:"
                                                placeholder="Add summary of project"
                                                name={`contents[${index}].content_details`}
                                            />
                                            <div className="d-flex justify-content-end">
                                                {addMore === index && (
                                                    <>
                                                        {/* {!showPreview ? (
                                                            <Button
                                                                buttonStyle="button--primary--solid"
                                                                buttonSize="button--medium"
                                                                onClick={(
                                                                    values
                                                                ) => {
                                                                    setShowPreview(
                                                                        true
                                                                    );
                                                                }}
                                                                style={{
                                                                    margin: 2,
                                                                    padding: 3,
                                                                }}
                                                            >
                                                                View Preview
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                buttonStyle="button--primary--solid"
                                                                buttonSize="button--medium"
                                                                onClick={() => {
                                                                    setShowPreview(
                                                                        false
                                                                    );
                                                                }}
                                                                style={{
                                                                    margin: 2,
                                                                    padding: 3,
                                                                }}
                                                            >
                                                                Hide Preview
                                                            </Button>
                                                        )} */}
                                                        <Button
                                                            buttonStyle="button--primary--solid"
                                                            buttonSize="button--medium"
                                                            onClick={() => {
                                                                push("");
                                                                setAddMore(
                                                                    index + 1
                                                                );
                                                            }}
                                                            style={{
                                                                margin: 2,
                                                                padding: 3,
                                                            }}
                                                        >
                                                            Add Contents
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                });
                            }}
                        </FieldArray>

                        <div style={style}>
                            <FormikController
                                control="file"
                                label="Upload Documents :"
                                name="pdfFile"
                                title="Add Documents"
                                accept={SUPPORTED_FORMATS_PDF}
                                placeholder="ex Assembly manual, flyer, proposal, etc."
                            />
                        </div>
                        <FormikController
                            control="multipleFile"
                            label="Upload Multiple Photos:"
                            name="gallery"
                            title="Choose Files"
                            accept={SUPPORTED_FORMATS}
                            onChange={handleOnMultipleImageUpload}
                            fileLength={totalGalleryImage}
                        />

                        {imagePreview && (
                            <div className="row m-2">
                                {imagePreview.map((src, index) => (
                                    <div className="col-lg-2 m-3" key={index}>
                                        <div className="image-container">
                                            <div>
                                                <img
                                                    src={src.filePath}
                                                    className="image"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className="delete-icon"
                                                onClick={() =>
                                                    onDeleteClick(src)
                                                }
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {galleryImage && (
                            <div className="row m-2">
                                {galleryImage.map((src, index) => (
                                    <div className="col-lg-2 m-3" key={index}>
                                        <div>
                                            <img
                                                src={src.filePath}
                                                className="image"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="d-flex justify-content-end">
                            <FormikController
                                name="termsCondition"
                                control="checkbox"
                                label="I agree with Terms and Conditions before submission of Project details and files."
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <div className="m-1">
                                <FormikController
                                    title="Cancel"
                                    type="button"
                                    control="cancel"
                                    buttonStyle="button--danger--outline"
                                    onClick={onCancel}
                                />
                            </div>
                            <div className="m-1">
                                <FormikController
                                    title="Upload"
                                    type="submit"
                                    control="submit"
                                />
                            </div>
                        </div>
                    </FormikComponent>
                </div>
            </div>
        </WrapperComponent>
    );
}

export default CreateProjectForm;

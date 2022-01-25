import {
    faPlus,
    faPlusCircle,
    faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postData, postDataWithFormData } from "../../commonApi/CommonApi";
import {
    projectContentEdit,
    projectCoverEdit,
    projectDetailEdit,
    projectGalleryImageAdd,
    updateGallery,
} from "../../commonApi/Link";
import Button from "../../Components/Button";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import SimpleModal from "../../Components/modal/SimpleModal";
import { Toast } from "../../Components/ReactToastify";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";

const InitialValues = {
    projectTitle: "",
    productionDetails: "",
    description: "",
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

const btnStyle = {
    backgroundColor: colors.primary,
    borderRadius: 5,
    fontSize: 15,
    color: colors.white,
};

function ProjectEditModal(props) {
    console.log(props, "props");
    const [showContentModal, setContentModal] = useState(false);
    const [coverImage, setCoverImage] = useState();
    const [newGalleryImage, setNewGalleryImage] = useState();
    const [galleryImage, setGalleryImage] = useState(props.data.Gallary);
    const [deletedGalleryImage, setDeletedGalleryImage] = useState([]);

    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];
    const SUPPORTED_FORMATS_PDF = [".pdf"];

    //ref
    const formRef = useRef();
    const handleSubmit = (values) => {
        values.projectId = props.data.Project_ID;
        postData(
            projectDetailEdit,
            values,
            (onSuccess) => {
                if (onSuccess.data.detailUpdate === "success") {
                    window.location.reload();
                }
            },
            (onFail) => {}
        );
        console.log(values, "edit content");
    };

    const coverImageUpdate = (event) => {
        // console.log(props.data.Cover_Image);
        const prevImage = props.data.Cover_Image.filePath;

        setCoverImage(URL.createObjectURL(event.target.files[0]));

        const formData = new FormData();
        formData.append("coverImage", event.target.files[0]);
        formData.append("authorId", props.data.Author_ID);
        formData.append("projectId", props.data.Project_ID);
        formData.append("prevImage", prevImage);

        postDataWithFormData(
            projectCoverEdit,
            formData,
            (onSuccess) => {
                if (onSuccess.data.coverImageUpdate === "success") {
                    window.location.reload();
                }
            },
            (onFail) => {}
        );
    };

    const onClickEditContent = () => {
        setContentModal(true);
    };

    const content =
        props.data &&
        props.data.Content.slice(0, 2).map((content, index) => (
            <div className="contain--80 row">
                <div className="col-xl-6 col-lg-6 col-md-6 position_img d-flex justify-content-end">
                    <img
                        style={{
                            width: "150px",
                            height: "100px",
                        }}
                        src={content.content_image.url}
                        alt=""
                    />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="sub-heading" style={{ fontSize: "20px" }}>
                        {content.content_title}
                    </div>
                    <div
                        className="pt-3"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                        }}
                    >
                        {content.content_details}
                    </div>
                </div>
            </div>
        ));

    const onDeleteClick = (img) => {
        const filterOldGallery = galleryImage.filter(
            (data) => data.filePath !== img.filePath
        );
        setGalleryImage(filterOldGallery);
        const deletedData = galleryImage.filter(
            (data) => data.fileName === img.fileName
        );
        console.log(deletedData, "delete");
        setDeletedGalleryImage([...deletedGalleryImage, ...deletedData]);
    };

    const saveGallery = () => {
        const data = {
            deletedGalleryImage,
            galleryImage,
            authorId: props.data.Author_ID,
            projectId: props.data.Project_ID,
        };
        postData(
            updateGallery,
            data,
            (onSuccess) => {
                if (onSuccess.data.galleryUpdate === "success") {
                    window.location.reload();
                }
            },
            (onFail) => {}
        );
    };

    useEffect(() => {
        console.log(galleryImage, "gallery Image");
        console.log(deletedGalleryImage, "deletedImage");
    }, [galleryImage, deletedGalleryImage]);

    const onGalleryImageAdd = (e) => {
        const images = e.target.files;
        const imageData = [];
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            const url = URL.createObjectURL(images[i]);
            imageData.push({
                url: url,
                filename: images[i].name,
                filePath: images[i].name,
            });
            formData.append("gallery", images[i]);
        }
        setGalleryImage([...galleryImage, ...imageData]);

        postDataWithFormData(
            projectGalleryImageAdd,
            formData,
            (onSuccess) => {
                if (onSuccess.data) {
                    const { galleryImages } = onSuccess.data;
                    if (galleryImages) {
                        setNewGalleryImage(galleryImages);
                    }
                }
            },
            (onFail) => {
                console.log(onFail);
            }
        );
    };

    useEffect(() => {
        if (newGalleryImage) {
            let oldData = galleryImage;
            for (let i = 0; i < newGalleryImage.length; i++) {
                for (let j = 0; j < oldData.length; j++) {
                    if (
                        oldData[j].filename === newGalleryImage[i].originalname
                    ) {
                        oldData[j].fileName = newGalleryImage[i].filename;
                        oldData[j].filePath = newGalleryImage[i].path;
                        oldData[j].newUpload = true;
                    }
                }
            }
            setGalleryImage(oldData);
        }
    }, [newGalleryImage]);

    return (
        <>
            <div>
                {/* ------Modal------- */}
                <Modal
                    size={props.size ? props.size : ""}
                    style={{
                        zIndex: 9999,
                    }}
                    show={props.show}
                    onHide={props.handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <div className=" w-100 text-center">
                            <Modal.Title className="">
                                {props.title}
                            </Modal.Title>
                        </div>
                    </Modal.Header>

                    <Modal.Body
                        style={{ maxHeight: "80vh", overflowY: "scroll" }}
                        className="my-4"
                    >
                        <div
                            className="d-flex flex-column border-border-danger"
                            style={{
                                margin: "0 5%",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        height: props.height
                                            ? props.height
                                            : 200,
                                        borderRadius: 5,
                                        backgroundColor: colors.gray,
                                        marginBottom: 20,
                                    }}
                                >
                                    <img
                                        src={
                                            coverImage
                                                ? coverImage
                                                : props.data.Cover_Image.url
                                        }
                                        style={{
                                            height: props.height
                                                ? props.height
                                                : 200,
                                            width: "100%",
                                            borderRadius: 5,
                                            objectFit: "cover",
                                        }}
                                        alt=""
                                    />
                                </div>

                                <label
                                    htmlFor="coverImage"
                                    className="btn"
                                    style={btnStyle}
                                >
                                    Edit Cover Image
                                </label>

                                <input
                                    type="file"
                                    id="coverImage"
                                    hidden
                                    onChange={coverImageUpdate}
                                />
                                <FormikComponent
                                    initialValues={InitialValues}
                                    onSubmit={handleSubmit}
                                    // validationSchema={ProjectValidationSchema}
                                    formRef={formRef}
                                >
                                    {props.data && (
                                        <>
                                            <FormikController
                                                control="input"
                                                label="Title of Project:"
                                                placeholder="Enter Title of Project"
                                                name="projectTitle"
                                                setInitial={props.data.Title}
                                            />
                                            <FormikController
                                                control="input"
                                                label="Production Detail:"
                                                name="productionDetails"
                                                placeholder="Ex. Polypropylene(PP),PVC"
                                                setInitial={
                                                    props.data
                                                        .Production_Details
                                                }
                                            />
                                            <FormikController
                                                control="textarea"
                                                label="Description:"
                                                name="description"
                                                placeholder="Ex. #CNC, #Handicraft"
                                                setInitial={
                                                    props.data.Description
                                                }
                                            />

                                            <div className="mt-1 mb-1 d-flex justify-content-end">
                                                <FormikController
                                                    title="Save"
                                                    type="submit"
                                                    control="submit"
                                                />
                                            </div>
                                        </>
                                    )}
                                </FormikComponent>
                                <div
                                    className="sub-heading  mr-2"
                                    style={{ fontSize: 14 }}
                                >
                                    Content:
                                </div>
                                {content}
                                <Button
                                    buttonStyle="button--primary--solid"
                                    buttonSize="button--small"
                                    onClick={onClickEditContent}
                                >
                                    Edit Content
                                </Button>
                                <SimpleModal
                                    title="Edit Content"
                                    size="xl"
                                    show={showContentModal}
                                    handleClose={() => setContentModal(false)}
                                    body={
                                        <div
                                            style={{
                                                maxHeight: "60vh",
                                                overflowY: "scroll",
                                            }}
                                        >
                                            <ContentFieldArray
                                                content={props.data.Content}
                                                projectId={
                                                    props.data.Project_ID
                                                }
                                                authorId={props.data.Author_ID}
                                            />
                                        </div>
                                    }
                                />
                                <div
                                    className="sub-heading  mr-2"
                                    style={{ fontSize: 14 }}
                                >
                                    Gallery:
                                </div>

                                {galleryImage && (
                                    <div className="row justify-content-start">
                                        {galleryImage.map((src, index) => {
                                            return (
                                                <div
                                                    className="col-lg-3 col-md-4 col-sm-6 col-6 mb-2 mt-2"
                                                    key={index}
                                                >
                                                    <div className="image-container">
                                                        <div>
                                                            <img
                                                                src={src.url}
                                                                className="image"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div
                                                            className="delete-icon"
                                                            onClick={() =>
                                                                onDeleteClick(
                                                                    src
                                                                )
                                                            }
                                                        >
                                                            <i className="fas fa-times-circle"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <span className=" col-lg-3 col-md-4 col-sm-6 col-6 mb-2 mt-2">
                                            <label
                                                className="image"
                                                style={{ border: "0px" }}
                                                htmlFor="new-gallery-image"
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        height: "inherit",
                                                        width: "inherit",
                                                        color: colors.gray,
                                                        padding: "0 0",
                                                    }}
                                                    icon={faPlusSquare}
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                id="new-gallery-image"
                                                hidden
                                                multiple
                                                onChange={onGalleryImageAdd}
                                                accept={SUPPORTED_FORMATS}
                                            />
                                        </span>
                                    </div>
                                )}
                                <Button
                                    buttonStyle="button--primary--solid"
                                    buttonSize="button--small"
                                    onClick={saveGallery}
                                >
                                    Save Gallery
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default ProjectEditModal;

const ContentFieldArray = ({ content, projectId, authorId }) => {
    const projectList = useSelector((state) => state.projectList.projectList);
    console.log(projectList, "projectlislsls");
    const formRef = useRef();
    const [formValues, setFormValues] = useState({ contents: content });
    console.log(content);

    const { width } = useWindowDimensions();
    console.log(formValues.contents.length, "lenght");
    const [addMore, setAddMore] = useState(formValues.contents.length - 1);
    console.log(addMore, "addmore");
    const style = width > 600 ? { width: "30%" } : { width: "100%" };
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    const onImageUpdate = (event, name) => {
        formRef.current.setFieldValue(name, event.target.files[0]);
    };

    const onContentSubmit = (values) => {
        const contents = values.contents;

        const formData = new FormData();

        formData.append("content", JSON.stringify(contents));
        formData.append("projectId", projectId);
        formData.append("authorId", authorId);

        for (let i = 0; i < contents.length; i++) {
            console.log(contents[i].content_image, "check image content");
            formData.append("contentImage", contents[i].content_image);
        }

        postDataWithFormData(
            projectContentEdit,
            formData,
            (onSuccess) => {
                if (onSuccess.data.contentEdit === "success") {
                    window.location.reload();
                } else {
                    Toast("Content Edit Fail", "error");
                }
            },
            (onFail) => {}
        );
        console.log(values, "submit conent");
    };

    return (
        <FormikComponent
            initialValues={formValues}
            formRef={formRef}
            onSubmit={onContentSubmit}
        >
            <FieldArray name="contents">
                {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;

                    console.log(values);

                    return values.contents.map((values, index) => {
                        console.log(index, "indexx");
                        return (
                            <div className="p-2" key={index}>
                                <FormikController
                                    control="input"
                                    label="Title:"
                                    name={`contents[${index}].content_title`}
                                    setInitial={values.content_title}
                                />

                                <div style={style}>
                                    <div>
                                        <div>
                                            <img
                                                style={{
                                                    width: "200px",
                                                    height: "150px",
                                                    marginBottom: "10px",
                                                }}
                                                src={
                                                    values.content_image &&
                                                    values.content_image.url
                                                        ? values.content_image
                                                              .url
                                                        : values.content_image &&
                                                          values.content_image
                                                              .type ===
                                                              "image/jpeg"
                                                        ? URL.createObjectURL(
                                                              values.content_image
                                                          )
                                                        : ""
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor={`contents[${index}].content_image`}
                                                className="btn"
                                                style={btnStyle}
                                            >
                                                {values.content_image
                                                    ? "Edit Image"
                                                    : "Choose Image"}
                                            </label>
                                            <input
                                                name={`contents[${index}].content_image`}
                                                type="file"
                                                id={`contents[${index}].content_image`}
                                                hidden
                                                onChange={(e) =>
                                                    onImageUpdate(
                                                        e,
                                                        `contents[${index}].content_image`
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <FormikController
                                        control="select"
                                        label="Image Position:"
                                        placeholder="Choose Position"
                                        name={`contents[${index}].image_position`}
                                        options={imagePosition}
                                        getOptionLabel={(options) =>
                                            options.direction
                                        }
                                        setInitial={values.image_position}
                                    />
                                </div>

                                <FormikController
                                    control="textarea"
                                    label="Detail Description:"
                                    placeholder="Add summary of project"
                                    name={`contents[${index}].content_details`}
                                    setInitial={values.content_details}
                                />
                                <div className="d-flex justify-content-end">
                                    {addMore === index && (
                                        <>
                                            <Button
                                                buttonStyle="button--success--solid"
                                                buttonSize="button--small"
                                                onClick={() => {
                                                    push("");
                                                    setAddMore(index + 1);
                                                }}
                                                style={{
                                                    fontSize: "18px",
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlusCircle}
                                                    style={{ marginRight: 5 }}
                                                />
                                                Add
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    });
                }}
            </FieldArray>
            <div className="d-flex justify-content-end">
                <div className="m-1">
                    <FormikController
                        title="Save"
                        type="submit"
                        control="submit"
                    />
                </div>
            </div>
        </FormikComponent>
    );
};

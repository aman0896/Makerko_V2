import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../Components/Button";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import SimpleModal from "../../Components/modal/SimpleModal";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";

const fontWeignt = { fontWeight: "lighter" };

const InitialValues = {
    coverImage: "",
    projectTitle: "",
    productionDetails: "",
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

const btnStyle = {
    backgroundColor: colors.primary,
    borderRadius: 5,
    fontSize: 15,
    color: colors.white,
};

function ProjectEditModal(props) {
    console.log(props);
    const { width } = useWindowDimensions();
    const [addMore, setAddMore] = useState(0);
    const [showContentModal, setContentModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const style = width > 600 ? { width: "30%" } : { width: "100%" };
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];
    const SUPPORTED_FORMATS_PDF = [".pdf"];

    //ref
    const formRef = useRef();
    console.log(formRef.current && formRef.current.values, "values");
    const handleSubmit = (values) => {
        console.log(values);
    };

    const coverImageUpdate = (event) => {
        console.log(event.target.files[0]);
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
                        src={content.content_image}
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
                                <FormikComponent
                                    initialValues={InitialValues}
                                    onSubmit={handleSubmit}
                                    // validationSchema={ProjectValidationSchema}
                                    formRef={formRef}
                                >
                                    {props.data && (
                                        <>
                                            <div
                                                style={{
                                                    height: props.height
                                                        ? props.height
                                                        : 200,
                                                    borderRadius: 5,
                                                    backgroundColor:
                                                        colors.gray,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <img
                                                    src={
                                                        props.data.Cover_Image
                                                            .url
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
                                        </>
                                    )}
                                </FormikComponent>
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
                                            />
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default ProjectEditModal;

const ContentFieldArray = ({ content }) => {
    const [formValues, setFormValues] = useState({ contents: content });
    console.log(content);
    const initialValues = {
        contents: [
            {
                content_title: "",
                content_image: "",
                image_position: "",
                content_details: "",
            },
        ],
    };

    const { width } = useWindowDimensions();
    const [addMore, setAddMore] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const style = width > 600 ? { width: "30%" } : { width: "100%" };
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];
    const SUPPORTED_FORMATS_PDF = [".pdf"];
    return (
        <FormikComponent initialValues={formValues} enableReinitialize={true}>
            <FieldArray name="contents">
                {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;

                    console.log(values);

                    return values.contents.map((values, index) => {
                        return (
                            <div key={index}>
                                <FormikController
                                    control="input"
                                    label="Title:"
                                    name={`contents[${index}].content_title`}
                                    setInitial={values.content_title}
                                />

                                <div style={style}>
                                    <FormikController
                                        control="file"
                                        name={`contents[${index}].content_image`}
                                        title="Choose File"
                                        accept={SUPPORTED_FORMATS}
                                        setInitial={values.content_image}
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
                                                buttonStyle="button--primary--solid"
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
        </FormikComponent>
    );
};

{
    /* <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={ProjectValidationSchema}
                                formRef={formRef}
                            >
                                <FormikController
                                    control="file"
                                    label="Choose Main Photo of Project:"
                                    name="coverImage"
                                    title="Choose File"
                                    accept={SUPPORTED_FORMATS}
                                    image
                                />

                                <FormikController
                                    control="input"
                                    label="Title of Project:"
                                    placeholder="Enter Title of Project"
                                    name="projectTitle"
                                />

                                <FormikController
                                    control="input"
                                    label="Production Detail:"
                                    name="productionDetails"
                                    placeholder="Ex. Polypropylene(PP),PVC"
                                />

                                <FormikController
                                    control="textarea"
                                    label="Description:"
                                    name="description"
                                    placeholder="Ex. #CNC, #Handicraft"
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
                                        const { push, remove, form } =
                                            fieldArrayProps;
                                        const { values } = form;
                                        return values.contents.map(
                                            (values, index) => {
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
                                                                accept={
                                                                    SUPPORTED_FORMATS
                                                                }
                                                            />

                                                            <FormikController
                                                                control="select"
                                                                label="Image Position:"
                                                                placeholder="Choose Position"
                                                                name={`contents[${index}].image_position`}
                                                                options={
                                                                    imagePosition
                                                                }
                                                                getOptionLabel={(
                                                                    options
                                                                ) =>
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
                                                            {addMore ===
                                                                index && (
                                                                <>
                                                                    {!showPreview ? (
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
                                                                            View
                                                                            Preview
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
                                                                            Hide
                                                                            Preview
                                                                        </Button>
                                                                    )}
                                                                    <Button
                                                                        buttonStyle="button--primary--solid"
                                                                        buttonSize="button--medium"
                                                                        onClick={() => {
                                                                            push(
                                                                                ""
                                                                            );
                                                                            setAddMore(
                                                                                index +
                                                                                    1
                                                                            );
                                                                        }}
                                                                        style={{
                                                                            margin: 2,
                                                                            padding: 3,
                                                                        }}
                                                                    >
                                                                        Add
                                                                        Contents
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        );
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
                                            <div
                                                className="col-lg-2 m-3"
                                                key={index}
                                            >
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
                                            <div
                                                className="col-lg-2 m-3"
                                                key={index}
                                            >
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
                                            onClick={props.handleClose}
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
                            </FormikComponent> */
}

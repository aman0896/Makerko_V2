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

function CreateProjectForm() {
    const formRef = useRef();
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const [author, setAuthor] = useState();
    const [addMore, setAddMore] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const { width } = useWindowDimensions();
    const style = width > 700 ? { width: "30%" } : { width: "100%" };
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

    const handleSubmit = (values) => {
        const coverImage = values.coverImage;
        const pdfFile = values.pdfFile;
        const gallery = values.gallery;
        const contents = values.contents;
        const authorDetails = author;

        console.log(contents, "contenst");

        const restDetails = {
            projectTitle: values.projectTitle,
            productionDetails: values.productionDetails,
            description: values.description,
            termsCondition: values.termsCondition,
        };

        const formData = new FormData();
        formData.append("coverImage", coverImage);
        formData.append("pdfFile", pdfFile);
        formData.append("contents", JSON.stringify(contents));
        formData.append("restDetails", JSON.stringify(restDetails));
        formData.append("author", JSON.stringify(authorDetails));
        for (let i = 0; i < contents.length; i++) {
            console.log(contents[i].content_image, "check image content");
            formData.append("contentImage", contents[i].content_image);
        }

        postDataWithFormData(
            createProject,
            formData,
            (onSuccess) => {},
            (onFail) => {}
        );
        console.log("Values", values);
    };

    const onCancel = () => {
        window.location.href = "/";
    };

    useEffect(() => {
        console.log(
            formRef.current && formRef.current.setFieldValue("pdfFile", "file"),
            "formref"
        );
    }, [formRef]);
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
                        innerRef={formRef}
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
                                                        )}
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

                            <FormikController
                                control="multipleFile"
                                label="Upload other Multiple Photos of Project :"
                                name="gallery"
                                title="Add photos"
                                accept={SUPPORTED_FORMATS}
                            />
                        </div>

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

const errorStyle = {
    color: colors.danger,
    fontSize: 14,
};

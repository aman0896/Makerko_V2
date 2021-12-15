import Axios from "axios";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { deleteData, postDataWithCofig } from "../../commonApi/CommonApi";
import { dropzone, fileDelete } from "../../commonApi/Link";
import "./DropZone.css";
import Alert from "../Alert";
import Progressbar from "../Progressbar";
import ErrorMessage from "../formik/ErrorMessage";
import { colors } from "../../Values/colors";
import { Toast } from "../ReactToastify";
import { useFormikContext } from "formik";

const path = require("path");

function DropZone({
    accept,
    requirementNote,
    parentCallback,
    name,
    errors,
    touched,
    setFieldValue,
    handleBlur,
}) {
    const [percentage, setUploadPercentage] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();
    //const accept = '.pdf, .jpeg, .dxf, .stl, .obj, .step, .tif';

    const textStyle = { color: "gray" };

    const onDropAccepted = (acceptedFiles) => {
        setUploadComplete(false);
        setIsUpload(true);

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        try {
            postDataWithCofig(
                dropzone,
                formData,
                setUploadPercentage,
                (onSuccess) => {
                    setUploadPercentage(0);
                    setUploadComplete(true);
                    const { fileDetails } = onSuccess.data;
                    console.log(fileDetails, "filedetails");
                    setUploadedFile(fileDetails);
                    setFieldValue(name, fileDetails);
                    parentCallback(fileDetails);
                },
                (onFail) => {}
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onDropRejected = (rejectedFiles) => {
        var errorMsg = rejectedFiles[0].errors[0].code;
        Toast(errorMsg, "error");
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        disabled: accept ? false : true,
        accept: accept,
        maxFiles: 1,
        maxSize: 15 * 1000 * 1000,
        onDropAccepted,
        onDropRejected,

        onFileDialogCancel: () => {
            handleBlur(name);
        },
    });

    const onBtnRemove = (file) => {
        const { originalname, size, path } = uploadedFile;

        if (originalname === file.name && size === file.size) {
            deleteData(
                fileDelete,
                path,
                (onSuccess) => {
                    if (onSuccess.data.filedelete === "success") {
                        Toast("File Deleted", "success");
                        setIsUpload(false);
                    }
                },
                (onFail) => {}
            );
        }
    };

    const files = acceptedFiles.map((file, index) => (
        <div
            className="mt-3 alert alert-success alert-dismissible fade show"
            style={{ color: "black" }}
            role="alert"
            key={index}
        >
            <div className="row">
                <div className="col-8">
                    <div
                        style={{
                            fontWeight: "bold",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {file.name}
                        <span style={{ color: "gray" }}>
                            ({parseInt(file.size / 1024)}K)
                        </span>
                    </div>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                    {!uploadComplete && <Progressbar percentage={percentage} />}
                </div>
                <button
                    type="button"
                    className="close"
                    onClick={() => {
                        onBtnRemove(file);
                    }}
                >
                    <div area-hidden="true">&times;</div>
                </button>
            </div>
        </div>
    ));

    return (
        <>
            <div className="row m-auto mt-4">
                <div className="col-sm">
                    <div
                        {...getRootProps({ className: "uploadParts" })}
                        style={{
                            height: "200px",
                            borderColor:
                                errors[name] && touched[name] && colors.danger,
                        }}
                    >
                        <input {...getInputProps()} />
                        <div>
                            <p className="mt-3" style={textStyle}>
                                {
                                    "Drag & drop a file here, or click to select a file"
                                }
                            </p>
                            <div
                                className=" d-flex justify-content-center text-center mt-2"
                                style={textStyle}
                            >
                                <p>
                                    <span className="font-weight-bold">
                                        Supported files:
                                    </span>
                                    <br />
                                    {accept
                                        ? accept
                                        : "Select the Method from the box first"}
                                    <br />
                                    {requirementNote}
                                </p>
                            </div>
                        </div>
                    </div>
                    <ErrorMessage
                        error={errors[name]}
                        visible={touched[name]}
                    />
                    {isUpload && files}
                </div>
            </div>
        </>
    );
}

export default DropZone;

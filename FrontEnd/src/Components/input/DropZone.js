import Axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { postDataWithCofig } from "../../commonApi/CommonApi";
import { dropzone } from "../../commonApi/Link";
import "./DropZone.css";
import Alert from "../Alert";
import Progressbar from "../Progressbar";
import ErrorMessage from "../formik/ErrorMessage";
import { colors } from "../../Values/colors";

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
  label,
}) {
  const [errorMessage, setErrorMessage] = useState(alert.message);
  const [alertType, setAlertType] = useState(alert.type);
  //const [uploadedFiles, setUploadedFiles] = useState([]);
  const [percentage, setUploadPercentage] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  //const accept = '.pdf, .jpeg, .dxf, .stl, .obj, .step, .tif';

  const textStyle = { color: "gray" };

  const onDropAccepted = (acceptedFiles) => {
    setUploadComplete(false);
    setIsUpload(true);
    // setMessage("");

    console.log(acceptedFiles[0], "file");

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

      // Axios.post(`${window.host}/upload`, formData, {
      //     headers: {
      //         "Content-Type": "multipart/form-data",
      //     },
      //     onUploadProgress: (progressEvent) => {
      //         setUploadPercentage(
      //             parseInt(
      //                 Math.round(
      //                     (progressEvent.loaded * 100) /
      //                         progressEvent.total
      //                 )
      //             )
      //         );
      //     },
      // }).then((response) => {
      //     setUploadPercentage(0);
      //     if (response.data.msg) {
      //         const { fileName, filePath, msg, oldFileName } =
      //             response.data;
      //         setUploadedFile({ fileName, filePath, oldFileName });
      //         setMessage(msg);
      //         setAlertType("alert-danger");
      //     } else {
      //         setUploadComplete(true);
      //         const { fileName, filePath, oldFileName } = response.data;
      //         setUploadedFile({ fileName, filePath, oldFileName });
      //         parentCallback({ fileName, filePath });
      //     }
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const onDropRejected = (rejectedFiles) => {
    var errorMsg = rejectedFiles[0].errors[0].code;
    setErrorMessage(errorMsg);
    setAlertType("alert-danger");
    console.log(rejectedFiles);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    // disabled: accept ? false : true,
    // accept: accept,
    maxFiles: 1,
    // maxSize: 15 * 1000 * 1000,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel: () => {
      handleBlur(name);
    },
  });

  // const onBtnRemove = (file) => {
  //     const { fileName, filePath, oldFileName } = uploadedFile;
  //     console.log(uploadedFile);
  //     if (fileName === file.name || oldFileName === file.name) {
  //         Axios.post(`${window.host}/delete`, {
  //             filePath: filePath,
  //         }).then((response) => {
  //             if (response.data) {
  //                 const { msg, removed } = response.data;
  //                 if (removed) {
  //                     setMessage(msg);
  //                     setAlertType("alert-success");
  //                     setIsUpload(false);
  //                 } else {
  //                     setMessage(msg);
  //                 }
  //             }
  //         });
  //     }
  // };

  const files = acceptedFiles.map((file, index) => (
    <div
      className="alert alert-success alert-dismissible fade show"
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
          // onClick={() => {
          //     onBtnRemove(file, index);
          // }}
        >
          <div area-hidden="true">&times;</div>
        </button>
      </div>
    </div>
  ));

  return (
    <>
      {label && <div className="mb-2">{label}</div>}
      <div className="row m-auto mt-4">
        <div className="col-sm">
          <div
            {...getRootProps({ className: "uploadParts" })}
            style={{
              height: "200px",
              borderColor: errors[name] && touched[name] && colors.danger,
            }}
          >
            <input {...getInputProps()} />
            <div>
              <p className="mt-3" style={textStyle}>
                {"Drag & drop a file here, or click to select a file"}
              </p>
              <div
                className=" d-flex justify-content-center text-center mt-2"
                style={textStyle}
              >
                <p>
                  <span className="font-weight-bold">Supported files:</span>
                  <br />
                  "Select the Fabrication Process"
                  <br />
                  {requirementNote}
                </p>
              </div>
            </div>
          </div>
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </div>
        {isUpload && (
          <div className="row mt-3 ml-auto">
            <div className="col-sm">{files}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default DropZone;

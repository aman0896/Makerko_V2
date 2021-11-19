import Axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Alert from "./Alert";
import "./dropZone.css";
import { GetCookiesInfo } from "./GlobalFunction";
import ProgressBar from "./ProgressBar";

const path = require("path");

function Dropzone({
  title,
  accept,
  requirementNote,
  parentCallback,
  path,
  upload = false,
  showAlert,
  setShowAlert,
  alertMessage,
}) {
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState();
  //const [uploadedFiles, setUploadedFiles] = useState([]);
  const [percentage, setUploadPercentage] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  //const accept = '.pdf, .jpeg, .dxf, .stl, .obj, .step, .tif';

  const textStyle = { color: accept ? "" : "gray" };

  const onDropAccepted = (acceptedFiles) => {
    const { email } = GetCookiesInfo();
    // console.log(acceptedFiles, 'uploadedFiles');
    // const files = URL.createObjectURL(acceptedFiles[0])
    setUploadComplete(false);
    setIsUpload(true);
    setMessage("");
    //#region for multiple upload
    //setUploadedFiles((uploadedFile) => uploadedFile.concat(acceptedFiles));

    // const formData = new FormData();
    // acceptedFiles.forEach((acceptedFile) => {
    //   formData.append("file", acceptedFile);
    // });
    // Axios.post(`http://${ipAddress}:3001/upload`, formData, {
    //   onUploadProgress: (progressEvent) => {
    //     setUploadPercentage(
    //       parseInt(
    //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //       )
    //     );
    //   },
    // })
    //   .then((response) => {
    //     setUploadPercentage(0);
    //     setUploadComplete(true);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
    //#endregion

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("user", email);
    formData.append("path", path);
    try {
      Axios.post(`${window.host}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      }).then((response) => {
        setUploadPercentage(0);

        if (response.data.msg) {
          const { fileName, filePath, msg, oldFileName } = response.data;
          setUploadedFile({ fileName, filePath, oldFileName });
          setMessage(msg);
          setAlertType("alert-danger");
        } else {
          setUploadComplete(true);
          const { fileName, filePath, oldFileName } = response.data;
          setUploadedFile({ fileName, filePath, oldFileName });
          parentCallback({ fileName, filePath });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onDropRejected = (rejectedFiles) => {
    var errorMsg = rejectedFiles[0].errors[0].code;
    setMessage(errorMsg);
    setAlertType("alert-danger");
    console.log(rejectedFiles);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: accept ? false : true,
    accept: accept,
    maxFiles: 1,
    maxSize: 15 * 1000 * 1000,
    onDropAccepted,
    onDropRejected,
  });

  const onBtnRemove = (file) => {
    const { fileName, filePath, oldFileName } = uploadedFile;
    console.log(uploadedFile);
    if (fileName === file.name || oldFileName === file.name) {
      Axios.post(`${window.host}/delete`, {
        filePath: filePath,
      }).then((response) => {
        if (response.data) {
          const { msg, removed } = response.data;
          if (removed) {
            setMessage(msg);
            setAlertType("alert-success");
            setIsUpload(false);
          } else {
            setMessage(msg);
          }
        }
      });
    }
  };

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
            {file.path}
            <span style={{ color: "gray" }}>
              ({parseInt(file.size / 1024)}K)
            </span>
          </div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {file == acceptedFiles[0] && !uploadComplete && (
            <ProgressBar percentage={percentage} />
          )}
        </div>
        <button
          type="button"
          className="close"
          onClick={() => {
            onBtnRemove(file, index);
          }}
        >
          <div area-hidden="true">&times;</div>
        </button>
      </div>
    </div>
  ));

  return (
    <div className={upload ? "" : "ml-5 mt-5"}>
      <div className="col-lg">
        <div className="title">
          {title}
          {upload ? "" : <span style={{ color: "red" }}>*</span>}
        </div>
      </div>
      {console.log(alertMessage, "message", showAlert)}
      {showAlert && upload && (
        <div className="mt-4">
          <Alert
            setShowAlert={setShowAlert}
            alertType="alert-warning"
            alertMessage={alertMessage}
          />
        </div>
      )}
      {message && (
        <div className="row mt-3 ml-auto">
          <div className="col-sm">
            <div className={`alert ${alertType}`} role="alert">
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="row ml-auto mt-4">
        <div className="col-sm">
          <div
            {...getRootProps({ className: "uploadParts" })}
            style={{ height: "300px", borderColor: "black" }}
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
                  {accept ? accept : "Select the Fabrication Process"}
                  <br />
                  {requirementNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUpload && (
        <div className="row mt-3 ml-auto">
          <div className="col-sm">{files}</div>
        </div>
      )}
    </div>
  );
}

export default Dropzone;

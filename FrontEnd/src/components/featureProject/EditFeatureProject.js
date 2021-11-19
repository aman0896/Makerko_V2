import React, { Component } from "react";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import "./feature.css";
import "../common/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/Button";
import CancelButton from "../global/CancelButton";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import ReactToastify from "../global/ReactToastify";
import NotFoundErr from "../global/404Error";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import ImageCropper from "./ImageCropper";
import axios from "axios";
import { File_Server } from "../common/Link";
import ProgressBar from "../global/ProgressBar";

const localIpUrl = require("local-ip-url");
const ipAddress = localIpUrl("public");

class Editfeature extends Component {
  constructor() {
    super();

    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          "bold",
          "italic",
          "|",
          "bulletedList",
          "numberedList",
          "redo",
          "undo",
        ],
      },

      language: "en",
      default: "My default value",
    };
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.state = {
      date: date,
      incorrectPath: true,
      imageCropper: false,
      isLoading: true,

      imageCropperCover: false,
      showCropButton: false,
      showCropButtonCover: false,
    };
  }

  state = {
    setShow: true,
    process: "",
    material: "",
    title: "",
    summary: "",
    userinfo: "",
    data: "",
    fileName: "",
    filePath: "",
    description: "",
    id: "",
    Summary: "",
    Description: "",
    previewImage: [],
    previewMultipleImage: [],
    deleteImage: [],
    addImage: [],
    deletePreviewImage: "",
    summaryError: false,
    descriptionError: false,
    photosError: false,
    maxImage: false,
    alertMessage: "",
    pdfFile: "",
    pdfName: "",
    PDF_Document: "",
    file: "",

    imageCoverError: false,
    fileCover: "",
    cropperCover: "",
    coverData: "",
    coverImagePath: "",

    showCropButtonCover: true,
    progress: null,
    size: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);

    Axios.post(`${window.host}/edit-project`, {
      id: id,
    }).then((response) => {
      this.setState({ isLoading: false });
      if (response.data.wrongProject) {
        console.log("wrong");
        this.setState({ incorrectPath: true });
        return;
      } else if (response.data) {
        console.log("data", response.data);
        const { filePath } = JSON.parse(response.data[0].Image);
        const imagePath = JSON.parse(response.data[0].Files);
        const coverImagePath = JSON.parse(response.data[0].Cover_Image);

        const project = response.data[0];
        this.setState({
          incorrectPath: false,
          title: project.Title,
          process: project.Fabrication_Process,
          material: project.Material,
          imagePath: filePath,
          summary: project.Summary,
          description: project.Description,
          previewImage: imagePath,
          userinfo: project.Email,
          coverImagePath: coverImagePath.filePath,
        });
        if (project.PDF_Document) {
          const { fileName, filePath } = JSON.parse(project.PDF_Document);
          this.setState({
            pdfFile: { fileName, filePath },
            pdfName: fileName,
          });
        }
      }
    });
  }

  handleChange = (e, editor) =>
    this.setState({ summary: editor.getData(), summaryError: false });

  handleChangedescription = (e, editor) =>
    this.setState({
      description: editor.getData(),
      descriptionError: false,
    });

  onchange = (e) => {
    const { previewImage } = this.state;
    const formData = new FormData();
    const files = e.target.files;
    var images = [];
    const MAX_LENGTH = 10 - previewImage.length;
    console.log("iiiii", previewImage);

    if (Array.from(e.target.files).length > MAX_LENGTH) {
      e.preventDefault();
      this.setState({
        maxImage: true,
        alertMessage: " Cannot upload total images more than 10",
      });
      return;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    this.setState({ previewMultipleImage: images });

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("path", "FeatureProject/projectUploads");

    Axios.post(`${window.host}/multipleupload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      {
        console.log(response.data);
        var addData = JSON.stringify(response.data);
        var data = JSON.parse(addData);
        this.setState({
          addImage: data,
          photosError: false,
          maxImage: false,
        });
      }
    });
  };

  onDeleteClick = (filepath) => {
    const { previewImage } = this.state;
    const filteredData = previewImage.filter((data) => {
      if (data.filePath !== filepath) {
        console.log("filtered");
        return data;
      }
    });

    console.log(filteredData);
    const imageData = JSON.stringify(filteredData);

    this.setState({
      previewImage: filteredData,
      deleteImage: filepath,
      deletePreviewImage: imageData,
    });
  };

  handleImageOnChange = (e) => {
    console.log(e, ".......");
    const files = e.target.files;
    if (e.target.id === "main-btn") {
      console.log("inside main");
      if (files.length !== 0) {
        this.setState({
          file: URL.createObjectURL(e.target.files[0]),
          previewFileName: files[0].name,
          imageCropper: true,
          showCropButton: true,
        });
      }
    } else {
      console.log("inside dfd");
      if (files.length !== 0) {
        console.log("inside dfvddcd");
        this.setState({
          fileCover: URL.createObjectURL(e.target.files[0]),
          FileName: files[0].name,
          imageCropperCover: true,
          showCropButtonCover: true,
        });
      }
    }
    // const previewImage = this.state;
    // const formData = new FormData();
    // const files = e.target.files;
    // const { id } = this.props.match.params;

    // if (files.length !== 0) {
    //   this.setState({
    //     file: URL.createObjectURL(e.target.files[0]),

    //     imageCropper: true,
    //     showCropButton: true,
    //   });
    // }
    // formData.append("file", files[0]);
    // console.log("iiid", this.state.id);
    // formData.append("path", "FeatureProject/projectMainPhoto");
    // formData.append("feature", "feature");

    // Axios.post(`${window.host}/upload`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then((response) => {
    //   if (response.data.msg) {
    //     console.log(response.data.msg);
    //     this.setState({ error: response.data.msg });
    //   } else {
    //     console.log(response.data);
    //     var image = JSON.stringify(response.data);

    //     Axios.post(`${window.host}/changeimage`, {
    //       id: id,
    //       image: image,
    //       userStatus: "feature",
    //     }).then((response) => {
    //       console.log(response.data);
    //     });
    //     const { fileName, filePath } = JSON.parse(image);
    //     console.log(filePath);
    //     this.setState({ imagePath: filePath });
    //   }
    // });
  };
  onPdfFileUpload = (e) => {
    const path = "uploads";
    const formData = new FormData();
    var { progress } = this.state;
    formData.append("file", e.target.files[0]);
    formData.append("path", "FeatureProject/pdfUploads");
    formData.append("feature", "feature");
    if (e.target.files.length >= 0) {
      this.setState({
        pdfName: e.target.files[0].name,
        size: e.target.files[0].size,
      });
    }
    Axios.post(`${window.host}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        progress = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        this.setState({ progress: progress });
      },
    }).then((response) => {
      const { fileName, filePath } = response.data;
      if (e.target.files.length >= 0) {
        this.setState({
          pdfFile: { fileName, filePath },
          //   pdfName: fileName,
          //   size: e.target.files[0].size,
        });
      }
    });
  };
  handleCallback = (childData) => {
    const { data, formData } = childData;
    console.log("data", childData);
    this.setState({ data: data, imageCropper: false });

    const { id } = this.props.match.params;
    formData.append("path", "FeatureProject/projectMainPhoto");
    formData.append("feature", "feature");
    formData.append("name", this.state.previewFileName);
    // console.log(files, formData);
    Axios.post(`${window.host}/projectUpload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.data.msg) {
        console.log(response.data.msg);
        this.setState({ error: response.data.msg });
      } else {
        console.log(response.data);
        var image = JSON.stringify(response.data);

        Axios.post(`${window.host}/changeimage`, {
          id: id,
          image: image,
          userStatus: "feature",
        }).then((response) => {
          console.log(response.data);
        });
        const { fileName, filePath } = JSON.parse(image);
        console.log(filePath);
        this.setState({ imagePath: filePath });
        this.state.cropper.setDragMode("move");
      }
    });
  };
  onCoverPhotoCrop = (childData) => {
    const { data, formData } = childData;
    console.log("data", childData);
    this.setState({ coverData: data, imageCropperCover: false });

    const { id } = this.props.match.params;
    formData.append("path", "FeatureProject/projectCoverPhoto");
    formData.append("feature", "feature");
    formData.append("name", this.state.FileName);
    // console.log(files, formData);
    Axios.post(`${window.host}/projectUpload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.data.msg) {
        console.log(response.data.msg);
        this.setState({ error: response.data.msg });
      } else {
        console.log(response.data);
        var image = JSON.stringify(response.data);

        Axios.post(`${window.host}/changeCoverImage`, {
          id: id,
          image: image,
          userStatus: "feature",
        }).then((response) => {
          console.log(response.data);
        });
        const { fileName, filePath } = JSON.parse(image);
        console.log(filePath);
        this.setState({ coverImagePath: filePath });
        this.state.cropperCover.setDragMode("move");
      }
    });
  };

  render() {
    const {
      process,
      material,
      title,
      date,
      summary,
      description,
      imagePath,
      Summary,
      Description,
      deletePreviewImage,
      previewMultipleImage,
      pdfName,
      deleteImage,
      addImage,
      previewImage,
      summaryError,
      descriptionError,
      photosError,
      maxImage,
      alertMessage,
      incorrectPath,
      isLoading,
      file,
      showCropButton,
      imageCropper,
      fileCover,
      imageCropperCover,
      showCropButtonCover,
      coverData,
      uploadedCoverImage,
      imageCoverError,
      coverImagePath,
      progress,
      size,
    } = this.state;
    console.log("concadele", previewImage);

    console.log("concatadd", addImage);
    var fileList;
    var minImage;
    var alertMessageMin;
    if (addImage != null && previewImage != null) {
      fileList = previewImage.concat(addImage);
    } else if (addImage != null) {
      fileList = addImage;
    } else if (previewImage != null) {
      fileList = previewImage;
    }
    console.log(fileList, "filess");

    return (
      <Fragment>
        {isLoading ? (
          <div></div>
        ) : incorrectPath ? (
          <NotFoundErr />
        ) : (
          <div className="container mt-5 pt-5">
            <h5 className="font-weight-bold" style={{ color: "#5044fd" }}>
              Edit Project
            </h5>

            <Formik
              enableReinitialize={true}
              initialValues={{
                process: process,
                material: material,
                title: title,
                summary: "",
                userinfo: "",
                data: "",
                image: "",
                photos: "",
                description: "",
                fileName: "",
                filePath: "",
                files: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Required";
                }
                if (!values.process) {
                  errors.process = "Required";
                }
                if (!values.material) {
                  errors.material = "Required";
                }

                if (!description) {
                  errors.description = "Required";
                  this.setState({
                    descriptionError: true,
                  });
                }

                if (fileList.length < 3) {
                  errors.files = "Required photos";
                  this.setState({
                    maxImage: true,
                    alertMessage: "Upload photos more than 3",
                  });
                }
                if (!summary) {
                  errors.summary = "Required";
                  this.setState({ summaryError: true });
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const { pdfFile } = this.state;

                var fileName = null;
                var filePath = null;
                if (pdfFile) {
                  console.log(pdfFile, pdfFile.filePath);
                  fileName = pdfFile.fileName;
                  filePath = pdfFile.filePath;
                }
                const pdfUrl = JSON.stringify({
                  fileName: fileName,
                  filePath: filePath,
                });

                setTimeout(() => {
                  const { id } = this.props.match.params;
                  Axios.post(`${window.host}/update-project`, {
                    filePath: deleteImage,
                  }).then((response) => {
                    {
                    }
                  });

                  Axios.post(`${window.host}/update-project`, {
                    process: values.process,
                    material: values.material,
                    summary: summary,
                    title: values.title,

                    date: date,
                    description: description,
                    file: JSON.stringify(fileList),

                    projectID: id,
                    pdfUrl: filePath ? pdfUrl : null,
                  }).then((response) => {
                    if (response.data) {
                      const { projectUpdate } = response.data;
                      if (projectUpdate) {
                        toast("Project Updated Successfully");

                        setTimeout(() => {
                          this.props.history.push({
                            pathname: "/edit-projectlist",
                          });
                          this.props.history.go();
                        }, 2000);
                      }
                    }
                  });

                  setSubmitting(false);
                }, 100);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  {console.log(imagePath, "--", coverImagePath)}
                  <div className="feature-project">
                    <div className="mb-4">
                      <label
                        className="font-weight-bold  mb-3 "
                        htmlFor="title"
                      >
                        Update Cover Photo of Project:
                      </label>

                      <div
                        style={{
                          position: "relative",
                          height: 350,
                          width: "100%",
                        }}
                      >
                        <div
                          className="d-flex justify-content-center flex-column"
                          style={{
                            position: "relative",
                            height: 350,
                            width: "100%",
                          }}
                        >
                          {imageCropperCover ? (
                            <div className="mt-5">
                              <ImageCropper
                                file={fileCover ? fileCover : " "}
                                parentCallback={this.onCoverPhotoCrop}
                                getCropper={(cropper) =>
                                  this.setState({
                                    cropperCover: cropper,
                                  })
                                }
                                showCropButton={showCropButtonCover}
                                width="100%"
                                height={320}
                                ratio={10 / 3}
                              />
                            </div>
                          ) : (
                            <img
                              className=""
                              src={`${File_Server}${coverImagePath}`}
                              style={{
                                height: 320,
                                width: "100%",
                                borderRadius: "4px",
                                // objectFit: "cover",
                                border: "1px solid lightgray",
                              }}
                            />
                          )}
                          <span
                            className="camera-icon"
                            style={{
                              right: 0,
                              left: "97%",
                              top: "85%",
                            }}
                          >
                            <MdEdit size="24px" />

                            <input
                              className="avatar-file h-100 w-100"
                              id="cover-btn"
                              type="file"
                              name="file"
                              accept="image/*"
                              onChange={this.handleImageOnChange}
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg  pr-5 flex-column">
                        <div className="mb-2">
                          <label
                            className="font-weight-bold  mb-3 "
                            htmlFor="title"
                          >
                            Update Main Photo of Project:
                          </label>

                          <div className="row  mt-2">
                            <div
                              className="col-lg-5 m-0 pr-0"
                              style={{
                                position: "relative",
                                height: "250px",
                                width: "400px",
                              }}
                            >
                              <div
                                className="d-flex justify-content-center flex-column"
                                style={{
                                  position: "relative",
                                  height: "200px",
                                  width: "100%",
                                }}
                              >
                                {imageCropper ? (
                                  <div className="mt-5">
                                    <ImageCropper
                                      file={file ? file : " "}
                                      parentCallback={this.handleCallback}
                                      getCropper={(cropper) =>
                                        this.setState({
                                          cropper: cropper,
                                        })
                                      }
                                      showCropButton={showCropButton}
                                      height={200}
                                      ratio={4 / 3}
                                      width="300px"
                                    />
                                  </div>
                                ) : (
                                  <img
                                    className=""
                                    src={`${File_Server}${imagePath}`}
                                    style={{
                                      height: "200px",
                                      width: "300px",
                                      borderRadius: "4px",
                                      objectFit: "cover",
                                      border: "1px solid lightgray",
                                    }}
                                  />
                                )}
                                <span className="camera-icon">
                                  <MdEdit size="24px" />

                                  <input
                                    className="avatar-file h-100 w-100"
                                    id="main-btn"
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={this.handleImageOnChange}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <span className="text-danger  text-center">
                                                    {imageError &&
                                                        errors.image &&
                                                        touched.image &&
                                                        errors.image}
                                                </span> */}
                        </div>
                        <div className="mb-2 mt-5">
                          <label
                            className="font-weight-bold mb-3 "
                            htmlFor="summary"
                          >
                            Summary of the Project (Key Features) :
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            placeholder="Enter summary of project"
                            data={summary}
                            config={{
                              placeholder: "Add summary of Project",
                              fontFamily: {
                                options: [
                                  "default",
                                  "Ubuntu, Arial, sans-serif",
                                  "Ubuntu Mono, Courier New, Courier, monospace",
                                ],
                              },
                            }}
                            handleBlur={handleBlur}
                            onChange={(e, editor) => {
                              this.handleChange(e, editor);
                            }}
                          ></CKEditor>{" "}
                          <span className="text-danger  text-center">
                            {summaryError &&
                              errors.summary &&
                              touched.summary &&
                              errors.summary}
                          </span>
                        </div>{" "}
                      </div>{" "}
                      <div className="col-lg">
                        <div className="mb-4">
                          <label
                            className="font-weight-bold mb-3 "
                            htmlFor="title"
                          >
                            Title of Project:
                          </label>

                          <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Enter title of project"
                            name="title"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.title}
                          />
                          <span className="text-danger  text-center">
                            {errors.title && touched.title && errors.title}
                          </span>
                        </div>
                        <div className="mb-4">
                          <label className="font-weight-bold mb-3 ">
                            Manufacturing Process:
                          </label>
                          <input
                            type="text"
                            id="procces"
                            className="form-control"
                            placeholder="eg. CNC, Injection Molding,"
                            name="process"
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.process}
                            noValidate
                          />
                          <span className="text-danger  text-center">
                            {errors.process &&
                              touched.process &&
                              errors.process}
                          </span>
                        </div>
                        <div className="mb-4">
                          <label className="font-weight-bold mb-3 ">
                            Materials:
                          </label>
                          <input
                            type="text"
                            id="material"
                            className="form-control"
                            placeholder="eg. Polypropylene (PP), PVC,"
                            name="material"
                            handleBlur={handleBlur}
                            onChange={handleChange}
                            value={values.material}
                          />
                          <span className="text-danger  text-center">
                            {errors.material &&
                              touched.material &&
                              errors.material}
                          </span>
                        </div>
                        <div className="mb-2 mt-4">
                          <label className="font-weight-bold  mb-3">
                            Project Images:
                          </label>
                          <div className="row mt-2">
                            {previewImage &&
                              previewImage.map((image, index) => (
                                <div className="col-sm-4 mb-3 " key={index}>
                                  <div
                                    style={{
                                      position: "relative",
                                      height: "135px",
                                      width: "135px",
                                    }}
                                  >
                                    <img
                                      src={`${File_Server}${image.filePath}`}
                                      alt={image.fileName}
                                      style={{
                                        height: "135px",
                                        width: "135px",
                                        objectFit: "cover",
                                        border: "1px solid gray",
                                        borderRadius: "6px",
                                      }}
                                    />
                                    <span
                                      className="delete-icon"
                                      onClick={() =>
                                        this.onDeleteClick(image.filePath)
                                      }
                                    >
                                      <i className="fas fa-times-circle"></i>
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="d-flex justify-content-start">
                            <input
                              type="file"
                              id="upload"
                              className="form-control"
                              placeholder="Upload Photos of Project"
                              style={{
                                height: "45px",
                                textAlign: "center",
                              }}
                              multiple
                              placeholder=""
                              name="file"
                              onChange={(e) => this.onchange(e)}
                              accept=".jpeg, .png,.jpg"
                              hidden
                            />

                            <label
                              className="mt-3"
                              id="file-lable"
                              for="upload"
                            >
                              Add Other Photos
                            </label>
                          </div>
                          {maxImage && (
                            <div
                              className={`alert mt-2 alert-warning`}
                              role="alert"
                            >
                              {alertMessage}
                            </div>
                          )}
                          <div className="row mt-2">
                            {previewMultipleImage &&
                              previewMultipleImage.map((image) => (
                                <div className="col-sm-4  mb-4">
                                  <div
                                    style={{
                                      position: "relative",
                                      height: "135px",
                                      width: "135px",
                                    }}
                                  >
                                    <img
                                      src={image}
                                      alt={image.fileName}
                                      style={{
                                        height: "135px",
                                        width: "135px",
                                        objectFit: "cover",

                                        border: "1px solid gray",
                                        borderRadius: "6px",
                                      }}
                                    />
                                  </div>{" "}
                                </div>
                              ))}
                          </div>
                          <span className="text-danger  text-center">
                            {photosError &&
                              errors.photos &&
                              touched.photos &&
                              errors.photos}
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="mb-2 mt-4">
                      <label className="font-weight-bold mb-3 ">
                        Detail Description :
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        config={{
                          placeholder: "Add description",
                        }}
                        handleBlur={handleBlur}
                        onChange={(e, editor) => {
                          this.handleChangedescription(e, editor);
                        }}
                      ></CKEditor>
                      <span className="text-danger  text-center">
                        {descriptionError &&
                          errors.description &&
                          touched.description &&
                          errors.description}
                      </span>
                    </div>
                    <div
                      className="mb-2 mt-4 d-flex justify-content-start flex-column"
                      // style={{ width: '35%' }}
                    >
                      <label className="font-weight-bold mb-3" htmlFor="title">
                        Upload Documents
                      </label>
                      <div className="mt-1 mb-3" style={{ color: "#A0A0A0" }}>
                        Assembly manual, flyer, proposal, etc.
                      </div>
                      <div>
                        {pdfName && (
                          <input
                            type="text"
                            className="form-control mb-4 pdf-input"
                            value={pdfName}
                            readOnly={true}
                            style={{
                              color: "#A0A0A0",
                              backgroundColor: "white",
                              display: "flex",
                              justifyContent: "start",
                            }}
                          />
                        )}
                        {progress && (
                          <div
                            className="alert alert-success alert-dismissible fade show pdf-input"
                            style={{ color: "black" }}
                            role="alert"
                            // key={index}
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
                                  {pdfName}
                                  <span style={{ color: "gray" }}>
                                    ({parseInt(size / 1024)}K)
                                  </span>
                                </div>
                              </div>
                              <div className="col-4 d-flex align-items-center justify-content-end">
                                {progress !== 100 && (
                                  <ProgressBar percentage={progress} />
                                )}
                              </div>
                              {/* <button
                                type="button"
                                className="close"
                                // onClick={() => {
                                //   onBtnRemove(file, index);
                                // }}
                              >
                                <div area-hidden="true">&times;</div>
                              </button> */}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* <input
                        type="text"
                        className="form-control mb-4 pdf-input"
                        value={pdfName}
                        readOnly={true}
                        style={{
                          color: "#A0A0A0",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      /> */}

                      <div className="d-flex justify-content-start">
                        <input
                          type="file"
                          className="form-control "
                          style={{
                            height: "45px",
                            textAlign: "center",
                          }}
                          name="pdfFile"
                          id="pdf-btn"
                          accept=".pdf"
                          onChange={this.onPdfFileUpload}
                          hidden
                        />
                      </div>

                      <div className="d-flex justify-content-start">
                        <label for="pdf-btn" id="file-lable">
                          Add Documents
                        </label>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-end labeltext"
                      style={{
                        marginTop: "50px",
                      }}
                    >
                      {" "}
                      <CancelButton />
                      <Button
                        type="submit"
                        styleClass="btn ml-5"
                        disabled={isSubmitting}
                        btnName="Update"
                      />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
        <ReactToastify />
      </Fragment>
    );
  }
}

export default withRouter(Editfeature);

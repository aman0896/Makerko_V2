import React, { Component, createRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import { GetCookiesInfo } from "../global/GlobalFunction";
import "./feature.css";
import axios from "axios";
import "./inputFeatureProject.css";
import Button from "../global/Button";
import "../global/global.css";
import HtmlParser from "react-html-parser";
import CancelButton from "../global/CancelButton";
import { toast } from "react-toastify";
import ReactToastify from "../global/ReactToastify";
import ImageCropper from "./ImageCropper";
import ProgressBar from "../global/ProgressBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AiFillCheckCircle } from "react-icons/ai";
import TermsAndPolicy from "../main/Terms&Policy";

let file = [];
class feature extends Component {
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
                    "link",
                    "undo",
                    "redo",
                    "fontFamily",
                ],
            },
            fontFamily: {
                options: [
                    "default",
                    "Ubuntu, Arial, sans-serif",
                    "Ubuntu Mono, Courier New, Courier, monospace",
                ],
            },
            fontSize: {
                options: [9, 11, 13, "default", 17, 19, 21],
            },

            language: "en",
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
            error: "",
            uploadedImage: null,
            file,
            previewImage: [],
            customerID: "",
            summaryError: false,
            descriptionError: false,
            imageError: false,
            photosError: false,
            pdfFile: "",
            previewFileName: "",
            firstFileName: "",
            pdfName: "",
            maxImage: false,
            isChecked: false,
            checkboxError: false,
            alertMessage: "",
            data: "",
            cropper: "",
            formData: "",
            imageCropper: false,
            showCropButton: false,
            FileName: "",
            imageCropperCover: false,
            showCropButtonCover: false,
            uploadedCoverImage: "",
            imageCoverError: false,
            fileCover: "",
            cropperCover: "",
            coverData: "",
            progress: null,
            size: null,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    async componentDidMount() {
        const data = await GetCookiesInfo().then((response) => {
            if (response.data) {
                return response.data;
            }
        });
        if (data) {
            axios
                .post(`${window.host}/get-user-info`, {
                    uid: data.uid,
                })
                .then((response) => {
                    console.log("userProfile", response.data);
                    if (response.data) {
                        this.setState({
                            userinfo: response.data[0].Email,
                            customerID: data.uid,
                        });
                    }
                });
        }
    }

    handleChange = (e, editor) =>
        this.setState({ summary: editor.getData(), summaryError: false });

    handleChangedescription = (e, editor) =>
        this.setState({
            description: editor.getData(),
            descriptionError: false,
        });

    onchange = (e) => {
        const formData = new FormData();
        const files = e.target.files;
        const MAX_LENGTH = 10;
        var images = [];

        if (Array.from(e.target.files).length > MAX_LENGTH) {
            e.preventDefault();
            this.setState({
                maxImage: true,
                alertMessage: "Cannot upload files more  than 10",
            });
            return;
        }
        if (Array.from(e.target.files).length < 3) {
            e.preventDefault();
            this.setState({
                maxImage: true,
                alertMessage: "Upload file more than 3",
            });
            return;
        }
        if (files.length !== 0) {
            for (let i = 0; i < e.target.files.length; i++) {
                images.push(URL.createObjectURL(e.target.files[i]));
            }

            this.setState({
                previewImage: images,
                firstFileName: files[0].name,
            });
        }
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }
        formData.append("path", "FeatureProject/projectUploads");

        console.log(files, formData);
        axios
            .post(`${window.host}/multipleupload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.data.msg) {
                    console.log(response.data.msg);
                    this.setState({ error: response.data.msg });
                } else {
                    console.log(response.data);
                    var data = JSON.stringify(response.data);
                    console.log(data, typeof data);
                    this.setState({
                        uploadedFiles: data,
                        photosError: false,
                        maxImage: false,
                    });
                }
            });
    };
    handleImageOnChange = (e) => {
        console.log(e, ".......");
        const files = e.target.files;
        if (e.target.id === "main-btn") {
            if (files.length !== 0) {
                this.setState({
                    file: URL.createObjectURL(e.target.files[0]),
                    previewFileName: files[0].name,
                    imageCropper: false,
                    showCropButton: true,
                });
            }
        } else {
            if (files.length !== 0) {
                this.setState({
                    fileCover: URL.createObjectURL(e.target.files[0]),
                    FileName: files[0].name,
                    imageCropperCover: false,
                    showCropButtonCover: true,
                });
            }
        }
    };

    onPdfFileUpload = (e) => {
        const path = "uploads";
        var { progress } = this.state;
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("path", "FeatureProject/pdfUploads");
        formData.append("feature", "feature");
        axios
            .post(`${window.host}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    progress = parseInt(
                        Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                    );
                    this.setState({ progress: progress });
                },
            })
            .then((response) => {
                const { fileName, filePath } = response.data;
                var data = JSON.stringify(response.data);
                if (e.target.files.length >= 0) {
                    this.setState({
                        pdfFile: { fileName, filePath },
                        pdfName: e.target.files[0].name,
                        size: e.target.files[0].size,
                    });
                }
            });
    };
    handleChecked(event) {
        var isChecked = event.target.checked;
        this.setState({
            isChecked: !this.state.isChecked,
            checkboxError: false,
        });

        var item = event.target.value;
    }
    handleCallback = (childData) => {
        const { data, formData } = childData;
        console.log("data", childData);
        this.setState({ data: data, imageCropper: true });

        formData.append("path", "FeatureProject/projectMainPhoto");
        formData.append("feature", "feature");
        formData.append("name", this.state.previewFileName);

        axios
            .post(`${window.host}/projectUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("response");
                if (response.data.msg) {
                    console.log(response.data.msg);
                    this.setState({ error: response.data.msg });
                } else {
                    console.log(response.data);
                    var data = JSON.stringify(response.data);
                    //var int = typeof data;
                    console.log(data, typeof data);
                    this.setState({ uploadedImage: data, imageError: false });
                    this.state.cropper.setDragMode("move");
                }
            });
    };
    onCoverPhotoCrop = (childData) => {
        const { data, formData } = childData;
        console.log("data", childData);
        this.setState({ coverData: data, imageCropperCover: true });

        formData.append("path", "FeatureProject/projectCoverPhoto");
        formData.append("feature", "feature");
        formData.append("name", this.state.FileName);

        axios
            .post(`${window.host}/projectUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("response");

                console.log(response.data);
                var data = JSON.stringify(response.data);

                this.setState({
                    uploadedCoverImage: data,
                    imageCoverError: false,
                });
                this.state.cropperCover.setDragMode("move");
            });
    };

    render() {
        const {
            process,
            material,
            title,
            date,
            summary,
            userinfo,
            description,
            error,
            loading,
            fileName,
            fileURL,
            filePath,
            uploadedFiles,
            width,
            height,
            uploadedImage,
            file,
            previewImage,
            customerID,
            summaryError,
            descriptionError,
            imageError,
            photosError,
            previewFileName,
            firstFileName,
            pdfName,
            maxImage,
            isChecked,
            checkboxError,
            alertMessage,
            data,
            imageCropper,
            showCropButton,
            fileCover,
            imageCropperCover,
            showCropButtonCover,
            coverData,
            uploadedCoverImage,
            imageCoverError,
            progress,
            size,
        } = this.state;

        return (
            <div>
                {console.log(progress, "checked")}
                <div className="container mt-5 pt-5">
                    <h5
                        className="font-weight-bold "
                        style={{ color: "#5044fd" }}
                    >
                        Feature Project
                    </h5>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            process: "",
                            material: "",
                            title: "",
                            summary: "",
                            userinfo: "",
                            data: "",
                            image: "",
                            photos: "",
                            description: "",
                            isChecked: false,
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
                            } else if (!isChecked) {
                                errors.isChecked =
                                    "Please accept the terms and conditions to continue.";
                                this.setState({ checkboxError: true });
                            }
                            if (!uploadedFiles) {
                                errors.photos = "Required Photos";
                                this.setState({ photosError: true });
                            }
                            if (!uploadedImage) {
                                errors.image = "Required Photo";
                                this.setState({ imageError: true });
                            }
                            if (!uploadedCoverImage) {
                                errors.image = "Required Photo";
                                this.setState({ imageCoverError: true });
                            }
                            if (!summary) {
                                errors.summary = "Required";
                                this.setState({ summaryError: true });
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const { pdfFile } = this.state;
                            const { fileName, filePath } = pdfFile;
                            const pdfUrl = JSON.stringify({
                                fileName: fileName,
                                filePath: filePath,
                            });

                            setTimeout(() => {
                                if (!error) {
                                    axios
                                        .post(
                                            `${window.host}/feature-project`,
                                            {
                                                id: customerID,
                                                process: values.process,
                                                material: values.material,
                                                summary: summary,
                                                title: values.title,
                                                userinfo: userinfo,
                                                date: date,
                                                description: description,
                                                files: uploadedFiles,
                                                image: uploadedImage,
                                                pdfUrl: filePath
                                                    ? pdfUrl
                                                    : null,
                                                coverImage: uploadedCoverImage,
                                            }
                                        )
                                        .then((response) => {
                                            console.log("data");
                                            console.log(response.data);
                                            if (response.data) {
                                                const { projectUpdate } =
                                                    response.data;
                                                if (projectUpdate) {
                                                    toast(
                                                        "Project Created Successfully"
                                                    );
                                                    setTimeout(() => {
                                                        window.location.href =
                                                            "/";
                                                    }, 500);
                                                }
                                            }
                                        });
                                }
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
                                <div className="feature-project">
                                    <div className="mb-2">
                                        <label
                                            className="font-weight-bold mb-3"
                                            htmlFor="title"
                                        >
                                            Choose Cover Photo of Project:
                                        </label>
                                        <div className="mt-2">
                                            {imageCropperCover ? (
                                                <img
                                                    src={coverData}
                                                    style={{
                                                        height: 350,
                                                        width: "100%",
                                                        // objectFit: "cover",
                                                    }}
                                                />
                                            ) : (
                                                <ImageCropper
                                                    file={
                                                        fileCover
                                                            ? fileCover
                                                            : " "
                                                    }
                                                    parentCallback={
                                                        this.onCoverPhotoCrop
                                                    }
                                                    getCropper={(cropper) =>
                                                        this.setState({
                                                            cropperCover:
                                                                cropper,
                                                        })
                                                    }
                                                    showCropButton={
                                                        showCropButtonCover
                                                    }
                                                    width="100%"
                                                    height={350}
                                                    ratio={10 / 3}
                                                />
                                            )}
                                        </div>
                                        <div className="float-right">
                                            <div
                                                className="row  mt-1 mr-1"
                                                style={{
                                                    width: "300px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #C4C4C4",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    // float: "right",
                                                }}
                                            >
                                                <div className="col-lg-5 m-0 pr-0 mt-2">
                                                    <input
                                                        type="file"
                                                        id="cover-btn"
                                                        className="form-control"
                                                        placeholder="Upload Photos of Project"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                        name="file"
                                                        handleBlur={handleBlur}
                                                        onChange={(e) =>
                                                            this.handleImageOnChange(
                                                                e
                                                            )
                                                        }
                                                        accept=".jpeg, .png, .jpg"
                                                        hidden
                                                    />

                                                    <label
                                                        for="cover-btn"
                                                        id="file-lable"
                                                    >
                                                        Choose File
                                                    </label>
                                                </div>

                                                <div
                                                    className="col-xl pt-0  d-flex align-items-center"
                                                    style={{
                                                        color: "gray",
                                                    }}
                                                >
                                                    {previewFileName
                                                        ? previewFileName
                                                        : "NO FILE CHOSEN"}
                                                </div>
                                            </div>

                                            <div className="text-danger">
                                                {imageCoverError &&
                                                    errors.image &&
                                                    touched.image &&
                                                    errors.image}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg  pr-5 flex-column">
                                            <div className="mb-2">
                                                <label
                                                    className="font-weight-bold mb-3"
                                                    htmlFor="title"
                                                >
                                                    Choose Main Photo of
                                                    Project:
                                                </label>
                                                <div className="mt-2">
                                                    {imageCropper ? (
                                                        <img
                                                            src={data}
                                                            style={{
                                                                height: 300,

                                                                //objectFit: "cover",
                                                            }}
                                                        />
                                                    ) : (
                                                        <ImageCropper
                                                            file={
                                                                file
                                                                    ? file
                                                                    : " "
                                                            }
                                                            parentCallback={
                                                                this
                                                                    .handleCallback
                                                            }
                                                            getCropper={(
                                                                cropper
                                                            ) =>
                                                                this.setState({
                                                                    cropper:
                                                                        cropper,
                                                                })
                                                            }
                                                            showCropButton={
                                                                showCropButton
                                                            }
                                                            height={300}
                                                            ratio={4 / 3}
                                                        />
                                                    )}

                                                    {/* <img
                            src={file ? file : " "}
                            alt=""
                            style={{
                              backgroundColor: "lightgray",
                              height: "200px",
                              width: "300px",
                              borderRadius: "4px",
                              objectFit: "cover",
                              border: "1px solid lightgray",
                            }}
                          /> */}
                                                </div>

                                                <div
                                                    className="row  mt-4 ml-1"
                                                    style={{
                                                        width: "300px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #C4C4C4",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <div className="col-lg-5 m-0 pr-0 mt-2">
                                                        <input
                                                            type="file"
                                                            id="main-btn"
                                                            className="form-control"
                                                            placeholder="Upload Photos of Project"
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                            name="file"
                                                            handleBlur={
                                                                handleBlur
                                                            }
                                                            onChange={(e) =>
                                                                this.handleImageOnChange(
                                                                    e
                                                                )
                                                            }
                                                            accept=".jpeg, .png, .jpg"
                                                            hidden
                                                        />

                                                        <label
                                                            for="main-btn"
                                                            id="file-lable"
                                                        >
                                                            Choose File
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="col-xl pt-0  d-flex align-items-center"
                                                        style={{
                                                            color: "gray",
                                                        }}
                                                    >
                                                        {previewFileName
                                                            ? previewFileName
                                                            : "NO FILE CHOSEN"}
                                                    </div>
                                                </div>

                                                <span className="text-danger">
                                                    {imageError &&
                                                        errors.image &&
                                                        touched.image &&
                                                        errors.image}
                                                </span>
                                            </div>
                                            <div className="mb-2 mt-4">
                                                <label
                                                    className="font-weight-bold mb-3"
                                                    htmlFor="summary"
                                                >
                                                    Summary of the Project (Key
                                                    Features) :
                                                </label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    placeholder="Enter summary of project"
                                                    config={{
                                                        placeholder:
                                                            "Add summary of Project",
                                                    }}
                                                    handleBlur={handleBlur}
                                                    onChange={(e, editor) => {
                                                        this.handleChange(
                                                            e,
                                                            editor
                                                        );
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
                                        <div className="col-lg ">
                                            <div className="mb-4">
                                                <label
                                                    className="font-weight-bold mb-3"
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
                                                    {errors.title &&
                                                        touched.title &&
                                                        errors.title}
                                                </span>
                                            </div>
                                            <div className="mb-4">
                                                <label className="font-weight-bold mb-3">
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
                                            <div className="mb-5">
                                                <label className="font-weight-bold mb-3">
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
                                            <div className="mb-4">
                                                <label
                                                    className="font-weight-bold mb-3"
                                                    htmlFor="title"
                                                >
                                                    Upload Other Multiple Photos
                                                    of Project:
                                                </label>
                                                {maxImage && (
                                                    <div
                                                        className={`alert mt-2 alert-warning`}
                                                        role="alert"
                                                    >
                                                        {alertMessage}
                                                    </div>
                                                )}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={firstFileName}
                                                    readOnly={true}
                                                    style={{
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                />
                                                <input
                                                    type="file"
                                                    id="file-btn"
                                                    className="form-control"
                                                    placeholder="Upload Photos of Project"
                                                    style={{
                                                        height: "45px",
                                                        textAlign: "center",
                                                    }}
                                                    multiple
                                                    placeholder=""
                                                    name="file"
                                                    handleBlur={handleBlur}
                                                    onChange={(e) =>
                                                        this.onchange(e)
                                                    }
                                                    accept=".jpeg, .png, .jpg"
                                                    hidden
                                                />
                                                <span className="text-danger  text-center">
                                                    {photosError &&
                                                        errors.photos &&
                                                        touched.photos &&
                                                        errors.photos}
                                                </span>
                                                <div className="d-flex justify-content-end">
                                                    <label
                                                        className="mt-3"
                                                        for="file-btn"
                                                        id="file-lable"
                                                    >
                                                        Add Photos
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {previewImage &&
                                                    previewImage.map(
                                                        (image) => (
                                                            <div className="col-sm-4 mb-3">
                                                                <img
                                                                    src={image}
                                                                    style={{
                                                                        height: "120px",
                                                                        width: "120px",
                                                                        border: "1px solid gray",
                                                                        objectFit:
                                                                            "cover",
                                                                        borderRadius:
                                                                            "4px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 mt-4">
                                        <label className="font-weight-bold mb-3">
                                            Detail Description :
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                placeholder: "Add description",
                                            }}
                                            handleBlur={handleBlur}
                                            onChange={(e, editor) => {
                                                this.handleChangedescription(
                                                    e,
                                                    editor
                                                );
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
                                        <label
                                            className="font-weight-bold mb-3"
                                            htmlFor="title"
                                        >
                                            Upload Documents
                                        </label>
                                        <div
                                            className="mt-1 mb-3"
                                            style={{ color: "#A0A0A0" }}
                                        >
                                            Assembly manual, flyer, proposal,
                                            etc.
                                        </div>

                                        <div>
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
                                                                    fontWeight:
                                                                        "bold",
                                                                    overflow:
                                                                        "hidden",
                                                                    textOverflow:
                                                                        "ellipsis",
                                                                }}
                                                            >
                                                                {pdfName}
                                                                <span
                                                                    style={{
                                                                        color: "gray",
                                                                    }}
                                                                >
                                                                    (
                                                                    {parseInt(
                                                                        size /
                                                                            1024
                                                                    )}
                                                                    K)
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 d-flex align-items-center justify-content-end">
                                                            {progress !==
                                                                100 && (
                                                                <ProgressBar
                                                                    percentage={
                                                                        progress
                                                                    }
                                                                />
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
                                                //accept=".pdf"
                                                onChange={(e) =>
                                                    this.onPdfFileUpload(e)
                                                }
                                                hidden
                                            />
                                        </div>

                                        <div className="d-flex justify-content-start">
                                            <label
                                                for="pdf-btn"
                                                id="file-lable"
                                            >
                                                Add Documents
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        className="row mt-5 mr-2 d-flex justify-content-end"
                                        style={{
                                            backgroundColor: "white",

                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <div>
                                            <input
                                                type="checkbox"
                                                value="terms"
                                                name="terms"
                                                onChange={this.handleChecked}
                                                style={{
                                                    marginRight: "10px",
                                                    marginLeft: "10px",
                                                    marginTop: "3px",
                                                    height: "auto",
                                                }}
                                            />
                                            I agree with&nbsp;
                                            {/* <span
                                                style={{
                                                    textDecoration: "underline",
                                                    color: "#5044fd",
                                                }}
                                            >
                                                {" "}
                                                Terms and Conditions{" "}
                                            </span> */}
                                            <TermsAndPolicy
                                                subject="Terms and Conditions"
                                                file="/terms&policy/T&C.pdf"
                                                type="pdf"
                                                style={{
                                                    color: "#5044fd",
                                                    textDecoration: "underline",
                                                }}
                                            />
                                            &nbsp; before submission of Project
                                            details and files.
                                        </div>
                                    </div>
                                    <div className="text-danger  d-flex justify-content-end mt-4">
                                        {checkboxError &&
                                            touched.isChecked &&
                                            errors.isChecked}
                                    </div>
                                    <div
                                        className="d-flex justify-content-end labeltext"
                                        style={{
                                            marginTop: "50px",
                                        }}
                                    >
                                        <CancelButton />

                                        <Button
                                            type="submit"
                                            styleClass="btn ml-5"
                                            disabled={isSubmitting}
                                            btnName="Upload"
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <ReactToastify />
            </div>
        );
    }
}

export default feature;

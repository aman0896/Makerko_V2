import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Formik } from "formik";
import axios from "axios";
import MfgProcessViewSelected, { ExpandTable } from "./MfgProcessViewSelected";
import ManufacturerServiceSelect from "./ManufacturerServiceSelect";
import FormTextBox, { PasswordField } from "../global/TextBox";
import OtherService from "./OtherServices";
import Location from "./Location";
import Button from "../global/Button";
import "../form/ManufacturerSignup.css";
import Dropzone from "../global/Dropzone";
import { UpdateDetails } from "./Api";
import { GetCookiesInfo } from "../global/GlobalFunction";
import FileButton from "../global/FileButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css";
import { set } from "mobx";
import { toast } from "react-toastify";
import ReactToastify from "../global/ReactToastify";
import Alert from "../global/Alert";
import { File_Server } from "../common/Link";
import ImageCropper, { dataURItoBlob } from "../global/ImageCropper";

var services = [];
function AdditionalDetailsFillUp(props) {
    const [userID, setUserID] = useState();
    const history = useHistory();
    const [makerID, setMakerID] = useState();
    const [error, setError] = useState();
    const [registeredHubs, setRegisteredHubs] = useState();
    const [serviceList, setServiceList] = useState([]);
    const [currentHub, setCurrentHub] = useState();
    var [hubService, setHubService] = useState();
    const [documentPath, setDocumentPath] = useState();
    const [showAddField, setShowAddField] = useState(false);
    const [saveChangeButton, setSaveChangeButton] = useState(false);
    const [isExist, setIsExist] = useState(false);
    const { id } = useParams();
    const [userStatus, setUserStatus] = useState();
    const [updateError, setUpdateError] = useState();
    const [uploadFiles, setUploadFiles] = useState();
    const [logoName, setLogoName] = useState();
    const [documentName, setDocumentName] = useState();
    const [additionalDetail, setAdditionalDetail] = useState();
    const [otherServices, setOtherServices] = useState();
    const [serviceUpdate, setServiceUpdate] = useState(false);
    const [oldOtherServices, setOldOtherServices] = useState();
    const [showAlert, setShowAlert] = useState();
    const [showAlertCover, setShowAlertCover] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertMessageCover, setAlertMessageCover] = useState();
    const [coverImage, setCoverImage] = useState();
    const [logoPath, setLogoPath] = useState();
    const [slogan, setSlogan] = useState("");
    const [errorLogo, setErrorlogo] = useState(false);
    const [previewImage, setPreviewImage] = useState([]);
    const [multipleImage, setMultipleImage] = useState([]);
    const [fileName, setFileName] = useState();
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlertMsg, setShowAlertMsg] = useState(false);
    const [previousImageList, setPreviousImageList] = useState([]);
    const [deletedImage, setDeletedImage] = useState([]);
    const [viewImage, setViewImage] = useState();
    const [showCropper, setCropper] = useState();

    const rowView = "row m-1";
    const colView = "col-lg-3 m-1";

    const [imageDestination, setImageDestination] = useState();
    const [targetName, setTargetName] = useState();
    const [targetFile, setTargetFile] = useState();
    const [coverImageDestination, setCoverImageDestination] = useState();
    const [showCoverImageCropper, setCoverImageCropper] = useState(false);
    const [viewCoverImage, setViewCoverImage] = useState();

    //#region get_service_data_from_db
    useEffect(() => {
        async function GetUserInfo() {
            var data = await GetCookiesInfo().then((response) => {
                if (response.data) {
                    return response.data;
                }
            });
            setUserStatus(data);
            var userInfo = undefined;
            if (data) {
                setUserID(data.uid);
                await axios
                    .post(`${window.host}/get-user-info`, {
                        uid: data.uid,
                    })
                    .then((response) => {
                        if (response) {
                            userInfo = response.data;
                        }
                    });
                axios
                    .get(
                        `${window.host}/manufacturer/${data.uid}/${userInfo[0].Company_Name}`
                    )
                    .then((response) => {
                        console.log(response.data, "dataa");
                        if (response.data) {
                            const { hub, services } = response.data;
                            setCurrentHub(hub[0]);
                            const hubService = services.map((service) => {
                                console.log(service);
                                const { Name, Material_Name, Service_ID } =
                                    service;
                                var data = {
                                    selectedFabrication: {
                                        Service_ID: Service_ID,
                                        Name: Name,
                                    },
                                    materialDetails: JSON.parse(Material_Name),
                                };
                                return data;
                            });
                            setHubService(hubService);
                            setSaveChangeButton(false);
                            if (hub[0].Document_Path) {
                                const { fileName, filePath } = JSON.parse(
                                    hub[0].Document_Path
                                );
                                setDocumentPath({ fileName, filePath });
                            }
                            if (hub[0].Logo) {
                                const { fileName, filePath } = JSON.parse(
                                    hub[0].Logo
                                );
                                setLogoPath({ fileName, filePath });
                                setImageDestination(
                                    `${File_Server}${filePath}`
                                );
                            }
                            if (hub[0].Other_Services) {
                                setOldOtherServices(
                                    JSON.parse(hub[0].Other_Services)
                                );
                            }
                            if (hub[0].Slogan) {
                                setSlogan(hub[0].Slogan);
                            }

                            if (hub[0].CoverImage) {
                                const { fileName, filePath } = JSON.parse(
                                    hub[0].CoverImage
                                );
                                setCoverImage({ fileName, filePath });
                                setCoverImageDestination(
                                    `${File_Server}${filePath}`
                                );
                            }
                            if (hub[0].Additional_Images) {
                                const image = JSON.parse(
                                    hub[0].Additional_Images
                                );
                                setMultipleImage(image);
                            }
                        }
                    });
                setMakerID(data.uid);
            }
        }
        GetUserInfo();
    }, []);
    //#endregion

    const handleOnchange = (e) => {
        const file = e.target.files[0];
        if (e.target.name === "logo") {
            setCropper(true);
            if (file) {
                setTargetName(e.target.name);
                setTargetFile(file);
                setViewImage(URL.createObjectURL(file));
            }
        } else if (e.target.name === "documentFile") {
            //#region oldCode
            const formData = new FormData();
            formData.append("file", file);
            formData.append("path", "documents");
            // if (file.length !== 0) {
            //     if (e.target.name === "documentFile") {
            //         formData.append("path", "documents");
            //     }

            // }
            axios
                .post(`${window.host}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.data.msg) return;
                    else {
                        console.log("response");
                        const { filePath, fileName } = response.data;
                        setDocumentPath({ fileName, filePath });
                        setError(false);
                        //window.location.reload();
                    }
                });
            //#endregion
        } else {
            setCoverImageCropper(true);
            if (file) {
                setTargetName(e.target.name);
                setTargetFile(file);
                setViewCoverImage(URL.createObjectURL(file));
            }
        }
    };

    const dropzoneHandleCallback = (childData) => {
        setCoverImage(childData);
        console.log(JSON.stringify(childData));
        setShowAlertCover(false);
    };

    //#region update_added_services_in_hubServices

    if (hubService) services = hubService.filter((hubService) => hubService);
    const AddService = (data) => {
        var mateiralExist = false;
        var serviceExist = false;

        if (services.length > 0 && data) {
            services.map((service, index) => {
                console.log(data, service);
                if (
                    data.selectedFabrication.Name ===
                    service.selectedFabrication.Name
                ) {
                    serviceExist = true;
                    service.materialDetails.map((materialDetail) => {
                        if (
                            data.materialDetails[0].selectedMaterial
                                .Material_Name ===
                            materialDetail.selectedMaterial.Material_Name
                        ) {
                            setAlertMessage("Material Already Exist");
                            setShowAlert(true);
                            return (mateiralExist = true);
                        }
                    });
                    if (!mateiralExist) {
                        return (service.materialDetails =
                            service.materialDetails.concat(
                                data.materialDetails[0]
                            ));
                    }
                }
            });
            if (!serviceExist) {
                services = services.concat(data);
            }
        } else {
            services = services.concat(data);
        }

        setIsExist(true);
        setHubService(services);
    };
    //#endregion

    //#region on Save Changes_Manufacturer_Services
    const onServiceUpdate = () => {
        console.log("check", hubService);
        axios
            .post(`${window.host}/update-services/${userID}`, {
                hubService: hubService,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    const { serviceUpdate, serviceNull } = response.data;
                    if (serviceUpdate && serviceNull === undefined) {
                        console.log(serviceUpdate);
                        toast("Service Updated");
                        setServiceUpdate(true);
                    } else {
                        setShowAlert(true);
                        setAlertMessage("Atleast One Service Must be Added");
                        setServiceUpdate(false);
                    }
                }
            });
    };
    //#endregion

    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    };
    const handleChangeSlogan = (e) => {
        setSlogan(e.target.value);
    };

    const onProfileImageSave = () => {
        const formData = new FormData();
        const blob = dataURItoBlob(imageDestination);
        formData.append("file", blob, targetFile.name);
        formData.append("path", "logo");
        axios
            .post(`${window.host}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.data.msg) return;
                else {
                    setCropper(false);
                    const { filePath, fileName } = response.data;
                    setLogoPath({ fileName, filePath });
                    setImageDestination(`${File_Server}${filePath}`);
                    setErrorlogo(false);
                    // window.location.reload();
                }
            });
    };

    const onCoverImageSave = () => {
        const formData = new FormData();
        const blob = dataURItoBlob(coverImageDestination);
        formData.append("file", blob, targetFile.name);
        formData.append("path", "coverImage");
        axios
            .post(`${window.host}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.data.msg) return;
                else {
                    setCoverImageCropper(false);
                    const { filePath, fileName } = response.data;
                    console.log(filePath, "response.data");
                    setCoverImage({ fileName, filePath });
                    setCoverImageDestination(filePath);
                    setErrorlogo(false);
                    //window.location.reload();
                }
            });
    };

    const onImageCropCancel = (imageType) => {
        console.log("cancel");
        setCoverImageCropper(false);
        console.log(imageType);
        setCropper(false);
        if (imageType === "logo") {
            setImageDestination(`${File_Server}${logoPath.filePath}`);
        } else if (imageType === "coverImage") {
            console.log(coverImage.filePath, "fileeee");
            setCoverImageDestination(`${File_Server}${coverImage.filePath}`);
        }
        //window.location.reload();
    };

    const handleMultiplePhotos = (e) => {
        const formData = new FormData();
        const files = e.target.files;
        const MAX_LENGTH = 10;
        const MIN_LENGTH = 3;
        var images = [];
        let length = Array.from(e.target.files).length;
        if (multipleImage) {
            length = length + multipleImage.length;
        }

        if (length > MAX_LENGTH || length < MIN_LENGTH) {
            console.log(length, "lenghth");
            e.preventDefault();
            setShowAlertMsg(true);
            setAlertMsg("The  number of images should be at min 3 and max 10");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }
        formData.append("path", "MultiplePhotos");

        axios
            .post(`${window.host}/multipleupload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                let data = response.data;

                if (multipleImage) {
                    data = multipleImage.concat(data);
                }
                setMultipleImage(data);
                setAlertMsg("");
                setShowAlertMsg(false);

                //   this.setState({
                //     uploadedFiles: data,
                //     photosError: false,
                //     maxImage: false,
                //   });
            });
    };

    const onDeleteClick = (filepath) => {
        setShowAlertMsg(false);
        const filteredData = multipleImage.filter((data) => {
            if (data.filePath !== filepath) {
                console.log("filtered");
                return data;
            }
        });
        // const deletedImagePath = [];
        // deletedImagePath.push(filepath);
        console.log("filepath", filepath);
        // deletedImagePath.push(filepath);
        console.log("delete", deletedImage);

        setMultipleImage(filteredData);
        setDeletedImage([...deletedImage, filepath]);
    };

    return (
        <React.Fragment>
            {console.log(logoPath, "path")}
            <div style={{ padding: "2rem" }}>
                <div
                    className="container"
                    style={{
                        paddingTop: "1rem",
                        paddingButtom: "2rem",
                    }}
                >
                    <div>
                        <Formik
                            initialValues={{
                                verificationDocument: "",
                                logo: "",
                                services: "",
                                coverImage: "",
                                slogan: "",
                                multipleImage: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!documentPath) {
                                    errors.verificationDocument = "Required";
                                    setError(true);
                                }
                                if (!logoPath) {
                                    errors.logo = "Required";
                                    setErrorlogo(true);
                                }
                                if (hubService.length === 0) {
                                    errors.services = "Required";
                                    setShowAlert(true);
                                    setAlertMessage(
                                        "Atleast One Service Must be Added"
                                    );
                                }
                                if (!coverImage) {
                                    errors.coverImage = "Required";
                                    setUpdateError(true);
                                    setShowAlertCover(true);
                                    setAlertMessageCover("File not selected");
                                }
                                if (
                                    multipleImage.length < 3 ||
                                    multipleImage.length > 10
                                ) {
                                    errors.multipleImage = "Required";
                                    setShowAlertMsg(true);
                                    setAlertMsg(
                                        "The  number of images should be at min 3 and max 10."
                                    );
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                onServiceUpdate();
                                console.log(otherServices, "others", slogan);
                                UpdateDetails(
                                    userID,
                                    otherServices,
                                    documentPath,
                                    coverImage,
                                    logoPath,
                                    slogan,
                                    JSON.stringify(multipleImage),
                                    deletedImage,
                                    setDeletedImage,

                                    (response) => {
                                        if (response) {
                                            toast("Data Updated Successfully");
                                        }
                                    }
                                );
                                setSubmitting(false);
                            }}
                        >
                            {({
                                errors,
                                touched,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    onKeyDown={onKeyDown}
                                >
                                    {console.log(hubService)}
                                    <div className="p-2">
                                        {/* Manufacturing SErvices split in other Pages */}
                                        <div className="">
                                            {hubService &&
                                                hubService.length > 0 && (
                                                    <div className="pb-4 mb-5">
                                                        <div className="row m-1">
                                                            <span
                                                                style={
                                                                    TitleStyles
                                                                }
                                                            >
                                                                MANUFACTURING
                                                                SERVICE
                                                            </span>
                                                        </div>
                                                        <div className="py-3 pr-3">
                                                            {/* {showAlert && (
																<Alert
																	setShowAlert={
																		setShowAlert
																	}
																	showAlert={
																		showAlert
																	}
																	alertType="alert-warning"
																	alertMessage={
																		alertMessage
																	}
																/>
															)} */}
                                                            {hubService && (
                                                                <div className="">
                                                                    <MfgProcessViewSelected
                                                                        viewsData={
                                                                            hubService
                                                                        }
                                                                        updateviewsData={(
                                                                            updatedData
                                                                        ) =>
                                                                            setHubService(
                                                                                updatedData
                                                                            )
                                                                        }
                                                                        profileEdit={
                                                                            true
                                                                        }
                                                                        showProfile={
                                                                            true
                                                                        }
                                                                    />

                                                                    {/* <div className="mt-3 p-1 d-flex justify-content-end">
																		<Button
																			btnName="Update"
																			type="Button"
																			styleClass="btn btn-small"
																			onClick={
																				onServiceUpdate
																			}
																			disabled={
																				serviceUpdate
																					? false
																					: true
																			}
																		/>
																	</div> */}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>

                                        <span className="text-danger  text-center">
                                            {errors.process &&
                                                touched.process &&
                                                errors.process}
                                        </span>
                                        <div>
                                            <ManufacturerServiceSelect
                                                getAddedService={AddService}
                                                profileEdit={true}
                                                showAlert={showAlert}
                                                alertMessage={alertMessage}
                                                setShowAlert={setShowAlert}
                                            />
                                            <OtherService
                                                getData={(data) =>
                                                    setOtherServices(data)
                                                }
                                                oldOtherServices={
                                                    oldOtherServices
                                                }
                                            />

                                            <div className="mt-5">
                                                <span
                                                    className="font-weight-bold "
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "#5044fd",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Company's Slogan
                                                </span>
                                                <textarea
                                                    type="text"
                                                    className="form-control mt-3"
                                                    style={{
                                                        height: "200px",
                                                    }}
                                                    placeholder="Write Slogan of Company"
                                                    name="slogan"
                                                    onChange={
                                                        handleChangeSlogan
                                                    }
                                                    value={slogan}
                                                />
                                            </div>

                                            {/* <div className="row pt-5 mt-5">
                        <div className="col-lg mt-5 pt-3 p-0 m-0 mb-5"> */}
                                            <div className="mt-5">
                                                <span className="font-weight-bold pb-3 mt-5">
                                                    Upload Company's Logo
                                                </span>
                                                <div className="row">
                                                    <div className="col-4 d-flex align-items-center justify-content-center">
                                                        <FileButton
                                                            title="Choose File"
                                                            id="logo"
                                                            FileName={
                                                                logoPath
                                                                    ? logoPath.fileName
                                                                    : ""
                                                            }
                                                            name="logo"
                                                            onChange={(e) =>
                                                                handleOnchange(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                        <div className="text-danger">
                                                            {errorLogo &&
                                                                errors.logo &&
                                                                touched.logo &&
                                                                errors.logo}
                                                        </div>
                                                    </div>
                                                    <div className="col ml-5">
                                                        {/* {logoPath && (
                                                            <img
                                                                className="mt-2"
                                                                src={`${File_Server}${logoPath.filePath}`}
                                                                alt={
                                                                    logoPath.fileName
                                                                }
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                }}
                                                            />
                                                        )} */}
                                                        <img
                                                            style={{
                                                                width: "200px",
                                                                height: "200px",
                                                                backgroundColor:
                                                                    "lightgray",
                                                                borderRadius:
                                                                    "10px",
                                                                border: "1px solid lightGray",
                                                            }}
                                                            src={
                                                                imageDestination
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center m-5">
                                                    {showCropper && (
                                                        <ImageCropper
                                                            src={viewImage}
                                                            setImageDestination={
                                                                setImageDestination
                                                            }
                                                            onSaveClick={
                                                                onProfileImageSave
                                                            }
                                                            onCancelClick={() =>
                                                                onImageCropCancel(
                                                                    "logo"
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <span className="font-weight-bold pb-3 mt-5">
                                                    Verification Document
                                                </span>
                                                <div className="row">
                                                    <div className="col-4 d-flex align-items-center justify-content-center">
                                                        <FileButton
                                                            title="Choose File"
                                                            id="documentFile"
                                                            FileName={
                                                                documentPath
                                                                    ? documentPath.fileName
                                                                    : ""
                                                            }
                                                            name="documentFile"
                                                            onChange={(e) =>
                                                                handleOnchange(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                        <div className="text-danger">
                                                            {error &&
                                                                errors.verificationDocument &&
                                                                touched.verificationDocument &&
                                                                errors.verificationDocument}
                                                        </div>
                                                    </div>
                                                    <div className="col ml-5">
                                                        {documentPath && (
                                                            <img
                                                                className="mt-2"
                                                                src={`${File_Server}${documentPath.filePath}`}
                                                                alt={
                                                                    documentPath.fileName
                                                                }
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    border: "1px solid lightGray",
                                                                    borderRadius: 10,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <span className="font-weight-bold pb-3 mt-5">
                                                    Upload Cover Photo
                                                </span>
                                                <div className="row">
                                                    <div className="col-4 d-flex align-items-center justify-content-center">
                                                        <FileButton
                                                            title="Choose File"
                                                            id="coverImage"
                                                            FileName={
                                                                coverImage
                                                                    ? coverImage.fileName
                                                                    : ""
                                                            }
                                                            name="coverImage"
                                                            onChange={(e) =>
                                                                handleOnchange(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                        <div className="text-danger">
                                                            {errorLogo &&
                                                                errors.logo &&
                                                                touched.logo &&
                                                                errors.logo}
                                                        </div>
                                                    </div>
                                                    <div className="col ml-5">
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                backgroundColor:
                                                                    "lightgray",
                                                                borderRadius:
                                                                    "10px",
                                                                border: "1px solid black",
                                                            }}
                                                            src={
                                                                coverImageDestination
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center m-5">
                                                    {showCoverImageCropper && (
                                                        <ImageCropper
                                                            src={viewCoverImage}
                                                            setImageDestination={
                                                                setCoverImageDestination
                                                            }
                                                            onSaveClick={
                                                                onCoverImageSave
                                                            }
                                                            onCancelClick={() =>
                                                                onImageCropCancel(
                                                                    "coverImage"
                                                                )
                                                            }
                                                            aspectRatio={10 / 3}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {/* <Dropzone
                                                title="Upload Cover Photos"
                                                accept={".jpg, .jpeg, .png"}
                                                requirementNote="File size < 15 MB"
                                                parentCallback={
                                                    dropzoneHandleCallback
                                                }
                                                path="coverImage"
                                                showAlert={showAlertCover}
                                                alertMessage={alertMessageCover}
                                                setShowAlert={setShowAlertCover}
                                                upload={true}
                                            /> */}
                                        </div>
                                        {/* </div>
                    </div> */}
                                        <div className="mb-4 mt-5 ml-4">
                                            <label
                                                className="font-weight-bold mb-3"
                                                htmlFor="title"
                                            >
                                                Upload Other Multiple Photos of
                                                Company:
                                            </label>
                                            {/* {maxImage && (
                        <div
                          className={`alert mt-2 alert-warning`}
                          role="alert"
                        >
                          {alertMessage}
                        </div>
                      )} */}
                                            {/* <input
                        type="text"
                        className="form-control"
                        value={fileName}
                        readOnly={true}
                        style={{
                          textOverflow: "ellipsis",
                        }}
                      /> */}
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
                                                onChange={(e) =>
                                                    handleMultiplePhotos(e)
                                                }
                                                accept=".jpeg, .png, .jpg"
                                                hidden
                                            />
                                            {/* <span className="text-danger  text-center">
                        {photosError &&
                          errors.photos &&
                          touched.photos &&
                          errors.photos}
                      </span> */}
                                            <div className="d-flex justify-content-start">
                                                <label
                                                    className="mt-3"
                                                    for="file-btn"
                                                    id="file-lable"
                                                >
                                                    Add Photos
                                                </label>
                                            </div>
                                        </div>
                                        {showAlertMsg && (
                                            <div className="mt-4">
                                                <Alert
                                                    setShowAlert={
                                                        setShowAlertMsg
                                                    }
                                                    alertType="alert-danger"
                                                    alertMessage={alertMsg}
                                                />
                                            </div>
                                        )}
                                        <div className="row ml-4">
                                            {multipleImage &&
                                                multipleImage.map((image) => (
                                                    <div className="col-lg-2 mb-3">
                                                        <div
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                height: "140px",
                                                                width: "140px",
                                                            }}
                                                        >
                                                            <img
                                                                src={`${File_Server}${image.filePath}`}
                                                                style={{
                                                                    height: "140px",
                                                                    width: "140px",
                                                                    border: "1px solid gray",
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "4px",
                                                                }}
                                                            />
                                                            <span
                                                                className="delete-icon"
                                                                onClick={() =>
                                                                    onDeleteClick(
                                                                        image.filePath
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-times-circle"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        <span className="row p-3 mt-5 d-flex justify-content-end">
                                            <Button
                                                btnName="Update"
                                                type="submit"
                                                disabled={isSubmitting}
                                                styleClass="btn btn-lg"
                                            />

                                            {/* <div
												className="text-danger"
												style={{
													fontSize: '15pt',
												}}
											>
												{error}
											</div> */}
                                        </span>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <ReactToastify />
            </div>
        </React.Fragment>
    );
}

export default AdditionalDetailsFillUp;

export function ManufacturerPageView({
    label,
    placeholder,
    type,
    name,
    style,
}) {
    return (
        <div
            className="row d-flex align-items-center"
            style={{ letterSpacing: "0.2px" }}
        >
            <span className="font-weight-bold">{label}</span>

            <FormTextBox
                placeholder={placeholder}
                type={type}
                name={name}
                style={style}
            />
        </div>
    );
}
export function ManufacturerPasswordPageView({
    label,
    placeholder,
    type,
    name,
    style,
}) {
    return (
        <div
            className="row d-flex flex-column"
            style={{ letterSpacing: "0.2px" }}
        >
            <span className="font-weight-bold">{label}</span>

            <PasswordField
                placeholder={placeholder}
                type={type}
                name={name}
                style={style}
            />
        </div>
    );
}

const TitleStyles = { fontSize: "24px", color: "#5044fd", fontWeight: "bold" };

import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import OtherServices from "./OtherServices";
import { useEffect, useRef, useState } from "react";
import ManufacturingServices from "./ManufacturingServices";
import "./AdditionalDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
    FileDownload,
    patchData,
    postDataWithFormData,
} from "../../commonApi/CommonApi";
import { makersAdditionalDetails, makersServices } from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";
import { GetMfgProcess } from "../../Components/Redux/Actions/MfgProcess";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const MakersValidationSchema = Yup.object().shape({
    // file: Yup.object().required("No file Uploaded"),
    // files: Yup.mixed().required("Photos is required"),
});

function AdditionalDetailsFillUp() {
    const mfgProcess = useSelector((state) => state.mfgProcess.mfgProcess);
    const [otherServices, setOtherServices] = useState();
    const [oldOtherServices, setOldOtherServices] = useState();
    const hub = useSelector((state) => state.mfgProcess.hub);
    const [imagePreview, setImagePreview] = useState();
    const [previousImagePath, setPreviousImagePath] = useState();
    const [deletedImagePath, setDeletedImagepath] = useState([]);

    const [file, setFile] = useState(null);
    const [fileLength, setFileLength] = useState(null);

    const dispatch = useDispatch();

    const formRef = useRef();

    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    useEffect(() => {
        GetMfgProcess(dispatch, currentUserData);
    }, [currentUserData]);

    useEffect(() => {
        if (hub) {
            // setOldOtherServices(JSON.parse(hub.Other_Services));
            async function GetMultipleImage() {
                if (hub.Additional_Images) {
                    let filesUrl = [];
                    const imageData = JSON.parse(hub.Additional_Images);
                    for (let i = 0; i < imageData.length; i++) {
                        const imageBlob = await FileDownload(
                            imageData[i].filePath,
                            null
                        );
                        console.log(imageBlob, "files");
                        const profileImageUrl =
                            window.URL.createObjectURL(imageBlob);
                        filesUrl.push({
                            filePath: profileImageUrl,
                            fileName: imageData[i].fileName,
                        });
                    }

                    setImagePreview(filesUrl);
                    //setFile(filesUrl);

                    setPreviousImagePath(imageData);
                }
            }
            GetMultipleImage();
        }
    }, [hub]);

    const InitialValues = {
        // file: "",
        files: "",
    };

    const handleOnChange = (event) => {
        const files = event.target.files;
        console.log(files, ";line no 93");

        if (files.length > 0) {
            formRef.current.setFieldValue("files", files);

            let filePreview = [];

            for (let i = 0; i < files.length; i++) {
                filePreview.push({
                    filePath: URL.createObjectURL(files[i]),
                    fileName: files[i].Name,
                });
                //file.push(files[i]);
            }
            setFile(filePreview);
            setFileLength(files.length);
        } else {
            formRef.current.setFieldValue("files", null);
            setFile(null);
            setFileLength(null);
            formRef.current.setFieldTouched("files");
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("otherServices", JSON.stringify(otherServices));

        for (let i = 0; i < values.files.length; i++) {
            formData.append("multipleImage", values.files[i]);
        }
        formData.append("prevImage", JSON.stringify(previousImagePath));
        formData.append("deleteImage", JSON.stringify(deletedImagePath));
        patchData(
            makersServices,
            { mfgProcess },
            currentUserData.Manufacturer_ID,
            (onSuccess) => {
                if (onSuccess) {
                    console.log("success");
                }
            },
            (onFail) => {}
        );
        postDataWithFormData(
            `${makersAdditionalDetails}/${currentUserData.Manufacturer_ID}`,
            formData,
            (onSuccess) => {
                console.log(onSuccess.data, "onsuccess");

                Toast("Profile Updated Successfully", "success");
            },
            (onFail) => {
                console.log(onFail, "failed");
            }
        );
    };

    const { width } = useWindowDimensions();

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

    return (
        <div
            className="container-fluid mt-4"
            style={{
                width: width <= 800 ? "95%" : "80%",
            }}
        >
            <ManufacturingServices />

            {/* <div className="mt-4">
                <OtherServices
                    getData={(data) => setOtherServices(data)}
                    oldOtherServices={oldOtherServices}
                />
            </div> */}
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={MakersValidationSchema}
                formRef={formRef}
            >
                <div className="mt-5 mb-5">
                    <FormikController
                        control="multipleFile"
                        label={
                            <div className="heading title">
                                Upload Multiple Photos:
                            </div>
                        }
                        name="files"
                        title="Choose Files"
                        accept={SUPPORTED_FORMATS}
                        onChange={handleOnChange}
                        fileLength={fileLength}
                    />
                </div>

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
                                        onClick={() => onDeleteClick(src)}
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {file && (
                    <div className="row m-2">
                        {file.map((src, index) => (
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
                <div className="d-flex justify-content-end mt-2">
                    <FormikController
                        title="Save"
                        type="submit"
                        control="submit"
                    />
                </div>
            </FormikComponent>
        </div>
    );
}

export default AdditionalDetailsFillUp;

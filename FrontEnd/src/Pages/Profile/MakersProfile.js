import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { MdEdit } from "react-icons/md";
import "./Profile.css";
import ChangePasswordComponent from "../../Components/Password/ChangePasswordComponent";
import MapComponent from "../../Components/map/MapComponent";
import Filter from "../../Components/filter/Filter";
import { GetFilters } from "../../Components/filter/GetFilters";
import InputComponent from "../../Components/input/InputComponent";
import SearchInputComponent from "../../Components/input/SearchInputComponent";
import { ValidationSchemaMakerProfile } from "../Form/ValidationSchema";
import { useSelector } from "react-redux";
import {
    FileDownload,
    getData,
    postData,
    postDataWithFormData,
} from "../../commonApi/CommonApi";
import {
    getMakerLocation,
    makerMapEdit,
    makerProfileEdit,
} from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";

// const mapData = require("../../data/MapData.json");

const MapValidationSchema = Yup.object().shape({
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),
});
const InitialValues = {
    companyName: "",
    phoneNumber: "",
    address: "",
    contactPerson: "",
    email: "",
    website: "",
    brief_description: "",
    additional_details: "",
};

const InitialMapValues = {
    latitude: "",
    longitude: "",
};

function MakersProfile() {
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    console.log(currentUserData);
    const [profileImage, setProfileImage] = useState();
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [prevProfileImage, setPrevProfileImage] = useState();

    const companyStatus = [
        {
            value: "Registered Company",
            type: "Registered Company",
        },
        {
            value: "Individual/Hobbyist",
            type: "Individual/Hobbyist",
        },
    ];
    const { width } = useWindowDimensions();
    const [mapSearch, setMapSearch] = React.useState(null);
    const [locationData, setLocationData] = React.useState({
        latitude: null,
        longitude: null,
    });

    const locationSet = (data) => {
        setLocationData(data);
    };

    const handlePositionChange = (data) => {
        console.log(data, "handle position change");
        setLocationData({ ...locationData, [data.name]: data.value });
    };

    const handleOnChangeImage = (e) => {
        if (e.target.files.length > 0) {
            console.log("value", e.target.files[0]);
            setProfileImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setProfileImagePreview(url);
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("userUpdates", JSON.stringify(values));
        formData.append("currentUser", JSON.stringify(currentUserData));
        formData.append("prevImage", prevProfileImage);
        formData.append("profileImage", profileImage);
        postDataWithFormData(
            makerProfileEdit,
            formData,
            (onSuccess) => {
                console.log(onSuccess.data, "onsuccess");
                Toast("Profile Updated Successfully", "success");
            },
            (onFail) => {}
        );
    };

    useEffect(() => {
        async function GetProfileImage() {
            if (currentUserData && currentUserData.Logo) {
                const imageData = JSON.parse(currentUserData.Logo);
                const imageBlob = await FileDownload(imageData.filePath);
                const profileImageUrl = window.URL.createObjectURL(
                    new Blob([imageBlob])
                );
                setProfileImagePreview(profileImageUrl);
                setPrevProfileImage(currentUserData.Logo);
            }
        }

        GetProfileImage();

        async function GetLocation() {
            if (currentUserData && currentUserData.Manufacturer_ID) {
                getData(
                    getMakerLocation,
                    currentUserData.Manufacturer_ID,
                    (onSuccess) => {
                        setLocationData({
                            ...locationData,
                            latitude: onSuccess.data["Latitude"],
                            longitude: onSuccess.data["Longitude"],
                        });
                    },
                    (onFail) => {
                        console.log("failed");
                    }
                );
            }
        }
        GetLocation();
    }, [currentUserData]);

    const handleSearch = (data) => {
        console.log(data, "map page search line 11");
        setMapSearch(data);
    };

    const handleSubmitMap = (values) => {
        console.log(currentUserData.Manufacturer_ID, "Map values");
        const body = {
            Manufacturer_ID: currentUserData.Manufacturer_ID,
            latitude: values.latitude,
            longitude: values.longitude,
        };
        postData(
            makerMapEdit,
            body,
            (onSuccess) => {
                console.log(onSuccess.data, "onsuccess");
                Toast("Map Updated Successfully", "success");
            },
            (onFail) => {}
        );
    };
    return (
        <div
            className="container-fluid"
            style={{
                width: width <= 800 ? "95%" : "50%",
            }}
        >
            {currentUserData && (
                <>
                    <div className="d-flex align-items-center flex-column my-4">
                        <div className="change-image">
                            <img
                                className="image-profile"
                                src={
                                    profileImagePreview
                                        ? profileImagePreview
                                        : "http://localhost:3000/assests/user.png"
                                }
                                alt=""
                            />

                            <div className="icon-edit">
                                <MdEdit size="24px" />
                            </div>

                            <input
                                className="avatar-file h-100 w-100"
                                type="file"
                                name="file"
                                accept={".jpg, .jpeg, .png"}
                                onChange={handleOnChangeImage}
                            />
                        </div>

                        <div className="profile-name">
                            {currentUserData.Company_Name}
                        </div>
                    </div>
                    <div className="section-heading mb-3">Edit Profile</div>
                    <FormikComponent
                        initialValues={InitialValues}
                        onSubmit={handleSubmit}
                        validationSchema={ValidationSchemaMakerProfile}
                    >
                        <div className="row">
                            <div className="col-lg">
                                <FormikController
                                    label="Company Name"
                                    name="companyName"
                                    control="input"
                                    placeholder="Company Name"
                                    type="text"
                                    setInitial={currentUserData.Company_Name}
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    name="companyStatus"
                                    control="select"
                                    label="Company Status"
                                    options={companyStatus}
                                    getOptionLabel={(options) => options.type}
                                    setInitial={{
                                        value: currentUserData.Company_Type,
                                        type: currentUserData.Company_Type,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    label="Phone Number"
                                    name="phoneNumber"
                                    control="input"
                                    placeholder="Phone Number"
                                    type="text"
                                    setInitial={currentUserData.Phone_Number}
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    name="contactPerson"
                                    control="input"
                                    placeholder="Enter Contact Person Name"
                                    label="Contact Person"
                                    setInitial={currentUserData.Contact_Person}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    label="Email"
                                    name="email"
                                    control="input"
                                    placeholder="Email Address"
                                    type="email"
                                    setInitial={currentUserData.Email}
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    name="address"
                                    control="input"
                                    placeholder="Enter Address"
                                    label="Address"
                                    setInitial={currentUserData.Address}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    name="website"
                                    control="input"
                                    placeholder="Enter website"
                                    label="Website"
                                    setInitial={currentUserData.Website}
                                />
                            </div>
                            <div className="col-lg offset-lg-1"></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    label="Brief Description"
                                    name="brief_description"
                                    control="textarea"
                                    placeholder="Brief Description of Company"
                                    setInitial={
                                        currentUserData.Brief_Description
                                    }
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    name="additional_details"
                                    control="textarea"
                                    placeholder="Additional Details"
                                    label="Additional Details"
                                    setInitial={
                                        currentUserData.Brief_Description
                                    }
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <FormikController
                                title="Update"
                                type="submit"
                                control="submit"
                            />
                        </div>
                    </FormikComponent>

                    <div className="headerBlock mt-3">
                        <label className="section-heading m-0">
                            PIN YOUR LOCATION
                        </label>
                        <SearchInputComponent handleSearch={handleSearch} />
                    </div>
                    <>
                        <label style={{ fontSize: 10 }}>
                            Double Click to get to your current location
                        </label>
                    </>
                    <MapComponent
                        currentPosition={false}
                        search={mapSearch}
                        onClickMark={true}
                        locationSet={locationSet}
                        position={locationData}
                    />
                    <FormikComponent
                        initialValues={InitialMapValues}
                        onSubmit={handleSubmitMap}
                        validationSchema={MapValidationSchema}
                    >
                        <div className="row mr-lg-3 mt-3">
                            <div className="col-lg mr-3">
                                <div className="row justify-content-between align-items-center pl-3">
                                    <label>Latitude</label>
                                    <FormikController
                                        name="latitude"
                                        control="input"
                                        placeholder="Enter Latitude"
                                        handleChange={handlePositionChange}
                                        setInitial={locationData.latitude}
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg offset-lg-1 mr-3"
                                style={{ paddingLeft: width < 1000 ? 30 : 0 }}
                            >
                                <div className="row justify-content-between align-items-center">
                                    <label>Longitude: </label>
                                    <FormikController
                                        name="longitude"
                                        className="form-control"
                                        control="input"
                                        placeholder="Enter Longitude"
                                        handleChange={handlePositionChange}
                                        setInitial={locationData.longitude}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <FormikController
                                title="Update"
                                type="submit"
                                control="submit"
                            />
                        </div>
                    </FormikComponent>

                    <ChangePasswordComponent
                        id={currentUserData.Manufacturer_ID}
                    />
                </>
            )}
        </div>
    );
}

export default MakersProfile;

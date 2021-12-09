import React from "react";
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
const mapData = require("../../data/MapData.json");

const ValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("First Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    contactPerson: Yup.string().required("Contact Person Name is required"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    companyStatus: Yup.object().required("Company Status is required."),

    website: Yup.string().matches(
        /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        "Invalid Website"
    ),
    brief_description: Yup.string().required("Brief Description is required"),
    additional_details: Yup.string().required("Additional Details is required"),
});

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
    const companyStatus = [
        {
            value: 1,
            type: "Registered Company",
        },
        {
            value: 2,
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

    const handleSubmit = (values) => {
        console.log(values, "values");
    };

    const handleSearch = (data) => {
        console.log(data, "map page search line 11");
        setMapSearch(data);
    };

    const handleSubmitMap = (values) => {
        console.log(values, "Map values");
    };
    return (
        <div
            className="container-fluid"
            style={{
                width: width <= 800 ? "95%" : "50%",
            }}
        >
            <div className="d-flex align-items-center flex-column my-4">
                <div className="change-image">
                    <img
                        className="image-profile"
                        src={"http://localhost:3000/assests/user.png"}
                    />

                    <div className="icon-edit">
                        <MdEdit size="24px" />
                    </div>

                    <input
                        className="avatar-file h-100 w-100"
                        type="file"
                        name="file"
                        accept={".jpg, .jpeg, .png"}
                        //onChange={handleOnchangeimage}
                    />
                </div>

                <div className="profile-name">
                    {"Zener"}&nbsp;
                    {"Technologies"}
                </div>
            </div>
            <div className="section-heading mb-3">Edit Profile</div>
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={ValidationSchema}
            >
                <div className="row">
                    <div className="col-lg">
                        <FormikController
                            label="Company Name"
                            name="companyName"
                            control="input"
                            placeholder="Company Name"
                            type="text"
                            setInitial="Zener Technologies"
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
                                value: 1,
                                type: "Registered Company",
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
                            setInitial="9849826008"
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            name="contactPerson"
                            control="input"
                            placeholder="Enter Contact Person Name"
                            label="Contact Person"
                            setInitial="Ram Chandra Thapa"
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
                            setInitial="zener@gmail.com"
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            name="address"
                            control="input"
                            placeholder="Enter Address"
                            label="Address"
                            setInitial="Lalitpur"
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
                            setInitial="zener.com"
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
                            setInitial="Description"
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            name="additional_details"
                            control="textarea"
                            placeholder="Additional Details"
                            label="Additional Details"
                            setInitial="Details"
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
                <label className="section-heading m-0">PIN YOUR LOCATION</label>
                <SearchInputComponent handleSearch={handleSearch} />
            </div>
            {console.log("location data", locationData)}
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

            <ChangePasswordComponent />
        </div>
    );
}

export default MakersProfile;

import React from "react";
import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { MdEdit } from "react-icons/md";
import "./Profile.css";
import ChangePasswordComponent from "../../Components/Password/ChangePasswordComponent";
import { ValidationSchemaMakerProfile } from "../Form/ValidationSchema";
import { useSelector } from "react-redux";

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

function MakersProfile() {
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
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

    const handleSubmit = (values) => {
        console.log(values, "values");
    };
    const { width } = useWindowDimensions();
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
                            setInitial={currentUserData.Company_Type}
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
                            setInitial={currentUserData.Brief_Description}
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            name="additional_details"
                            control="textarea"
                            placeholder="Additional Details"
                            label="Additional Details"
                            setInitial={currentUserData.Brief_Description}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <FormikController
                        title="Save"
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

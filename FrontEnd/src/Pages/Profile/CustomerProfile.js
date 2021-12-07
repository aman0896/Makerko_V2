import React from "react";
import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { MdEdit } from "react-icons/md";
import "./CustomerProfile.css";

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),

    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password should be 6 or more characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            "Password should alphabets, numbers and symbols"
        ),
    confirm_password: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password"), null], "Password do not match"),
    termsCondition: Yup.bool().oneOf(
        [true],
        "Please accept the terms and conditions to continue."
    ),
});

const InitialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    // bio: "",
};

function CustomerProfile() {
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
                        className="avatar-file h-100 w-100 border border-primary"
                        type="file"
                        name="file"
                        accept={".jpg, .jpeg, .png"}
                        //onChange={handleOnchangeimage}
                    />
                </div>

                <div className="profile-name">
                    {"Ashmita"}&nbsp;
                    {"Gorkhali"}
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
                            label="First Name"
                            name="firstName"
                            control="input"
                            placeholder="First Name"
                            type="text"
                            setInitial="Ashmita"
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            label="Last Name"
                            name="lastName"
                            control="input"
                            placeholder="Last Name"
                            type="text"
                            setInitial="Gorkhali"
                        />
                    </div>
                </div>
                <div className="row mt-4">
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
                            label="Address"
                            name="address"
                            control="input"
                            placeholder="Enter Address"
                            type="text"
                            setInitial="Sanepa,Lalitpur"
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg">
                        <FormikController
                            label="Email"
                            name="email"
                            control="input"
                            placeholder="Email Address"
                            type="email"
                            setInitial="ashmii.stha@gmail.com"
                        />
                    </div>
                    <div className="col-lg offset-lg-1">
                        <FormikController
                            label="Bio"
                            name="address"
                            control="input"
                            placeholder="Enter Address"
                            type="text"
                            setInitial="Sanepa,Lalitpur"
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
        </div>
    );
}

export default CustomerProfile;

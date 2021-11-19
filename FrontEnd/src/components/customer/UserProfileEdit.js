import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { GetCookiesInfo } from "../global/GlobalFunction";
import FormTextBox, { PasswordField } from "../global/TextBox";
import "../common/Profile.css";
import { useHistory, useParams } from "react-router";
import Sidetab from "../main/sidetab";
import { MdEdit } from "react-icons/md";
import Alert from "../global/Alert";
import NotFoundErr from "../global/404Error";
import { File_Server } from "../common/Link";

const EditUserProf = (props) => {
    const history = useHistory();
    const [imagePath, setImagePath] = useState();
    const [error, setError] = useState();
    const { id } = useParams();
    const [userStatus, setUserStatus] = useState();
    const [innerWidth, setInnerWidth] = useState();
    const [alertColor, setalertColor] = useState();
    const [emailError, setEmailError] = useState();
    const [incorrectPath, setIncorrectPath] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [imageName, setImageName] = useState();

    //setUploadedImage(Image);
    const [customer, setCustomer] = useState();
    console.log(`${File_Server}${imagePath}`, "checks");

    const btnUpdateStyle = {
        backgroundColor: "#5044fd",
        color: "white",
        height: "40px",
        width: "100px",
    };

    useEffect(async () => {
        const data = await GetCookiesInfo().then((response) => {
            if (response.data) {
                return response.data;
            }
        });
        setUserStatus(data);
        try {
            axios.post(`${window.host}/customer/${id}`).then((response) => {
                setIsLoading(false);
                if (response.data.wrongUser) {
                    // window.location.href = '/404-not-found';
                    setIncorrectPath(true);

                    return;
                }
                if (response.data) {
                    setIncorrectPath(false);
                    setCustomer(response.data[0]);
                    if (response.data[0].Profile_Image) {
                        const { fileName, filePath } = JSON.parse(
                            response.data[0].Profile_Image
                        );
                        setImagePath(filePath);
                        setImageName(Date.now());
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    //#region adding listner for window resize
    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    //#endregion

    const handleOnchangeimage = (e) => {
        console.log("check");
        const formData = new FormData();
        const file = e.target.files;
        var data;

        formData.append("file", file[0]);
        formData.append("path", "profileImage");
        formData.append("id", id);
        formData.append("previousName", imageName);
        console.log(file, formData, "append data");
        axios
            .post(`${window.host}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                data = JSON.stringify(response.data);
                console.log(data);

                axios
                    .post(`${window.host}/changeimage`, {
                        id: id,
                        image: data,
                        userStatus: userStatus.userStatus,
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
                const { fileName, filePath } = JSON.parse(data);
                console.log(filePath);
                setImagePath(filePath);
            });
    };

    return (
        <Fragment>
            {isLoading ? (
                <></>
            ) : incorrectPath ? (
                <NotFoundErr />
            ) : (
                <div
                    style={{
                        paddingBottom: "80px",
                    }}
                >
                    <div className="row container-fluid m-auto">
                        <div className="col-sm-2">
                            <Sidetab />
                        </div>
                        <div
                            className="col-sm-8 m-0 d-flex justify-content-center align-items-center flex-column"
                            style={{
                                paddingBottom: "80px",
                                paddingTop: "80px",
                            }}
                        >
                            <div className="change-image">
                                {console.log(imagePath, imageName, "image")}
                                <img
                                    className="image-profile"
                                    src={
                                        imagePath
                                            ? `${File_Server}${imagePath}`
                                            : "/assests/user.png"
                                    }
                                />
                                <div className="icon-edit">
                                    <MdEdit size="24px" />
                                </div>

                                <input
                                    className="avatar-file h-100 w-100"
                                    type="file"
                                    name="file"
                                    accept={".jpg, .jpeg, .png"}
                                    onChange={handleOnchangeimage}
                                />
                            </div>
                            {customer && (
                                <div className="profile-name">
                                    {customer.First_Name}&nbsp;
                                    {customer.Last_Name}
                                </div>
                            )}

                            <div
                                className="container-fluid"
                                style={{
                                    width: innerWidth <= 800 ? "95%" : "110%",
                                }}
                            >
                                <div className="mb-3">
                                    {customer && (
                                        <Formik
                                            initialValues={{
                                                email: customer.Email,
                                                firstName: customer.First_Name,
                                                lastName: customer.Last_Name,
                                                phoneNumber:
                                                    customer.Phone_Number,
                                                address: customer.Address,
                                            }}
                                            validate={(values) => {
                                                const errors = {};
                                                if (!values.email) {
                                                    errors.email = "Required";
                                                } else if (
                                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                        values.email
                                                    )
                                                ) {
                                                    errors.email =
                                                        "Invalid email address";
                                                }
                                                if (!values.firstName) {
                                                    errors.firstName =
                                                        "Required";
                                                }
                                                if (!values.lastName) {
                                                    errors.lastName =
                                                        "Required";
                                                }
                                                if (!values.phoneNumber) {
                                                    errors.phoneNumber =
                                                        "Required";
                                                }
                                                if (!values.address) {
                                                    errors.address = "Required";
                                                }

                                                console.log(errors.firstName);
                                                return errors;
                                            }}
                                            onSubmit={(
                                                values,
                                                { setSubmitting }
                                            ) => {
                                                setTimeout(() => {
                                                    axios
                                                        .post(
                                                            `${window.host}/editProfile`,
                                                            {
                                                                id: id,
                                                                firstname:
                                                                    values.firstName,
                                                                lastname:
                                                                    values.lastName,
                                                                email: values.email,
                                                                phonenumber:
                                                                    values.phoneNumber,
                                                                address:
                                                                    values.address,
                                                            }
                                                        )
                                                        .then((response) => {
                                                            if (
                                                                response.data
                                                                    .error
                                                            ) {
                                                                setEmailError(
                                                                    response
                                                                        .data
                                                                        .error
                                                                );
                                                                setalertColor(
                                                                    "alert-warning"
                                                                );
                                                            } else {
                                                                setEmailError(
                                                                    response
                                                                        .data
                                                                        .msg
                                                                );
                                                                setalertColor(
                                                                    "alert-success"
                                                                );
                                                            }
                                                        });

                                                    //this.setState({ loading: false });
                                                    setSubmitting(false);
                                                }, 100);
                                            }}
                                        >
                                            {({
                                                values,
                                                handleSubmit,
                                                isSubmitting,
                                                /* and other goodies */
                                            }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <div className="row gutters">
                                                            <div className="col-md-12 mb-4">
                                                                <span className="section-heading">
                                                                    Edit Profile
                                                                </span>
                                                                {emailError && (
                                                                    <div className="mt-4">
                                                                        <Alert
                                                                            onClick={() => {
                                                                                setEmailError(
                                                                                    ""
                                                                                );
                                                                            }}
                                                                            alertType={
                                                                                alertColor
                                                                            }
                                                                            alertMessage={
                                                                                emailError
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    First Name
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    name="firstName"
                                                                    placeholder="Enter your first name"
                                                                    value={
                                                                        values.firstName
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    Last Name
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    name="lastName"
                                                                    placeholder="Enter your last name"
                                                                    value={
                                                                        values.lastName
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    Email
                                                                </label>
                                                                <FormTextBox
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    value={
                                                                        values.email
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    Phone Number
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="Phone Number"
                                                                    value={
                                                                        values.phoneNumber
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    Address
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    placeholder="Address"
                                                                    name="address"
                                                                    value={
                                                                        values.address
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            className="btn float-right"
                                                            type="submit"
                                                            style={
                                                                btnUpdateStyle
                                                            }
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    )}
                                </div>
                                <div className="mt-5 mb-5">
                                    <Formik
                                        initialValues={{
                                            old_password: "",
                                            new_password: "",
                                            confirm_password: "",
                                        }}
                                        validate={(values) => {
                                            const errors = {};
                                            if (!values.old_password) {
                                                errors.old_password =
                                                    "Required";
                                            }
                                            if (!values.new_password) {
                                                errors.new_password =
                                                    "Required";
                                            } else if (
                                                values.new_password.length < 6
                                            ) {
                                                errors.new_password =
                                                    "Password needs to be 6 characters or more";
                                            }
                                            if (!values.confirm_password) {
                                                errors.confirm_password =
                                                    "Required";
                                            } else if (
                                                values.confirm_password !==
                                                values.new_password
                                            ) {
                                                errors.confirm_password =
                                                    "Password do not match";
                                            }

                                            return errors;
                                        }}
                                        onSubmit={(
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            setTimeout(() => {
                                                axios
                                                    .post(
                                                        `${window.host}/change-password`,
                                                        {
                                                            old_password:
                                                                values.old_password,
                                                            new_password:
                                                                values.new_password,
                                                            confirm_password:
                                                                values.confirm_password,
                                                            id: id,
                                                            userStatus:
                                                                userStatus.userStatus,
                                                        }
                                                    )
                                                    .then((response) => {
                                                        if (
                                                            response.data
                                                                .message
                                                        ) {
                                                            setError(
                                                                response.data
                                                                    .message
                                                            );
                                                            setalertColor(
                                                                "alert-warning"
                                                            );
                                                        } else if (
                                                            response.data.msg
                                                        ) {
                                                            setError(
                                                                response.data
                                                                    .msg
                                                            );
                                                            setalertColor(
                                                                "alert-success"
                                                            );
                                                            console.log(
                                                                error,
                                                                "errrr"
                                                            );
                                                        }
                                                    });
                                                setSubmitting(false);
                                            }, 100);
                                        }}
                                    >
                                        {({
                                            handleSubmit,
                                            isSubmitting,
                                            /* and other goodies */
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div>
                                                    <div className="row gutters">
                                                        <div className="col-md-12 mb-4">
                                                            <span className="section-heading">
                                                                Change Password
                                                            </span>
                                                            {error && (
                                                                <div className="mt-4">
                                                                    <Alert
                                                                        onClick={() => {
                                                                            setError(
                                                                                ""
                                                                            );
                                                                        }}
                                                                        alertType={
                                                                            alertColor
                                                                        }
                                                                        alertMessage={
                                                                            error
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className=" col-md-6 mb-3">
                                                            <label className="label-item">
                                                                Current Password
                                                            </label>
                                                            <PasswordField
                                                                type="password"
                                                                placeholder="Current password"
                                                                name="old_password"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mb-3"></div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="label-item">
                                                                New Password
                                                            </label>
                                                            <PasswordField
                                                                type="password"
                                                                placeholder="New password"
                                                                name="new_password"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="label-item">
                                                                Confirm Password
                                                            </label>
                                                            <PasswordField
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                name="confirm_password"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        disabled={isSubmitting}
                                                        className="btn float-right"
                                                        type="submit"
                                                        style={btnUpdateStyle}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default EditUserProf;

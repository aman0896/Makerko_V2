import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect, Fragment } from "react";
import { GetCookiesInfo } from "../global/GlobalFunction";
import FormTextBox, { PasswordField } from "../global/TextBox";
import { useHistory, useParams } from "react-router";
import Location from "./Location";
import { UpdateLocation } from "./Api";
import Sidetab from "../main/sidetab";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import ReactToastify from "../global/ReactToastify";
import Alert from "../global/Alert";
import { File_Server } from "../common/Link";

function EditManufacturerProfile(props) {
    const history = useHistory();
    const [makerID, setMakerID] = useState();
    const [error, setError] = useState();
    const [registeredHubs, setRegisteredHubs] = useState();
    const [serviceList, setServiceList] = useState([]);
    const [currentHub, setCurrentHub] = useState();
    var [hubService, setHubService] = useState();
    const [imagePath, setImagePath] = useState();
    const [showAddField, setShowAddField] = useState(false);
    const [saveChangeButton, setSaveChangeButton] = useState(false);
    const [isExist, setIsExist] = useState(false);
    const { id } = useParams();
    const [userStatus, setUserStatus] = useState();
    const [innerWidth, setInnerWidth] = useState();
    const [location, setLocation] = useState();
    const [alertColor, setalertColor] = useState();
    const [emailError, setEmailError] = useState();
    const [companyName, setCompanyName] = useState();

    const btnUpdateStyle = {
        backgroundColor: "#5044fd",
        color: "white",
        height: "40px",
        width: "100px",
    };

    //#region get_service_data_from_db
    useEffect(async () => {
        const data = await GetCookiesInfo().then((response) => {
            if (response.data) {
                return response.data;
            }
        });
        setUserStatus(data);
        var userInfo = undefined;
        if (data) {
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
                    if (response.data) {
                        const { hub, services } = response.data;
                        setCurrentHub(hub[0]);
                        // const hubService = services.map((service) => {
                        //     console.log(service);
                        //     const { Name, Material_Name, Service_ID } = service;
                        //     var data = {
                        //         selectedFabrication: {
                        //             Service_ID: Service_ID,
                        //             Name: Name,
                        //         },
                        //         materialDetails: JSON.parse(Material_Name),
                        //     };
                        //     return data;
                        // });
                        // setHubService(hubService);
                        // setSaveChangeButton(false);
                        if (hub[0].Logo) {
                            const { fileName, filePath } = JSON.parse(
                                hub[0].Logo
                            );
                            setImagePath(`${File_Server}${filePath}`);
                        }
                    }
                });
            setMakerID(data.uid);
        }
    }, [error]);
    //#endregion

    //#region show savechange button when service updated
    useEffect(() => {
        setSaveChangeButton(true);
    }, [hubService]);
    //#endregion

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        const formData = new FormData();
        const file = e.target.files;
        var data;

        formData.append("file", file[0]);
        formData.append("path", "logo");
        formData.append("id", id);
        console.log(file, formData);
        axios
            .post(`${window.host}/upload`, formData, {
                document: "documents",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response.data);
                // document.cookie = `userInfo = ${JSON.stringify(
                //   response.data
                // )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

                if (response.data.msg) console.log(response.data.msg);
                else {
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
                    console.log(filePath, "files");
                    setImagePath(`${File_Server}${filePath}`);
                    //window.location.reload();
                }
            });
    };

    //#region show_service_addfield
    // const onClickAddmore = () => {
    //     setShowAddField(!showAddField);
    // };
    //#endregion

    //#region update_added_services_in_hubServices
    // if (hubService)
    //     var services = hubService.filter((hubService) => hubService);
    // const AddService = (data) => {
    //     var mateiralExist = false;
    //     var serviceExist = false;

    //     if (services.length > 0 && data) {
    //         services.map((service, index) => {
    //             console.log(data, service);
    //             if (
    //                 data.selectedFabrication.Name ===
    //                 service.selectedFabrication.Name
    //             ) {
    //                 serviceExist = true;
    //                 service.materialDetails.map((materialDetail) => {
    //                     if (
    //                         data.materialDetails[0].selectedMaterial
    //                             .Material_Name ===
    //                         materialDetail.selectedMaterial.Material_Name
    //                     ) {
    //                         window.alert('Material Already Exist');
    //                         return (mateiralExist = true);
    //                     }
    //                 });
    //                 if (!mateiralExist) {
    //                     return (service.materialDetails =
    //                         service.materialDetails.concat(
    //                             data.materialDetails[0]
    //                         ));
    //                 }
    //             }
    //         });
    //         if (!serviceExist) {
    //             services = services.concat(data);
    //         }
    //     } else {
    //         services = services.concat(data);
    //     }

    //     setIsExist(true);
    //     console.log(services);
    //     setHubService(services);
    // };
    //#endregion

    //#region on Save Changes_Manufacturer_Services
    // const OnSaveChange = () => {
    //     axios
    //         .post(`${window.host}/update-services/${id}`, {
    //             hubService: hubService,
    //         })
    //         .then((response) => {
    //             if (response.data) {
    //                 setSaveChangeButton(false);
    //                 console.log(response.data);
    //                 const { message } = response.data;
    //                 window.alert(message);
    //             }
    //         });
    // };
    //#endregion

    const submitLocation = (id, location) => {
        UpdateLocation(id, location, (response) => {
            if (response) {
                toast("Location Updated");
            } else {
                toast("Location Update Fail");
            }
        });
    };

    return (
        <Fragment>
            <div
                style={{
                    paddingBottom: "80px",
                }}
            >
                {currentHub && (
                    <div className="row container-fluid m-auto">
                        <div className="col-sm-2" style={{}}>
                            <Sidetab />
                        </div>
                        <div
                            className="col-sm-8 m-0  d-flex justify-content-center align-items-center flex-column"
                            style={{
                                paddingBottom: "80px",
                                paddingTop: "80px",
                            }}
                        >
                            <div className="change-image">
                                <img
                                    className="image-profile"
                                    src={
                                        imagePath
                                            ? imagePath
                                            : "/assests/maker.png"
                                    }
                                />
                                {/* <i class="fa fa-edit icon-edit"></i> */}
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
                            {/* <div className="image-change">
                                <img
                                    className="profile-image"
                                    src={
                                        imagePath
                                            ? imagePath
                                            : '/assests/avatar.jpg'
                                    }
                                    alt="profileimage"
                                />
                                <span
                                    className="change-profile-image"
                                    style={{ color: '#5044fd' }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        size="sm"
                                    />
                                    <input
                                        className="avatar-file h-100 w-100"
                                        type="file"
                                        name="file"
                                        onChange={handleOnchangeimage}
                                    />
                                    Change Image
                                </span>
                            </div> */}
                            <div className="profile-name">
                                {!companyName
                                    ? currentHub.Company_Name
                                    : companyName}
                            </div>
                            <div
                                className="container-fluid"
                                style={{
                                    width: innerWidth <= 800 ? "95%" : "110%",
                                }}
                            >
                                <div className="mb-5">
                                    {currentHub && (
                                        <Formik
                                            initialValues={{
                                                email: currentHub.Email,
                                                companyName:
                                                    currentHub.Company_Name,
                                                contactPerson:
                                                    currentHub.Contact_Person,
                                                phoneNumber:
                                                    currentHub.Phone_Number,
                                                address: currentHub.Address,
                                                companyStatus:
                                                    currentHub.Company_Type,
                                                website: currentHub.Website,
                                                briefDescription:
                                                    currentHub.Brief_Description,
                                                additionalDetails:
                                                    currentHub.Additional_Details,
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
                                                if (!values.contactPerson) {
                                                    errors.contactPerson =
                                                        "Required";
                                                }
                                                if (!values.phoneNumber) {
                                                    errors.phoneNumber =
                                                        "Required";
                                                }
                                                if (!values.briefDescription) {
                                                    errors.briefDescription =
                                                        "Required";
                                                }
                                                if (!values.additionalDetails) {
                                                    errors.additionalDetails =
                                                        "Required";
                                                }
                                                return errors;
                                            }}
                                            onSubmit={(
                                                values,
                                                { setSubmitting }
                                            ) => {
                                                setTimeout(() => {
                                                    console.log(
                                                        "submit",
                                                        values
                                                    );
                                                    axios
                                                        .post(
                                                            `${window.host}/editManufacturerProfile`,
                                                            {
                                                                id: id,
                                                                companyName:
                                                                    values.companyName,
                                                                contactPerson:
                                                                    values.contactPerson,
                                                                email: values.email,
                                                                phonenumber:
                                                                    values.phoneNumber,
                                                                address:
                                                                    values.address,
                                                                briefDescription:
                                                                    values.briefDescription,
                                                                additionalDetail:
                                                                    values.additionalDetails,
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
                                                                setCompanyName(
                                                                    values.companyName
                                                                );
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
                                                handleSubmit,
                                                handleChange,
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
                                                                    Company name
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    name="companyName"
                                                                    placeholder="Enter your company name"
                                                                    value={
                                                                        values.companyName
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="label-item">
                                                                    Company
                                                                    Status
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    name="companyStatus"
                                                                    placeholder="Enter your first name"
                                                                    value={
                                                                        values.companyStatus
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="PhoneNumber"
                                                                >
                                                                    Phone Number
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="phoneNumber"
                                                                    placeholder="Phone Number"
                                                                    value={
                                                                        values.phoneNumber
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="address"
                                                                >
                                                                    Address
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="address"
                                                                    placeholder="Enter Address"
                                                                    value={
                                                                        values.address
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="email"
                                                                >
                                                                    Email
                                                                </label>
                                                                <FormTextBox
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    value={
                                                                        values.email
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="contactPerson"
                                                                >
                                                                    Contact
                                                                    Person
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="contactPerson"
                                                                    placeholder="Contact Person Name"
                                                                    value={
                                                                        values.contactPerson
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="contactPerson"
                                                                >
                                                                    Website
                                                                </label>
                                                                <FormTextBox
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="website"
                                                                    placeholder="website"
                                                                    value={
                                                                        values.website
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3"></div>
                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="contactPerson"
                                                                >
                                                                    Brief
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    className="form-control"
                                                                    style={{
                                                                        height: "200px",
                                                                    }}
                                                                    placeholder="Brief Description"
                                                                    name="briefDescription"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.briefDescription
                                                                    }
                                                                />
                                                                <div
                                                                    className="text-danger"
                                                                    style={{
                                                                        fontSize:
                                                                            "10pt",
                                                                    }}
                                                                >
                                                                    {errors.briefDescription &&
                                                                        touched.briefDescription &&
                                                                        errors.briefDescription}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label
                                                                    className="label-item"
                                                                    htmlFor="contactPerson"
                                                                >
                                                                    Additional
                                                                    Details
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    className="form-control"
                                                                    style={{
                                                                        height: "200px",
                                                                    }}
                                                                    placeholder="Additional Details"
                                                                    name="additionalDetails"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        values.additionalDetails
                                                                    }
                                                                />
                                                                <div
                                                                    className="text-danger"
                                                                    style={{
                                                                        fontSize:
                                                                            "10pt",
                                                                    }}
                                                                >
                                                                    {errors.additionalDetails &&
                                                                        touched.additionalDetails &&
                                                                        errors.additionalDetails}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <button
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            className="btn"
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
                                <div>
                                    <Location
                                        getLatLng={(position) => {
                                            setLocation(position);
                                        }}
                                    />
                                    <div className="d-flex justify-content-end mt-3">
                                        <button
                                            className="btn"
                                            type="button"
                                            style={btnUpdateStyle}
                                            onClick={() =>
                                                submitLocation(id, location)
                                            }
                                        >
                                            Submit
                                        </button>
                                    </div>
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
                                            { setSubmitting, resetForm }
                                        ) => {
                                            setTimeout(() => {
                                                console.log(values.email);
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
                                                resetForm();
                                            }, 100);
                                        }}
                                    >
                                        {({
                                            handleSubmit,
                                            isSubmitting,
                                            values,
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
                                                                value={
                                                                    values.old_password ||
                                                                    ""
                                                                }
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
                                                                value={
                                                                    values.new_password ||
                                                                    ""
                                                                }
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
                                                                value={
                                                                    values.confirm_password ||
                                                                    ""
                                                                }
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
                )}
                <ReactToastify />
            </div>
        </Fragment>
    );
}

export default EditManufacturerProfile;

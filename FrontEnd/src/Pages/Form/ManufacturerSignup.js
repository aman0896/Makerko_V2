import React, { Component } from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import DropDown from "../../components/global/DropDown";
import { ServiceSelectView } from "../../components/manufacturer/ManufacturerServiceSelect";
import TermsAndPolicy from "../../components/Terms&Policy";
import FormTextBox, { PasswordField } from "../../components/global/TextBox";

import "../css/ManufacturerSignup.css";

const manufacturerTypes = [
    {
        value: 1,
        type: "Registered Company",
    },
    {
        value: 2,
        type: "Individual/Hobbyist",
    },
];

const deliveryOption = [
    {
        value: 1,
        label: "Within 20km^2",
    },
    {
        value: 2,
        label: "All Nepal",
    },
    {
        value: 3,
        label: "Pickup",
    },
];

class ManufacturerSignup extends Component {
    constructor() {
        super();
        this.state = {
            manufacturerType: "",
            alreadyExist: false,
            error: "",
            deliveryTime: "",
            isChecked: false,
            checkboxError: false,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }
    handleCompanyStatus = (obj) => {
        console.log(obj);
        this.setState({ manufacturerType: obj });
    };
    //#region adding listner for window resize
    handleResize = () => {
        this.setState({ width: window.innerWidth });
    };
    componentDidMount = () => {
        window.addEventListener("resize", this.handleResize);
        return () => window.removeEventListener("resize", this.handleResize);
    };
    //#endregion

    onSelectDelivery = (obj) => {
        this.setState({ deliveryTime: obj.label });
    };
    handleChecked() {
        this.setState({
            isChecked: !this.state.isChecked,
            checkboxError: false,
        });
    }

    render() {
        const rowView = "row";
        const colView = "col-md m-2";

        const {
            manufacturerType,
            error,
            deliveryTime,
            width,
            isChecked,
            checkboxError,
        } = this.state;
        return (
            <React.Fragment>
                {console.log("width", width)}
                <div className="row m-auto d-flex justify-content-center">
                    <div className="col-lg-5 p-0 m-0">
                        <img
                            src="/assests/MakerSignup.jpg"
                            style={{
                                width: "100%",
                                height: "120vh",
                            }}
                        />
                    </div>
                    <div
                        className="col-lg justify-content-center mb-4"
                        style={{ paddingRight: "80px", paddingLeft: "80px" }}
                    >
                        <div>
                            <div className="row">
                                <div className="col-md p-0 m-1">
                                    <div className="titleRegister">MAKERKO</div>
                                    <div className="details">
                                        Enter Your Company’s Detail to get
                                        started
                                    </div>
                                    {error && (
                                        <div
                                            className="alert alert-warning alert-dismissible fade show mt-3"
                                            role="alert"
                                        >
                                            {error}
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="alert"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Formik
                                initialValues={{
                                    email: "",
                                    manufacturerName: "",
                                    password: "",
                                    phoneNumber: "",
                                    confirm_password: "",
                                    manufacturerType: "",
                                    contactPerson: "",
                                    website: "",
                                    address: "",
                                    isChecked: false,
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.manufacturerName)
                                        errors.manufacturerName = "Required!!";

                                    if (!values.address)
                                        errors.address = "Required!!";
                                    if (!values.phoneNumber)
                                        errors.phoneNumber = "Required!!";
                                    if (!values.contactPerson)
                                        errors.contactPerson = "Required!!";
                                    if (!manufacturerType)
                                        errors.manufacturerType = "Required!!";
                                    if (!values.email) {
                                        errors.email = "Required!!";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }
                                    if (!values.password)
                                        errors.password = "Required!!";
                                    else if (values.password.length < 6) {
                                        errors.password =
                                            "Password must contain atleast 6 letters";
                                    } else if (
                                        values.password !==
                                        values.confirm_password
                                    ) {
                                        errors.confirm_password =
                                            "Password did not match";
                                    } else if (!isChecked) {
                                        errors.isChecked =
                                            "Please accept the terms of use to continue.";
                                        this.setState({ checkboxError: true });
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios
                                            .post(
                                                `${window.host}/manufacturer-signup`,
                                                {
                                                    email: values.email,
                                                    name: values.manufacturerName,
                                                    password: values.password,
                                                    contactPerson:
                                                        values.contactPerson,
                                                    phoneNumber:
                                                        values.phoneNumber,
                                                    contactPerson:
                                                        values.contactPerson,
                                                    website: values.website,
                                                    manufacturerType:
                                                        manufacturerType,
                                                    address: values.address,
                                                    deliveryTime: deliveryTime,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data) {
                                                    const { hash, message } =
                                                        response.data;

                                                    if (hash) {
                                                        console.log(message);
                                                        setTimeout(() => {
                                                            this.props.history.push(
                                                                {
                                                                    //send data to verify page
                                                                    pathname: `/verify`,
                                                                    search: `?email=${values.email}&hash=${hash}`,
                                                                }
                                                            );
                                                            this.props.history.go(
                                                                0
                                                            );
                                                        }, 2000);
                                                    } else {
                                                        console.log(
                                                            response.data
                                                                .message
                                                        );
                                                        this.setState({
                                                            error: response.data
                                                                .message,
                                                        });
                                                    }
                                                }
                                            });
                                        setSubmitting(false);
                                    }, 100);
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
                                        className="column-gap mt-3"
                                    >
                                        <div className={rowView}>
                                            <div className={colView}>
                                                <ManufacturerPageView
                                                    label="Company Name"
                                                    placeholder="Enter Company Name"
                                                    name="manufacturerName"
                                                />
                                            </div>{" "}
                                            <div className={colView}>
                                                <div className="row d-flex flex-column no-gap">
                                                    <span
                                                        className="font-weight-bold mb-2"
                                                        style={{
                                                            fontSize: "0.9rem",
                                                        }}
                                                    >
                                                        Company Status
                                                    </span>

                                                    <DropDown
                                                        options={
                                                            manufacturerTypes
                                                        }
                                                        selectedValue={
                                                            manufacturerType
                                                        }
                                                        onChange={
                                                            this
                                                                .handleCompanyStatus
                                                        }
                                                        getOptionLabel={(
                                                            options
                                                        ) => options.type}
                                                    />

                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: "10pt",
                                                        }}
                                                    >
                                                        {errors.manufacturerType &&
                                                            touched.manufacturerType &&
                                                            errors.manufacturerType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={rowView}>
                                            <div className={colView}>
                                                <ManufacturerPageView
                                                    label="E-mail Address"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter E-mail Address"
                                                />
                                            </div>
                                            <div className={colView}>
                                                <ManufacturerPageView
                                                    label="Address"
                                                    name="address"
                                                    placeholder="Enter Company Address"
                                                />
                                            </div>
                                        </div>
                                        <div className={rowView}>
                                            <div className={colView}>
                                                <ManufacturerPageView
                                                    label="Phone Number"
                                                    name="phoneNumber"
                                                    placeholder="Enter Phone number"
                                                />
                                            </div>
                                            <div className={colView}>
                                                <ManufacturerPageView
                                                    label="Contact Person"
                                                    name="contactPerson"
                                                    placeholder="Enter Contact Person Name"
                                                />
                                            </div>
                                        </div>
                                        <div className={rowView}>
                                            <div className={colView}>
                                                <ManufacturerPasswordPageView
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Enter password"
                                                />
                                            </div>
                                            {width <= 768 ? (
                                                <div className={colView}>
                                                    <ManufacturerPasswordPageView
                                                        label="Confirm Password"
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                    />
                                                </div>
                                            ) : (
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Website"
                                                        name="website"
                                                        placeholder="Enter Website"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className={rowView}>
                                            {width <= 768 ? (
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Website"
                                                        name="website"
                                                        placeholder="Enter Website"
                                                    />
                                                </div>
                                            ) : (
                                                <div className={colView}>
                                                    <ManufacturerPasswordPageView
                                                        label="Confirm Password"
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                    />
                                                </div>
                                            )}

                                            <div
                                                className={colView}
                                                //style={{ fontSize: '0.9rem' }}
                                            >
                                                <ServiceSelectView
                                                    styleClass="font-weight-bold mb-2"
                                                    label="Delivery"
                                                    options={deliveryOption}
                                                    style={{
                                                        fontSize: "0.9rem",
                                                    }}
                                                    onChange={
                                                        this.onSelectDelivery
                                                    }
                                                />
                                            </div>
                                        </div>{" "}
                                        <div className="row mt-3">
                                            <div className="col-md mt-4">
                                                <div className="row">
                                                    <div className="col-md p-0 m-1">
                                                        <input
                                                            type="checkbox"
                                                            name="checkbox"
                                                            className="ml-1 mr-1"
                                                            //id="defaultUnchecked"
                                                            style={{
                                                                width: "16px",
                                                                height: "16px",
                                                            }}
                                                            onChange={
                                                                this
                                                                    .handleChecked
                                                            }
                                                        />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        >
                                                            I agree with{" "}
                                                            {/* <Link
                                                                to="/"
                                                                style={{
                                                                    color: "#5044fd",
                                                                }}
                                                            >
                                                                Terms and
                                                                Condition
                                                            </Link> */}
                                                            <TermsAndPolicy
                                                                subject="Terms and Conditions"
                                                                file="/terms&policy/T&C.pdf"
                                                                type="pdf"
                                                                style={{
                                                                    color: "#5044fd",
                                                                    textDecoration:
                                                                        "underline",
                                                                }}
                                                            />
                                                        </span>
                                                        <div>
                                                            <span
                                                                className="text-danger  text-center"
                                                                style={{
                                                                    whiteSpace:
                                                                        "nowrap",
                                                                }}
                                                            >
                                                                {checkboxError &&
                                                                    errors.isChecked &&
                                                                    touched.isChecked &&
                                                                    errors.isChecked}
                                                            </span>
                                                        </div>{" "}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div className="row">
                                                    <div className="col-md p-0 m-1">
                                                        <div className="text-center">
                                                            <button
                                                                disabled={
                                                                    isSubmitting
                                                                }
                                                                className="signup btn float-right"
                                                                type="submit"
                                                                style={{
                                                                    color: "white",
                                                                }}
                                                            >
                                                                Sign Up
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <div
                                className="row mt-1"
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "Mulish",
                                    lineHeight: "32px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                <div className="col-md p-0 m-1 d-flex justify-content-end">
                                    <span className="text-center">
                                        Already have an account ?
                                        <a
                                            href="Login"
                                            style={{
                                                color: "#5044fd",
                                            }}
                                        >
                                            <span>Sign In</span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ManufacturerSignup);

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
            style={{ letterSpacing: "0.2px", fontSize: "0.9rem" }}
        >
            <span className="font-weight-bold  mb-2">{label}</span>

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
            style={{ letterSpacing: "0.2px", fontSize: "0.9rem" }}
        >
            <span className="font-weight-bold  mb-2">{label}</span>

            <PasswordField
                placeholder={placeholder}
                type={type}
                name={name}
                style={style}
            />
        </div>
    );
}

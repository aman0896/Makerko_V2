import * as Yup from "yup";

//Makers Signup Validation Schema
export const MakersValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("First Name is required"),

    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    contactPerson: Yup.string().required("Contact Person Name is required"),
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
    companyStatus: Yup.object().required("Company Status is required."),
    delivery: Yup.object().required("Delivery is required."),
});

//Signup Validation Schema
export const SignupValidationSchema = Yup.object().shape({
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

//Login Validation Schema
export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password should be 6 or more characters"),
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
    //     "Password should alphabets, numbers and symbols"
    // ),
});

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
        .min(6, "Password should be 6 or more characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            "Password should alphabets, numbers and symbols"
        ),
});

//Feature Project Validation Schema
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const SUPPORTED_FORMATS_PDF = ["application/pdf"];
export const ProjectValidationSchema = Yup.object().shape({
    projectTitle: Yup.string().required("Title is required"),
    manufacturingProcess: Yup.string().required(
        "Manufacturing Process is required"
    ),
    materials: Yup.string().required("Materials is required"),
    category: Yup.string().required("Selector/Category is required"),
    description: Yup.string().required("Description is required"),
    contents: Yup.array()
        .of(
            Yup.object().shape({
                content_title: Yup.string().required(
                    "Content title is required"
                ),
                content_image: Yup.mixed()
                    .required("A photo of project is required for content")
                    .test(
                        "fileFormat",
                        "Unsupported File Format",
                        (value) =>
                            value && SUPPORTED_FORMATS.includes(value.type)
                    ),
                image_position: Yup.object().required(
                    "impagePosition title is required"
                ),
                content_details: Yup.string().required(
                    "content description is required"
                ),
            })
        )
        .required("At least one content is required"),
    coverImage: Yup.mixed().test(
        "fileFormat",
        "Unsupported File Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
    pdfFile: Yup.mixed().test(
        "fileFormat",
        "Unsupported File Format",
        (value) => value && SUPPORTED_FORMATS_PDF.includes(value.type)
    ),
    gallery: Yup.mixed().required("Photos  of project is required"),
    termsCondition: Yup.bool().oneOf(
        [true],
        "Please accept the terms and conditions to continue."
    ),
});

//Get quote Validation Schema
export const GetAQuoteValidationSchema = Yup.object().shape({
    method: Yup.object().required("Method is required"),
    material: Yup.object().required("Material is required"),
    // thickness: Yup.string().required("Thickness is required"),
    materialDetails: Yup.string().required("Material Details are required"),
    quantity: Yup.string().required("Quantity is required"),
    file: Yup.object().required("No file Uploaded"),
    description: Yup.string().required("Brief Description is required"),
});

//reqest design Validation Schema
export const RequestDesignValidationSchema = Yup.object().shape({
    productFile: Yup.object().required("No file Uploaded"),
    sketchFile: Yup.object().required("No file Uploaded"),
    description: Yup.string().required("Brief Description is required"),
    termsCondition: Yup.bool().oneOf(
        [true],
        "Please accept the terms and conditions to continue."
    ),
});

//maker profile validation schema
export const ValidationSchemaMakerProfile = Yup.object().shape({
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
    slogan: Yup.string().required("Slogan is required"),
});

//validation schema customer profile
export const ValidationSchemaCustomerProfile = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    bio: Yup.string().required("Bio is required"),
});

//change password validationschema
export const changePasswordvalidationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password should be 6 or more characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            "Password must have alphabets, numbers and symbols"
        ),
    confirmpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password do not  match"),
});

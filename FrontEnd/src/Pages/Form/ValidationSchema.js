import * as Yup from "yup";

//Makers Signup Validation Schema
export const MakersValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("First Name is required"),

  lastName: Yup.string().required("Last Name is required"),
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

//Feature Project Validation Schema
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const SUPPORTED_FORMATS_PDF = [".pdf"];
export const ProjectValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  process: Yup.string().required("Manufacturing process is required"),
  materials: Yup.string().required("Materials is required"),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("A photo of project is required")
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.size <= FILE_SIZE
    // )
    .test(
      "fileFormat",
      "Unsupported File Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  // pdfDocument: Yup.mixed().test(
  //   "fileFormat",
  //   "Unsupported File Format",
  //   (value) => value && SUPPORTED_FORMATS_PDF.includes(value.type)
  // ),
  termsCondition: Yup.bool().oneOf(
    [true],
    "Please accept the terms and conditions to continue."
  ),
  files: Yup.mixed().required("Photos  of project is required"),

  // .test(
  //   "len",
  //   "No of photos must be between 3 and 10",
  //   (value) => value.length <= 10
  // )
  // .test(
  //   "len",
  //   "No of photos must be between 3 and 10",
  //   (value) => value.length >= 3
  // ),
  // .test(
  //   "fileFormat",
  //   "Unsupported File Format",
  //   (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
  // ),
});

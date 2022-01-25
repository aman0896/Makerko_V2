import Axios from "axios";

//file-upload-link
export const File_Server = "https://images.makerko.com";

//web domain
export const webDomain = "http://localhost:3000/";

// export const File_Server = "http://192.168.88.196:3000";

// export const File_Server = "http://192.168.1.103:5000";

//host api
export const mainHost = "http://localhost:3001/";

export const hostApi = Axios.create({ baseURL: mainHost });

//login
export const login = "account/login";

//signup
export const signup = "account/signup";

//maker signup
export const makerSignup = "account/maker-signup";

//verification
export const otpVerification = "account/verify";

//send-otp
export const sendOTP = "account/send-otp";

//isLoggedIn
export const isLoggedIn = "account/isLoggedIn";

//current userdata
export const currentUserLink = "account/currentUser";

//logout
export const logout = "account/logout";

//create project
export const createProject = "project/create";

//delete project
export const deleteProject = "project/delete-project";

//dropzone file-drop
export const dropzone = "dropzone/file-drop";

//fabrication method
export const fabricationMethod = "process/fabricationMethod";

//material
export const material = "process/material";

//update services
export const makersServices = "account/services/:id";

//update services
export const makersAdditionalDetails = "account/maker-additional-details";

//get services
export const getMakersServices = "account/service";
//file delete
export const fileDelete = "dropzone/file-delete";

//get a quote
export const getAQuote = "quote/get-quote";

//request design
export const requestDesign = "quote/request-design";

//custoemr profile edit
export const customerProfileEdit = "profile/customer-edit";

// maker location
export const getMakerLocation = "profile/maker-get-map";

//maker profile edit
export const makerProfileEdit = "profile/maker-edit";

// maker map edit
export const makerMapEdit = "profile/maker-map-edit";

// maker password edit
export const makerPasswordEdit = "profile/maker-password-edit";

// makers list
export const makersList = "account/makers";

//file download
export const download = "download";

// getMakers list
export const getMakers = "makers/map";

//makers services
export const makers_services = "process/makers-services";

//feature project list api
export const getFeatureProjectList = "project/get-featureproject-list";

//feature project content edit
export const projectContentEdit = "project/content-edit";

//feature project cover image edit
export const projectCoverEdit = "project/cover-edit";

//feature project title, description, productdetails
export const projectDetailEdit = "project/detail-edit";

//new image add Gallery feature project
export const projectGalleryImageAdd = "project/gallery-image";

//save gallery Images
export const updateGallery = "project/update-gallery";

//get maker order list
export const makerOrderList = "order/maker-order";

//update order status
export const updateOrderStatus = "order/update-status";

//customer order status
export const customerOrderList = "order/customer-order";

//customer request design
export const customerRequestDesign = "requestDesign/request_design_list";

//forgot passowrd
export const forgetPassword = "reset/forgot-password";

//reset password
export const resetPassword = "rest/reset-password";

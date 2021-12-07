import Axios from "axios";

//file-upload-link
export const File_Server = "https://images.makerko.com";

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

//dropzone file-drop
export const dropzone = "dropzone/file-drop";

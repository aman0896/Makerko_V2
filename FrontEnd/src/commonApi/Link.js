import Axios from "axios";

//file-upload-link
export const File_Server = "https://images.makerko.com";

// export const File_Server = "http://192.168.88.196:3000";

// export const File_Server = "http://192.168.1.103:5000";

//host api
export const mainHost = "http://localhost/";

export const hostApi = Axios.create({ baseURL: mainHost });

//login
export const login = "account/login";

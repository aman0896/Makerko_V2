import axios from "axios";
import { File_Server } from "../common/Link";

//#region get user info from cookes
export async function GetCookiesInfo() {
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.post(`${window.host}/get-cookie-info`);
        if (response) {
            if (response.data.userInfo) {
                const data = await response.data.userInfo;
                return data;
            } else {
                return await response.data;
            }
        }
    } catch (error) {
        console.log(error);
        return { ServerMsg: "Network Error!!!" };
    }
}
//#endregion

//#region Get_Fabrication_Services
export function GetFabricationServices(fabricationService) {
    axios.post(`${window.host}/fabricationservice`).then((response) => {
        console.log("line-67", response);
        if (response.data) {
            fabricationService(null, response.data);
        } else {
            fabricationService("err", null);
        }
    });
}
//#endregion

//#region Get_Material_From_Fabrication_Service
export function GetMaterialFromFabrication(serviceID, materials) {
    axios
        .post(`${window.host}/materials`, {
            fabricationID: serviceID,
        })
        .then((response) => {
            if (response.data) {
                materials(null, response.data);
            } else materials("err", null);
        });
}
//#endregion

//#region Check MinMax Range
export function CheckRange(value, minValue, maxValue) {
    console.log(value, minValue, maxValue);
    if (value >= minValue && value <= maxValue) {
        return true;
    } else {
        return false;
    }
}
//#endregion

//#region filedownolad Link Generate
export const FileDownload = (filePath, fileName) => {
    var data = JSON.stringify({
        filedir: filePath,
    });

    var config = {
        method: "post",
        responseType: "blob",
        url: "https://api.makerko.com/download/",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
        })
        .catch(function (error) {
            console.log(error);
        });
};
//#endregion

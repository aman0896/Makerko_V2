import Axios from "axios";
import { mainHost } from "./Link";

Axios.defaults.withCredentials = true;

export function getData(link, params, onSuccess, onFail) {
  Axios.get(mainHost + link, {
    params,
    headers: { "content-type": "application/json" },
  })
    .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

export function getDataWithNoParams(link, onSuccess, onFail) {
  Axios.get(mainHost + link, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

// Without FormData
export function postData(link, data, onSuccess, onFail) {
  Axios.post(mainHost + link, data, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

// With FormData
export function postDataWithFormData(link, formData, onSuccess, onFail) {
  Axios.post(mainHost + link, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

// post data with progress event
export function postDataWithCofig(
  link,
  formData,
  setUploadPercentage,
  onSuccess,
  onFail
) {
  Axios.post(mainHost + link, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      setUploadPercentage(
        parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      );
    },
  })
    .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

// // Without FormData
// export function updateData(link, data, onSuccess, onFail) {
//   Axios.post(mainHost + link, data, {
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res)
//     .then((res) => {
//       onSuccess(res);
//     })
//     .catch((err) => {
//       onFail(err);
//     });
// }

export function patchData(link, data, params, onSuccess, onFail) {
  Axios.patch(mainHost + link, data, {
    params,
    headers: { "Content-Type": "application/json" },
  })
    // .then((res) => res)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
}

// delete with param api
export function deleteData(link, params, onSuccess, onFail) {
    var config = {
        method: "delete",
        url: mainHost + link,
        params: { path: params },
        headers: {
            "Content-Type": "application/json",
        },
    };

    Axios(config)
        .then((res) => res)
        .then((res) => {
            onSuccess(res);
        })
        .catch((err) => {
            onFail(err);
        });
}

//#region filedownolad Link Generate Api
export const FileDownload = async (filePath) => {
    var data = JSON.stringify({
        filedir: filePath,
    });

    var config = {
        method: "post",
        responseType: "blob",
        url: "http://localhost:3001/download",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    const fileData = await Axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    return fileData;
};
//#endregion

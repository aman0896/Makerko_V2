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

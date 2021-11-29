import Axios from "axios";

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

export function postData(link, data, onSuccess, onFail) {
    Axios.post(mainHost + link, data, {
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

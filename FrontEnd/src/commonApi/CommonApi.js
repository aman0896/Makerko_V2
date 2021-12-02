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
    Axios.defaults.withCredentials = true;
    Axios.get(mainHost + link, {
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

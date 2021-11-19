import axios from 'axios';

//#region get userInfo from uid
export function GetUserInfo(uid, getUserInfo) {
    axios
        .post(`${window.host}/get-user-info`, {
            uid: uid,
        })
        .then((response) => {
            if (response) {
                getUserInfo(null, response.data);
            }
        });
}
//#endregion

import { getData } from "../../../commonApi/CommonApi";
import { currentUserLink } from "../../../commonApi/Link";
import { SET_CURRENT_USERDATA } from "./Types";

export function CurrentUserdata(dispatch, currentUser) {
    getData(
        currentUserLink,
        { uid: currentUser },
        (onSuccess) => {
            dispatch({
                type: SET_CURRENT_USERDATA,
                currentUserdata: onSuccess.data.currentUserData[0],
            });
        },
        (onFail) => {
            return console.log(onFail, "function GetCurrentUserdata");
        }
    );
}

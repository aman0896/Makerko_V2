import { FileDownload, getData } from "../../../commonApi/CommonApi";
import { currentUserLink } from "../../../commonApi/Link";
import { SET_CURRENT_USERDATA } from "./Types";

export function CurrentUserdata(dispatch, currentUser) {
    getData(
        currentUserLink,
        { uid: currentUser },
        async (onSuccess) => {
            let { currentUserData } = onSuccess.data;

            dispatch({
                type: SET_CURRENT_USERDATA,
                currentUserdata: currentUserData[0],
            });
        },
        (onFail) => {
            return console.log(onFail, "function GetCurrentUserdata");
        }
    );
}

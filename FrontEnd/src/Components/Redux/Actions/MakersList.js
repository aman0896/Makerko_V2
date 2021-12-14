import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { makersList } from "../../../commonApi/Link";
import { SET_MAKERS_LIST } from "./Types";

export function MakersList(dispatch) {
    getDataWithNoParams(
        makersList,
        async (onSuccess) => {
            let { makersList } = onSuccess.data;

            dispatch({
                type: SET_MAKERS_LIST,
                makersList: makersList,
            });
        },
        (onFail) => {
            return console.log(onFail, "function GetCurrentUserdata");
        }
    );
}

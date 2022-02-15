import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { makers_services } from "../../../commonApi/Link";
import { SET_MAKERS_SERVICES } from "./Types";

export const MakersServices = (dispatch) => {
    getDataWithNoParams(
        makers_services,
        (onSuccess) => {
            if (onSuccess.data)
                dispatch({ type: SET_MAKERS_SERVICES, services: onSuccess.data });
            return;
        },
        (onFail) => {
            return console.log(onFail, "fucntion Material");
        }
    );
};

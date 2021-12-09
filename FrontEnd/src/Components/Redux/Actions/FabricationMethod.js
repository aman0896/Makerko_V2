import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { fabricationMethod } from "../../../commonApi/Link";
import { GET_METHOD } from "./Types";

export const FabricationMethod = (dispatch) => {
    getDataWithNoParams(
        fabricationMethod,
        (onSuccess) => {
            if (onSuccess.data)
                dispatch({ type: GET_METHOD, method: onSuccess.data });
            return;
        },
        (onFail) => {
            return console.log(onFail, "fucntion FabricationMethod");
        }
    );
};

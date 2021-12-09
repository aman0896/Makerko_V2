import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { material } from "../../../commonApi/Link";
import { GET_MATERIAL } from "./Types";

export const Material = (dispatch) => {
    getDataWithNoParams(
        material,
        (onSuccess) => {
            if (onSuccess.data)
                dispatch({ type: GET_MATERIAL, material: onSuccess.data });
            return;
        },
        (onFail) => {
            return console.log(onFail, "fucntion Material");
        }
    );
};

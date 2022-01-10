import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { getFeatureProjectList } from "../../../commonApi/Link";
import { SET_FEATUREPROJECT_LIST } from "./Types";

export function FeatureProjectList(dispatch) {
    getDataWithNoParams(
        getFeatureProjectList,
        (onSuccess) => {
            if (onSuccess.data)
                dispatch({
                    type: SET_FEATUREPROJECT_LIST,
                    projectList: onSuccess.data,
                });
            return;
        },
        (onFail) => {
            return console.log(onFail, "fucntion FeatureProject");
        }
    );
}

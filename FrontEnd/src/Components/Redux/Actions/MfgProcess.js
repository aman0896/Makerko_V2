import { getDataWithNoParams } from "../../../commonApi/CommonApi";
import { getMakersServices } from "../../../commonApi/Link";
import {
    DELETE_MFG_PROCCESS,
    GET_MFG_PROCCESS,
    SET_MFG_PROCCESS,
} from "./Types";

export function MfgProcess(mfgProcess) {
    return {
        type: SET_MFG_PROCCESS,
        mfgProcess: mfgProcess,
    };
}
export function DeleteMfgProcess(mfgProcess) {
    return {
        type: DELETE_MFG_PROCCESS,
        mfgProcess: mfgProcess,
    };
}

export function GetMfgProcess(dispatch) {
    getDataWithNoParams(
        `${getMakersServices}/0e868405eebeea624dddbb05a3e0fdc5/aman`,
        (onSuccess) => {
            const { hub, services } = onSuccess.data;

            const hubService = services.map((service) => {
                const { Name, Material_Name, Service_ID } = service;
                var data = {
                    fabricationService: {
                        Service_ID: Service_ID,
                        Name: Name,
                    },
                    materialDetails: JSON.parse(Material_Name),
                };
                return data;
            });
            dispatch({
                type: GET_MFG_PROCCESS,
                mfgProcess: hubService ? hubService : [],
            });
        },
        (onFail) => {
            return console.log(onFail, "function getmfgprocess");
        }
    );
}
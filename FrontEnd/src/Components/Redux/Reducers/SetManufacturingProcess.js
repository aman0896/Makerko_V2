import { Toast } from "../../ReactToastify";
import {
  DELETE_MFG_PROCCESS,
  GET_MFG_PROCCESS,
  SET_MFG_PROCCESS,
} from "../Actions/Types";

const initialSates = {
  mfgProcess: [],
  materialError: false,
  hub: "",
};

export const SetMfgProcess = (state = initialSates, action) => {
  switch (action.type) {
    case SET_MFG_PROCCESS:
      let services = state.mfgProcess;
      let materialError;
      console.log(services, "services");
      console.log(action.mfgProcess, "action");

      if (services.length > 0) {
        const index = services.findIndex(
          (item) =>
            item.fabricationService.Name ===
            action.mfgProcess.fabricationService.Name
        );

        if (index !== -1) {
          const materialIndex = services[index].materialDetails.findIndex(
            (item) =>
              item.material.Material_Name ===
              action.mfgProcess.materialDetails[0].material.Material_Name
          );
          if (materialIndex === -1) {
            services[index].materialDetails = [
              ...services[index].materialDetails,
              action.mfgProcess.materialDetails[0],
            ];
          } else {
            return Toast("Material exist", "error");
          }
        } else {
          services = [...services, action.mfgProcess];
        }
      } else {
        services = [...services, action.mfgProcess];
      }

      return {
        ...state,
        mfgProcess: services,
      };

    case GET_MFG_PROCCESS:
      return {
        ...state,
        mfgProcess: action.mfgProcess,
        hub: action.hub,
      };

    case DELETE_MFG_PROCCESS:
      return {
        ...state,
        mfgProcess: action.mfgProcess,
      };

    default:
      return state;
  }
};

import { SET_MFG_PROCCESS } from "../Actions/Types";

const initialSates = {
  mfgProcess: [],
};

export const SetMfgProcess = (state = initialSates, action) => {
  switch (action.type) {
    case SET_MFG_PROCCESS:
      let services = state.mfgProcess;

      if (services.length > 0) {
        const index = services.findIndex(
          (item) =>
            item.fabricationService === action.mfgProcess.fabricationService
        );
        if (index != -1) {
          const materialIndex = services[index].materialDetails.findIndex(
            (item) =>
              item.material === action.mfgProcess.materialDetails[0].material
          );

          if (materialIndex == -1) {
            services[index].materialDetails = [
              ...services[index].materialDetails,
              action.mfgProcess.materialDetails[0],
            ];
          } else {
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

    default:
      return state;
  }
};

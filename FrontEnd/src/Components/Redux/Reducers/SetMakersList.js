import { SET_MAKERS_LIST } from "../Actions/Types";

const initialStates = {
    makersList: null,
};

export const SetMakersList = (state = initialStates, action) => {
    switch (action.type) {
        case SET_MAKERS_LIST:
            return {
                ...state,
                makersList: action.makersList,
            };

        default:
            return state;
    }
};

import { SET_CURRENT_USERDATA } from "../Actions/Types";

const initialStates = {
    currentUserdata: null,
};

export const SetCurrentUserdata = (state = initialStates, action) => {
    switch (action.type) {
        case SET_CURRENT_USERDATA:
            return {
                ...state,
                currentUserdata: action.currentUserdata,
            };

        default:
            return state;
    }
};

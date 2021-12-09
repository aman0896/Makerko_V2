import { SET_CURRENT_USERDATA } from "../Actions/Types";

const initialSates = {
    currentUserdata: null,
};

export const SetCurrentUserdata = (state = initialSates, action) => {
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

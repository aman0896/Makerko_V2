import { SET_SIDEBAR } from "../Actions/Types";

const initialState = {
    sidebar: false,
};

export const SetSidebar = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR:
            return {
                ...state,
                sidebar: action.isSidebar,
            };

        default:
            return state;
    }
};

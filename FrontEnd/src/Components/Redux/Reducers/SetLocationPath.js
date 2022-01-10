import { SET_LOCATION_PATHNAME } from "../Actions/Types";

const initialStates = {
    pathname: null,
};

export const SetLocationPathname = (state = initialStates, action) => {
    switch (action.type) {
        case SET_LOCATION_PATHNAME:
            console.log(action.pathname, "pathname");
            return {
                ...state,
                pathname: action.pathname,
            };

        default:
            return state;
    }
};

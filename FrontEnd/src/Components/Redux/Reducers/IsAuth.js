import { IS_AUTH } from "../Actions/Types";

const initialState = {
    isAuth: false,
    userType: "",
    currentUser: "",
};

export const IsAuth = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
                userType: action.userType,
                currentUser: action.currentUser,
            };

        default:
            return state;
    }
};

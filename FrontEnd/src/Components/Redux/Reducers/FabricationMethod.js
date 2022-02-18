import { GET_METHOD } from "../Actions/Types";

const initialState = {
    method: null,
};

export const GetMethod = (state = initialState, action) => {
    switch (action.type) {
        case GET_METHOD:
            return {
                ...state,
                method: action.method,
            };

        default:
            return state;
    }
};

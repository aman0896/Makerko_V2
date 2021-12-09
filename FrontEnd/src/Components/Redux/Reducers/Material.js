import { GET_MATERIAL } from "../Actions/Types";

const initialState = {
    material: {},
};

export const GetMaterial = (state = initialState, action) => {
    switch (action.type) {
        case GET_MATERIAL:
            return {
                ...state,
                material: action.material,
            };

        default:
            return state;
    }
};

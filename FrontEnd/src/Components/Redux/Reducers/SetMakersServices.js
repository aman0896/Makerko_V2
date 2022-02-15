import {SET_MAKERS_SERVICES } from "../Actions/Types";

const initialState = {
    services: null,
};

export const SetMakersServices = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAKERS_SERVICES:
            return {
                ...state,
                services: action.services,
            };

        default:
            return state;
    }
};
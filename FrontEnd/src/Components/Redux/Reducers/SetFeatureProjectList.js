import { SET_FEATUREPROJECT_LIST } from "../Actions/Types";

const initialState = {
    projectList: null,
};

export const SetFeatureProjectList = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEATUREPROJECT_LIST:
            return {
                ...state,
                projectList: action.projectList,
            };

        default:
            return state;
    }
};

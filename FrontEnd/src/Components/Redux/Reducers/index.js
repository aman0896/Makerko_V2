import { IsAuth } from "./IsAuth";
import { combineReducers } from "redux";
import { GetMethod } from "./FabricationMethod";
import { GetMaterial } from "./Material";
import { SetCurrentUserdata } from "./SetCurrentUserData";

const allReducers = combineReducers({
    isAuth: IsAuth,
    method: GetMethod,
    material: GetMaterial,
    currentUserdata: SetCurrentUserdata,
});

export default allReducers;

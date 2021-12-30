import { IsAuth } from "./IsAuth";
import { combineReducers } from "redux";
import { GetMethod } from "./FabricationMethod";
import { GetMaterial } from "./Material";
import { SetCurrentUserdata } from "./SetCurrentUserData";
import { SetMfgProcess } from "./SetManufacturingProcess";
import { SetMakersList } from "./SetMakersList";
import { SetMakersServices } from "./SetMakersServices";
import { SetFeatureProjectList } from "./SetFeatureProjectList";
import { SetLocationPathname } from "./SetLocationPath";

const allReducers = combineReducers({
    isAuth: IsAuth,
    method: GetMethod,
    material: GetMaterial,
    currentUserdata: SetCurrentUserdata,
    mfgProcess: SetMfgProcess,
    makersList: SetMakersList,
    makersServices: SetMakersServices,
    projectList: SetFeatureProjectList,
    pathname: SetLocationPathname,
});
export default allReducers;

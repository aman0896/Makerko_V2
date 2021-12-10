import { IsAuth } from "./IsAuth";
import { combineReducers } from "redux";
import { GetMethod } from "./FabricationMethod";
import { GetMaterial } from "./Material";
import { SetCurrentUserdata } from "./SetCurrentUserData";
import { SetMfgProcess } from "./SetManufacturingProcess";

const allReducers = combineReducers({
  isAuth: IsAuth,
  method: GetMethod,
  material: GetMaterial,
  currentUserdata: SetCurrentUserdata,
  mfgProcess: SetMfgProcess,
});

export default allReducers;

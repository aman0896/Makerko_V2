import { SET_MFG_PROCCESS } from "./Types";

export function MfgProcess(mfgProcess) {
  return {
    type: SET_MFG_PROCCESS,
    mfgProcess: mfgProcess,
  };
}

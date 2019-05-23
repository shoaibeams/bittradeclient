import { mdProps, mdGlobalProps } from "../../models/props";
import { StaticHelper } from "../../shared/static-helper";
import { mdAuthUsers } from "../../models/auth-users";
import { mdPreferences } from "../../models/user-preference";

let initialState = new mdGlobalProps();
initialState.isLoggedIn = false;
initialState.showMainLoader = false;
// initialState.username = "";
initialState.user = new mdAuthUsers();
initialState.headerHeight = 0;
initialState.countries = [];
initialState.currencies = [];
initialState.selectedBriefHistory = [];
initialState.preferences = mdPreferences.defaultPreferences();

const propsRedcuer = (state = initialState, action) => {
  if (action.type == "UPDATE_GLBOALS_INSTANCE") {
    state = {
      ...state,
      ...action.payload,
      old: { ...state }
    };
    return state;
  }

  if (!Array.isArray(action.type)) {
    action.type = [action.type];
    action.payload = [action.payload];
  }
  action.type.forEach((type, i) => {
    if (global.propKeys) {
      if (i < action.payload.length) {
        let payload = action.payload[i];
        if (Object.keys(global.propKeys).indexOf(type) > -1) {
          let obj = StaticHelper.assignPropertyOfObject({}, type, payload);
          let oldobj = StaticHelper.assignPropertyOfObject(
            {},
            type,
            state[type]
          );
          if (!oldobj[type]) {
            oldobj = obj;
          }
          state = {
            ...state,
            ...obj,
            old: { ...state.old, ...oldobj }
          };
          return state;
        }
      }
    }
  });
  return state;
};
export default propsRedcuer;

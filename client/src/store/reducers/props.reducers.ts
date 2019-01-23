import { mdProps, mdGlobalProps } from "../../models/props";
import { StaticHelper } from "../../shared/static-helper";

let initialState = new mdGlobalProps();
initialState.isLoggedIn = false;
initialState.showMainLoader = false;
initialState.username = "";

const propsRedcuer = (state = initialState, action) => {
    if (action.type == "UPDATE_GLBOALS_INSTANCE") {
        state = {
            ...state,
            ...action.payload,
            old:{...state}
        }
        return state;
    }

    if (global.propKeys) {
        if (Object.keys(global.propKeys).indexOf(action.type) > -1) {
            let obj = StaticHelper.assignPropertyOfObject({}, action.type, action.payload);
            let oldobj = StaticHelper.assignPropertyOfObject({}, action.type, state[action.type]);
            if(!oldobj[action.type])
            {
                oldobj = obj;
            }
            state = {
                ...state,
                ...obj,
                old:{...state.old, ...oldobj}
            }
            return state;
        }
    }
    return state;
};
export default propsRedcuer;
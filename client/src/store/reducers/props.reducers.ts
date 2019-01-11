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
        }
        return state;
    }

    if (global.propKeys) {
        if (Object.keys(global.propKeys).indexOf(action.type) > -1) {
            let obj = StaticHelper.assignPropertyOfObject({}, action.type, action.payload);
            state = {
                ...state,
                ...obj,
            }
            return state;
        }
    }
    return state;
};
export default propsRedcuer;
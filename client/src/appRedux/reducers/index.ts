import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import propsRedcuer from "../../store/reducers/props.reducers";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  globals:propsRedcuer,
});

export default reducers;

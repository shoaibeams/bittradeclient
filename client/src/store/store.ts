import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import logger from "redux-logger";
import propsRedcuer from "./reducers/props.reducers";

export default createStore(
    combineReducers({
        globals:propsRedcuer,
    }),
    {},
    applyMiddleware()
);
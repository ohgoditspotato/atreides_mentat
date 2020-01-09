import { combineReducers } from "/web_modules/redux.js";
import { houseStateReducer } from "./HouseState.js";
import { viewStateReducer } from "./ViewState.js";
export const rootReducer = combineReducers({
    houses: houseStateReducer,
    view: viewStateReducer
});

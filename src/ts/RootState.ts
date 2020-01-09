import { combineReducers } from "redux";
import { houseStateReducer } from "./HouseState";
import { viewStateReducer } from "./ViewState";

export const rootReducer = combineReducers({
  houses: houseStateReducer,
  view: viewStateReducer
});

export type RootState = ReturnType<typeof rootReducer>;
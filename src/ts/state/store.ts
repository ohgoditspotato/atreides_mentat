import { createStore, compose } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers";
import persistState from "redux-localstorage";

const enhancer = compose(persistState());

const initialState: RootState = {
  houses: {},
  view: {
    active_view: "new_game",
    house_name: undefined,
  },
};

export const stateStore = createStore(rootReducer, initialState, enhancer as any);

export type StoreDispatch = typeof stateStore.dispatch;

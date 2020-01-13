import { createStore, compose } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers";
import persistState from "redux-localstorage";

const enhancer = compose(persistState(["houses", "game"] as any));

const initialState: RootState = {
  houses: {},
  view: {
    active_modal: "none",
    house_name: undefined,
  },
  game: { initialized: false },
};

export const stateStore = createStore(rootReducer, initialState, enhancer as any);

export type StoreDispatch = typeof stateStore.dispatch;

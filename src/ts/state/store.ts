import { createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

export const stateStore = createStore(rootReducer);

export type StoreDispatch = typeof stateStore.dispatch;
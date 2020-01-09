import { createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootState";

export const stateStore = createStore(rootReducer);

export type StoreDispatch = typeof stateStore.dispatch;
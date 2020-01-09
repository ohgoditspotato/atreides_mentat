import { createStore } from "/web_modules/@reduxjs/toolkit.js";
import { rootReducer } from "./RootState.js";

export const stateStore = createStore(rootReducer);

export type StoreDispatch = typeof stateStore.dispatch;
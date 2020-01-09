import { createStore } from "/web_modules/@reduxjs/toolkit.js";
import { rootReducer } from "./RootState.js";
export const stateStore = createStore(rootReducer);

import { createStore } from "redux";
import { root_reducer, root_state } from "./reducers";

import { createMigrate, persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const migrations = {
  0: (state: any) => {
    return { ...state, houses: undefined };
  },
  1: (state: any) => {
    return { ...state, houses: undefined };
  },
};

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations),
  version: 1,
};

const pReducer = persistReducer<root_state>(persistConfig, root_reducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);

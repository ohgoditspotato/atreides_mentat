import { createStore } from "redux";
import { root_reducer, root_state_t, initial_houses_state } from "./reducers";

import { createMigrate, persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import initial_deck from "./initial_deck";

const migrations = {
  0: (state: any) => {
    return { ...state, houses: undefined };
  },
  1: (state: any) => {
    return { ...state, houses: undefined };
  },
  2: (state: any) => {
    return { ...state, game: undefined };
  },
  3: (state: any) => {
    return undefined;
  },
  4: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        current: {
          ...state.game.current,
          decks: [...state.game.current.decks, { cards: [], num_unknowns: 0 }],
        },
      },
    };
  },
  5: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        deck_tracking: false,
        include_expansion_cards: false,
        current: {
          ...state.game.current,
          decks: [{ cards: [...initial_deck], num_unknowns: 0 }],
          draw_deck_index: 0,
          houses: {
            ...state.game.current.houses,
            Ixians: initial_houses_state.Ixians,
            Tleilaxu: initial_houses_state.Tleilaxu,
          },
        },
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations),
  version: 5,
};

const pReducer = persistReducer<root_state_t>(persistConfig, root_reducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);

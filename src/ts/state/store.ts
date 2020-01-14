import { createStore, compose } from "@reduxjs/toolkit";
import { root_reducer, root_state } from "./reducers";
import persistState from "redux-localstorage";

const enhancer = compose(persistState(["houses", "game"] as any));

const initial_state: root_state = {
  houses: {
    ATREIDES: {
      cards: [],
      karama_used: false,
      name: "ATREIDES",
      spice: 0,
    },
  },
  view: {
    active_modal: "none",
    house_name: undefined,
  },
  game: { initialized: false },
};

export const state_store = createStore(root_reducer, initial_state, enhancer as any);

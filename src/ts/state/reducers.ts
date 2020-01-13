import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  house_add_card,
  house_remove_card,
  house_modify_spice,
  close_modal as closeModal,
  show_edit_spice_modal,
  show_add_cards_modal,
  start_game,
  show_view_cards_modal,
  reset_game,
} from "ts/state/actions";
import { ALL_HOUSE_NAMES, house_name_t } from "ts/houses";
import { houses_state_t, view_state_t, game_state_t } from "ts/state/types";

const houses_initial_spice = {
  harkonen: 10,
  atreides: 10,
  fremen: 3,
  bene: 5,
  guild: 5,
  emperor: 10,
} as const;

export const house_state_reducer = createReducer({} as houses_state_t, builder => {
  function getHouse(name: house_name_t, state: houses_state_t) {
    const house = state[name];
    if (house === undefined) {
      throw new Error("House " + name + " not present in this game");
    }
    return house;
  }

  builder.addCase(house_add_card, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards.push(action.payload.card);
  });

  builder.addCase(house_remove_card, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards.splice(action.payload.index, 1);
  });

  builder.addCase(house_modify_spice, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.spice += action.payload.spice;
    if (house.spice < 0) {
      house.spice = 0;
    }
  });

  builder.addCase(start_game, (state, action) => {
    for (let house of ALL_HOUSE_NAMES) {
      if (action.payload[house]) {
        state[house] = {
          spice: houses_initial_spice[house],
          cards: [],
          name: house,
        };
      } else {
        state[house] = undefined;
      }
    }
  });
});

const default_view_state: view_state_t = {
  active_modal: "none",
  house_name: undefined,
};

export const view_state_reducer = createReducer(default_view_state, builder => {
  builder.addCase(closeModal, (state, _) => {
    state.active_modal = "none";
    state.house_name = undefined;
  });

  builder.addCase(show_edit_spice_modal, (state, action) => {
    state.active_modal = "edit_spice";
    state.house_name = action.payload;
  });

  builder.addCase(show_add_cards_modal, (state, action) => {
    state.active_modal = "add_card";
    state.house_name = action.payload;
  });

  builder.addCase(show_view_cards_modal, (state, action) => {
    state.active_modal = "view_cards";
    state.house_name = action.payload;
  });
});

const default_game_state: game_state_t = {
  initialized: false,
};

export const game_state_reducer = createReducer(default_game_state, builder => {
  builder.addCase(start_game, (state, action) => {
    state.initialized = true;
  });
  builder.addCase(reset_game, (state, action) => {
    state.initialized = false;
  });
});

export const root_reducer = combineReducers({
  houses: house_state_reducer,
  view: view_state_reducer,
  game: game_state_reducer,
});

export type root_state = ReturnType<typeof root_reducer>;

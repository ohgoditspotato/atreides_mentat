import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  house_add_card,
  house_remove_card,
  house_modify_spice,
  show_edit_spice_modal,
  show_add_cards_modal,
  start_game,
  show_view_cards_modal,
  reset_game,
  show_reset_game_modal,
  house_toggle_karama,
  close_modal,
  show_alliance_modal,
  house_set_ally,
} from "ts/state/actions";
import { ENEMY_HOUSE_NAMES, house_name_t } from "ts/houses";
import { houses_state_t, view_state_t, game_state_t } from "ts/state/types";

export const initial_houses_state: houses_state_t = {
  ATREIDES: {
    active: true,
    ally: null,
    cards: [],
    karama_used: false,
    name: "ATREIDES",
    spice: 10,
  },
  "BENE GESSERIT": {
    active: false,
    ally: null,
    cards: [{ kind: "UNKNOWN" }],
    karama_used: false,
    name: "BENE GESSERIT",
    spice: 5,
  },
  EMPEROR: {
    active: false,
    ally: null,
    cards: [{ kind: "UNKNOWN" }],
    karama_used: false,
    name: "EMPEROR",
    spice: 10,
  },
  FREMEN: {
    active: false,
    ally: null,
    cards: [{ kind: "UNKNOWN" }],
    karama_used: false,
    name: "FREMEN",
    spice: 3,
  },
  HARKONNEN: {
    active: false,
    ally: null,
    cards: [{ kind: "UNKNOWN" }, { kind: "UNKNOWN" }, { kind: "UNKNOWN" }],
    karama_used: false,
    name: "HARKONNEN",
    spice: 10,
  },
  "SPACING GUILD": {
    active: false,
    ally: null,
    cards: [{ kind: "UNKNOWN" }],
    karama_used: false,
    name: "SPACING GUILD",
    spice: 5,
  },
};

export const house_state_reducer = createReducer(initial_houses_state, builder => {
  function getHouse(name: house_name_t, state: houses_state_t) {
    const house = state[name];
    if (!house.active) {
      throw new Error("House " + name + " not present in this game");
    }
    return house;
  }

  builder.addCase(house_add_card, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards = [action.payload.card, ...house.cards];
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

  builder.addCase(house_toggle_karama, (state, action) => {
    let house = getHouse(action.payload, state);
    house.karama_used = !house.karama_used;
  });

  builder.addCase(house_set_ally, (state, action) => {
    if (action.payload.house === action.payload.ally) {
      throw new Error("Cannot ally to self!");
    }

    let house = getHouse(action.payload.house, state);
    if (house.ally && house.ally !== action.payload.ally) {
      state[house.ally].ally = null;
    }
    house.ally = action.payload.ally;
    if (house.ally) {
      const old_ally = state[house.ally].ally;
      state[house.ally].ally = house.name;
      if (old_ally) {
        state[old_ally].ally = null;
      }
    }
  });

  builder.addCase(reset_game, _ => {
    return initial_houses_state;
  });

  builder.addCase(start_game, (state, action) => {
    for (let house of ENEMY_HOUSE_NAMES) {
      if (action.payload[house]) {
        state[house].active = true;
      }
    }
  });
});

export const default_view_state: view_state_t = {
  active_modal: "none",
  house_name: undefined,
};

export const view_state_reducer = createReducer(default_view_state, builder => {
  builder.addCase(close_modal, (state, _) => {
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

  builder.addCase(show_alliance_modal, (state, action) => {
    state.active_modal = "alliance";
    state.house_name = action.payload;
  });

  builder.addCase(show_reset_game_modal, state => {
    state.active_modal = "reset_game";
    state.house_name = undefined;
  });
});

export const default_game_state: game_state_t = {
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

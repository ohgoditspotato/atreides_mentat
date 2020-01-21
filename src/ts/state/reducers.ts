import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  house_add_card,
  house_remove_card,
  show_add_cards_modal,
  start_game,
  reset_game,
  show_reset_game_modal,
  close_modal,
  house_set_ally,
  house_toggle_expand_cards,
} from "ts/state/actions";
import { ENEMY_HOUSE_NAMES, house_name_t } from "ts/houses";
import { houses_state_t, view_state_t, game_state_t } from "ts/state/types";
import { list_priorities, treachery_card_t } from "ts/treachery_card";
import initial_card_pool from "ts/state/initial_card_pool";

export const initial_houses_state: houses_state_t = {
  Atreides: {
    active: true,
    ally: null,
    cards: [],
    name: "Atreides",
    show_cards: false,
  },
  "Bene Gesserit": {
    active: false,
    ally: null,
    cards: [{ kind: "Unknown" }],
    name: "Bene Gesserit",
    show_cards: false,
  },
  Emperor: {
    active: false,
    ally: null,
    cards: [{ kind: "Unknown" }],
    name: "Emperor",
    show_cards: false,
  },
  Fremen: {
    active: false,
    ally: null,
    cards: [{ kind: "Unknown" }],
    name: "Fremen",
    show_cards: false,
  },
  Harkonnen: {
    active: false,
    ally: null,
    cards: [{ kind: "Unknown" }, { kind: "Unknown" }],
    name: "Harkonnen",
    show_cards: false,
  },
  "Spacing Guild": {
    active: false,
    ally: null,
    cards: [{ kind: "Unknown" }],
    name: "Spacing Guild",
    show_cards: false,
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
    house.cards.push(action.payload.card);
    house.cards.sort((a, b) => list_priorities[a.kind] - list_priorities[b.kind]);
  });

  builder.addCase(house_remove_card, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards.splice(action.payload.index, 1);
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

  builder.addCase(house_toggle_expand_cards, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.show_cards = !house.show_cards;
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
  active_modal: "overview",
  house_name: undefined,
};

export const view_state_reducer = createReducer(default_view_state, builder => {
  builder.addCase(close_modal, (state, _) => {
    state.active_modal = "overview";
    state.house_name = undefined;
  });

  builder.addCase(show_add_cards_modal, (state, action) => {
    state.active_modal = "add_card";
    state.house_name = action.payload;
  });

  builder.addCase(show_reset_game_modal, state => {
    state.active_modal = "reset_game";
    state.house_name = undefined;
  });
});

export const default_game_state: game_state_t = {
  initialized: false,
  treachery_card_pool: initial_card_pool,
};

export const game_state_reducer = createReducer(default_game_state, builder => {
  builder.addCase(start_game, (state, action) => {
    state.initialized = true;
  });

  builder.addCase(reset_game, (state, action) => {
    return default_game_state;
  });

  builder.addCase(house_add_card, (state, action) => {
    const index = state.treachery_card_pool.findIndex(e => sameCard(action.payload.card, e.card));
    if (index !== -1) {
      const entry = state.treachery_card_pool[index];
      if (entry.num !== undefined && entry.num > 0) {
        entry.num -= 1;
      }
      state.treachery_card_pool[index] = entry;
    }
  });

  builder.addCase(house_remove_card, (state, action) => {
    const index = state.treachery_card_pool.findIndex(e => sameCard(action.payload.card, e.card));
    if (index !== -1) {
      const entry = state.treachery_card_pool[index];
      if (entry.num !== undefined) {
        entry.num += 1;
      }
      state.treachery_card_pool[index] = entry;
    }
  });
});

export const root_reducer = combineReducers({
  houses: house_state_reducer,
  view: view_state_reducer,
  game: game_state_reducer,
});

export type root_state = ReturnType<typeof root_reducer>;

function sameCard(a: treachery_card_t, b: treachery_card_t): boolean {
  if (a.kind !== b.kind) {
    return false;
  }
  return (a as any).type === (b as any).type;
}

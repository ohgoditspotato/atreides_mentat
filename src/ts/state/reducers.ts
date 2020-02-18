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
  house_add_unknown,
  house_remove_unknown,
  show_discard_unknown_modal,
  undo_action,
  show_assign_unknown_modal,
  house_assign_unknown,
} from "ts/state/actions";
import { ENEMY_HOUSE_NAMES, house_name_t } from "ts/houses";
import { houses_state_t, view_state_t, game_state_t, game_history_t } from "ts/state/types";
import { card_sort } from "ts/treachery_card";
import initial_deck from "ts/state/initial_deck";

export const initial_houses_state: houses_state_t = {
  Atreides: {
    active: true,
    ally: null,
    cards: [],
    name: "Atreides",
    show_cards: false,
    unknown_cards: [],
  },
  "Bene Gesserit": {
    active: false,
    ally: null,
    cards: [],
    name: "Bene Gesserit",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Emperor: {
    active: false,
    ally: null,
    cards: [],
    name: "Emperor",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Fremen: {
    active: false,
    ally: null,
    cards: [],
    name: "Fremen",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Harkonnen: {
    active: false,
    ally: null,
    cards: [],
    name: "Harkonnen",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }, { deck_index: 0 }],
  },
  "Spacing Guild": {
    active: false,
    ally: null,
    cards: [],
    name: "Spacing Guild",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
};

export const initial_game_state: game_state_t = {
  initialized: false,
  history: [],
  current: {
    decks: [
      { cards: [...initial_deck], num_unknowns: 0 },
      { cards: [], num_unknowns: 0 }, // and initialize a discard deck ready
    ],
    houses: initial_houses_state,
    draw_deck_index: 0,
  },
};

function clone_history(snapshot: game_history_t): game_history_t {
  return JSON.parse(JSON.stringify(snapshot));
}

function push_history(state: game_state_t, handler: (state: game_history_t) => void): game_state_t {
  const current = clone_history(state.current);
  handler(current);
  let history = [...state.history];
  if (history.length === 50) {
    // if the history length is too long, remove the oldest entry
    history.pop();
  }
  const new_state = {
    ...state,
    current,
    history: [state.current, ...history],
  };
  return new_state;
}

function getHouse(name: house_name_t, state: houses_state_t) {
  const house = state[name];
  if (!house.active) {
    throw new Error("House " + name + " not present in this game");
  }
  return house;
}

export const game_state_reducer = createReducer(initial_game_state, builder => {
  builder.addCase(undo_action, state => {
    if (state.history.length === 0) {
      return state;
    } else {
      const [previous, ...rest] = state.history;
      return {
        ...state,
        current: previous,
        history: rest,
      };
    }
  });

  builder.addCase(house_add_card, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      house.cards.push(action.payload.card);
      house.cards.sort(card_sort);

      const deck = history.decks[history.draw_deck_index];
      deck.cards.splice(
        deck.cards.findIndex(c => c.id === action.payload.card.id),
        1
      );

      if (deck.cards.length - deck.num_unknowns === 0) {
        // We've exhausted this deck. Increment draw deck, and add a new discard deck if necessary
        history.draw_deck_index += 1;
        if (history.decks.length - 1 === history.draw_deck_index) {
          history.decks.push({ cards: [], num_unknowns: 0 });
        }
      }
    });
  });

  builder.addCase(house_remove_card, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [removed_card] = house.cards.splice(action.payload.index, 1);
      const discard_deck = history.decks[history.decks.length - 1];
      discard_deck.cards.push(removed_card);
      discard_deck.cards.sort(card_sort);
    });
  });

  builder.addCase(house_add_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload, history.houses);
      house.unknown_cards.push({ deck_index: history.draw_deck_index });

      const deck = history.decks[history.draw_deck_index];
      deck.num_unknowns += 1;

      if (deck.cards.length - deck.num_unknowns === 0) {
        // We've exhausted this deck. Increment draw deck, and add a new discard deck if necessary
        history.draw_deck_index += 1;
        if (history.decks.length - 1 === history.draw_deck_index) {
          history.decks.push({ cards: [], num_unknowns: 0 });
        }
      }
    });
  });

  builder.addCase(house_remove_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [unknown_card] = house.unknown_cards.splice(action.payload.unknown_index, 1);
      const deck = history.decks[unknown_card.deck_index];
      const [card] = deck.cards.splice(
        deck.cards.findIndex(c => c.id === action.payload.actual_card_id),
        1
      );

      deck.num_unknowns -= 1;
      // push this card into the current discard pile
      const discard_deck = history.decks[history.decks.length - 1];
      discard_deck.cards.push(card);
      discard_deck.cards.sort(card_sort);
    });
  });

  builder.addCase(house_assign_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [unknown_card] = house.unknown_cards.splice(action.payload.unknown_index, 1);
      const deck = history.decks[unknown_card.deck_index];
      const [card] = deck.cards.splice(
        deck.cards.findIndex(c => c.id === action.payload.actual_card_id),
        1
      );

      deck.num_unknowns -= 1;
      // push this card into the players hand
      house.cards.push(card);
      house.cards.sort(card_sort);
    });
  });

  builder.addCase(house_set_ally, (state, action) => {
    return push_history(state, history => {
      if (action.payload.house === action.payload.ally) {
        throw new Error("Cannot ally to self!");
      }

      let house = getHouse(action.payload.house, history.houses);
      if (house.ally && house.ally !== action.payload.ally) {
        history.houses[house.ally].ally = null;
      }
      house.ally = action.payload.ally;
      if (house.ally) {
        const old_ally = history.houses[house.ally].ally;
        history.houses[house.ally].ally = house.name;
        if (old_ally) {
          history.houses[old_ally].ally = null;
        }
      }
    });
  });

  builder.addCase(house_toggle_expand_cards, (state, action) => {
    let house = getHouse(action.payload.house, state.current.houses);
    house.show_cards = !house.show_cards;
  });

  builder.addCase(reset_game, _ => {
    return initial_game_state;
  });

  builder.addCase(start_game, (state, action) => {
    const history = state.current;
    for (let house of ENEMY_HOUSE_NAMES) {
      if (action.payload[house]) {
        history.houses[house].active = true;
        for (var i = 0; i < history.houses[house].unknown_cards.length; i++) {
          history.decks[0].num_unknowns += 1;
        }
      }
    }

    state.initialized = true;
    state.current.decks[state.current.draw_deck_index].cards.sort(card_sort);
  });
});

export const default_view_state: view_state_t = {
  active_modal: "overview",
  house_name: undefined,
};

export const view_state_reducer = createReducer(default_view_state, builder => {
  builder.addCase(close_modal, (state, _) => {
    return default_view_state;
  });

  builder.addCase(show_add_cards_modal, (state, action) => {
    return { ...default_view_state, house_name: action.payload, active_modal: "add_card" };
  });

  builder.addCase(show_reset_game_modal, state => {
    return { ...default_view_state, active_modal: "reset_game" };
  });

  builder.addCase(show_discard_unknown_modal, (state, action) => {
    state.active_modal = "discard_unknown";
    state.house_name = action.payload;
  });

  builder.addCase(show_assign_unknown_modal, (state, action) => {
    state.active_modal = "assign_unknown";
    state.house_name = action.payload;
  });
});

export const root_reducer = combineReducers({
  view: view_state_reducer,
  game: game_state_reducer,
});

export type root_state_t = ReturnType<typeof root_reducer>;

import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  addCard,
  removeCard,
  modifySpice,
  showOverview as closeModal,
  showEditSpice,
  showAddCard,
  startGame,
  showViewCards,
  resetGame,
} from "ts/state/actions";
import { ALL_HOUSE_NAMES, house_name_t } from "ts/houses";
import { HousesState, ViewState, GameState } from "ts/state/types";

const housesInitialSpice = {
  harkonen: 10,
  atreides: 10,
  fremen: 3,
  bene: 5,
  guild: 5,
  emperor: 10,
} as const;

export const houseStateReducer = createReducer({} as HousesState, builder => {
  function getHouse(name: house_name_t, state: HousesState) {
    const house = state[name];
    if (house === undefined) {
      throw new Error("House " + name + " not present in this game");
    }
    return house;
  }

  builder.addCase(addCard, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards.push(action.payload.card);
  });

  builder.addCase(removeCard, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.cards.splice(action.payload.index, 1);
  });

  builder.addCase(modifySpice, (state, action) => {
    let house = getHouse(action.payload.house, state);
    house.spice += action.payload.spice;
    if (house.spice < 0) {
      house.spice = 0;
    }
  });

  builder.addCase(startGame, (state, action) => {
    for (let house of ALL_HOUSE_NAMES) {
      if (action.payload[house]) {
        state[house] = {
          spice: housesInitialSpice[house],
          cards: [],
          name: house,
        };
      } else {
        state[house] = undefined;
      }
    }
  });
});

const defaultViewState: ViewState = {
  active_modal: "none",
  house_name: undefined,
};

export const viewStateReducer = createReducer(defaultViewState, builder => {
  builder.addCase(closeModal, (state, _) => {
    state.active_modal = "none";
    state.house_name = undefined;
  });

  builder.addCase(showEditSpice, (state, action) => {
    state.active_modal = "edit_spice";
    state.house_name = action.payload;
  });

  builder.addCase(showAddCard, (state, action) => {
    state.active_modal = "add_card";
    state.house_name = action.payload;
  });

  builder.addCase(showViewCards, (state, action) => {
    state.active_modal = "view_cards";
    state.house_name = action.payload;
  });
});

const defaultGameState: GameState = {
  initialized: false,
};

export const gameStateReducer = createReducer(defaultGameState, builder => {
  builder.addCase(startGame, (state, action) => {
    state.initialized = true;
  });
  builder.addCase(resetGame, (state, action) => {
    state.initialized = false;
  });
});

export const rootReducer = combineReducers({
  houses: houseStateReducer,
  view: viewStateReducer,
  game: gameStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

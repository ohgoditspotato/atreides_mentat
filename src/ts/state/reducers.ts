import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  addCard,
  removeCard,
  modifySpice,
  showNewGame,
  showOverview,
  showHouseDetails,
  showEditSpice,
  showAddCard,
  initHouses,
} from "ts/state/actions";
import { ALL_HOUSE_NAMES, HouseName } from "ts/houses";
import { HousesState, ViewState } from "ts/state/types";

export const houseStateReducer = createReducer({} as HousesState, builder => {
  function getHouse(name: HouseName, state: HousesState) {
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

  builder.addCase(initHouses, (state, action) => {
    for (let house of ALL_HOUSE_NAMES) {
      if (action.payload[house]) {
        state[house] = {
          spice: 0,
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
  active_view: "new_game",
  house_name: undefined,
};

export const viewStateReducer = createReducer(defaultViewState, builder => {
  builder.addCase(showNewGame, (state, _) => {
    state.active_view = "new_game";
    state.house_name = undefined;
  });

  builder.addCase(showOverview, (state, _) => {
    state.active_view = "overview";
    state.house_name = undefined;
  });

  builder.addCase(showHouseDetails, (state, action) => {
    state.active_view = "house_details";
    state.house_name = action.payload;
  });

  builder.addCase(showEditSpice, (state, action) => {
    state.active_view = "edit_spice";
    state.house_name = action.payload;
  });

  builder.addCase(showAddCard, (state, action) => {
    state.active_view = "add_card";
    state.house_name = action.payload;
  });
});

export const rootReducer = combineReducers({
  houses: houseStateReducer,
  view: viewStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

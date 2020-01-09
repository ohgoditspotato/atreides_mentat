import { createAction, createReducer } from "/web_modules/@reduxjs/toolkit.js";
import { TreacheryCard } from "./TreacheryCard.js";
import { showNewGame } from "./ViewState.js";

export interface HouseState {
  spice: number;
  cards: Array<TreacheryCard>;
}

export const addCard = createAction(
  "houses/add_card",
  (house_name: HouseName, card: TreacheryCard) => {
    return {
      payload: {
        house_name,
        card,
      },
    };
  }
);

export const removeCard = createAction(
  "houses/remove_card",
  (house_name: HouseName, index: number) => {
    return {
      payload: {
        house_name,
        index,
      },
    };
  }
);

export const modifySpice = createAction(
  "houses/modify_spice",
  (house_name: HouseName, spice: number) => {
    if (!Number.isInteger(spice)) {
      throw new Error("Spice value must be an integer");
    }
    return {
      payload: {
        house_name,
        spice,
      },
    };
  }
);

export const toggleHouse = createAction<HouseName>("houses/toggle_house");

export const ALL_HOUSE_NAMES = ["harkonen", "guild", "emperor", "bene", "fremen"] as const;
export type HouseNameTuple = typeof ALL_HOUSE_NAMES;
export type HouseName = HouseNameTuple[number];

export type HousesState = {
  [key in HouseName]?: HouseState;
};

const defaultState: HousesState = {};

function getHouse(name: HouseName, state: HousesState) {
  const house = state[name];
  if (house === undefined) {
    throw new Error("House " + name + " not present in this game");
  }
  return house;
}

export const houseStateReducer = createReducer(defaultState, builder => {
  builder.addCase(addCard, (state, action) => {
    let house = getHouse(action.payload.house_name, state);
    house.cards.push(action.payload.card);
  });

  builder.addCase(removeCard, (state, action) => {
    let house = getHouse(action.payload.house_name, state);
    house.cards.splice(action.payload.index, 1);
  });

  builder.addCase(modifySpice, (state, action) => {
    let house = getHouse(action.payload.house_name, state);
    house.spice += action.payload.spice;
    if (house.spice < 0) {
      house.spice = 0;
    }
  });

  builder.addCase(toggleHouse, (state, action) => {
    let house = state[action.payload];
    if (house !== undefined) {
      state[action.payload] = undefined;
    } else {
      state[action.payload] = {
        cards: [],
        spice: 0, // TODO actually get the starting spice by house
      };
    }
  });

  builder.addCase(showNewGame, (state, action) => {
    return {};
  });
});

import { createAction, createReducer } from "@reduxjs/toolkit";

export interface WeaponCard {
  kind: "weapon";
  type: "projectile" | "poison" | "lasgun";
}

export interface DefenceCard {
  kind: "defence";
  type: "shield" | "snooper";
}

export interface UselessCard {
  kind: "useless";
}

export type TreacheryCard = WeaponCard | DefenceCard | UselessCard;

export interface HouseState {
  spice: number;
  cards: Array<TreacheryCard>;
}

export const addCard = createAction("add_card", (house_name: HouseName, card: TreacheryCard) => {
  return {
    payload: {
      house_name,
      card,
    },
  };
});

export const removeCard = createAction("remove_card", (house_name: HouseName, index: number) => {
  return {
    payload: {
      house_name,
      index,
    },
  };
});

export const modifySpice = createAction("modify_spice", (house_name: HouseName, spice: number) => {
  if (!Number.isInteger(spice)) {
    throw new Error("Spice value must be an integer");
  }
  return {
    payload: {
      house_name,
      spice,
    },
  };
});

export const showEditHouse = createAction<HouseName | undefined>("show_edit_house");

export const startGame = createAction("start_game");
export const resetGame = createAction("reset_game");
export const toggleHouse = createAction<HouseName>("toggle_house");

export const ALL_HOUSE_NAMES = ["harkonen", "guild", "emperor", "bene", "fremen"] as const;
export type HouseNameTuple = typeof ALL_HOUSE_NAMES;
export type HouseName = HouseNameTuple[number];

export interface GameState {
  houses: {
    [key in HouseName]?: HouseState;
  };
  in_progress: boolean;
  edit_house?: HouseName;
}

const defaultState: GameState = { houses: {}, in_progress: false };

function getHouse(name: HouseName, state: GameState) {
  const house = state.houses[name];
  if (house === undefined) {
    throw new Error("House " + name + " not present in this game");
  }
  return house;
}

export const gameStateReducer = createReducer(defaultState, builder => {
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

  builder.addCase(showEditHouse, (state, action) => {
    if (action.payload === undefined) {
      state.edit_house = undefined;
      return;
    }
    getHouse(action.payload, state);
    state.edit_house = action.payload;
  });

  builder.addCase(startGame, state => {
    state.in_progress = true;
  });

  builder.addCase(resetGame, state => {
    state.houses = {};
    state.in_progress = false;
  });

  builder.addCase(toggleHouse, (state, action) => {
    let house = state.houses[action.payload];
    if (house !== undefined) {
      delete state.houses[action.payload];
    } else {
      state.houses[action.payload] = {
        cards: [],
        spice: 0, // TODO actually set the starting spice by house
      };
    }
  });
});

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
  cards: ReadonlyArray<TreacheryCard>;
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
}

const defaultState: GameState = { houses: {}, in_progress: false };

export const gameStateReducer = createReducer(defaultState, builder => {
  builder.addCase(addCard, (state, action) => {
    let house = state.houses[action.payload.house_name];
    if (house !== undefined) {
      console.log(
        "Adding card: ",
        action.payload.card.kind,
        " to house: ",
        action.payload.house_name
      );
      house.cards.push(action.payload.card);
    } else {
      throw new Error("House not present in this game, cannot add card");
    }
  });

  builder.addCase(removeCard, (state, action) => {
    let house = state.houses[action.payload.house_name];
    if (house === undefined) {
      throw new Error("House not present in this game, cannot remove card");
    }
    const deleted = house.cards.splice(action.payload.index, 1)[0];
    console.log("Removed card: ", deleted.kind, " from house: ", action.payload.house_name);
  });

  builder.addCase(modifySpice, (state, action) => {
    let house = state.houses[action.payload.house_name];
    if (house === undefined) {
      throw new Error("House not present in this game, cannot modify spice");
    }
    house.spice += action.payload.spice;
    if (house.spice < 0) {
      house.spice = 0;
    }
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

  builder.addCase(startGame, state => {
    state.in_progress = true;
  });

  builder.addCase(resetGame, state => {
    state.houses = {};
    state.in_progress = false;
  });
});

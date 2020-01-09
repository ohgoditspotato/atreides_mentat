import { createAction } from "@reduxjs/toolkit";
import { HouseName } from "ts/houses";
import { TreacheryCard } from "ts/TreacheryCard";
import { InitHousePayload } from "ts/state/types";

export const showNewGame = createAction("view/new_game");
export const showOverview = createAction("view/overview");
export const showHouseDetails = createAction<HouseName>("view/house_details");
export const showEditSpice = createAction<HouseName>("view/edit_spice");
export const showAddCard = createAction<HouseName>("view/add_card");

export const addCard = createAction("houses/add_card", (house: HouseName, card: TreacheryCard) => {
  return {
    payload: {
      house,
      card,
    },
  };
});

export const removeCard = createAction("houses/remove_card", (house: HouseName, index: number) => {
  return {
    payload: {
      house,
      index,
    },
  };
});

export const modifySpice = createAction(
  "houses/modify_spice",
  (house: HouseName, spice: number) => {
    if (!Number.isInteger(spice)) {
      throw new Error("Spice value must be an integer");
    }
    return {
      payload: {
        house,
        spice,
      },
    };
  }
);

export const initHouses = createAction<InitHousePayload>("houses/init");

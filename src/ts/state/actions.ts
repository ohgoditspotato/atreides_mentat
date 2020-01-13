import { createAction } from "@reduxjs/toolkit";
import { house_name_t } from "ts/houses";
import { treachery_card } from "ts/treachery_card";
import { InitHousePayload } from "ts/state/types";

export const showOverview = createAction("view/overview");
export const showEditSpice = createAction<house_name_t>("view/edit_spice");
export const showViewCards = createAction<house_name_t>("view/view_cards");
export const showAddCard = createAction<house_name_t>("view/add_card");

export const addCard = createAction("houses/add_card", (house: house_name_t, card: treachery_card) => {
  return {
    payload: {
      house,
      card,
    },
  };
});

export const removeCard = createAction("houses/remove_card", (house: house_name_t, index: number) => {
  return {
    payload: {
      house,
      index,
    },
  };
});

export const modifySpice = createAction(
  "houses/modify_spice",
  (house: house_name_t, spice: number) => {
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

export const startGame = createAction<InitHousePayload>("game/start");
export const resetGame = createAction("game/reset");

import { createAction } from "@reduxjs/toolkit";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { start_game_spec } from "ts/state/types";

export const close_modal = createAction("view/none");
export const show_edit_spice_modal = createAction<house_name_t>("view/edit_spice");
export const show_view_cards_modal = createAction<house_name_t>("view/view_cards");
export const show_add_cards_modal = createAction<house_name_t>("view/add_card");
export const show_reset_game_modal = createAction("view/reset");

export const house_add_card = createAction("houses/add_card", (house: house_name_t, card: treachery_card_t) => {
  return {
    payload: {
      house,
      card,
    },
  };
});

export const house_remove_card = createAction("houses/remove_card", (house: house_name_t, index: number) => {
  return {
    payload: {
      house,
      index,
    },
  };
});

export const house_modify_spice = createAction(
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

export const start_game = createAction<start_game_spec>("game/start");
export const reset_game = createAction("game/reset");

import { createAction } from "@reduxjs/toolkit";
import { house_name_t } from "ts/houses";
import { start_game_spec } from "ts/state/types";
import { treachery_card_t } from "ts/treachery_card";

export const close_modal = createAction("view/none");
export const show_add_cards_modal = createAction<house_name_t>("view/add_card");
export const show_reset_game_modal = createAction("view/reset");
export const show_discard_unknown_modal = createAction<house_name_t>("view/discard_unknown");
export const show_assign_unknown_modal = createAction<house_name_t>("view/assign_unknown");
export const show_disable_tracking_modal = createAction("view/disable_tracking");

export const house_add_card = createAction(
  "houses/add_card",
  (house: house_name_t, card: treachery_card_t) => {
    return {
      payload: {
        house,
        card,
      },
    };
  }
);

export const house_remove_card = createAction(
  "houses/remove_card",
  (house: house_name_t, index: number) => {
    return {
      payload: {
        house,
        index,
      },
    };
  }
);

export const house_add_unknown = createAction<house_name_t>("houses/add_unknown");

export const house_remove_unknown = createAction(
  "houses/remove_unknown",
  (house: house_name_t, unknown_index: number, actual_card_id?: string) => {
    return {
      payload: {
        house,
        unknown_index,
        actual_card_id,
      },
    };
  }
);

export const house_assign_unknown = createAction(
  "house/assign_unknown",
  (house: house_name_t, unknown_index: number, actual_card_id: string) => {
    return {
      payload: {
        house,
        unknown_index,
        actual_card_id,
      },
    };
  }
);

export const house_set_ally = createAction(
  "houses/set_ally",
  (house: house_name_t, ally: house_name_t | null) => {
    return {
      payload: {
        house,
        ally,
      },
    };
  }
);

export const house_toggle_expand_cards = createAction(
  "houses/toggle_expand_cards",
  (house: house_name_t) => {
    return {
      payload: {
        house,
      },
    };
  }
);

export const return_to_deck = createAction("game/return_to_deck", (card_id: string) => {
  return {
    payload: {
      card_id,
    },
  };
});
export const start_game = createAction<start_game_spec>("game/start");
export const reset_game = createAction("game/reset");
export const undo_action = createAction("game/undo");
export const toggle_deck_tracking = createAction("game/toggle_deck_tracking");

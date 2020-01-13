import { house_name_t } from "../houses";
import { treachery_card_t } from "../treachery_card";

export type start_game_spec = {
  [key in house_name_t]: boolean;
};

export interface house_state_t {
  spice: number;
  cards: Array<treachery_card_t>;
  name: house_name_t;
}

export type houses_state_t = {
  [key in house_name_t]?: house_state_t;
};

export type active_modal = "none" | "edit_spice" | "view_cards" | "add_card" | "reset_game";

export interface view_state_t {
  active_modal: active_modal;
  house_name?: house_name_t;
}

export interface game_state_t {
  initialized: boolean;
}

import { enemy_house_name_t, house_name_t } from "../houses";
import { treachery_card_t, unknown_card_t } from "ts/treachery_card";

export type houses_enabled = {
  [key in enemy_house_name_t]: boolean;
};

export type start_game_spec = {
  houses: houses_enabled;
  deck_tracking: boolean;
  include_expansion_cards: boolean;
}

export interface house_state_t {
  cards: Array<treachery_card_t>;
  unknown_cards: Array<unknown_card_t>;
  name: house_name_t;
  ally: house_name_t | null;
  active: boolean;
  show_cards: boolean;
}

export type houses_state_t = {
  [key in house_name_t]: house_state_t;
};

export type active_page =
  | "overview"
  | "add_card"
  | "discard_unknown"
  | "assign_unknown"
  | "reset_game"
  | "alliance"
  | "disable_tracking";

export interface view_state_t {
  active_modal: active_page;
  house_name?: house_name_t;
}

export interface deck_t {
  cards: Array<treachery_card_t>;
  num_unknowns: number;
}

export interface game_history_t {
  decks: Array<deck_t>;
  houses: houses_state_t;
  draw_deck_index: number;
}

export interface game_state_t {
  initialized: boolean;
  deck_tracking: boolean;
  include_expansion_cards: boolean;
  history: Array<game_history_t>;
  current: game_history_t;
  // keep a record of every change the player makes, so they can revert any action.
  // Set an arbitary limit like 50 moves or something.
  // last entry is the most recent
  // ordered from newest to oldest. So history[0] is state before current.
}

import { house_name_t } from "../houses";
import { treachery_card } from "../treachery_card";

export type InitHousePayload = {
  [key in house_name_t]: boolean;
};

export interface HouseState {
  spice: number;
  cards: Array<treachery_card>;
  name: house_name_t;
}

export type HousesState = {
  [key in house_name_t]?: HouseState;
};

export type ActiveModal = "none" | "edit_spice" | "view_cards" | "add_card";

export interface ViewState {
  active_modal: ActiveModal;
  house_name?: house_name_t;
}

export interface GameState {
  initialized: boolean;
}

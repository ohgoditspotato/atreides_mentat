import { HouseName } from "../houses";
import { TreacheryCard } from "./../TreacheryCard";

export type InitHousePayload = {
  [key in HouseName]: boolean;
};

export interface HouseState {
  spice: number;
  cards: Array<TreacheryCard>;
  name: string;
}

export type HousesState = {
  [key in HouseName]?: HouseState;
};

export type View =
  | "new_game"
  | "overview"
  | "house_details"
  | "edit_spice"
  | "view_cards"
  | "add_card";

export interface ViewState {
  active_view: View;
  house_name?: HouseName;
}

import { HouseName } from "./HouseState.js";
import { createAction, createReducer } from "/web_modules/@reduxjs/toolkit.js";

export type View = "new_game" | "overview" | "house_details" | "edit_spice" | "add_card";

export interface ViewState {
  active_view: View;
  house_name?: HouseName;
}

export const showNewGame = createAction("view/new_game");
export const showOverview = createAction("view/overview");
export const showHouseDetails = createAction<HouseName>("view/house_details");
export const showEditSpice = createAction<HouseName>("view/edit_spice");
export const showAddCard = createAction<HouseName>("view/add_card");

const defaultViewState: ViewState = {
  active_view: "new_game",
  house_name: undefined,
};

export const viewStateReducer = createReducer(defaultViewState, builder => {
  builder.addCase(showNewGame, (state, action) => {
    state.active_view = "new_game";
    state.house_name = undefined;
  });

  builder.addCase(showOverview, (state, action) => {
    state.active_view = "overview";
    state.house_name = undefined;
  });

  builder.addCase(showHouseDetails, (state, action) => {
    state.active_view = "house_details";
    state.house_name = action.payload;
  });

  builder.addCase(showEditSpice, (state, action) => {
    state.active_view = "edit_spice";
    state.house_name = action.payload;
  });

  builder.addCase(showAddCard, (state, action) => {
    state.active_view = "add_card";
    state.house_name = action.payload;
  });
});

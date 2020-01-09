import { createAction, createReducer } from "/web_modules/@reduxjs/toolkit.js";
export const showNewGame = createAction("view/new_game");
export const showOverview = createAction("view/overview");
export const showHouseDetails = createAction("view/house_details");
export const showEditSpice = createAction("view/edit_spice");
export const showAddCard = createAction("view/add_card");
const defaultViewState = {
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

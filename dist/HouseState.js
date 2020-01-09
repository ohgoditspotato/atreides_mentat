import { createAction, createReducer } from "/web_modules/@reduxjs/toolkit.js";
import { showNewGame } from "./ViewState.js";
export const addCard = createAction("houses/add_card", (house_name, card) => {
    return {
        payload: {
            house_name,
            card,
        },
    };
});
export const removeCard = createAction("houses/remove_card", (house_name, index) => {
    return {
        payload: {
            house_name,
            index,
        },
    };
});
export const modifySpice = createAction("houses/modify_spice", (house_name, spice) => {
    if (!Number.isInteger(spice)) {
        throw new Error("Spice value must be an integer");
    }
    return {
        payload: {
            house_name,
            spice,
        },
    };
});
export const toggleHouse = createAction("houses/toggle_house");
export const ALL_HOUSE_NAMES = ["harkonen", "guild", "emperor", "bene", "fremen"];
const defaultState = {};
function getHouse(name, state) {
    const house = state[name];
    if (house === undefined) {
        throw new Error("House " + name + " not present in this game");
    }
    return house;
}
export const houseStateReducer = createReducer(defaultState, builder => {
    builder.addCase(addCard, (state, action) => {
        let house = getHouse(action.payload.house_name, state);
        house.cards.push(action.payload.card);
    });
    builder.addCase(removeCard, (state, action) => {
        let house = getHouse(action.payload.house_name, state);
        house.cards.splice(action.payload.index, 1);
    });
    builder.addCase(modifySpice, (state, action) => {
        let house = getHouse(action.payload.house_name, state);
        house.spice += action.payload.spice;
        if (house.spice < 0) {
            house.spice = 0;
        }
    });
    builder.addCase(toggleHouse, (state, action) => {
        let house = state[action.payload];
        if (house !== undefined) {
            state[action.payload] = undefined;
        }
        else {
            state[action.payload] = {
                cards: [],
                spice: 0,
            };
        }
    });
    builder.addCase(showNewGame, (state, action) => {
        return {};
    });
});

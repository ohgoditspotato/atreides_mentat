import * as React from "/web_modules/react.js";
import { useSelector, useDispatch } from "/web_modules/react-redux.js";
import { ALL_HOUSE_NAMES } from "../HouseState.js";
import HouseTile from "./HouseTile.js";
import { showNewGame } from "../ViewState.js";
const GameOverview = () => {
    const state = useSelector((state) => ({
        houses: state.houses,
    }));
    const dispatch = useDispatch();
    const housesArray = [];
    for (let name of ALL_HOUSE_NAMES) {
        const houseState = state.houses[name];
        if (houseState !== undefined) {
            housesArray.push(React.createElement(HouseTile, { house_name: name, spice: houseState.spice }));
        }
    }
    return (React.createElement("div", null,
        housesArray,
        React.createElement("input", { type: "button", value: "Reset game", onClick: () => {
                dispatch(showNewGame());
            } })));
};
export default GameOverview;

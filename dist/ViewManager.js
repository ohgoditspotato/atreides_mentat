import * as React from "/web_modules/react.js";
import { useSelector } from "/web_modules/react-redux.js";
import NewGame from "./components/NewGame.js";
import GameOverview from "./components/GameOverview.js";
import HouseTile from "./components/HouseTile.js";
const ViewManager = () => {
    const state = useSelector((state) => {
        let house = undefined;
        if (state.view.house_name !== undefined) {
            const house_state = state.houses[state.view.house_name];
            house = {
                name: state.view.house_name,
                spice: house_state.spice,
            };
        }
        return {
            house: house,
            active_view: state.view.active_view,
        };
    });
    switch (state.active_view) {
        case "new_game":
            return React.createElement(NewGame, null);
        case "overview":
            return React.createElement(GameOverview, null);
        case "house_details":
            if (state.house !== undefined) {
                return React.createElement(HouseTile, { spice: state.house.spice, house_name: state.house.name });
            }
            else {
                throw new Error("Missing view.house_name");
            }
        default: {
            throw new Error("Unhandled active_view state");
        }
    }
};
export default ViewManager;

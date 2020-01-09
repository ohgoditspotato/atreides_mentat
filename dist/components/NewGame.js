import * as React from "/web_modules/react.js";
import { useSelector, useDispatch } from "/web_modules/react-redux.js";
import { ALL_HOUSE_NAMES, toggleHouse } from "../HouseState.js";
import { houseNameStr } from "../strings.js";
import { showOverview } from "../ViewState.js";
export default () => {
    const houses = useSelector((state) => state.houses);
    let allow_start = false;
    for (let i of ALL_HOUSE_NAMES) {
        if (houses[i] !== undefined) {
            allow_start = true;
            break;
        }
    }
    const dispatch = useDispatch();
    return (React.createElement("div", null,
        React.createElement("h1", null, "New game"),
        React.createElement("p", null, "Select houses in the game"),
        ALL_HOUSE_NAMES.map(name => {
            return (React.createElement("div", { key: name },
                React.createElement("label", null,
                    houseNameStr(name),
                    React.createElement("input", { type: "checkbox", checked: !!houses[name], onChange: () => dispatch(toggleHouse(name)) })),
                React.createElement("div", null)));
        }),
        React.createElement("input", { type: "button", value: "Start game", disabled: !allow_start, onClick: () => {
                if (allow_start) {
                    dispatch(showOverview());
                }
            } })));
};

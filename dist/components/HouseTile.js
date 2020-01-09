import * as React from "/web_modules/react.js";
import { useDispatch } from "/web_modules/react-redux.js";
import { houseNameStr } from "../strings.js";
const HouseTile = props => {
    const dispatch = useDispatch();
    return (React.createElement("div", null,
        React.createElement("h2", null, houseNameStr(props.house_name)),
        React.createElement("label", null,
            "Spice",
            React.createElement("input", { type: "number", value: props.spice, readOnly: true })),
        React.createElement("input", { type: "button", value: "Edit", onClick: () => { } }),
        React.createElement("input", { type: "button", value: "View Cards" })));
};
export default HouseTile;

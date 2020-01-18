import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { house_set_ally } from "ts/state/actions";
import { root_state } from "ts/state/reducers";

const AllianceDropdown: React.FC<{ house: house_name_t; ally: house_name_t | null }> = props => {
  const houses_state = useSelector((state: root_state) => state.houses);
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = React.useState(false);

  const possible_allies = [
    null,
    ...ALL_HOUSE_NAMES.filter(
      name => houses_state[name].active && houses_state[name].ally == null && name !== props.house
    ),
  ];

  return (
    <div>
      <p className="heading">Allied to</p>
      <div className={"dropdown" + (showDrop ? " is-active" : "")}>
        <div className="dropdown-trigger">
          <button className="button is-fullwidth" onClick={() => setShowDrop(true)}>
            {props.ally ? props.ally : "No ally"}
          </button>
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {possible_allies.map(name => (
              <div className="dropdown-item" key={name ? name : "No ally"}>
                <div
                  onClick={() => {
                    dispatch(house_set_ally(props.house, name));
                    setShowDrop(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {name ? name : "No ally"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceDropdown;

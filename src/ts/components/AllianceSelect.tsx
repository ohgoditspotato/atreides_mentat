import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { house_set_ally } from "ts/state/actions";
import { root_state } from "ts/state/reducers";

const AllianceSelect: React.FC<{
  house: house_name_t;
  ally: house_name_t | null;
}> = props => {
  const houses_state = useSelector((state: root_state) => state.houses);
  const dispatch = useDispatch();

  const possible_allies = [
    null,
    ...ALL_HOUSE_NAMES.filter(name => houses_state[name].active && name !== props.house),
  ] as const;

  return (
    <div>
      <p className="heading">Allied to</p>
      <div className="select">
        <select
          value={props.ally ? props.ally : "No ally"}
          onChange={ev => {
            let ally: house_name_t | null;
            if (ev.target.value === "No ally") {
              ally = null;
            } else {
              ally = ev.target.value as house_name_t;
            }
            dispatch(house_set_ally(props.house, ally));
          }}
        >
          {possible_allies.map(name => (
            <option value={name ? name : "No ally"} key={name ? name : "No ally"}>
              {name ? name : "No ally"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AllianceSelect;

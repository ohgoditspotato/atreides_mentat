import * as React from "react";
import { ALL_HOUSE_NAMES, toggleHouse } from "ts/HouseState";
import { useSelector, useDispatch } from "react-redux";
import { houseNameStr } from "ts/strings";
import { RootState } from "ts/RootState";
import { showOverview } from "ts/ViewState";

export default () => {
  const houses = useSelector((state: RootState) => state.houses);
  let allow_start = false;
  for (let i of ALL_HOUSE_NAMES) {
    if (houses[i] !== undefined) {
      allow_start = true;
      break;
    }
  }
  const dispatch = useDispatch();
  return (
    <div>
      <h1>New game</h1>
      <p>Select houses in the game</p>
      {ALL_HOUSE_NAMES.map(name => {
        return (
          <div key={name}>
            <label>
              {houseNameStr(name)}
              <input
                type="checkbox"
                checked={!!houses[name]}
                onChange={() => dispatch(toggleHouse(name))}
              />
            </label>
            <div></div>
          </div>
        );
      })}
      <input
        type="button"
        value="Start game"
        disabled={!allow_start}
        onClick={() => {
          if (allow_start) {
            dispatch(showOverview());
          }
        }}
      />
    </div>
  );
};

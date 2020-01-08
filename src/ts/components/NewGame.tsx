import * as React from "react";
import { ALL_HOUSE_NAMES, toggleHouse, startGame } from "ts/State";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "ts/Store";
import { houseNameStr } from "ts/strings";

export default () => {
  const houses = useSelector((state: StateType) => state.houses);
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
          <div>
            <label>
              {houseNameStr(name)}
              <input
                type="checkbox"
                checked={!!houses[name]}
                onClick={() => dispatch(toggleHouse(name))}
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
            dispatch(startGame());
          }
        }}
      />
    </div>
  );
};

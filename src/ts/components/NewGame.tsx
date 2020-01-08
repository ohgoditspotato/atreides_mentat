import * as React from "react";
import { ALL_HOUSE_NAMES, toggleHouse } from "ts/State";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "ts/Store";

export default () => {
  const houses = useSelector((state: StateType) => state.houses);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>New game</h1>
      <p>Select houses in the game</p>
      {ALL_HOUSE_NAMES.map(name => {
        return (
          <div>
            <label>
              {name}
              <input
                type="checkbox"
                checked={!!houses[name]}
                onClick={() => dispatch(toggleHouse(name))}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

import * as React from "react";
import { useDispatch } from "react-redux";
import { ALL_HOUSE_NAMES, houseNameStr } from "ts/houses";
import { showOverview, initHouses } from "ts/state/actions";
import { InitHousePayload } from "ts/state/types";

export default () => {
  const [state, setState] = React.useState<InitHousePayload>({
    "harkonen": false,
    "emperor": false,
    "guild": false,
    "bene": false,
    "fremen": false
  });

  let allow_start = false;
  for (let i of ALL_HOUSE_NAMES) {
    if (state[i]) {
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
                checked={state[name]}
                onChange={() => {
                  let toggle = !state[name];
                  setState({...state, [name]: toggle});
                }}
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
            dispatch(initHouses(state))
            dispatch(showOverview());
          }
        }}
      />
    </div>
  );
};

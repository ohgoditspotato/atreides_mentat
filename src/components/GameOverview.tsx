import * as React from "/web_modules/react.js"
import { useSelector, useDispatch } from "/web_modules/react-redux.js";
import { ALL_HOUSE_NAMES } from "../HouseState.js";
import HouseTile from "./HouseTile.js";
import { RootState } from "../RootState.js";
import { showNewGame } from "../ViewState.js";

const GameOverview: React.FC = () => {
  const state = useSelector((state: RootState) => ({
    houses: state.houses,
  }));
  const dispatch = useDispatch();
  const housesArray: JSX.Element[] = [];
  for (let name of ALL_HOUSE_NAMES) {
    const houseState = state.houses[name];
    if (houseState !== undefined) {
      housesArray.push(<HouseTile house_name={name} spice={houseState.spice} />);
    }
  }
  return (
    <div>
      {housesArray}
      <input
        type="button"
        value="Reset game"
        onClick={() => {
          dispatch(showNewGame());
        }}
      />
    </div>
  );
};

export default GameOverview;

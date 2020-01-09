import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import HouseTile from "./HouseTile";
import { RootState } from "ts/state/reducers";
import { ALL_HOUSE_NAMES } from "ts/houses";
import { showNewGame } from "ts/state/actions";

const GameOverview: React.FC = () => {
  const state = useSelector((state: RootState) => ({
    houses: state.houses,
  }));
  const dispatch = useDispatch();
  const housesArray: JSX.Element[] = [];
  for (let name of ALL_HOUSE_NAMES) {
    const houseState = state.houses[name];
    if (houseState !== undefined) {
      housesArray.push(<HouseTile house={name} spice={houseState.spice} key={name}/>);
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

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALL_HOUSE_NAMES } from "ts/HouseState";
import HouseTile from "./HouseTile";
import { RootState } from "ts/RootState";
import { showNewGame } from "ts/ViewState";

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

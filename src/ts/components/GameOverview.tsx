import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameState, HouseState, ALL_HOUSE_NAMES, resetGame } from "ts/State";
import HouseTile from "./HouseTile";
import EditHouse from "./EditHouse";

const GameOverview: React.FC = () => {
  const state = useSelector((state: GameState) => ({
    houses: state.houses,
    edit_house: state.edit_house,
  }));
  const dispatch = useDispatch();
  if (state.edit_house !== undefined) {
    return <EditHouse />;
  }

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
          dispatch(resetGame());
        }}
      />
    </div>
  );
};

export default GameOverview;

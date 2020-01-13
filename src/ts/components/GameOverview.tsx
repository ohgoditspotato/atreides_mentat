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
      housesArray.push(<HouseTile house={name} spice={houseState.spice} key={name} cards={houseState.cards} />);
    }
  }
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns">{housesArray}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="buttons">
            <button
              className="button is-danger is-fullwidth"
              onClick={() => {
                dispatch(showNewGame());
              }}
            >
              Reset game
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameOverview;

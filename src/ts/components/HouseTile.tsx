import * as React from "react";
import { useDispatch } from "react-redux";
import { HouseName, houseNameStr } from "ts/houses";
import { showEditSpice, showViewCards } from "ts/state/actions";
import { TreacheryCard } from "ts/TreacheryCard";

export interface HouseTileProps {
  spice: number;
  house: HouseName;
  cards: ReadonlyArray<TreacheryCard>;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div className="column">
      <div className="box">
        <h2 className="title is-3 has-text-centered">{houseNameStr(props.house)}</h2>
        <div className="buttons is-centered">
          <button
            className="button is-primary"
            onClick={() => dispatch(showEditSpice(props.house))}
          >
            {props.spice} spice
          </button>
          <button className="button is-info" onClick={() => dispatch(showViewCards(props.house))}>
            {props.cards.length} card{props.cards.length === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseTile;

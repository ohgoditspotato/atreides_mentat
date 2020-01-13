import * as React from "react";
import { useDispatch } from "react-redux";
import { house_name_t, houseNameStr } from "ts/houses";
import { showEditSpice, showViewCards } from "ts/state/actions";
import { treachery_card } from "ts/treachery_card";

export interface HouseTileProps {
  spice: number;
  house: house_name_t;
  cards: ReadonlyArray<treachery_card>;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div className="column is-half">
      <div className="box">
        <h2 className="title is-3 has-text-centered">{houseNameStr(props.house)}</h2>
        <div className="columns">
          <div className="column is-half">
            <button
              className="button is-warning is-fullwidth"
              onClick={() => dispatch(showEditSpice(props.house))}
            >
              {props.spice} spice
            </button>
          </div>
          <div className="column is-half">
            <button
              className="button is-info is-fullwidth"
              onClick={() => dispatch(showViewCards(props.house))}
            >
              {props.cards.length} card{props.cards.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseTile;

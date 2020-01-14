import * as React from "react";
import { useDispatch } from "react-redux";
import { house_name_t } from "ts/houses";
import {
  show_edit_spice_modal,
  show_view_cards_modal,
  house_toggle_karama,
} from "ts/state/actions";
import { treachery_card_t } from "ts/treachery_card";

export interface HouseTileProps {
  spice: number;
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
  karama_used: boolean;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div className="column is-half">
      <div className="box">
        <h2 className="title is-3 has-text-centered">{props.house}</h2>
        <div className="columns is-multiline">
          <div className="column is-half">
            <button
              className="button is-warning is-fullwidth"
              onClick={() => dispatch(show_edit_spice_modal(props.house))}
            >
              {props.spice} spice
            </button>
          </div>
          <div className="column is-half">
            <button
              className="button is-info is-fullwidth"
              onClick={() => dispatch(show_view_cards_modal(props.house))}
            >
              {props.cards.length} card{props.cards.length === 1 ? "" : "s"}
            </button>
          </div>
          <div className="column is-half">
            <button
              className={
                "button is-success is-fullwidth" + (props.karama_used ? " is-inverted" : "")
              }
              onClick={() => dispatch(house_toggle_karama(props.house))}
            >
              Karama {props.karama_used ? "used" : "available"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseTile;

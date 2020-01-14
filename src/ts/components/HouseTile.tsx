import * as React from "react";
import { useDispatch } from "react-redux";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import {
  show_edit_spice_modal,
  show_view_cards_modal,
  house_toggle_karama,
} from "ts/state/actions";
import { treachery_card_t } from "ts/treachery_card";
import HouseBanner from "ts/components/HouseBanner";

export interface HouseTileProps {
  spice: number;
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
  karama_used: boolean;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div className="box">
      <HouseBanner house={props.house} />
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
            className={"button is-fullwidth" + (props.karama_used ? " is-danger is-inverted" : " is-success")}
            onClick={() => dispatch(house_toggle_karama(props.house))}
          >
            Karama
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseTile;

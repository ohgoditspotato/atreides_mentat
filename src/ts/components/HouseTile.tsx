import * as React from "react";
import { useDispatch } from "react-redux";
import { house_name_t } from "ts/houses";
import { house_toggle_karama } from "ts/state/actions";
import { treachery_card_t } from "ts/treachery_card";
import HouseBanner from "ts/components/HouseBanner";
import EditSpice from "ts/components/EditSpice";
import ViewCards from "ts/components/ViewCards";
import AllianceDropdown from "ts/components/AllianceDropdown";

export interface HouseTileProps {
  spice: number;
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
  karama_used: boolean;
  ally: house_name_t | null;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  const karamaButton = (
    <button
      className={
        "button card-header-icon" +
        (props.karama_used ? " is-danger is-inverted" : " is-success is-inverted")
      }
      onClick={() => dispatch(house_toggle_karama(props.house))}
    >
      <span className="icon">
        <i className={"fas " + (props.karama_used ? "fa-times" : "fa-check")}></i>
      </span>
      <span>Karama</span>
    </button>
  );
  return (
    <div className="box" style={{ height: "100%" }}>
      <div className="columns is-mobile">
        <div className="column">
          <HouseBanner house={props.house} />
        </div>
      </div>
      <div className="level is-mobile">
        <EditSpice house={props.house} spice={props.spice} />
          <div className="level-item">
            <AllianceDropdown house={props.house} ally={props.ally} />
          </div>
          <div className="level-item">{karamaButton}</div>
        </div>
      <ViewCards house={props.house} cards={props.cards} />
    </div>
  );
};

export default HouseTile;

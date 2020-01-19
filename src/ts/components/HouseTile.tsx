import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { house_name_t } from "ts/houses";
import { house_toggle_karama } from "ts/state/actions";
import HouseBanner from "ts/components/HouseBanner";
import EditSpice from "ts/components/EditSpice";
import ViewCards from "ts/components/ViewCards";
import AllianceSelect from "ts/components/AllianceSelect";
import { root_state } from "ts/state/reducers";

export interface HouseTileProps {
  house: house_name_t;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const houseState = useSelector((state: root_state) => state.houses[props.house]);
  const dispatch = useDispatch();
  const karamaButton = (
    <button
      className={"button card-header-icon"}
      onClick={() => dispatch(house_toggle_karama(props.house))}
    >
      <span className="icon">
        <i className={"fas " + (houseState.karama_used ? "fa-times" : "fa-check")}></i>
      </span>
      <span>{houseState.karama_used ? "Used" : "Unused"}</span>
    </button>
  );
  return (
    <div style={{ height: "100%" }}>
      <div className="columns is-mobile">
        <div className="column">
          <HouseBanner house={props.house} />
        </div>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column level-top">
          <EditSpice house={props.house} spice={houseState.spice} />
        </div>
        <div className="column level-top">
          <AllianceSelect house={props.house} ally={houseState.ally} />
        </div>
        <div className="column level-top">
          <p className="heading">Karama</p>
          {karamaButton}
        </div>
      </div>
      <ViewCards house={props.house} cards={houseState.cards} />
    </div>
  );
};

export default HouseTile;

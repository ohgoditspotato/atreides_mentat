import * as React from "react";
import { useSelector } from "react-redux";
import { house_name_t } from "ts/houses";
import HouseBanner from "ts/components/HouseBanner";
import ViewCards from "ts/components/ViewCards";
import { root_state } from "ts/state/reducers";

export interface HouseTileProps {
  house: house_name_t;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const houseState = useSelector((state: root_state) => state.houses[props.house]);
  return (
    <>
      <div className="box">
        <div className="columns is-mobile">
          <div className="column">
            <HouseBanner house={props.house} />
          </div>
        </div>
        <hr />
        <ViewCards house={props.house} cards={houseState.cards} />
      </div>
    </>
  );
};

export default HouseTile;

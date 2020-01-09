import * as React from "react";
import { useDispatch } from "react-redux";
import { HouseName, houseNameStr } from "ts/houses";
import { showEditSpice } from "ts/state/actions";

export interface HouseTileProps {
  spice: number;
  house: HouseName;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{houseNameStr(props.house)}</h2>
      <div>
        <span>Spice</span>
        <span>{props.spice}</span>
      </div>
      <input type="button" value="Edit" onClick={() => dispatch(showEditSpice(props.house))} />
      <input type="button" value="View Cards" />
    </div>
  );
};

export default HouseTile;

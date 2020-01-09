import * as React from "react";
import { useDispatch } from "react-redux";
import { HouseName, houseNameStr } from "ts/houses";

export interface HouseTileProps {
  spice: number;
  house_name: HouseName;
}

const HouseTile: React.FC<HouseTileProps> = props => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{houseNameStr(props.house_name)}</h2>
      <label>
        Spice
        <input type="number" value={props.spice} readOnly />
      </label>
      <input type="button" value="Edit" onClick={() => {}} />
      <input type="button" value="View Cards" />
    </div>
  );
};

export default HouseTile;

import * as React from "react";
import { HouseName, showEditHouse } from "ts/State";
import { houseNameStr } from "ts/strings";
import { useDispatch } from "react-redux";

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
      <input type="button" value="Edit" onClick={() => {
          dispatch(showEditHouse(props.house_name));
      }}/>
      <input type="button" value="View Cards" />
    </div>
  );
};

export default HouseTile;

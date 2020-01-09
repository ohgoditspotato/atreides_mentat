import * as React from "react";

import { useDispatch } from "react-redux";
import { HouseName, houseNameStr } from "ts/houses";
import { modifySpice, showOverview } from "ts/state/actions";

interface Props {
  spice: number;
  house: HouseName;
}

const EditSpice: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [spiceChange, setSpiceChange] = React.useState(1);

  return (
    <div>
      <h2>{houseNameStr(props.house)}</h2>
      <div>
        <span>Current Spice</span>
        <span>{props.spice}</span>
        <input
          type="number"
          value={spiceChange}
          onChange={ev => {
            setSpiceChange(parseInt(ev.currentTarget.value));
          }}
          step={1}
          min={1}
        />
        <input
          type="button"
          value="add"
          onClick={() => {
            dispatch(modifySpice(props.house, spiceChange));
            setSpiceChange(1);
          }}
        />
        <input
          type="button"
          value="remove"
          onClick={() => {
            dispatch(modifySpice(props.house, -spiceChange));
            setSpiceChange(1);
          }}
        />
      </div>
      <input type="button" value="close" onClick={() => dispatch(showOverview())} />
    </div>
  );
};

export default EditSpice;

import * as React from "react";
import {
  HouseName,
  TreacheryCard,
  modifySpice,
  showEditHouse,
  GameState,
  HouseState,
} from "ts/State";
import { useDispatch, useSelector } from "react-redux";
import { houseNameStr } from "ts/strings";

const EditHouse: React.FC = props => {
  const dispatch = useDispatch();
  const state = useSelector((state: GameState) => {
    if (state.edit_house === undefined) {
      throw new Error();
    }
    let house = state.houses[state.edit_house] as HouseState;
    return {
      house_name: state.edit_house,
      ...house,
    };
  });
  const [spiceChange, setSpiceChange] = React.useState(1);

  return (
    <div>
      <h2>{houseNameStr(state.house_name)}</h2>
      <div>
        <label>
          Current Spice
          <input type="number" readOnly value={state.spice} />
        </label>
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
            dispatch(modifySpice(state.house_name, spiceChange));
            setSpiceChange(1);
          }}
        />
        <input
          type="button"
          value="remove"
          onClick={() => {
            dispatch(modifySpice(state.house_name, -spiceChange));
            setSpiceChange(1);
          }}
        />
      </div>
      <input type="button" value="close" onClick={() => dispatch(showEditHouse(undefined))} />
    </div>
  );
};

export default EditHouse;

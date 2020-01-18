import * as React from "react";

import { useDispatch } from "react-redux";
import { house_name_t } from "ts/houses";
import { house_modify_spice } from "ts/state/actions";

interface Props {
  spice: number;
  house: house_name_t;
}

const EditSpice: React.FC<Props> = props => {
  const dispatch = useDispatch();

  return (
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Spice</p>
        <p className="title" style={{ marginBottom: "0.5rem" }}>
          {props.spice}
        </p>
        <div className="buttons has-addons">
          <button
            className="button is-success"
            onClick={() => {
              dispatch(house_modify_spice(props.house, 1));
            }}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
          </button>
          <button
            className="button is-danger"
            onClick={() => {
              dispatch(house_modify_spice(props.house, -1));
            }}
          >
            <span className="icon">
              <i className="fas fa-minus"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSpice;

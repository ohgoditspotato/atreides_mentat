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
    <div>
      <p className="heading has-text-centered">Spice</p>
      <div className="columns is-mobile">
        <div className="column is-narrow">
          <button
            className="button"
            onClick={() => {
              dispatch(house_modify_spice(props.house, 1));
            }}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        </div>
        <div className="column">
          <p className="title" style={{ marginBottom: "0.5rem" }}>
            {props.spice}
          </p>
        </div>
        <div className="column is-narrow">
          <button
            className="button"
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

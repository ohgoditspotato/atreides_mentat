import * as React from "react";

import { useDispatch } from "react-redux";
import { house_name_t } from "ts/houses";
import { house_modify_spice, close_modal } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

interface Props {
  spice: number;
  house: house_name_t;
}

const EditSpice: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [spiceChange, setSpiceChange] = React.useState(1);
  const close = () => {
    dispatch(close_modal());
  };

  return (
    <Modal close={close} header={props.house}>
      <div className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Spice</p>
            <p className="title">{props.spice}</p>
          </div>
        </div>
      </div>
      <div className="field">
        <input
          className="input"
          type="number"
          value={spiceChange}
          onChange={ev => {
            setSpiceChange(parseInt(ev.currentTarget.value));
          }}
          step={1}
          min={1}
        />
      </div>
      <div className="columns">
        <div className="column is-half">
          <button
            className="button is-success is-fullwidth"
            onClick={() => {
              dispatch(house_modify_spice(props.house, spiceChange));
              setSpiceChange(1);
            }}
          >
            Increase
          </button>
        </div>
        <div className="column is-half">
          <button
            className="button is-danger is-fullwidth"
            onClick={() => {
              dispatch(house_modify_spice(props.house, -spiceChange));
              setSpiceChange(1);
            }}
          >
            Decrease
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSpice;

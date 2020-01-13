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
  const close = () => {
    dispatch(showOverview());
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{houseNameStr(props.house)}</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-3 is-text-weight-bold">{props.spice} spice</p>
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
                  dispatch(modifySpice(props.house, spiceChange));
                  setSpiceChange(1);
                }}
              >
                Add
              </button>
            </div>
            <div className="column is-half">
              <button
                className="button is-danger is-fullwidth"
                onClick={() => {
                  dispatch(modifySpice(props.house, -spiceChange));
                  setSpiceChange(1);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={close}>
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditSpice;

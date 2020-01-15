import * as React from "react";

import { useDispatch } from "react-redux";
import { house_name_t } from "ts/houses";
import { house_modify_spice, close_modal } from "ts/state/actions";
import Page from "ts/components/Pages/Page";
import HouseBanner from "ts/components/HouseBanner";

interface Props {
  spice: number;
  house: house_name_t;
}

const EditSpicePage: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [spiceChange, setSpiceChange] = React.useState(1);
  const close = () => {
    dispatch(close_modal());
  };

  return (
    <Page close={close} header={<HouseBanner house={props.house} />}>
      <div className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Spice</p>
            <p className="title">{props.spice}</p>
          </div>
        </div>
        <div className="level-item">
          <div>
            <div className="columns">
              <div className="column is-one-third field">
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
              <div className="column is-one-third ">
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
              <div className="column is-one-third ">
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
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EditSpicePage;

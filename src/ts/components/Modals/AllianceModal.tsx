import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { close_modal, house_set_ally } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";
import { root_state } from "ts/state/reducers";
import HouseBanner from "ts/components/HouseBanner";

const AllianceModal: React.FC<{ house: house_name_t; ally: house_name_t | null }> = props => {
  const houses_state = useSelector((state: root_state) => state.houses);
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());

  const possible_allies = ALL_HOUSE_NAMES.filter(
    name => houses_state[name].active && houses_state[name].ally == null && name !== props.house
  );

  return (
    <Modal close={close} header="Select ally">
      <div
        className="box"
        onClick={() => {
          dispatch(house_set_ally(props.house, null));
          close();
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="columns">
          <div className="column is-2" />
          <div className="column">
            <h2 className="title is-3">None</h2>
          </div>
        </div>
      </div>
      {possible_allies.map(name => (
        <div
          className="box"
          onClick={() => {
            dispatch(house_set_ally(props.house, name));
            close();
          }}
          style={{ cursor: "pointer" }}
        >
          <HouseBanner house={name} />
        </div>
      ))}
    </Modal>
  );
};

export default AllianceModal;

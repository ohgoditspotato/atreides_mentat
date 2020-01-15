import * as React from "react";
import { useDispatch } from "react-redux";
import { close_modal, reset_game } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

const ConfirmResetModal: React.FC = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());

  return (
    <Modal header="Reset the game" close={close}>
      <p className="subtitle is-5 has-text-centered">Are you sure?</p>
      <div className="columns is-mobile">
        <div className="column is-half">
          <button className="button is-danger is-fullwidth" onClick={() => dispatch(reset_game())}>
            Yes
          </button>
        </div>
        <div className="column is-half">
          <button className="button is-secondary is-fullwidth" onClick={close}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmResetModal;

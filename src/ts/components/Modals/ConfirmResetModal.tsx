import * as React from "react";
import { useDispatch } from "react-redux";
import { close_modal, reset_game } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

const ConfirmResetModal: React.FC = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());

  return (
    <Modal header="Reset the game" close={close}>
      <p className="subtitle is-5">Are you sure?</p>
      <div className="buttons">
        <button className="button is-danger" onClick={() => dispatch(reset_game())}>
          Yes
        </button>
        <button className="button is-secondary" onClick={close}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmResetModal;

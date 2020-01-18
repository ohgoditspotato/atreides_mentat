import * as React from "react";
import { useDispatch } from "react-redux";
import { close_modal, reset_game } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

const ConfirmResetPage: React.FC = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());
  const confirm_button = (
    <button className="button is-danger is-fullwidth" onClick={() => dispatch(reset_game())}>
      Yes
    </button>
  );

  const header = <h1>Reset the game</h1>;

  return (
    <Modal header={header} close={close} buttons={[confirm_button]}>
      <p className="subtitle"> Are you sure?</p>
    </Modal>
  );
};

export default ConfirmResetPage;

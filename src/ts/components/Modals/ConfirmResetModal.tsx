import * as React from "react";
import { useDispatch } from "react-redux";
import { close_modal, reset_game } from "ts/state/actions";

const ConfirmResetModal: React.FC = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Are you sure you wish to reset the game?</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <div className="buttons">
            <button className="button is-danger" onClick={() => dispatch(reset_game())}>
              Yes
            </button>
            <button className="button is-secondary" onClick={close}>
              No
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConfirmResetModal;

import * as React from "react";
import { useDispatch } from "react-redux";
import { close_modal, disable_deck_tracking } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

const DisableTrackingModal: React.FC = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());
  const header = <div className="columns is-mobile is-vcentered">Disable deck tracking?</div>;
  return (
    <Modal
      close={close}
      header={header}
      isFull
      buttons={
        <button
          className="button is-danger is-fullwidth"
          onClick={() => {
            close();
            dispatch(disable_deck_tracking());
          }}
        >
          Disable tracking
        </button>
      }
    >
      <p>
        If deck tracking isn't working for you - you can turn it off. However - this cannot be
        undone. Are you sure you wish to disable deck tracking?
      </p>
    </Modal>
  );
};

export default DisableTrackingModal;

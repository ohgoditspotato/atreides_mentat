import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch } from "react-redux";
import { show_add_cards_modal, close_modal, house_remove_card } from "ts/state/actions";
import TreacheryCard from "ts/components/TreacheryCard";
import Modal from "ts/components/Modals/Modal";

const ViewCards: React.FC<{
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
}> = props => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());
  let allow_add_card = props.cards.length < 4;
  if (props.house === "HARKONNEN") {
    allow_add_card = props.cards.length < 8;
  }

  const footer = (
    <button
      className="button is-primary is-fullwidth"
      onClick={() => {
        if (allow_add_card) {
          dispatch(show_add_cards_modal(props.house));
        }
      }}
      disabled={!allow_add_card}
    >
      Add card
    </button>
  );

  return (
    <Modal close={close} header={"Cards for " + props.house} footer={footer}>
      <div className="columns is-multiline">
        {props.cards.map((card, index) => (
          <div className="column is-half" key={"card-" + index}>
            <TreacheryCard
              card={card}
              onDelete={() => dispatch(house_remove_card(props.house, index))}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ViewCards;

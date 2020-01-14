import * as React from "react";
import { house_name_t, house_name_str } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch } from "react-redux";
import { show_add_cards_modal, close_modal, house_remove_card } from "ts/state/actions";
import TreacheryCard from "ts/components/TreacheryCard";

const ViewCards: React.FC<{
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
}> = props => {
  const dispatch = useDispatch();
  const close = () => dispatch(close_modal());
  let allow_add_card = props.cards.length < 4;
  if (props.house === "harkonen") {
    allow_add_card = props.cards.length < 8;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Cards for {house_name_str(props.house)}</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-multiline">
            {props.cards.map((card, index) => (
              <div className="column is-half">
                <TreacheryCard
                  card={card}
                  onDelete={() => dispatch(house_remove_card(props.house, index))}
                />
              </div>
            ))}
          </div>
        </section>
        <footer className="modal-card-foot">
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
        </footer>
      </div>
    </div>
  );
};

export default ViewCards;

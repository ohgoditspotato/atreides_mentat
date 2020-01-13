import * as React from "react";
import { house_name_t, house_name_str } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import TreacheryCard from "ts/components/TreacheryCard";
import { useDispatch } from "react-redux";
import { close_modal, house_add_card, show_view_cards_modal } from "ts/state/actions";

const available_cards: ReadonlyArray<treachery_card_t> = [
  {
    kind: "weapon",
    type: "poison",
  },
  {
    kind: "weapon",
    type: "projectile",
  },
  {
    kind: "weapon",
    type: "lasgun",
  },

  {
    kind: "defence",
    type: "shield",
  },
  {
    kind: "defence",
    type: "snooper",
  },

  {
    kind: "special",
    type: "cheap hero",
  },
  {
    kind: "special",
    type: "karama",
  },

  {
    kind: "special",
    type: "family atomics",
  },
  {
    kind: "special",
    type: "hajr",
  },
  {
    kind: "special",
    type: "truthtrance",
  },
  {
    kind: "special",
    type: "tleilaxu ghola",
  },
  {
    kind: "special",
    type: "weather control",
  },

  {
    kind: "useless",
  },

  {
    kind: "unknown",
  },
];

const AddCardModal: React.FC<{ house: house_name_t }> = props => {
  const dispatch = useDispatch();
  const close = () => dispatch(show_view_cards_modal(props.house));
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add card to {house_name_str(props.house)}</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-multiline">
            {available_cards.map(card => (
              <div
                className="column is-half"
                onClick={() => {
                  dispatch(house_add_card(props.house, card));
                  dispatch(show_view_cards_modal(props.house));
                }}
              >
                <TreacheryCard card={card}>
                  <button className="button is-success">Add to hand</button>
                </TreacheryCard>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCardModal;

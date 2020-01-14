import * as React from "react";
import { house_name_t, house_name_str } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import TreacheryCard from "ts/components/TreacheryCard";
import { useDispatch } from "react-redux";
import { house_add_card, show_view_cards_modal } from "ts/state/actions";

const available_cards: ReadonlyArray<treachery_card_t> = [
  {
    kind: "WEAPON",
    type: "Poison",
  },
  {
    kind: "WEAPON",
    type: "Projectile",
  },
  {
    kind: "WEAPON",
    type: "Lasgun",
  },

  {
    kind: "DEFENSE",
    type: "Shield",
  },
  {
    kind: "DEFENSE",
    type: "Snooper",
  },

  {
    kind: "SPECIAL",
    type: "Cheap Hero",
  },
  {
    kind: "SPECIAL",
    type: "Karama",
  },

  {
    kind: "SPECIAL",
    type: "Family Atomics",
  },
  {
    kind: "SPECIAL",
    type: "Hajr",
  },
  {
    kind: "SPECIAL",
    type: "Truthtrance",
  },
  {
    kind: "SPECIAL",
    type: "Tleilaxu Ghola",
  },
  {
    kind: "SPECIAL",
    type: "Weather Control",
  },

  {
    kind: "USELESS",
  },

  {
    kind: "UNKNOWN",
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
                style={{ cursor: "pointer" }}
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

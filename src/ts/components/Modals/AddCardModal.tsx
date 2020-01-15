import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import TreacheryCard from "ts/components/TreacheryCard";
import { useDispatch } from "react-redux";
import { house_add_card, show_view_cards_modal } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";

const available_cards: ReadonlyArray<{ card: treachery_card_t; num?: number }> = [
  {
    card: {
      kind: "Weapon",
      type: "Poison",
    },
    num: 4,
  },
  {
    card: {
      kind: "Weapon",
      type: "Projectile",
    },
    num: 4,
  },
  {
    card: {
      kind: "Weapon",
      type: "Lasgun",
    },
    num: 1,
  },

  {
    card: {
      kind: "Defense",
      type: "Shield",
    },
    num: 4,
  },
  {
    card: {
      kind: "Defense",
      type: "Snooper",
    },
    num: 4,
  },

  {
    card: {
      kind: "Special",
      type: "Cheap Hero",
    },
    num: 3,
  },
  {
    card: {
      kind: "Special",
      type: "Karama",
    },
    num: 2,
  },
  {
    card: {
      kind: "Special",
      type: "Truthtrance",
    },
    num: 2,
  },
  {
    card: {
      kind: "Special",
      type: "Family Atomics",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Hajr",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Tleilaxu Ghola",
    },
    num: 1,
  },
  {
    card: {
      kind: "Special",
      type: "Weather Control",
    },
    num: 1,
  },

  {
    card: {
      kind: "Useless",
    },
    num: 5,
  },

  {
    card: {
      kind: "Unknown",
    },
  },
];

const AddCardModal: React.FC<{ house: house_name_t }> = props => {
  const dispatch = useDispatch();
  const close = () => dispatch(show_view_cards_modal(props.house));
  return (
    <Modal close={close} header={"Add card to " + props.house}>
      <div className="columns is-multiline">
        {available_cards.map((card, index) => (
          <div
            className="column is-half"
            onClick={() => {
              dispatch(house_add_card(props.house, card.card));
              dispatch(show_view_cards_modal(props.house));
            }}
            style={{ cursor: "pointer" }}
            key={"card-" + index}
          >
            <TreacheryCard card={card.card} num={card.num} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddCardModal;

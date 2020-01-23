import React from "react";
import Modal from "ts/components/Modals/Modal";
import { treachery_card_t } from "ts/treachery_card";
import { house_name_t } from "ts/houses";
import { useDispatch, useSelector } from "react-redux";
import { close_modal, house_remove_unknown } from "ts/state/actions";
import { root_state_t } from "ts/state/reducers";
import TreacheryCard from "ts/components/TreacheryCard";

const DiscardUnknownModal: React.FC<{ house: house_name_t }> = ({ house }) => {
  const dispatch = useDispatch();
  const [unknown_cards, decks] = useSelector((root_state: root_state_t) => {
    const unknown_cards = root_state.game.current.houses[house].unknown_cards;
    const decks = root_state.game.current.decks;
    return [unknown_cards, decks];
  });

  // get a list of the possible decks this player has unknown cards in
  const possible_deck_ids = unknown_cards
    .map(c => c.deck_index)
    .filter((a, b, arr) => arr.indexOf(a) === b);

  const possible_cards: Array<{ card: treachery_card_t; deck_index: number }> = [];

  for (let i = 0; i < possible_deck_ids.length; i++) {
    const deck_index = possible_deck_ids[i];
    const deck = decks[possible_deck_ids[i]];
    deck.cards.forEach(card => possible_cards.push({ card, deck_index }));
  }

  return (
    <Modal header="Which card was discarded?" close={() => dispatch(close_modal())} isFull>
      <div className="columns is-multiline">
        {possible_cards.map((possible, index) => {
          return (
            <div className="column is-half is-one-quarter-widescreen" key={"card-" + index}>
              <TreacheryCard
                card={possible.card}
                onClick={() => {
                  const unknown_index = unknown_cards.findIndex(
                    un => un.deck_index === possible.deck_index
                  );
                  dispatch(house_remove_unknown(house, unknown_index, possible.card.id));
                  dispatch(close_modal());
                }}
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default DiscardUnknownModal;

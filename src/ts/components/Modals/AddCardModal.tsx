import * as React from "react";
import { house_name_t } from "ts/houses";
import TreacheryCard from "ts/components/TreacheryCard";
import { useDispatch, useSelector } from "react-redux";
import { close_modal, house_add_card, house_add_unknown } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";
import { HouseNameWithIcon } from "ts/components/HouseBanner";
import { root_state_t } from "ts/state/reducers";
import UnknownCard from "ts/components/UnknownCard";

const AddCardPage: React.FC<{ house: house_name_t }> = props => {
  const dispatch = useDispatch();
  const [draw_deck, draw_deck_index] = useSelector((state: root_state_t) => {
    return [
      state.game.current.decks[state.game.current.draw_deck_index],
      state.game.current.draw_deck_index,
    ] as const;
  });

  const close = () => dispatch(close_modal());
  const header = (
    <div className="columns is-mobile is-vcentered">
      <HouseNameWithIcon house={props.house} />
    </div>
  );
  return (
    <Modal close={close} header={header} isFull>
      <div className="columns is-multiline">
        <div className="column is-one-quarter-widescreen is-half">
          <UnknownCard
            deck_index={draw_deck_index}
            onClick={() => {
              dispatch(house_add_unknown(props.house));
              dispatch(close_modal());
            }}
            small
          />
        </div>
        {draw_deck.cards.map(card => {
          return (
            <div className="column is-one-quarter-widescreen is-half" key={card.id}>
              <TreacheryCard
                card={card}
                onClick={() => {
                  dispatch(house_add_card(props.house, card));
                  dispatch(close_modal());
                }}
                small
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddCardPage;

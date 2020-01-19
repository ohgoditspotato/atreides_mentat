import * as React from "react";
import { house_name_t } from "ts/houses";
import TreacheryCard from "ts/components/TreacheryCard";
import { useDispatch, useSelector } from "react-redux";
import { house_add_card, close_modal } from "ts/state/actions";
import Modal from "ts/components/Modals/Modal";
import { HouseNameWithIcon } from "ts/components/HouseBanner";
import { root_state } from "ts/state/reducers";
import { treachery_card_t } from "ts/treachery_card";

const TreacheryCardWrapper: React.FC<{
  card: treachery_card_t;
  num?: number;
  house: house_name_t;
}> = ({ house, card, num }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="column is-one-quarter-widescreen is-half"
      onClick={() => {
        dispatch(house_add_card(house, card));
        dispatch(close_modal());
      }}
      style={{ cursor: "pointer" }}
    >
      <TreacheryCard card={card} num={num} />
    </div>
  );
};

const AddCardPage: React.FC<{ house: house_name_t }> = props => {
  const dispatch = useDispatch();
  const card_pool = useSelector((state: root_state) => {
    return state.game.treachery_card_pool;
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
        {card_pool.map((card, index) => {
          if (card.num === 0) {
            return null;
          }
          return (
            <TreacheryCardWrapper
              card={card.card}
              num={card.num}
              house={props.house}
              key={"card-" + index}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default AddCardPage;

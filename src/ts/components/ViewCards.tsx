import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch, useSelector } from "react-redux";
import {
  show_add_cards_modal,
  house_remove_card,
  house_toggle_expand_cards,
} from "ts/state/actions";
import TreacheryCard from "ts/components/TreacheryCard";
import AddCardButton from "ts/components/AddCardButton";
import { root_state } from "ts/state/reducers";

const maxCards = (house: house_name_t) => {
  if (house === "Harkonnen") {
    return 8;
  }

  return 4;
};

const ViewCards: React.FC<{
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
}> = props => {
  const dispatch = useDispatch();
  const showCards = useSelector((state: root_state) => state.houses[props.house].show_cards);

  return (
    <div className="box is-marginless is-paddingless">
      <div
        style={{ cursor: "pointer", display: "flex" }}
        className="is-unselectable"
        onClick={() => dispatch(house_toggle_expand_cards(props.house))}
      >
        <p className="card-header-title">
          {`${props.cards.length} Card${props.cards.length === 1 ? "" : "s"}`}
        </p>
        <div className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className={"fas fa-angle-" + (showCards ? "up" : "down")} aria-hidden="true"></i>
          </span>
        </div>
      </div>
      {showCards && (
        <div className="columns is-multiline">
          {props.cards.map((card, index) => (
            <div className="column is-half" key={"card-" + index}>
              <TreacheryCard
                card={card}
                onDelete={() => dispatch(house_remove_card(props.house, index))}
              />
            </div>
          ))}
          {props.cards.length < maxCards(props.house) && (
            <div className="column is-half" key={"add-card"}>
              <AddCardButton onClick={() => dispatch(show_add_cards_modal(props.house))} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewCards;

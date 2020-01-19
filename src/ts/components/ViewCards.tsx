import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch, useSelector } from "react-redux";
import {
  show_add_cards_modal,
  house_remove_card,
  house_toggle_expand_cards,
} from "ts/state/actions";
import TreacheryCard, { treachery_card_colours } from "ts/components/TreacheryCard";
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
  const allowAdd = props.cards.length < maxCards(props.house);

  return (
    <div>
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <div className="tags">
            <>
              {props.cards.length === 0 && <span className="tag">No cards in hand</span>}
              {props.cards.map((card, index) => {
                const deleteButton = (
                  <button
                    className="delete is-small"
                    onClick={() => dispatch(house_remove_card(props.house, index))}
                  ></button>
                );
                const colour = treachery_card_colours[card.kind].bg;
                let text: string = card.kind;
                switch (card.kind) {
                  case "Weapon":
                  case "Defense":
                  case "Special": {
                    text = card.type;
                    break;
                  }
                }
                return (
                  <span className={"tag is-" + colour}>
                    {text}
                    {deleteButton}
                  </span>
                );
              })}
            </>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            <button
              className="button is-link is-outlined"
              onClick={() => dispatch(house_toggle_expand_cards(props.house))}
            >
              <span className="icon">
                <i className={"fas fa-angle-" + (showCards ? "up" : "down")} />
              </span>
              <span>
                View
              </span>
            </button>
            <button
              className="button is-danger is-outlined"
              onClick={() => {
                if (allowAdd) dispatch(show_add_cards_modal(props.house));
              }}
              disabled={!allowAdd}
            >
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
              <span>Add card</span>
            </button>
          </div>
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
        </div>
      )}
    </div>
  );
};

export default ViewCards;

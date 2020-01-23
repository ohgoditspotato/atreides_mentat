import * as React from "react";
import { house_name_t } from "ts/houses";
import { useDispatch } from "react-redux";
import {
  show_add_cards_modal,
  house_remove_card,
  house_toggle_expand_cards,
  show_discard_unknown_modal,
} from "ts/state/actions";
import TreacheryCard, {
  treachery_card_colours,
  treachery_card_icons,
} from "ts/components/TreacheryCard";
import { house_state_t } from "ts/state/types";
import UnknownCard from "ts/components/UnknownCard";
import TreacheryCardTag from "./TreacheryCardTag";

const maxCards = (house: house_name_t) => {
  if (house === "Harkonnen") {
    return 8;
  }

  return 4;
};

const ViewCards: React.FC<house_state_t> = house => {
  const dispatch = useDispatch();
  const showCards = house.show_cards;
  const allowAdd = house.cards.length + house.unknown_cards.length < maxCards(house.name);

  return (
    <div>
      <div className="columns is-vcentered">
        <div className="column is-narrow" style={{ order: 1 }}>
          <div className="columns is-mobile">
            {(house.cards.length > 0 || house.unknown_cards.length > 0) && (
              <div className="column">
                <button
                  className="button is-link is-outlined is-fullwidth"
                  onClick={() => dispatch(house_toggle_expand_cards(house.name))}
                >
                  <span className="icon">
                    <i className={"fas fa-angle-" + (showCards ? "up" : "down")} />
                  </span>
                  <span>View</span>
                </button>
              </div>
            )}
            <div className="column">
              <button
                className="button is-danger is-outlined is-fullwidth"
                onClick={() => {
                  if (allowAdd) dispatch(show_add_cards_modal(house.name));
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
        <div className="column" style={{ order: 0 }}>
          <div className="tags">
            <>
              {house.cards.length === 0 && house.unknown_cards.length === 0 && (
                <span className="tag is-medium">No cards in hand</span>
              )}
              {!showCards &&
                house.cards.map((card, index) => (
                  <TreacheryCardTag
                    card={card}
                    key={card.id}
                    onDelete={() => {
                      dispatch(house_remove_card(house.name, index, card));
                    }}
                  />
                ))}
              {!showCards &&
                house.unknown_cards.map((_, index) => {
                  const deleteButton = (
                    <button
                      className="delete is-small"
                      onClick={() => dispatch(show_discard_unknown_modal(house.name, index))}
                    ></button>
                  );
                  const colour = treachery_card_colours["Unknown"].bg;
                  return (
                    <span
                      className={"tag is-medium is-" + colour}
                      key={"Unknown" + index.toString()}
                    >
                      <figure className="image is-24x24">{treachery_card_icons.Unknown(24)}</figure>
                      Unknown
                      {deleteButton}
                    </span>
                  );
                })}
            </>
          </div>
        </div>
      </div>
      {(house.cards.length > 0 || house.unknown_cards.length > 0) && showCards && (
        <>
          <hr />
          <div className="columns is-multiline">
            {house.cards.map((card, index) => (
              <div className="column is-half" key={"card-" + index}>
                <TreacheryCard
                  card={card}
                  onDelete={() => dispatch(house_remove_card(house.name, index, card))}
                />
              </div>
            ))}
            {house.unknown_cards.map((unknown_card, index) => {
              return (
                <div className="column is-half" key={"unknown-" + index}>
                  <UnknownCard
                    deck_index={unknown_card.deck_index}
                    onDelete={() => dispatch(show_discard_unknown_modal(house.name, index))}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCards;

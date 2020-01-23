import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { root_state_t } from "ts/state/reducers";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { show_reset_game_modal, undo_action } from "ts/state/actions";
import { house_state_t } from "ts/state/types";
import AddCardModal from "ts/components/Modals/AddCardModal";
import ConfirmResetModal from "ts/components/Modals/ConfirmResetModal";
import HouseTile from "ts/components/HouseTile";
import DiscardUnknownModal from "ts/components/Modals/DiscardUnknownModal";
import { treachery_card_t, card_sort } from "ts/treachery_card";
import ExpandableCardList from "ts/components/ExpandableCardList";

const GameOverview: React.FC = () => {
  const { houses, view, deck_cards, discarded_cards, cards_left_in_deck, can_undo } = useSelector(
    (state: root_state_t) => {
      let discarded_cards: Array<treachery_card_t> = [];
      for (let i = 0; i < state.game.current.decks.length; i++) {
        if (i === state.game.current.draw_deck_index) {
          continue;
        }
        discarded_cards = discarded_cards.concat(state.game.current.decks[i].cards);
      }
      discarded_cards.sort(card_sort);

      const draw_deck = state.game.current.decks[state.game.current.draw_deck_index];
      return {
        houses: state.game.current.houses,
        view: state.view,
        deck_cards: draw_deck.cards,
        discarded_cards,
        cards_left_in_deck: draw_deck.cards.length - draw_deck.num_unknowns,
        can_undo: state.game.history.length > 0,
      };
    }
  );
  const dispatch = useDispatch();

  const house = houses[view.house_name as house_name_t] as house_state_t;
  let modal: JSX.Element | null;
  switch (view.active_modal) {
    case "add_card": {
      modal = <AddCardModal house={house.name} />;
      break;
    }
    case "reset_game": {
      modal = <ConfirmResetModal />;
      break;
    }
    case "discard_unknown": {
      modal = <DiscardUnknownModal house={house.name} />;
      break;
    }
    default: {
      modal = null;
      break;
    }
  }
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-info"
                  onClick={() => dispatch(undo_action())}
                  disabled={!can_undo}
                >
                  <span className="icon">
                    <i className="fas fa-undo"></i>
                  </span>
                  <span>Undo</span>
                </button>
                <button
                  className="button"
                  onClick={() => {
                    dispatch(show_reset_game_modal());
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-power-off"></i>
                  </span>
                  <span>Reset game</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="title">Factions</h2>
          <div className="columns is-multiline">
            {ALL_HOUSE_NAMES.map(name => {
              const house = houses[name];
              if (!house.active) {
                return null;
              }
              return (
                <div className="column is-full-tablet is-half-widescreen" key={name}>
                  <HouseTile house={name} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <hr />
      <section className="section">
        <div className="container">
          <h2 className="title">Cards in deck</h2>
          <h3 className="subtitle">{cards_left_in_deck} cards remaining before a shuffle</h3>
          <ExpandableCardList cards={deck_cards} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title">Discarded cards</h2>
          <ExpandableCardList cards={discarded_cards} />
        </div>
      </section>
      {modal}
    </>
  );
};

export default GameOverview;

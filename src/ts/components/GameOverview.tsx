import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { root_state_t } from "ts/state/reducers";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import {
  show_reset_game_modal,
  undo_action,
  return_to_deck,
  show_disable_tracking_modal,
} from "ts/state/actions";
import { house_state_t } from "ts/state/types";
import AddCardModal from "ts/components/Modals/AddCardModal";
import ConfirmResetModal from "ts/components/Modals/ConfirmResetModal";
import HouseTile from "ts/components/HouseTile";
import AssignUnknownModal from "ts/components/Modals/AssignUnknownModal";
import DiscardUnknownModal from "ts/components/Modals/DiscardUnknownModal";
import { treachery_card_t, card_sort } from "ts/treachery_card";
import ExpandableCardList from "ts/components/ExpandableCardList";
import DisableTrackingModal from "./Modals/DisableTrackingModal";

const GameOverview: React.FC = () => {
  const { deck_tracking, houses, view, draw_deck, discarded_cards, can_undo } = useSelector(
    (state: root_state_t) => {
      let discarded_cards: Array<treachery_card_t> = [];
      for (
        let i = state.game.current.draw_deck_index + 1;
        i < state.game.current.decks.length;
        i++
      ) {
        discarded_cards = discarded_cards.concat(state.game.current.decks[i].cards);
      }
      discarded_cards.sort(card_sort);

      const draw_deck = state.game.current.decks[state.game.current.draw_deck_index];
      return {
        deck_tracking: state.game.deck_tracking,
        include_expansion_cards: state.game.include_expansion_cards,
        houses: state.game.current.houses,
        view: state.view,
        draw_deck,
        discarded_cards,
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
    case "assign_unknown": {
      modal = <AssignUnknownModal house={house.name} />;
      break;
    }
    case "disable_tracking": {
      modal = <DisableTrackingModal />;
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
                {deck_tracking && (
                  <button
                    className="button is-warning"
                    onClick={() => dispatch(show_disable_tracking_modal())}
                  >
                    <span>Disable deck tracking</span>
                  </button>
                )}
                <button
                  className="button is-danger"
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
          {ALL_HOUSE_NAMES.map(name => {
            const house = houses[name];
            if (!house.active) {
              return null;
            }
            return <HouseTile house={name} key={name} />;
          })}
        </div>
      </section>
      <hr />
      {deck_tracking && (
        <>
          <section className="section">
            <div className="container">
              <h2 className="title">Cards in deck</h2>
              <h3 className="subtitle">
                {draw_deck.cards.length - draw_deck.num_unknowns} draws before a shuffle.
                {unknownDeckBlurb(draw_deck.num_unknowns)}
              </h3>
              <ExpandableCardList cards={draw_deck.cards} />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h2 className="title">Discarded cards</h2>
              <ExpandableCardList
                cards={discarded_cards}
                onDelete={(card_id: string) => dispatch(return_to_deck(card_id))}
              />
            </div>
          </section>
        </>
      )}
      {modal}
    </>
  );
};

function unknownDeckBlurb(num_unknowns: number) {
  if (num_unknowns === 0) {
    return null;
  }
  let message = "unknown, there are more possible cards shown than there are draws remaining.";
  if (num_unknowns === 1) {
    return " As " + num_unknowns + " card is " + message;
  }
  return " As " + num_unknowns + " cards are " + message;
}

export default GameOverview;

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { root_state } from "ts/state/reducers";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { show_reset_game_modal } from "ts/state/actions";
import { house_state_t } from "ts/state/types";
import AddCardPage from "ts/components/Modals/AddCardModal";
import ConfirmResetPage from "ts/components/Modals/ConfirmResetModal";
import HouseTile from "ts/components/HouseTile";

const GameOverview: React.FC = () => {
  const state = useSelector((state: root_state) => ({
    houses: state.houses,
    view: state.view,
  }));
  const dispatch = useDispatch();

  const house = state.houses[state.view.house_name as house_name_t] as house_state_t;
  let modal: JSX.Element | null;
  switch (state.view.active_modal) {
    case "add_card": {
      modal = <AddCardPage house={house.name} />;
      break;
    }
    case "reset_game": {
      modal = <ConfirmResetPage />;
      break;
    }
    default: {
      modal = null;
      break;
    }
  }
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {ALL_HOUSE_NAMES.map(name => {
              const house = state.houses[name];
              if (!house.active) {
                return null;
              }
              return (
                <div className="column is-full-tablet is-half-desktop" key={name}>
                  <HouseTile
                    house={name}
                    spice={house.spice}
                    cards={house.cards}
                    karama_used={house.karama_used}
                    ally={house.ally}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="buttons is-centered">
            <button
              className="button is-secondary"
              onClick={() => {
                dispatch(show_reset_game_modal());
              }}
            >
              Reset game
            </button>
          </div>
        </div>
      </section>
      {modal}
    </>
  );
};

export default GameOverview;

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { root_state } from "ts/state/reducers";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { show_reset_game_page } from "ts/state/actions";
import { house_state_t } from "ts/state/types";
import EditSpicePage from "ts/components/Pages/EditSpicePage";
import ViewCardsPage from "ts/components/Pages/ViewCardsPage";
import AddCardPage from "ts/components/Pages/AddCardPage";
import ConfirmResetPage from "ts/components/Pages/ConfirmResetPage";
import AlliancePage from "ts/components/Pages/AlliancePage";
import HouseTile from "ts/components/HouseTile";

const GameOverview: React.FC = () => {
  const state = useSelector((state: root_state) => ({
    houses: state.houses,
    view: state.view,
  }));
  const dispatch = useDispatch();

  const house = state.houses[state.view.house_name as house_name_t] as house_state_t;
  switch (state.view.active_page) {
    case "edit_spice": {
      return <EditSpicePage house={house.name} spice={house.spice} />;
    }
    case "view_cards": {
      return <ViewCardsPage house={house.name} cards={house.cards} />;
    }
    case "add_card": {
      return <AddCardPage house={house.name} />;
    }
    case "alliance": {
      return <AlliancePage house={house.name} ally={house.ally} />;
    }
    case "reset_game": {
      return <ConfirmResetPage />;
    }
    default:
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
                    <div className="column is-half" key={name}>
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
                    dispatch(show_reset_game_page());
                  }}
                >
                  Reset game
                </button>
              </div>
            </div>
          </section>
        </>
      );
  }
};

export default GameOverview;

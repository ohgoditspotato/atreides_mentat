import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { root_state } from "ts/state/reducers";
import { house_name_t, ALL_HOUSE_NAMES } from "ts/houses";
import { show_reset_game_modal } from "ts/state/actions";
import { house_state_t } from "ts/state/types";
import EditSpiceModal from "ts/components/Modals/EditSpiceModal";
import HouseTile from "ts/components/HouseTile";
import ViewCardsModal from "ts/components/Modals/ViewCardsModal";
import AddCardModal from "ts/components/Modals/AddCardModal";
import ConfirmResetModal from "ts/components/Modals/ConfirmResetModal";
import AllianceModal from "ts/components/Modals/AllianceModal";

const Modal: React.FC = props => {
  const state = useSelector((root_state: root_state) => ({
    houses: root_state.houses,
    view: root_state.view,
  }));

  if (state.view.active_modal === "none") {
    return null;
  }
  const house = state.houses[state.view.house_name as house_name_t] as house_state_t;
  switch (state.view.active_modal) {
    case "edit_spice": {
      return <EditSpiceModal house={house.name} spice={house.spice} />;
    }
    case "view_cards": {
      return <ViewCardsModal house={house.name} cards={house.cards} />;
    }
    case "add_card": {
      return <AddCardModal house={house.name} />;
    }
    case "alliance": {
      return <AllianceModal house={house.name} ally={house.ally} />;
    }
    case "reset_game": {
      return <ConfirmResetModal />;
    }
    default:
      return null;
  }
};

const GameOverview: React.FC = () => {
  const state = useSelector((state: root_state) => ({
    houses: state.houses,
  }));
  const dispatch = useDispatch();

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
                dispatch(show_reset_game_modal());
              }}
            >
              Reset game
            </button>
          </div>
        </div>
      </section>
      <Modal></Modal>
    </>
  );
};

export default GameOverview;

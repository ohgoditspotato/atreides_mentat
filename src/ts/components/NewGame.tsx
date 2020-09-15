import * as React from "react";
import { useDispatch } from "react-redux";
import { ENEMY_HOUSE_NAMES, enemy_house_name_t } from "ts/houses";
import { close_modal, start_game } from "ts/state/actions";
import { start_game_spec } from "ts/state/types";
import { HouseNameWithIcon } from "ts/components/HouseBanner";

const HouseSelect: React.FC<{
  house: enemy_house_name_t;
  checked: boolean;
  onClick: () => void;
}> = props => {
  let className = "button is-fullwidth";
  if (props.checked) {
    className += " is-success";
  }
  return (
    <div className="column is-half" onClick={props.onClick} style={{ cursor: "pointer" }}>
      <div className="box">
        <div className="columns is-mobile is-vcentered">
          <HouseNameWithIcon house={props.house} />
        </div>
        <button className={className}>
          <div>{props.checked ? "In game" : "Not in game"}</div>
        </button>
      </div>
    </div>
  );
};

export default () => {
  const [state, setState] = React.useState<start_game_spec>({
    houses: {
      Harkonnen: false,
      Emperor: false,
      "Spacing Guild": false,
      "Bene Gesserit": false,
      Fremen: false,
      Ixians: false,
      Tleilaxu: false
    },
    deck_tracking: true,
    include_expansion_cards: false
  });

  let allow_start = false;
  for (let i of ENEMY_HOUSE_NAMES) {
    if (state.houses[i]) {
      allow_start = true;
      break;
    }
  }
  const dispatch = useDispatch();
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="title is-1">New game</p>
          <div className="columns is-vcentered">
            <div className="column">
              <button
                className={"button is-large " + (state.deck_tracking ? "is-info" : "is-warning")}
                onClick={() => setState({ ...state, deck_tracking: !state.deck_tracking })}
              >
                {state.deck_tracking ? "Deck tracking ON" : "Deck tracking OFF"}
              </button>
            </div>
            <p className="column">
              Deck tracking can be enabled to automatically keep track of which cards remain in the
              deck, so you can see the odds of your opponent having a particular card. However the
              tracking mechanism currently does not handle the Harkonnen card swap ability. If this
              happens - or if you just prefer to play without it - it can be disabled at any time
              during play. Or you can just turn it off now!
            </p>
          </div>
          <div className="columns is-vcentered">
            <div className="column">
              <button
                className={"button is-large " + (state.include_expansion_cards ? "is-info" : "is-warning")}
                onClick={() => setState({ ...state, include_expansion_cards: !state.include_expansion_cards })}
              >
                {state.include_expansion_cards ? "Include expansion cards ON" : "Include expansion cards OFF"}
              </button>
            </div>
            <p className="column">
              Include the expansion treachery cards.
            </p>
          </div>

        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="subtitle is-5">Select which houses are present in the game</p>
          <div className="columns is-multiline">
            {ENEMY_HOUSE_NAMES.map(name => (
              <HouseSelect
                house={name}
                checked={state.houses[name]}
                onClick={() => {
                  const new_checked = !state.houses[name];
                  setState({ ...state, houses: { ...state.houses, [name]: new_checked } });
                }}
                key={name}
              />
            ))}
            <div
              className="column"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <button
                className="button is-success is-large"
                disabled={!allow_start}
                onClick={() => {
                  if (allow_start) {
                    dispatch(start_game(state));
                    dispatch(close_modal());
                  }
                }}
              >
                <span className="icon">
                  <i className="fas fa-play"></i>
                </span>
                <span>Start game</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

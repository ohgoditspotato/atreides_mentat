import { game_state_reducer, initial_game_state } from "ts/state/reducers";
import {
  start_game,
  reset_game,
  house_add_card,
  house_add_unknown,
  house_remove_card,
  house_remove_unknown,
  house_set_ally,
} from "ts/state/actions";
import { start_game_spec } from "ts/state/types";
import initial_deck from "ts/state/initial_deck";
import { house_name_t } from "ts/houses";

const spec: start_game_spec = {
  "Bene Gesserit": false,
  Fremen: true,
  "Spacing Guild": false,
  Emperor: false,
  Harkonnen: false,
};

test("init-game", () => {
  const state = game_state_reducer(initial_game_state, start_game(spec));
  expect(state.initialized).toEqual(true);
  expect(state.current.houses.Fremen.active).toEqual(true);
  expect(state.current.houses.Fremen.unknown_cards[0].deck_index).toEqual(
    state.current.draw_deck_index
  );

  for (let i of ["Bene Gesserit", "Spacing Guild", "Emperor", "Harkonnen"] as const) {
    expect(state.current.houses[i].active).toEqual(false);
  }

  expect(state.history.length).toEqual(0);
  expect(state.current.draw_deck_index).toEqual(0);
  expect(state.current.decks.length).toEqual(2);
});

test("add-card", () => {
  let state = game_state_reducer(initial_game_state, start_game(spec));
  expect(state.current.decks[state.current.draw_deck_index].cards).toContainEqual(initial_deck[0]);

  state = game_state_reducer(state, house_add_card("Fremen", initial_deck[0]));
  expect(state.current.houses.Fremen.cards[0]).toEqual(initial_deck[0]);
  expect(state.current.decks[state.current.draw_deck_index].cards).not.toContainEqual(
    initial_deck[0]
  );
});

test("remove-card", () => {
  // Make sure we check it is actually removing the right card
  let state = game_state_reducer(initial_game_state, start_game(spec));
  state = game_state_reducer(state, house_add_card("Fremen", initial_deck[0]));
  state = game_state_reducer(state, house_add_card("Fremen", initial_deck[1]));
  state = game_state_reducer(state, house_add_card("Fremen", initial_deck[2]));
  state = game_state_reducer(state, house_remove_card("Fremen", 1));
  expect(state.current.houses.Fremen.cards.length).toEqual(2);
  expect(state.current.houses.Fremen.cards[0]).toEqual(initial_deck[0]);
  expect(state.current.houses.Fremen.cards[1]).toEqual(initial_deck[2]);
});

test("add-unknown", () => {
  let state = game_state_reducer(initial_game_state, start_game(spec));
  state = game_state_reducer(state, house_add_unknown("Atreides"));
  expect(state.current.houses.Atreides.unknown_cards.length).toEqual(1);
  expect(state.current.houses.Atreides.unknown_cards[0].deck_index).toEqual(
    state.current.draw_deck_index
  );

  // The Fremen house has an unknown card as well
  expect(state.current.decks[0].num_unknowns).toEqual(2);
  // Cards still in first draw deck should remain constant
  expect(state.current.decks[0].cards.length).toEqual(initial_deck.length);
});

test("remove-unknown", () => {
  let state = game_state_reducer(initial_game_state, start_game(spec));
  state = game_state_reducer(state, house_remove_unknown("Fremen", 0, initial_deck[0].id));
  expect(state.current.houses.Fremen.unknown_cards.length).toEqual(0);
  expect(state.current.decks[0].cards).not.toContainEqual(initial_deck[0]);
  expect(state.current.decks[1].cards[0]).toEqual(initial_deck[0]);
});

test("exhaust-deck", () => {
  let state = game_state_reducer(initial_game_state, start_game(spec));
  state = game_state_reducer(state, house_remove_unknown("Fremen", 0, initial_deck[0].id));
  expect(state.current.decks[0].cards.length).toEqual(initial_deck.length - 1);

  for (let i = 1; i < initial_deck.length; i++) {
    state = game_state_reducer(state, house_add_card("Fremen", initial_deck[i]));
    state = game_state_reducer(state, house_remove_card("Fremen", 0));
  }

  expect(state.current.decks.length).toEqual(3);
  expect(state.current.draw_deck_index).toEqual(1);
  expect(state.current.decks[0].cards.length).toEqual(0);

  // Once we pick up the final card, we shuffle the cards to create a new draw deck
  expect(state.current.decks[1].cards.length).toEqual(initial_deck.length - 1);

  // And so because we also discarded the last card we picked up,
  // we should have another discard deck and a card should be discarded in it
  expect(state.current.decks[2].cards.length).toEqual(1);
});

test("set-ally", () => {
  let state = game_state_reducer(initial_game_state, start_game({ ...spec, Harkonnen: true }));
  state = game_state_reducer(state, house_set_ally("Atreides", "Fremen"));
  expect(state.current.houses.Atreides.ally).toEqual<house_name_t>("Fremen");
  expect(state.current.houses.Fremen.ally).toEqual<house_name_t>("Atreides");
  expect(state.current.houses.Harkonnen.ally).toEqual(null);

  state = game_state_reducer(state, house_set_ally("Harkonnen", "Atreides"));
  expect(state.current.houses.Atreides.ally).toEqual<house_name_t>("Harkonnen");
  expect(state.current.houses.Harkonnen.ally).toEqual<house_name_t>("Atreides");
  expect(state.current.houses.Fremen.ally).toEqual(null);
});

test("reset-game", () => {
  const state = game_state_reducer(initial_game_state, start_game(spec));

  // TODO more modifications

  const reset_state = game_state_reducer(state, reset_game());
  expect(reset_state).toEqual(initial_game_state);
});

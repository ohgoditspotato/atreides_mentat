import React from "react";
import { useSelector } from "react-redux";
import GameOverview from "./components/GameOverview";
import HouseTile from "./components/HouseTile";
import NewGame from "./components/NewGame";
import { HouseName } from "./houses";
import { RootState } from "ts/state/reducers";
import { HouseState } from "ts/state/types";
import EditSpice from "ts/components/EditSpice";
import ViewCards from "ts/components/ViewCards";
import { TreacheryCard } from "ts/TreacheryCard";
import AddCard from "ts/components/AddCard";

const ViewManager: React.FC = () => {
  const state = useSelector((state: RootState) => {
    let house:
      | { name: HouseName; spice: number; cards: ReadonlyArray<TreacheryCard> }
      | undefined = undefined;
    if (state.view.house_name !== undefined) {
      const house_state = state.houses[state.view.house_name] as HouseState;
      house = {
        name: state.view.house_name,
        spice: house_state.spice,
        cards: house_state.cards,
      };
    }
    return {
      house: house,
      active_view: state.view.active_view,
    };
  });

  switch (state.active_view) {
    case "new_game":
      return <NewGame />;
    case "overview":
      return <GameOverview />;
    case "edit_spice":
      if (state.house === undefined) {
        throw new Error("Missing view.house");
      }
      return <EditSpice spice={state.house.spice} house={state.house.name} />;
    case "view_cards":
      if (state.house === undefined) {
        throw new Error("Missing view.house");
      }
      return <ViewCards house={state.house.name} cards={state.house.cards} />;
    case "add_card":
      if (state.house === undefined) {
        throw new Error("Missing view.house");
      }
      return <AddCard house={state.house.name} />;
    default: {
      throw new Error("Unhandled active_view state");
    }
  }
};

export default ViewManager;

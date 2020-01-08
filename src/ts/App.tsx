import React from "react";
import NewGame from "./components/NewGame";
import { useSelector } from "react-redux";
import { StateType } from "./Store";
import GameOverview from "./components/GameOverview";

const App: React.FC = () => {
  const inGame = useSelector((state: StateType) => state.in_progress);
  return inGame ? <GameOverview /> : <NewGame />
};

export default App;

import { createStore } from "@reduxjs/toolkit";
import { gameStateReducer } from "./State";

export const gameStateStore = createStore(gameStateReducer);

export type GameDispatch = typeof gameStateStore.dispatch;
export type StateType = ReturnType<typeof gameStateReducer>;
import React from "react";
import ReactDOM from "react-dom";
import GameContainer from "ts/components/GameContainer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { stateStore } from "ts/state/store";
import "bulma/css/bulma.css";

ReactDOM.render(
  <Provider store={stateStore}>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <p className="title is-1">Dune</p>
          <p className="subtitle is-5">Atreides mentat</p>
        </div>
      </div>
    </section>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

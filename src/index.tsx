import React from "react";
import ReactDOM from "react-dom";
import GameContainer from "ts/components/GameContainer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorkerRegistration";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "ts/state/store";

import "scss/main.scss";
import "@fortawesome/fontawesome-free/css/all.css"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <p className="title is-1">Atreides Mentat</p>
            <p className="subtitle is-5">for Dune (2019)</p>
          </div>
        </div>
      </section>
    </PersistGate>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

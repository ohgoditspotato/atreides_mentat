import React from "react";
import ReactDOM from "react-dom";
import GameContainer from "ts/components/GameContainer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { state_store } from "ts/state/store";
import "bulma/css/bulma.css";

ReactDOM.render(
  <Provider store={state_store}>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <p className="title is-1">Atreides mentat</p>
          <p className="subtitle is-5">for Dune (2019)</p>
        </div>
      </div>
    </section>
    <GameContainer />
    <footer className="footer">
      Icons made by{" "}
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </footer>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

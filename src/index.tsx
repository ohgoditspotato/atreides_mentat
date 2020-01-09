import React from "react";
import ReactDOM from "react-dom";
import ViewManager from "ts/ViewManager";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { stateStore } from "ts/Store";

ReactDOM.render(
  <Provider store={stateStore}>
    <ViewManager />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

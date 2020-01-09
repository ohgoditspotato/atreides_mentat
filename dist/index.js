import * as React from "/web_modules/react.js";
import * as ReactDOM from "/web_modules/react-dom.js";
import { Provider } from "/web_modules/react-redux.js";
import * as serviceWorker from "./serviceWorker.js";
import ViewManager from "./ViewManager.js";
import { stateStore } from "./Store.js";
ReactDOM.render(React.createElement(Provider, { store: stateStore },
    React.createElement(ViewManager, null)), document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

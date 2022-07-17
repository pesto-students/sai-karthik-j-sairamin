import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConnectedAppFn, ConnectedAppClass } from "./App";
import { store } from "./store/steps-store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Use any one of ConnectedAppFn, ConnectedAppClass

root.render(
  <Provider store={store}>
    <ConnectedAppFn />
    {/* <ConnectedAppClass /> */}
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import serviceWorker from "./serviceworker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  // enable service worker only on production mode
  serviceWorker.register();
}

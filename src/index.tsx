import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import reducer from "./redux/reducer";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { ActionType, DispatchType } from "./redux/types/actions";
import { Provider } from "react-redux";
import { IInitialState } from "./redux/types/states";

const store: Store<IInitialState, ActionType> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

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

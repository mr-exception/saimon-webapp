import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { ActionType, DispatchType } from "./types/actions";
import { IInitialState } from "./types/states";

const store: Store<IInitialState, ActionType> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

export default store;

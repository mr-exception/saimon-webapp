import { ActionType } from "Redux/types/actions";
import { IInitialState, ILogedState } from "Redux/types/states";
import * as Actions from "Redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  const loged_state = state as ILogedState;
  let found = false;
  switch (action.type) {
    case Actions.STORE_CLIENT:
      if (!action.client) return state;
      loged_state.client = action.client;
      return state;
    case Actions.STORE_CONNECTION_STATE:
      if (!action.host_connection_state) return state;
      const host_connection_state = action.host_connection_state;
      found = false;
      state.host_connections = state.host_connections.map((hc) => {
        if (hc.connection_id === host_connection_state.connection_id) {
          hc.state = host_connection_state.state;
          found = true;
        }
        return hc;
      });
      if (!found) {
        state.host_connections.push(host_connection_state);
      }
      return state;
    case Actions.STORE_APP_KEY:
      if (!action.app_key) return state;
      loged_state.app_key = action.app_key;
      return loged_state;
    default:
      return state;
  }
};
export default reducer;

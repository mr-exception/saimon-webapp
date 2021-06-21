import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.ADD_HOSTS:
      state.hosts = [...state.hosts, ...(action.hosts ? action.hosts : [])];
      return state;
    case Actions.RESET_HOSTS:
      state.hosts = action.hosts || [];
      return state;
    case Actions.ADD_HOST:
      if (!action.host) {
        return state;
      }
      state.hosts = [...state.hosts, action.host];
      return state;
    case Actions.REMOVE_HOST:
      state.hosts = state.hosts.filter((host) => {
        if (action.host) {
          if (host.id === action.host.id) return null;
          else return host;
        } else {
          return host;
        }
      });
      return state;
    case Actions.EDIT_HOST:
      state.hosts = state.hosts.map((host) => {
        if (action.host) {
          if (host.id === action.host.id) return host;
          else return host;
        } else {
          return host;
        }
      });
      return state;

    default:
      return state;
  }
};

export default reducer;

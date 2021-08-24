import { ActionType } from "Redux/types/actions";
import { IInitialState, ILogedState } from "Redux/types/states";
import * as Actions from "Redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  const loged_state = state as ILogedState;
  switch (action.type) {
    case Actions.STORE_CLIENT:
      if (!action.client) return state;
      loged_state.client = action.client;
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

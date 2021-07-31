import { ActionType } from "Redux/types/actions";
import { IInitialState } from "Redux/types/states";
import * as Actions from "Redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.CLEAR_ALL:
      state.contacts = [];
      state.hosts = [];
      state.contact_connections = [];
      state.selected_contact_id = undefined;
      state.selected_conversation_messages = [];
      state.host_connections = [];
      return state;
    case Actions.SET_CONNECTION_STATUS:
      state.is_online = action.is_online === true;
      return state;
    default:
      return state;
  }
};

export default reducer;

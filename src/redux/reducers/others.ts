import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";

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
    default:
      return state;
  }
};

export default reducer;

import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.SELECT_CONVERSATION:
      state.selected_contact_id = action.contact_id;
      return state;
    case Actions.RESET_MESSAGES:
      state.selected_conversation_messages = action.messages || [];
      return state;
    case Actions.ADD_MESSAGE:
      if (!action.message) return state;
      state.selected_conversation_messages = [
        ...state.selected_conversation_messages,
        ...[action.message],
      ];
      return state;
    case Actions.UPDATE_MESSAGE_STATUS:
      state.selected_conversation_messages = state.selected_conversation_messages.map(
        (message) => {
          if (!action.message_status) return message;
          if (message.network_id === action.message_status.message_id) {
            message.status = action.message_status.status;
            message.update(state.storage);
          }
          return message;
        }
      );
      return state;
    case Actions.ADD_MESSAGES:
      state.selected_conversation_messages = [
        ...state.selected_conversation_messages,
        ...(action.messages || []),
      ];
      return state;
    default:
      return state;
  }
};

export default reducer;

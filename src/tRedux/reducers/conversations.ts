import { ActionType } from "Redux/types/actions";
import { IInitialState } from "Redux/types/states";
import * as Actions from "Redux/types/actions";

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
    case Actions.UPDATE_MESSAGE:
      state.selected_conversation_messages =
        state.selected_conversation_messages.map((message) => {
          if (!action.message) return message;
          if (message.network_id === action.message.network_id) {
            return action.message;
          }
          return message;
        });
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

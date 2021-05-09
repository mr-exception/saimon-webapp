import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";
import Contact from "Classes/Contact/Contact";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.SELECT_CONVERSATION:
      state.selected_conversation = action.conversation_index;
      return state;
    case Actions.ADD_MESSAGE:
      if (!action.message) return state;
      if (action.message.box_type === "RECEIVED") {
        let contact = state.contacts.find(
          (cnt) => cnt.public_key === action.message?.public_key
        );
        if (!contact) {
          contact = new Contact({
            id: 0,
            first_name: "unknow",
            last_name: "unknow",
            public_key: action.message.public_key,
          });
          contact.store();
          state.contacts = [...state.contacts, ...[contact]];
        } else {
          action.message.first_name = contact.first_name;
          action.message.last_name = contact.last_name;
        }
      }
      state.selected_conversation_messages = [
        ...state.selected_conversation_messages,
        ...[action.message],
      ];
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

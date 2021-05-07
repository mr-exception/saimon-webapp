import Message from "Classes/Message/Message";
import {
  ActionType,
  ADD_MESSAGE,
  SELECT_CONVERSATION,
} from "redux/types/actions";

export const selectConversation = (conversation_index: number): ActionType => {
  return { type: SELECT_CONVERSATION, conversation_index };
};
export const addMessage = (message: Message): ActionType => {
  return { type: ADD_MESSAGE, message };
};

export const addMessages = (messages: Message[]): ActionType => {
  return { type: ADD_MESSAGE, messages };
};

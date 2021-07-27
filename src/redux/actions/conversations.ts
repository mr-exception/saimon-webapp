import Message from "Classes/Message/Message";
import {
  ActionType,
  ADD_MESSAGE,
  RESET_MESSAGES,
  SELECT_CONVERSATION,
  UPDATE_MESSAGE,
} from "Redux/types/actions";

export const selectConversation = (contact_id: number): ActionType => {
  return { type: SELECT_CONVERSATION, contact_id };
};
export const addMessage = (message: Message): ActionType => {
  return { type: ADD_MESSAGE, message };
};
export const updateMessage = (message: Message): ActionType => {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
};
export const resetMessages = (messages: Message[]): ActionType => {
  return { type: RESET_MESSAGES, messages };
};
export const addMessages = (messages: Message[]): ActionType => {
  return { type: ADD_MESSAGE, messages };
};

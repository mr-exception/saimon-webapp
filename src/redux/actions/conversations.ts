import Message, { MessageSentState } from "Classes/Message/Message";
import {
  ActionType,
  ADD_MESSAGE,
  RESET_MESSAGES,
  SELECT_CONVERSATION,
  UPDATE_MESSAGE_STATUS,
} from "redux/types/actions";

export const selectConversation = (contact_id: number): ActionType => {
  return { type: SELECT_CONVERSATION, contact_id };
};
export const addMessage = (message: Message): ActionType => {
  return { type: ADD_MESSAGE, message };
};
export const updateMessageStatus = (
  message_id: string,
  status: MessageSentState
): ActionType => {
  return {
    type: UPDATE_MESSAGE_STATUS,
    message_status: { message_id, status },
  };
};
export const resetMessages = (messages: Message[]): ActionType => {
  return { type: RESET_MESSAGES, messages };
};
export const addMessages = (messages: Message[]): ActionType => {
  return { type: ADD_MESSAGE, messages };
};

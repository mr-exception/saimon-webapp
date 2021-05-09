import Message, { MessageSentState } from "Classes/Message/Message";
import {
  ActionType,
  ADD_MESSAGE,
  SELECT_CONVERSATION,
  UPDATE_MESSAGE_STATUS,
} from "redux/types/actions";

export const selectConversation = (conversation_index: number): ActionType => {
  return { type: SELECT_CONVERSATION, conversation_index };
};
export const addMessage = (message: Message): ActionType => {
  return { type: ADD_MESSAGE, message };
};
export const updateMessage = (
  message_id: number,
  status: MessageSentState
): ActionType => {
  return {
    type: UPDATE_MESSAGE_STATUS,
    message_status: { message_id, status },
  };
};
export const addMessages = (messages: Message[]): ActionType => {
  return { type: ADD_MESSAGE, messages };
};

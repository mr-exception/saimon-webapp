import { ActionType, SELECT_CONVERSATION } from "redux/types/actions";

export const selectConversation = (conversation_index: number): ActionType => {
  return { type: SELECT_CONVERSATION, conversation_index };
};

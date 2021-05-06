import { IInitialState, ILogedState } from "./states";

export const selectClient = (state: ILogedState) => state.client;
export const selectHostConnectionStates = (state: IInitialState) =>
  state.host_connections;
export const selectContacts = (state: IInitialState) => state.contacts;
export const selectedConversation = (state: IInitialState) =>
  state.selected_conversation;
export const selectConversationMessages = (state: IInitialState) =>
  state.selected_conversation_messages;

import { IInitialState, ILogedState } from "./states";

// profile
export const selectProfile = (state: IInitialState) => state.profile;
export const selectFirstName = (state: IInitialState) =>
  state.profile.first_name;
export const selectLastName = (state: IInitialState) => state.profile.last_name;
// first selectors
export const selectClient = (state: ILogedState) => state.client;
export const selectStorage = (state: IInitialState) => state.storage;
export const selectAppKey = (state: ILogedState) => state.app_key;
export const selectHosts = (state: IInitialState) => state.hosts;
export const selectContacts = (state: IInitialState) => state.contacts;
export const selectConnectionStatus = (state: IInitialState) => state.is_online;
// queue selectors
export const selectRelayHostLayer = (state: IInitialState) => state.relay_queue;
export const selectAdvertiserHostLayer = (state: IInitialState) =>
  state.advertiser_queue;
export const selectStorageHostLayer = (state: IInitialState) =>
  state.storage_queue;
// secondary selectors
export const selectHostConnectionStates = (state: IInitialState) =>
  state.host_connections;

export const selectedContactId = (state: IInitialState) =>
  state.selected_contact_id;
export const selectedContact = (state: IInitialState) => {
  if (state.selected_contact_id !== undefined) {
    return state.contacts.find(
      (contact) => contact.id === state.selected_contact_id
    );
  } else {
    return undefined;
  }
};
export const selectConversationMessages = (state: IInitialState) =>
  state.selected_conversation_messages;

export const selectAdvertiserRequestsQueue = (state: IInitialState) =>
  state.advertiser_queue;

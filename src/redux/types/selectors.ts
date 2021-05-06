import { IInitialState, ILogedState } from "./states";

export const selectClient = (state: ILogedState) => state.client;
export const selectHostConnectionStates = (state: IInitialState) =>
  state.host_connections;
export const selectContacts = (state: IInitialState) => state.contacts;

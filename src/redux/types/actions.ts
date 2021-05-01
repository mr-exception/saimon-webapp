import { IContact } from "./states";

export const SHOW_ADD_CONTACT_MODAL = "show_add_contact_modal";
export const CLOSE_ADD_CONTACT_MODAL = "close_add_contact_modal";
export const ADD_CONTACT = "add_contact";

export type ActionType = {
  type: string;
  contact?: IContact;
};
export type DispatchType = (args: ActionType) => ActionType;

import { ActionType, ADD_CONTACT } from "redux/types/actions";
import { IContact } from "redux/types/states";

export const addContact = (contact: IContact): ActionType => {
  return { type: ADD_CONTACT, contact };
};

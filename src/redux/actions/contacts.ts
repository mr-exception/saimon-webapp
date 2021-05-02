import Contact from "Classes/Contact/Contact";
import { ActionType, ADD_CONTACT, ADD_CONTACTS } from "redux/types/actions";

export const addContact = (contact: Contact): ActionType => {
  return { type: ADD_CONTACT, contact };
};

export const addContacts = (contacts: Contact[]): ActionType => {
  return { type: ADD_CONTACTS, contacts };
};

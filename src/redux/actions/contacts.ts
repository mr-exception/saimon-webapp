import Contact from "Classes/Contact/Contact";
import {
  ActionType,
  ADD_CONTACT,
  ADD_CONTACTS,
  EDIT_CONTACT,
  REMOVE_CONTACT,
} from "redux/types/actions";

export const addContact = (contact: Contact): ActionType => {
  return { type: ADD_CONTACT, contact };
};

export const addContacts = (contacts: Contact[]): ActionType => {
  return { type: ADD_CONTACTS, contacts };
};

export const updateContact = (contact: Contact): ActionType => {
  return { type: EDIT_CONTACT, contact };
};

export const removeContact = (contact: Contact): ActionType => {
  return { type: REMOVE_CONTACT, contact };
};

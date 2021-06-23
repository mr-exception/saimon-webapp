import Contact from "Classes/Contact/Contact";
import { Dispatch } from "redux";
import { addContacts } from "redux/actions/contacts";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";

const load = async (storage: Storage, dispatch: Dispatch<ActionType>) => {
  const contact_records = await storage.getContacts();
  const contacts = contact_records.map((record) => {
    const contact = new Contact(record);
    return contact;
  });
  dispatch(addContacts(contacts));
};

export default load;

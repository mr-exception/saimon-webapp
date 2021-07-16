import Contact from "Classes/Contact/Contact";
import { Dispatch } from "redux";
import { addContacts } from "redux/actions/contacts";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";
import store from "redux/store";

const load = async (storage: Storage, dispatch: Dispatch<ActionType>) => {
  const contact_records = await storage.getContacts();

  const report_queue = store.getState().report_queue;

  const contacts = contact_records.map((record) => {
    const contact = new Contact(record);
    // add contact to report queue
    // console.log(`added ${contact.first_name} to report queue`);
    // report_queue.push({ contact });
    return contact;
  });

  dispatch(addContacts(contacts));
};

export default load;

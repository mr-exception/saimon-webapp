import Message from "Classes/Message/Message";
import { Dispatch } from "redux";
import { resetMessages } from "redux/actions/conversations";
import { ActionType } from "redux/types/actions";
import Storage from "storage/Storage";

const load = async (
  contact_id: number,
  storage: Storage,
  dispatch: Dispatch<ActionType>
) => {
  const message_records = await storage.getMessages(contact_id);
  const messages = message_records.map((record) => {
    return new Message(record);
  });
  dispatch(resetMessages(messages));
};

export default load;

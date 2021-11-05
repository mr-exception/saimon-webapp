import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "Redux/actions/conversations";
import { selectedContactId } from "Redux/types/selectors";
import { IInitialState } from "Redux/types/states";
import ConversationActions from "./Components/ConversationActions/ConversationActions";
import Conversation from "./Components/Conversation/Conversation";
import Styles from "./styles.module.css";
const ChatList = () => {
  const contacts = useSelector((state: IInitialState) => state.contacts);
  const selected_contact_id = useSelector(selectedContactId);
  const dispatch = useDispatch();
  // const getClientConnectionsMaps = useCallback(async () => {
  //   const results = await client.getClientStates(
  //     contacts
  //       .map((contact) => contact.public_key)
  //       .filter((pk) => (pk === client.getAddress() ? null : pk))
  //   );
  //   console.log(results);
  // }, [client, contacts]);
  // useEffect(() => {
  //   getClientConnectionsMaps();
  // }, [getClientConnectionsMaps]);
  return (
    <div className={"col-md-4 " + Styles.container}>
      <ConversationActions />
      {contacts.map((contact, index) => (
        <Conversation
          selected={() => {
            dispatch(selectConversation(contact.id));
          }}
          is_selected={selected_contact_id === contact.id}
          key={index}
          contact={contact}
          last_message="no message"
        />
      ))}
    </div>
  );
};

export default ChatList;
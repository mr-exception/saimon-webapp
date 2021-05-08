import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "redux/actions/conversations";
import { selectClient, selectedConversation } from "redux/types/selectors";
import { IInitialState } from "redux/types/states";
import AddContact from "./Components/AddContact/AddContact";
import Conversation from "./Components/Conversation/Conversation";
import "./styles.css";
const ChatList = () => {
  const contacts = useSelector((state: IInitialState) => state.contacts);
  const client = useSelector(selectClient);
  const selected_conversation_index = useSelector(selectedConversation);
  const dispatch = useDispatch();
  const getClientConnectionsMaps = useCallback(async () => {
    const results = await client.getClientStates(
      contacts
        .map((contact) => contact.public_key)
        .filter((pk) => (pk === client.getAddress() ? null : pk))
    );
    console.log(results);
  }, [client, contacts]);
  useEffect(() => {
    getClientConnectionsMaps();
  }, [getClientConnectionsMaps]);
  return (
    <div className="chat-list">
      <AddContact />
      {contacts.map((contact, index) => (
        <Conversation
          selected={() => {
            dispatch(selectConversation(index));
          }}
          is_selected={selected_conversation_index === index}
          key={index}
          name={`${contact.first_name} ${contact.last_name}`}
          last_message="no message"
        />
      ))}
    </div>
  );
};

export default ChatList;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "redux/actions/conversations";
import { selectedConversation } from "redux/types/selectors";
import { IInitialState } from "redux/types/states";
import AddContact from "./Components/AddContact/AddContact";
import Conversation from "./Components/Conversation/Conversation";
import "./styles.css";
const ChatList = () => {
  const contacts = useSelector((state: IInitialState) => state.contacts);
  const selected_conversation_index = useSelector(selectedConversation);
  const dispatch = useDispatch();
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

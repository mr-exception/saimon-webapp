import React from "react";
import { useSelector } from "react-redux";
import { IInitialState } from "redux/types/states";
import AddContact from "./Components/AddContact/AddContact";
import Conversation from "./Components/Conversation/Conversation";
import "./styles.css";
const ChatList = () => {
  const contacts = useSelector((state: IInitialState) => state.contacts);
  return (
    <div className="chat-list">
      <AddContact />
      {contacts.map((contact, index) => (
        <Conversation
          key={index}
          name={`${contact.first_name} ${contact.last_name}`}
          last_message="no message"
        />
      ))}
    </div>
  );
};

export default ChatList;
